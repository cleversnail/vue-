<template lang="html">
  <div class="subdetail">
    <div class="page">
      <div class="header">
        <div class="mysubs">
          <router-link :to="{path: 'contribution'}">
            <img src="../../assets/img/submission/subdetail/goback.png" alt="">
          </router-link>
        </div>
      </div>
      <div class="content">
        <img src="../../assets/img/submission/subdetail/xianqin.png" alt="">
        <div class="btn">
          <div class="friend" @click="share">
            邀请好友参加
          </div>
          <div class="su"></div>
          <div class="me">
            <router-link :to="{path: 'contribute'}">
              <a>我也要参加</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    share() {
      this.$toast('点击右上角分享');

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .subdetail,.page{
    width: 100%;
    height: 100%;
  }
  .header{
    height: Rem(540);
    background: url('../../assets/img/submission/subdetail/bgc.png') no-repeat;
    background-size: cover;
    .mysubs{
      position: fixed;
      top: Rem(50);
      right: Rem(50);
      z-index: 2000;
      img{
        width: Rem(120);
      }
    }
  }
  .content{
    img{
      width: 100%;
      margin-bottom: Rem(70);
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
