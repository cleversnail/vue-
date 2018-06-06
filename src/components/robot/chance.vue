<template lang="html">
  <div class="tagging-result" v-if="rank&&list">
    <navbar></navbar>
    <robotTitle>
      <div slot="result-title">
        <p>让好友为您补血,获得阅片机会!</p>
      </div>
      <music :loops='true' slot="robot-music" :type="'homeMusic'"></music>
    </robotTitle>
    <div class="result-title">
      <span>总共正确: {{rank.right_num}}次</span>
      <span>总用时: {{rank.answer_time}}秒</span>
      <span>全国排名: {{rank.rank}}</span>
    </div>
    <div class="result-title">
      <div>
        今日剩余次数：{{list.rest_count}}次
      </div>
    </div>
    <div class="blood-box">
      <div class="blood-user" v-for="(item, index) in list.like_list">
        <img  :src="item.member.headimg" alt="">
        <div class="blood-layer" v-if="expend(index)">
          已用
        </div>
      </div>
    </div>
    <div class="result-footer">
      <div class="footer-qusetion" @click="showLayer">分享给好友补血</div>
      <div class="footer-share">
        <span @click="again">再来一题</span>
        <span @click="goSubject" v-if="list">我的题库 ({{list.is_answer.length}}/{{list.is_answer.length+list.not_answer.length}})</span>
      </div>
    </div>
    <copyright></copyright>
    <!-- <div class="layer" @click="hideLayer" v-show="layerShow">
      <img class="layer-img" src="../../assets/img/robot/share.png" alt="">
    </div> -->
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import robotTitle from './common/robot-title';
import ctimg from './common/ctimg';
import share from './common/share';
import music from './common/music';
import copyright from './common/copyright';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      showMaster: false,
      showDetailMaster: false,
      layerShow: false,
      isSelf: true,
      data: null,
      rank: null,
      list: null,
      position: [],
      rightPosition: [],
      myPosition: [],
    }
  },
  components: {
    navbar,
    robotTitle,
    ctimg,
    share,
    music,
    copyright,
  },
  methods: {
    getResult(uid) {
      const url = '/api/frontend/robot_read/person?game_id=1';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.rank = res.data.data;
          let title1 = `一键帮ta补血～`,
              title2 = `${this.rank.member.nickname}在与［医看］阅片机器人标注结节任务中遇到困难，快来帮ta一把～`,
              desc = `${this.rank.member.nickname}在与［医看］阅片机器人标注结节任务中遇到困难，快来帮ta一把～`,
              link = `${location.origin}/active_web/#/blood?uid=${this.rank.member.id}`;
          robot_share(title1, title2, desc, link);
        }
      });
    },
    getList() {
      const url = '/api/frontend/robot_read/question?game_id=1';
      this.$axios.get(url).then((res) => {
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
    again() {
      if (this.list.not_answer.length>0) {
        this.$router.push({path:'/count'});
      } else {
        this.$toast('您已经答完所有题目');
      }
    },
    goSubject() {
      this.$router.push({path:'/subject'});
    },
    getUser() {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        this.checkUser(user.detail.id);
      } else {
        const url = '/api/frontend/user/userinfo';
        this.$axios.get(url).then((res) => {
          if (res.data.status === 0) {
            this.userInfo = res.data.data;
            this.checkUser(this.userInfo.detail.id);
            const userInfo = JSON.stringify(this.userInfo);
            sessionStorage.setItem('user', userInfo);
          }
        });
      }
    },
    expend(index) {
      const length = this.list.like_list.length;
      const count = this.rest_count;
      if (count>length) {
        return false;
      } else {
        return index<(length-count);
      }
    },
  },
  created() {
    this.getList();
    this.getResult();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.tagging-result{
  width: 100%;
  height: 100vh;
  background: url('../../assets/img/robot/bgc1.png') 0 0 no-repeat;
  background-size: cover;
  text-align: center;
  position: relative;
  color:#fff;
  overflow: scroll;
  background-attachment: fixed;
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
    @extend %btn;
    width: Rem(620);
    margin: Rem(40) auto;
    color: #fff;
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
 .blood-box {
   display: flex;
   flex-wrap: wrap;
   margin: Rem(10) Rem(60);
   min-height: Rem(380);
 }
 .blood-user {
   position: relative;
   width: Rem(80);
   height: Rem(80);
   margin-left: Rem(40);
   border-radius: 50%;
   overflow: hidden;
   img {
     width: 100%;
     height: 100%;
   }
 }
 .blood-layer {
   position: absolute;
   left: 0;
   top: 0;
   right: 0;
   bottom: 0;
   background: rgba(0,0,0,.7);
   display: flex;
   justify-content: center;
   align-items: center;
 }
</style>
