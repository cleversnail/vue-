<template lang="html">
  <div class="tagging-result" v-if="rank&&list">
    <navbar></navbar>
    <div class="result-title">
      <span>总答对: {{rank.right_question_nums}}道题</span>
      <span>总用时: {{rank.answer_times}}秒</span>
      <span>全国排名: {{rank.rank}}</span>
    </div>
    <div class="user">
      <div>
        <img :src="rank.member.headimg" alt="" class="user__headimg">
        <div class="user__name">{{rank.member.nickname}}</div>
      </div>
      <div class="user__cont">
        <p>我在[医看]答题大赛中遇到困难！</p>
        <p>请点击下面按钮帮我补补血吧！</p>
      </div>
    </div>
    <div class="result-footer">
      <img src="~assets/img/dissection/blood.png" class="footer-qusetion" @click="blood" alt="">
      <router-link :to="{ name: 'dissectionHome', }">
        <img class="footer-join" src="~assets/img/dissection/join.png" alt="">
      </router-link>
    </div>
    <div class="blood-box">
      <img class="blood-user" :src="item.member.headimg" alt="" v-for="item in list.like_list">
    </div>
    <!-- <div class="layer" @click="hideLayer" v-show="layerShow">
      <img class="layer-img" src="../../assets/img/robot/share.png" alt="">
    </div> -->
    <share v-show="layerShow" @hide="hideLayer"></share>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="../../assets/img/robot/focus_code.jpg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>即可为TA补血</p>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './common/navbar';
import share from '../robot/common/share';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      showMaster: false,
      showDetailMaster: false,
      layerShow: false,
      isShow: false,
      isSelf: true,
      data: null,
      rank: null,
      list: null,
      user: null,
      position: [],
      rightPosition: [],
      myPosition: [],
    }
  },
  components: {
    navbar,
    share,
  },
  methods: {
    getResult(uid) {
      const url = '/api/frontend/dissect_game/person';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.rank = res.data.data;
          let title1 = '［医看］全国影像解剖有奖大赛',
              title2 = `我参与［医看］影像解剖有奖大赛中遇到困难，快给我补血吧！`,
              desc = `快给我补血吧！我要拿图书奖励！`,
              link = `${location.origin}/active_web/#/dissection/blood?uid=${this.rank.member.id}`;
          robot_share(title1, title2, desc, link);
        }
      });
    },
    getList(to_uid) {
      const url = '/api/frontend/dissect_game/question';
      const params = {
        to_uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.list = res.data.data;
        }
      })
    },
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
    hide() {
      this.isShow = false;
    },
    blood() {
      if (this.user.subscribe == 0) {
        this.isShow = true;
      }
      const url = `/api/frontend/dissect_game/like/${this.$route.query.uid}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          location.reload(true);
        } else {
          this.$toast(res.data.msg);
        }
      })
    },
    getUser() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
        }
      })
    },
  },
  created() {
    const uid = this.$route.query.uid;
    this.getResult(uid);
    this.getList(uid);
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.user {
  display: flex;
  margin: Rem(10) Rem(50);
  padding: Rem(25);
  background-color: rgba(38, 70, 124, 0.7);
  text-shadow: 0px 2px 6.96px rgba(0, 0, 0, 0.66);
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid #0373ff;
  &__headimg {
    width: Rem(80);
    height: Rem(80);
    border-radius: 50%;
  }
  &__cont {
    padding-top: Rem(20);
    flex-grow: 1;
    text-align: center;
  }
}
.tagging-result{
  @extend %fullpage;
  background: url('~assets/img/dissection/bg.png') no-repeat;
  background-size: cover;
  text-align: center;
  position: relative;
  color:#fff;
}
.result-title{
  text-shadow: 0px 2px 6.96px rgba(0, 0, 0, 0.66);
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  margin: Rem(40) 0;
}
.result-content{
  margin: 0 Rem(45);
  min-height: Rem(380);
  div{
    margin-bottom: Rem(10);
  }
  &::after{
    content: '';
    display: block;
    clear: both;
  }
  .test{
    width: Rem(440);
    float: left;
    position: relative;
    img{
      width: 100%;
    }
    .my-tagging{
      position: absolute;
      width: 30px;
      transform: translate(-50%, -50%);
    }
    .robot-tagging{
      position: absolute;
      width: 30px;
      transform: translate(-50%, -50%);
    }
    .tagging-text {
      position: absolute;
      color: #78DB59;
      font-size: 10px;
      transform: translate(-20px, -30px);
    }
    .detail-btn{
      position: absolute;
      bottom: Rem(14);
      right: Rem(60);
      font-weight: bold;
      z-index: 1;
      .after{
        position: absolute;
        width: Rem(26);
        right: Rem(-30);
        top: Rem(13);
        &.is-rotate{
          transform: rotate(180deg);
        }
      }
    }
  }
  .content-right{
    width: Rem(200);
    float: right;
    .question{
      @extend %btn;
      height: Rem(52);
      line-height: Rem(54);
      font-size: 14px;
    }
    .play{
      @extend %btn;
      height: Rem(200);
      line-height: normal;
      padding: Rem(20);
      box-sizing: border-box;
      .play-img{
        width: Rem(66);
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }
      .play-name{
        font-size: 12px;
      }
      .my-tagging{
        width: Rem(50);
        float: left;
      }
    }
    .ct-btn{
      @extend %btn;
      display: inline-block;
      width:Rem(200);
      box-sizing: border-box;
      height: Rem(84);
      line-height: Rem(84);
    }
  }
}
.showDetailMaster{
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.8);
  position: absolute;
  top: 0;
  font-weight: bold;
  left: 0;
  text-align: left;
  box-sizing: border-box;
  padding: Rem(30);
  line-height: Rem(36);
  font-size: 12px;
  letter-spacing: 2px;
}
.CT-btn{
  width: Rem(624);
  margin:  Rem(20) auto;
  @extend %btn;
}
.backCT-master{
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,.8);
  position: fixed;
  top:0;
  padding-top:Rem(150);
  font-weight: bold;
  left: 0;
  z-index: 3000;
  .master-btn{
    position: fixed;
    bottom: Rem(150);
    left: 50%;
    transform: translateX(-50%);
    width: Rem(266);
    height: Rem(80);
    line-height: Rem(80);
    border: 1px solid #fff;
    text-align: center;
    font-weight: bold;
  }
}
.result-footer{
  .footer-qusetion{
    width: Rem(620);
    margin: Rem(40) auto Rem(20);
    color: #fff;
  }
  .footer-join {
    width: Rem(620);
    margin: Rem(20) auto;
  }
  .footer-share{
    display: flex;
    justify-content: space-between;
    width: Rem(620);
    margin: Rem(20) auto;
    span{
      @extend %btn;
      display: inline-block;
      width: Rem(290);
      a {
        color: #fff;
      }
    }
  }
}
.tuixiang{
  margin-top:Rem(40);
  @extend %tx;
}
.result-logo {
  width: 100%;
}
.layer {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.7);
  z-index: 2;
  &-img {
    width: 80%;
    margin-left: 20%;
  }
 }
 .copyright {
   margin-bottom: Rem(40);
 }
 .blood-box {
   display: flex;
   flex-wrap: wrap;
   margin: Rem(10) Rem(60);
   min-height: Rem(380);
 }
 .blood-user {
   width: Rem(80);
   height: Rem(80);
   margin-left: Rem(40);
   border-radius: 50%;
 }

 .master-weixin{
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color:rgba(0,0,0,.8);
 }
 .wexin-box {
   position: absolute;
   left: 50%;
   top: 50%;
   width: Rem(600);
   transform: translate(-50%, -50%);
   color: #fff;
   letter-spacing: 4px;
 }
 .wexin-code {
   width: Rem(360);
   margin-bottom: Rem(20);
 }
 .wexin-yk {
   color: #fa6852;
 }
</style>
