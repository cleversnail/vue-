<template>
<div class="container">
  <form class="form">
    <div class="head">
      报名
    </div>
    <div class="input">
      <div class="name">
        真实姓名
      </div>
      <input type="text" name="name" v-model="data.name" placeholder="">
    </div>
    <div class="input">
      <div class="name">
        医院
      </div>
      <input type="text" name="hospital" v-model="data.hospital" placeholder="">
    </div>
    <div class="input">
      <div class="name">
        科室
      </div>
      <input type="text" name="department" v-model="data.keshi" placeholder="">
    </div>
    <div class="change">
      <div class="change-choose">
        <span>选择一条科普做代言</span>
          <img src="../../assets/img/kepu/apply/01.png" @click="addpage">
      </div>
      <ul>
        <li @click="toggle" v-for="slogan in slogans">
          <input :id="slogan.id" type="radio" name="onely" v-model="data.slogan_id" :value="slogan.id">
          <label :for="slogan.id">
            <div class="cercle">
              <img src="../../assets/img/kepu/apply/02.png" alt="">
              <span>选<br/>择</span>
            </div>
            <div class="contai">
            {{slogan.name}}
          </div>
          </label>
        </li>
      </ul>
    </div>
    <div class="submit" @click="submit">
      提交
    </div>
  </form>

</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import get_name from '../../utils/getName';
import kepuShare from '../../utils/kepu-share';
export default {
  name: 'applyer',
  data() {
    return {
      data: {
        name: '',
        hospital: '',
        keshi: '',
        slogan_id:'',
        casual_activity_id:'3'
      },
      ext_data: {
        'key': null,
        'policy': null,
        'OSSAccessKeyId': null,
        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
        'signature': null
      },
      key: '',
      apply_flag: true,
      isWeiChat: false,
      indexStart: 0,
      indexEnd: 0,
      pics: [],
      isShow:false,
      slogans:[],
      page: 1,
      showMore: true,
      apply_flag: true
    };
  },
  created() {
    kepuShare();
    this.getUser();
    this.getData();
    this.getSlogan(this.page);
    this.isWeiChat = this.checkWeiXin();
  },
  methods: {
    addpage () {
        this.page ++;
        this.getSlogan(this.page);
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    getUser() {
      let url = '/api/frontend/user/userinfo';
      axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            let user = res.data.data.detail;
            if (user) {
              this.data.name = user.true_name;
              this.data.hospital = user.hospital;
              this.data.keshi = user.administrative;
            }
          }
        })
    },
    getSlogan (page) {
      let url = `/api/frontend/vote/slogan?limit=3&page=${page}`;
      axios.get(url)
      .then((res) => {
        if (res.data.status == 0) {
          this.slogans = res.data.data.data;
          if(res.data.data.data.length < 3){
            this.page = 1;
          }
        }
      })
    },
    getData() {
      axios.get('/api/frontend/utils/uploadsign')
        .then((res) => {
          res = res.data;
          this.key = res.dir;
          let data = {
            'key': res.dir,
            'policy': res.policy,
            'OSSAccessKeyId': res.accessid,
            'success_action_status': '200', //让服务端返回200,不然，默认会返回204
            'signature': res.signature
          }
          this.ext_data = data
        });
    },
    handleBefore(file) {
      let type = file.name.split('.')[1];
      this.ext_data.key = this.key + get_name() + '.' + type;
      this.pics.push(this.ext_data.key);
      this.indexStart += 1;
    },
    handleSuccess(res, file, fileList) {
      this.indexEnd += 1;
      if (this.indexEnd == this.indexStart) {
        this.data.pics = this.data.pics.concat(this.pics);
        this.indexEnd = 0;
        this.indexStart = 0;
        this.pics = [];
      }
    },
    deletePic(picname) {
      let index = this.data.pics.indexOf(picname);
      this.data.pics.splice(index, 1);
    },
    wxUpload() {
      const that = this;
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {　　
          data = Qs.stringify(data);
          return data;
        }],
      }

      wx.chooseImage({
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          syncUpload(localIds);
        }
      });

      function syncUpload(localIds) {
        var localId = localIds.shift();
        //解决IOS无法上传的坑
        if (localId.indexOf("wxlocalresource") != -1) {
          localId = localId.replace("wxlocalresource", "wxLocalResource");
        }
        wx.uploadImage({
          localId: localId,
          isShowProgressTips: 0,
          success: function(res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            var picdata = {
              media_id: serverId
            }
            that.$axios.post('/api/frontend/utils/wxupload', picdata, config)
              .then((res) => {
                if (!res.data.status) {
                  that.data.pics.push(res.data.data);
                } else {
                  that.$toast(res.data.msg);
                }
                if (localIds.length > 0) {
                  syncUpload(localIds);
                }
              });


          }
        });
      }
    },
    checkWeiXin() {
      const ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('micromessenger') != -1;
    },
    submit() {
      let url = '/api/frontend/vote/enroll?casual_activity_id=3';
      for (let item in this.data) {
        if (this.data[item].length == 0) {
          this.apply_flag = false;
          break;
        }else {
          this.apply_flag = true;
        }
      }
      console.log(this.data);
      if (this.apply_flag) {
        axios.post(url, this.data)
          .then((res) => {
            if (res.data.status == 0) {
              this.$message.success('提交成功');
              this.$router.push('/kepu');
            }else {
              this.$message.error(res.data.msg);
            }
          })
      } else {
        this.$message.error('表单不能为空');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
.container {
    background: url("~src/assets/img/kepu/apply/beijin.png");
    background-size: cover;
    overflow: scroll;
}
.form {
    position: relative;
    margin: Rem(70) Rem(25) Rem(25);
    padding: Rem(120) Rem(30) Rem(30);
    background: $color-white;
    .head {
        $length: Rem(150);
        position: absolute;
        left: 50%;
        top: Rem(-50);
        width: $length;
        height: $length;
        margin-left: Rem(-75);
        text-align: center;
        line-height: $length;
        border-radius: 50%;
        background: #7aaa13;
        color: $color-white;
        font-size: Rem(50);
    }
    .input {
        display: flex;
        margin: Rem(20) 0;
        padding: Rem(5);
        border: 1px solid #7aaa13;
        border-radius: Rem(10);
        background: $color-white;
        font-size: Rem(32);
        .name {
            width: Rem(150);
            padding: Rem(5);
            color: #7aaa13;
        }
        input,
        textarea {
            flex: 1;
            border: 0;
            outline: 0;
            background: $color-white;
            padding: Rem(5);
        }
    }
    .change {
      .change-choose{
        display: flex;
        span {
          flex: 1;
          color: #7aaa13;
          font-size: Rem(40);
        }
        img {
          display: inline-block;
          width: Rem(147);
          height: Rem(35);
          margin-top: Rem(10);
        }
      }
      ul {
        margin: 0 auto;
        li{
          display: block;
          width: Rem(630);
          background: #cceb88;
          border-radius: Rem(30);
          margin-top: Rem(20);
          label {
            display: block;
            overflow: hidden;
          }
          input {
            display: none;
            &:checked+label {
                .cercle {
                  img {
                    background: url('~src/assets/img/kepu/apply/checked.png') no-repeat;
                    background-size: cover;
                  }
                }
            }
          }
          .cercle {
            display: inline-block;
            width: Rem(60);
            height: Rem(140);
            margin: Rem(26) Rem(16);
            margin-right: Rem(6);
            float: left;
            img{
              display: inline-block;
              width: Rem(40);
              height: Rem(40);
            }
            span{
              font-size: Rem(36);
              color: #a6cc59;
              font-weight: bold;
            }
          }
          .cercle.users img{
            background: url('http://i4.buimg.com/567571/1cc783764d432484.png') no-repeat;
            background-size: cover;
          }
          .contai{
            display: inline-block;
            width: Rem(516);
            margin-top: Rem(16);
            font-size: Rem(28);
          }
        }
      }
    }


    .upload {
        margin-top: Rem(20);
        padding-left: Rem(5);
        color: $color-pink;
        font-size: Rem(36);
        .upload-box {
            display: flex;
            flex-wrap: wrap;
            .upload-btn {
                width: Rem(140);
                margin-right: Rem(16);
            }
            img {
                width: Rem(140);
                height: Rem(140);
                margin-right: Rem(16);
                margin-bottom: Rem(16);
            }
            .pic-item {
                position: relative;

                .delete {
                    $length: Rem(36);
                    position: absolute;
                    right: 0;
                    top: Rem(-16);
                    width: $length;
                    height: $length;
                    line-height: $length;
                    background: $color-pink;
                    color: $color-white;
                    border-radius: 50%;
                    text-align: center;
                }
            }
        }
    }
    .submit {
        margin-top: Rem(16);
        background: #7aaa13;
        font-weight: bold;
        text-align: center;
        font-size: Rem(50);
        padding: 0;
    }
}

.info {
    width: 75%;
    margin: Rem(20) auto;
    text-align: center;
    color: $color-white;
}
</style>
