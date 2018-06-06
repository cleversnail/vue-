<template lang="html">
  <div class="robot-rank">
    <navbar></navbar>
    <div class="rank-header">
      <img src="../../assets/img/robot/robot.png" alt="" class="robotimg">
      <img src="../../assets/img/robot/rank-img.png" alt="" class="detail-img">
      <img  @click="goRobot" src="../../assets/img/robot/home-btn.png" alt="" class="home-img">
    </div>
    <p class="time-over">排行截止日期 8 月 20 日 15:00</p>
    <div class="rank-content">
      <div class="rank-fixed">
        <span class="rank-num">{{ userList.rank }}</span>
        <img :src="userList.member&&userList.member.headimg" alt="" class="play">
        <span class="rank-name">{{userList.member&&userList.member.nickname}}</span>
        <span class="right_num">正确{{ userList.right_num }}次</span>
        <span class="rank-time">总用时 {{ userList.answer_time }}秒</span>
      </div>
      <ul>
        <li v-for="item in dataList" class="rank-list">
          <span class="rank-num">{{ item.rank }}</span>
          <img :src="item.member.headimg" alt="" class="play">
          <span class="rank-name">{{ item.member&&item.member.nickname }}</span>
          <span class="right_num">正确{{ item.right_num }}次</span>
          <span class="rank-time">总用时 {{ item.answer_time }}秒</span>
        </li>
        <li class="loader-more" @click="load">点击加载更多...</li>
      </ul>
    </div>
    <div v-if="isMine" class="rank-footer" @click="showLayer">
      分享给好友,晒出我的排名
    </div>
    <div v-else class="rank-footer" @click="goRobot">
      我也要和机器人一起阅片
    </div>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import share from './common/share';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      userList: [],
      dataList: [],
      layerShow: false,
      isMine: true,
      page: 1,
      status: true,
    }
  },
  components: {
    navbar,
    share,
  },
  created() {
    const id = this.$route.query.id;
    this.getData();
    this.getUserInfo(id);
  },
  methods: {
    goRobot() {
      this.$router.push({path: '/robot'});
    },
    getUserInfo(uid) {
      const url = '/api/frontend/robot_read/person?game_id=1';
      const params = {
        uid,
      }
      this.$axios.get(url, {params}).then((res) => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
          let title1 = `[医看]全国智能标注排行榜新鲜出炉`,
              title2 = `我在[医看]全国智能标注排行榜中排行第${this.userList.rank}!你也来挑战吧!`,
              desc = `我在[医看]全国智能标注排行榜中排行第${this.userList.rank}!你也来挑战吧!`,
              link = `${location.href}?id=${this.userList.member.id}`;
              robot_share(title1, title2, desc, link);
        }
      });
    },
    getData() {
      const url = `/api/frontend/robot_read/result?game_id=1&page=${this.page}&limit=10`;
      this.$axios.get(url).then((res) => {
        this.dataList = this.dataList.concat(res.data.data.data);
        if (res.data.data.data.length < 10) {
          this.status = false;
        }
      });
    },
    getUser() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          if(this.$route.query.id&&this.$route.query.id !== this.user.detail.id) {
            this.isMine = false;
          }
          const user = JSON.stringify(this.user);
          sessionStorage.setItem('user', user);
        }
      })
    },
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
    load () {
      if (this.status === true) {
        this.page ++;
        this.getData();
        this.$toast({
          message:'加载完成',
          position: 'middle',
          duration:800
        });
      } else {
        this.$toast('没有更多数据了');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .play{
    border-radius: 50%;
  }
  .right_num{
    width: Rem(120);
    text-align: left;
  }
  .robot-rank{
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/robot/bgc1.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    color: #fff;
    .rank-header{
      margin-top: Rem(30);
      margin-bottom: Rem(30);
      .robotimg{
        width: Rem(136);
      }
      .detail-img{
        width: Rem(444);
      }
      .home-img{
        width: Rem(106);
      }
    }
  }
  .rank-content{
    width: Rem(700);
    margin: 0 auto;
    background-color: #fff;
    color:#000;
    border-radius: 5px;
    .rank-num{
      display: inline-block;
      width: Rem(48);
      text-align: center;
    }
    .rank-name{
      display: inline-block;
      width: Rem(160);
      text-align: left;
      @include ellipsis-single;
    }
    .rank-time{
      display: inline-block;
      width: Rem(168);
      text-align: left;
    }
    .rank-fixed{
      height: Rem(110);
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fff;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      box-shadow: 0px 4px 10px #e8e8e8;
      font-size: 14px;
      img{
        width: Rem(70);
      }
    }
    ul{
      overflow: scroll;
      height: 70vh;
      margin-top:Rem(4);
      font-size: 14px;
      .rank-list{
        height: Rem(110);
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        img{
          width: Rem(70);
        }
      }
    }
  }
  .rank-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    height: Rem(116);
    width: 100%;
    background-color: #2881e5;
    line-height: Rem(116);
  }
  .loader-more {
    height: Rem(100);
    line-height: Rem(100);
    padding-bottom: Rem(150);
  }
  .time-over{
    padding: Rem(10);
  }
</style>
