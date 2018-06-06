<template lang="html">
  <div class="page">
    <div class="header">
      <div class="header-btn">
        <div :class="{'is-select': type == 'x'}" @click="toogeClass('x')">DR诊断</div>
        <div :class="{'is-select': type == 'ct'}" @click="toogeClass('ct')">CT诊断</div>
        <div :class="{'is-select': type == 'mr'}" @click="toogeClass('mr')">MR诊断</div>
      </div>
      <div class="header-input">
        <textarea v-model="texvalue" name="name" placeholder="请详细输入影像所见，智能机器人会根据描述给出诊断参考意见..."></textarea>
      </div>
      <div class="btn-resute">
        <div @click="getData">智能诊断分析</div>
      </div>
    </div>
    <div class="content">
      <ul v-if="this.list.length > 0">
        <li class="positions">
          <div class="shu"></div>
          <div class="opinion"><em>参考意见</em><span>(不作为临床使用)</span></div>
        </li>
        <li v-for="(item,index) in list">
          <div>
            考虑{{index+1}} : {{item.impression}}
          </div>
        </li>
      </ul>
      <ul v-else-if="this.list.length == undefined || isShow">
        <div class="tac">
          请输入正确的影像所见
        </div>
      </ul>
    </div>
    <div class="footer">
      医众提供技术支持 ——
      <img src="../../assets/img/medical/house.png" alt="">
      <span @click="goHome"> 医看主页</span>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import readShare from '../../utils/read_share';

export default {
  data() {
    return {
      introduction: '',
      texvalue: '',
      type: 'x',
      list: [],
      isShow: false,
      isrenzheng: '',
    }
  },
  created() {
    this.getUser();
    document.querySelector('title').innerHTML = '医看－智能医学影像－语义分析';
  },
  methods: {
    getUser() {
      const urlinfo = `/api/frontend/user/userinfo`;
      this.$axios.get(urlinfo).then((res) => {
        this.isrenzheng = res.data.data.detail.isrenzheng;
        let title1 = '来「医看」人工智能语义分析专区，为您的诊断保驾护航！',
          title2 = '来「医看」人工智能语义分析专区，为您的诊断保驾护航！',
          desc = '输入影像所见，智能机器人帮你诊断！诚邀您体验全新AI诊断技术~',
          url1 = `${location.href}`,
          img = `https://ooo.0o0.ooo/2017/06/30/59563ec560d8b.png`;
        readShare(title1, title2, desc, url1, img);

      })
    },
    goHome() {
      location.href = '/';
    },
    toogeClass(data) {
     this.type = data;
    },
    getData() {
      if(this.isrenzheng <= 0) {
        MessageBox({
          title: '提示',
          message: '医看认证用户才可以体验',
          showCancelButton: true,
          confirmButtonText: '去认证'
        }).then((res) => {
          if(res == 'confirm') {
            location.href = '/muke/#/identificate';
          }
        })
        return;
      }
      const url = `/api/frontend/index/diagnosis`;
      this.$axios.post(url,{
        type: this.type,
        findings: this.texvalue,
      }).then((res) => {
        this.list = res.data.data;
        if(this.list.length == 0) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .page{
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-color: #F4F5F6;
  }
  .tac{
    text-align: center;
  }
  .header{
    .header-btn{
      div{
        width: 33.33%;
        height: Rem(100);
        line-height: Rem(100);
        text-align: center;
        float: left;
      }
      .is-select{
        border-bottom: 1px solid red;
      }
    }
    .header-input{
      textarea{
        width: 99%;
        height: Rem(300);
        border: none;
        padding: Rem(40);
        box-sizing: border-box;
        &:focus{
          outline:none;
        }
      }
    }
    .btn-resute{
      height: Rem(140);
      line-height: Rem(140);
      text-align: center;
      background-color: #F4F5F6;
      div{
        display: inline-block;
        width: Rem(660);
        height: Rem(90);
        line-height: Rem(90);
        background-color: #EA7D5C;
        border-radius: Rem(5);
        color: #fff;
        font-size: Rem(36);
      }
    }
  }
  .content{
    min-height: Rem(600);
    li{
      min-height: Rem(100);
      line-height: Rem(100);
      border-bottom: 1px solid #F3F4F5;
      background-color: #fff;
      .opinion{
        margin-left: Rem(40);
      }
      span{
        color: #919CA6;
      }
      div{
        margin-left: Rem(20);
      }
    }
    .positions{
      position: relative;
      .shu{
        position: absolute;
        display: inline-block;
        height: 100%;
        left: Rem(-20);
        width: 6px;
        background-color: #EA7D5C;
      }
    }
  }
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: Rem(120);
    line-height: Rem(120);
    background-color: #F4F5F6;
    color: #CED2D7;
    text-align: center;
    img{
      width: Rem(26);
      margin-bottom: Rem(10);
      margin-right: Rem(-40);
    }
    span{
      color: #62A9F5;
      border-bottom: 1px solid #62A9F5;
      padding-left: Rem(40);
      font-size: Rem(26);
    }
  }
</style>
