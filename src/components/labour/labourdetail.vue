<template lang="html">
  <div class="page">
    <div class="header">
      <img src="../../assets/img/labour/detail/header.png" alt="">
      <router-link :to="{path:'labourIndex'}">
        <div class="goback">活动主页</div>
      </router-link>
    </div>

    <div class="content">
      <img src="../../assets/img/labour/detail/page.png" alt="">
    </div>
    <div class="btn">
      <div class="friend" @click="share">
        邀请好友参加
      </div>
      <div class="su"></div>
      <div class="me">
        <a @click="tomine" v-if="isrenzheng>0 && subscribe==1" >去我的主页</a>
        <a @click="tooge" v-else>我也要参加</a>
      </div>
    </div>
    <div class="masker" @click="showMaster = !showMaster" v-show="showMaster">
      <div class="masker-sao">
        <span>扫码关注医看 参与赢pad！</span>
        <img class="sys" src="../../assets/img/labour/index/saoyisao.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guanZhu: true,
      showMaster: false,
      subscribe: 0,
      isrenzheng: 0,
      mineId: 0,
    }
  },
  created() {
    this.isGuanZhu();
    let title1 = '「医看」5.1劳模医生人气大比拼';
    let title2 = '「医看」5.1劳模医生人气大比拼，赚粉丝，得大奖！';
    let desc = '参加医看有奖活动，赢平板电脑！';
    let url = location.href;
    this.$kepuShare(title1,title2,desc,url);
  },
  methods: {
    share() {
      this.$toast('请点击右上角分享');
    },
    // 判断是否关注 我的个人信息 认证信息等
    isGuanZhu() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        this.mineId = res.data.data.detail.id;
        // subscribe  判断是否关注  关注了就去认证 未关注就扫码
        this.subscribe = res.data.data.subscribe;
        this.isrenzheng = res.data.data.detail.isrenzheng;
      });
    },
    // 未关注 则关注后去认证
    tooge() {
      if(this.subscribe == 0){
        this.showMaster = true;
      } else {
        location.href = 'http://community.kankanyisheng.com/muke/#/identificate?type=2';
      }
    },
    tomine() {
      location.href = `https://community.kankanyisheng.com/#/otherInfo/${this.mineId}`
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .header{
    .goback{
      position: fixed;
      top: Rem(300);
      right: Rem(30);
      width: Rem(91);
      height: Rem(91);
      padding: Rem(16);
      font-size: Rem(26);
      line-height: 1.2;
      border-radius: 50%;
      background-color: #fff;
      color: #428DE0;
      text-align: center;
      font-weight: bold;
      border: 1px solid #F47014;
      z-index: 1000;
      box-sizing: border-box;
    }
  }
  .masker{
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #000;
    .masker-sao{
      width: Rem(550);
      height: Rem(550);
      margin: 50% auto;
      background-color: #fff;
      border-radius: 8%;
      span{
        display: block;
        height: Rem(100);
        line-height: Rem(100);
        font-size: Rem(36);
        border-bottom: 1px solid #000;
      }
      img{
        width: 70%;
        transform: translateY(4%);
      }
    }
  }
  .page{
    width: 100%;
    .header{
      position:fixed;
      top:0;
      img{
        width: 100%;
      }
    }
    .content{
      img{
        width: 100%;
        margin-bottom: Rem(70);
        margin-top:Rem(420);
      }
    }
    .btn{
      display: flex;
      align-items: center;
      height: Rem(100);
      justify-content: center;
      color: #F1840B;
      font-size: Rem(33);
      border-top: 1px solid  #E5E5E5;
      position: fixed;
      bottom: 0;
      width: 100%;
      background:#fff;
      .su{
        height: Rem(70);
        line-height: Rem(70);
        border-left: 1px solid #E5E5E5;
        margin: 0 Rem(100);
      }
      .me{
        a{
          color: #F1840B;
        }
      }
    }
  }
</style>
