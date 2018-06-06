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
      <input type="text" name="name" v-model="data.name" placeholder="请输入您的姓名">
    </div>
    <div class="input">
      <div class="name">
        所在医院
      </div>
      <input type="text" name="hospital" v-model="data.hospital" placeholder="请输入您所任职的医院">
    </div>
    <div class="input">
      <div class="name">
        科室
      </div>
      <input type="text" name="department" v-model="data.keshi" placeholder="请输入您所在的科室">
    </div>
    <!-- <div class="input">
      <div class="name">
        主题
      </div>
      <textarea type="text" name="zhicheng" v-model="data.zhicheng" placeholder="最想对患者说的一句话">
            </textarea>
    </div> -->
    <div class="input">
      <div class="name">
        描述
      </div>
      <textarea type="text" name="picdesc" v-model="data.content" placeholder="最想对患者说的一句话">
      </textarea>
    </div>
    <div class="upload">
      <p>上传照片</p>
      <div class="upload-box">
        <div class="upload-btn" v-if="isWeiChat">
          <a @click="wxUpload">
            <img src="../assets/img/apply/upload2.png" alt="上传">
          </a>
        </div>
        <div class="upload-btn" v-else>
          <el-upload action="//yikan-t.oss-cn-hangzhou.aliyuncs.com" :show-upload-list="false" :before-upload="handleBefore" :on-success="handleSuccess" :multiple="true" :data="ext_data">
            <a>
              <img src="../assets/img/apply/upload2.png" alt="上传">
            </a>
          </el-upload>
        </div>
        <div class="pic-item" v-for="item in data.pics">
          <img :src="`http://img.kankanyisheng.com/${item}`" alt="上传">
          <div class="delete" @click="deletePic(item)">
            x
          </div>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">
      提交
    </div>
  </form>
  <div class="info">
    <p>如对本活动有疑问，请咨询工作人员小看</p>
    <p>(微信号/电话:15700057027)</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import get_name from '../utils/getName';

export default {
  name: 'apply',
  data() {
    return {
      data: {
        name: '',
        hospital: '',
        keshi: '',
        content: '',
        pics: [],
        casual_activity_id:'4',
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
    };
  },
  created() {
    this.$wxShare();
    this.getUser();
    this.getData();
    this.isWeiChat = this.checkWeiXin();
  },
  methods: {
    getUser() {
      let url = '/api/frontend/user/userinfo';
      axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            let user = res.data.data.detail;
            console.log(user);
            if (user) {
              this.data.name = user.true_name;
              this.data.hospital = user.hospital;
              this.data.keshi = user.administrative;
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
      let url = '/api/frontend/vote/enroll';
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function(data) {　　
          data = Qs.stringify(data);
          return data;
        }],
      }
      for (let item in this.data) {
        if (this.data[item].length == 0) {
          this.apply_flag = false;
          break;
        }else {
          this.apply_flag = true;
        }
      }
      if (this.apply_flag) {
        axios.post(url, this.data, config)
          .then((res) => {
            if (res.data.status == 0) {
              this.$message.success('提交成功');
              this.$router.push('/zuimei');
            } else if (res.data.status == -3) {
              var smart_url = encodeURIComponent(location.href);
              location.href = '/api/frontend/account/signin?smart_url=' + smart_url;
            } else {
              this.$message.error(res.data.msg);
            }
          })
      } else {
        this.$message.error('表单和图片不能为空');
      }

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/config.scss";

.container {
    // background: url("../assets/img/apply/apply-bg.png");
    background: url("http://img.kankanyisheng.com/yikan-t/20170410/14918098964795010709.png");
    background-size: cover;
    overflow-y: scroll;
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
        background: $color-blue;
        color: $color-white;
        font-size: Rem(50);
    }
    .input {
        display: flex;
        margin: Rem(20) 0;
        padding: Rem(5);
        border: 1px solid $color-blue;
        border-radius: Rem(10);
        background: $color-white;
        font-size: Rem(32);
        .name {
            width: Rem(150);
            padding: Rem(5);
            color: $color-blue;
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
    .upload {
        margin-top: Rem(20);
        padding-left: Rem(5);
        color: $color-blue;
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
                    background: $color-blue;
                    color: $color-white;
                    border-radius: 50%;
                    text-align: center;
                }
            }
        }
    }
    .submit {
        margin-top: Rem(100);
        background: $color-blue;
        text-align: center;
        font-size: Rem(36);
    }
}

.info {
    width: 75%;
    margin: Rem(20) auto;
    text-align: center;
    color: $color-blue;
}
</style>
