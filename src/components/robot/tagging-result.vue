<template lang="html">
  <div class="tagging-result" v-if="rank">
    <navbar></navbar>
    <robotTitle>
      <div slot="result-title">
        <p>真愉快，与你完成一次阅片任务</p>
        <template v-if="isSelf">
          <p v-if="data&&data.answer.is_right == 1">恭喜你，用时{{data&&data.answer.answer_time}}s，标记正确!</p>
          <p v-else>用时{{data&&data.answer.answer_time}}s，但很抱歉，标记错误</p>
        </template>
      </div>
      <music :loops='true' v-if="data&&data.answer.is_right == 1" slot="robot-music" :type="'victory'"></music>
      <music :loops='true' v-else slot="robot-music" :type="'defeated'"></music>
    </robotTitle>
    <div class="result-title">
      <span>总共正确: {{rank.right_num}}次</span>
      <span>总用时: {{rank.answer_time}}秒</span>
      <span>全国排名: {{rank.rank}}</span>
    </div>
    <div class="result-content" v-if="isSelf">
      <div class="test">
        <img :src="data&&data.robot_position_img" alt="" class="test">
        <img src="../../assets/img/robot/my-tagging.png" alt="" class="my-tagging" :style="{left:myPosition[0]*100+'%', top:myPosition[1]*100+'%'}">
        <img src="../../assets/img/robot/right-tagging.png" alt="" class="robot-tagging" :style="{left:rightPosition[0]*100+'%', top:rightPosition[1]*100+'%'}">
        <div class="tagging-text" :style="{left:rightPosition[0]*100+'%', top:rightPosition[1]*100+'%'}">
          正确答案
        </div>
        <div class="detail-btn"  @click="showDetailMaster = !showDetailMaster">
          <span>病人详情</span>
          <img src="../../assets/img/robot/after.png" :class="[ showDetailMaster ? 'is-rotate' : '', 'after']">
        </div>
        <div v-show="showDetailMaster" class="showDetailMaster"  @click="showDetailMaster = false">
          {{data&&data.description}}
          <p v-if="data&&data.result">病理结果:{{data.result}}</p>
        </div>
      </div>
      <div class="content-right">
        <!-- <div class="question">X光</div> -->
        <div class="play">
          <img :src="rank.member.headimg" alt="" class="play-img">
          <div class="play-name">{{rank.member.nickname}}</div>
          <img src="../../assets/img/robot/my-tagging.png" alt="" class="my-tagging">
        </div>
        <div class="play">
          <img src="../../assets/img/robot/robot2.png" alt="" class="play-img">
          <div class="play-name">智能机器人</div>
          <img src="../../assets/img/robot/robot-tagging.png" alt="" class="my-tagging">
        </div>
        <span class="ct-btn" @click="showMaster = true">回看CT</span>
      </div>
      <div v-show="showMaster" class="backCT-master">
        <ctimg :img="data.pic" v-if="data"></ctimg>
        <div class="master-btn" @click="showMaster = false">
          返回
        </div>
      </div>
    </div>
    <img class="result-logo" v-else src="../../assets/img/robot/tagging.png" alt="">
    <div class="result-footer" v-if="isSelf">
      <router-link :to="{ path: '/subject' }">
        <div class="footer-qusetion" v-if="list">我的题库 ({{list.is_answer.length}}/{{list.is_answer.length+list.not_answer.length}})</div>
      </router-link>
      <div class="footer-share">
        <span @click="again">再来一题</span>
        <span @click="showLayer">分享给好友补血</span>
      </div>
    </div>
    <div class="result-footer" v-else>
      <router-link :to="{ path: '/robot' }">
        <div class="footer-qusetion">我也要和机器人一起阅片</div>
      </router-link>
      <div class="footer-qusetion" @click="showLayer">分享给好友</div>
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
      index: 0,
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
    getData() {
      const url = `/api/frontend/robot_read/question_show?question_id=${this.$route.query.id}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
          this.rightPosition = this.data.position.split(',');
          const myPosition = sessionStorage.getItem('position');
          this.myPosition = myPosition.split(',') || this.data.answer.position.split(',');
        }
      });
    },
    getResult(uid) {
      const url = '/api/frontend/robot_read/person?game_id=1';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.rank = res.data.data;
          let title1 = `我与看阅片机器人圆满完成一次合作任务`,
              title2 = `我与看阅片机器人圆满完成一次合作任务，排名全国第${this.rank.rank},你也来试试吧!`,
              desc = `此次合作后,排名全国第${this.rank.rank},你也来试试吧!`,
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
          this.index = this.list.rest_count;
          sessionStorage.setItem('index', this.list.rest_count);
          if(res.data.data.not_answer.length>0) {
            const data = JSON.stringify(res.data.data.not_answer[0]);
            sessionStorage.setItem('answer', data);
          } else {
            const random = Math.round(Math.random()*(res.data.data.is_answer.length-1));
            const data = JSON.stringify(res.data.data.is_answer[random]);
            sessionStorage.setItem('answer', data);
          }
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
      if (this.list.rest_count>0) {
        this.$router.push({path:'/count'});
      } else {
        this.$toast('您已经用完所有次数');
        this.$router.push({path:'/chance'});
      }
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
    checkUser(id) {
      if (this.$route.query.uid && id !== this.$route.query.uid) {
        this.isSelf = false;
        this.getResult(this.$route.query.uid);
      } else {
        this.getData();
        this.getResult();
        this.getList();
      }
    }
  },
  created() {
    this.index = sessionStorage.getItem('index');
    this.getUser();
    // if (this.$route.query.id) {
    //   this.isSelf = false;
    //   this.getResult(this.$route.query.id);
    // } else {
    //   this.getData();
    //   this.getResult();
    // }
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
</style>
