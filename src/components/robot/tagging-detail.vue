<template lang="html">
  <div class="tagging-detail">
    <navbar></navbar>
    <div class="tagging-detail-header">
      <div class="td-name">
        <img :src="userList.member&&userList.member.headimg" alt="" class="music">
        <span>{{ userList.member&&userList.member.nickname }}</span>
        <img src="../../assets/img/robot/my-tagging.png" alt="" class="my-taggingimg">
      </div>
      <div class="td-robot">
        <img src="../../assets/img/robot/robot2.png" alt="" class="robotimg">
        <span>智能机器人</span>
        <img src="../../assets/img/robot/robot-tagging.png" alt="" class="robot-taggingimg">
      </div>
    </div>
    <div class="tagging-img">
      <img :src="sectionList.robot_position_img" alt="">
      <img src="../../assets/img/robot/my-tagging.png" :style="{left: position[0]*100 + '%' , top: position[1]*100 + '%'}" alt="" class="my-tagging">
      <img src="../../assets/img/robot/right-tagging.png" alt="" class="robot-tagging" :style="{left:rightPosition[0]*100+'%', top:rightPosition[1]*100+'%'}">
      <div class="tagging-text" :style="{left:rightPosition[0]*100+'%', top:rightPosition[1]*100+'%'}">
        正确答案
      </div>
      <div class="detail-btn"  @click="showDetailMaster = !showDetailMaster">
        <span>病人详情</span>
        <img src="../../assets/img/robot/after.png" :class="[ showDetailMaster ? 'is-rotate' : '', 'after']">
      </div>
      <div v-show="showDetailMaster" class="showDetailMaster"  @click="showDetailMaster = false">
        {{sectionList.description}}
      </div>
    </div>
    <div class="CT-btn" @click="showMaster = true">
      回看CT
    </div>
    <div v-show="showMaster" class="backCT-master">
      <ctimg :img="sectionList.remark_pic"></ctimg>
      <div class="master-btn" @click="showMaster = false">
        返回
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './common/navbar';
import ctimg from './common/ctimg';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      showMaster: false,
      showDetailMaster: false,
      sectionList: [],
      userList: [],
      position: [],
      robotPosition: [],
    }
  },
  created() {
    this.getSectionData();
    this.getUserInfo();
  },
  methods: {
    getSectionData() {
      robot_share();
      this.sectionList = sessionStorage.getItem('ourTagging');
      this.sectionList = JSON.parse(this.sectionList);
      this.position = this.sectionList.answer.position.split(',');
      this.rightPosition = this.sectionList.position.split(',');
    },
    getUserInfo() {
      const url = '/api/frontend/robot_read/person?game_id=1';
      this.$axios.get(url).then((res) => {
        this.userList = res.data.data;
      });
    },
  },
  components: {
    navbar,
    ctimg,
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.tagging-detail{
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
.tagging-detail-header{
  width: Rem(624);
  margin: 0 auto;
  margin-top: Rem(20);
  display: flex;
  justify-content: space-between;
  div{
    width: Rem(300);
    height: Rem(88);
  }
  .td-name, .td-robot{
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: rgba(38,70,124,.7);
    .music,.robotimg{
      width: Rem(70);
      border-radius: 50%;
    }
    span{
      width: Rem(140);
      text-align: left;
      @include ellipsis-single;
    }
    .my-taggingimg{
      width: Rem(50);
    }
    .robot-taggingimg{
      width: Rem(56);
    }
  }
}
.tagging-img{
  position: relative;
  width: Rem(624);
  margin: 0 auto;
  img{
    width:100%;
    margin-top: Rem(20);
  }
  .my-tagging{
    position: absolute;
    width: Rem(70);
    transform: translate(-50%, -50%);
  }
  .robot-tagging{
    position: absolute;
    width: Rem(70);
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
    bottom: Rem(24);
    right: Rem(60);
    font-weight: bold;
    z-index: 1000;
    .after{
      position: absolute;
      width: Rem(26);
      right: Rem(-36);
      top: Rem(-6);
      &.is-rotate{
        transform: rotate(180deg);
      }
    }
  }
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
  padding-top:Rem(200);
  font-weight: bold;
  left: 0;
  z-index: 3000;
  .master-btn{
    position: fixed;
    bottom: Rem(100);
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
  padding: Rem(50);
  line-height: Rem(50);
  font-size: 16px;
  letter-spacing: 2px;
}
</style>
