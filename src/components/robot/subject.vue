<template lang="html">
  <div class="subject" v-if="userList">
    <navbar></navbar>
    <div class="subject-title">
      <div class="my-info">
        <img :src="userList.member&&userList.member.headimg" alt="">
        <p v-if="userList.member">
          {{userList.member.nickname }}({{userList.enroll_member.name}})
          <span class="last">剩余次数:{{data.rest_count}}次</span>
        </p>
        <div>我与机器人共同阅片<span>{{ data.is_answer&&data.is_answer.length}}</span>次，正确<span>{{ userList.right_num }}</span>次</div>
      </div>
      <router-link :to="{ path:'/robot' }">
        <img src="../../assets/img/robot/home-btn.png" alt=""  class="home-img">
      </router-link>
    </div>
    <div class="subject-content">
      <ul>
        <li>
          <p v-if="data.is_answer&&data.not_answer">我的题库({{data.is_answer.length}}/{{data.not_answer.length+data.is_answer.length}})</p>
        </li>
        <li v-for="(item, index) in answerList" class="rightLi">
          <span>{{index+1}}题</span>
          <span>{{item.level}}级</span>
          <span>{{item.answer.answer_time || 0}}S</span>
          <span v-if="item.answer.is_right == 1">正确</span>
          <span v-else class="errors">错误</span>
          <div class="li-btn" @click="goDetail(item)">查看标注</div>
          <div class="li-btn li-btn2" :class="{'is-disalbed': data.rest_count == 0}" @click="goGame(item)">去标注</div>
        </li>
        <li v-for="(item, index) in not_answerList">
          <span>{{index+answerList.length+1}}题</span>
          <span>{{item.level}}级</span>
          <span>{{item.answer.answer_time || 0}}S</span>
          <span>未答</span>
          <div class="li-btn is-disalbed">查看标注</div>
          <div class="li-btn li-btn2" :class="{'is-disalbed': data.rest_count == 0}" @click="goGame(item)">去标注</div>
        </li>
      </ul>
    </div>
    <div class="subject-footer" @click="showLayer" v-if="isMine">
      分享给好友,晒出我的题库
    </div>
    <div class="subject-footer" @click="goRobot" v-else>
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
      answerList: [],
      not_answerList: [],
      data: {},
      layerShow: false,
      isMine: true,
    }
  },
  methods: {
    goRobot() {
      this.$router.push({path: '/robot'});
    },
    goDetail(item) {
      const data = JSON.stringify(item);
      sessionStorage.setItem('ourTagging', data);
      this.$router.push({ path: '/taggingDetail'});
    },
    goGame(item) {
      if (this.data.rest_count>0) {
        const data = JSON.stringify(item);
        sessionStorage.setItem('answer', data);
        this.$router.push({ path: '/count'});
      } else {
        this.$toast('剩余次数已经用完');
        this.$router.push({path:'/chance'});
      }
    },
    getUserInfo(uid) {
      const url = '/api/frontend/robot_read/person?game_id=1';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
          let title1 = `我在[医看]与机器人共阅片${this.data.is_answer&&this.data.is_answer.length}次,这是我们的荣耀!`,
              title2 = `我在[医看]与机器人共阅片${this.data.is_answer&&this.data.is_answer.length}次,这是我们的荣耀!`,
              desc = '你也来挑战吧!',
              link = `${location.href}?id=${this.userList.member.id}`;
              robot_share(title1, title2, desc, link);
        }
      });
    },
    getData(to_uid) {
      const url = '/api/frontend/robot_read/question?game_id=1';
      const params = {
        to_uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.answerList = res.data.data.is_answer;
          this.not_answerList = res.data.data.not_answer;
          this.data = res.data.data;
        }
      })
    },
    getUser() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          if(this.$route.query.id&&this.$route.query.id !== this.user.detail.id) {
            this.isMine = false;
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
  },
  created() {
    const id = this.$route.query.id;
    this.getData(id);
    this.getUserInfo(id);
    this.getUser();
  },
  components: {
    navbar,
    share,
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .errors{
    color: red;
  }
  .rightLi{
    color: #03daa2;
  }
  .subject{
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
  .subject-title{
    position: relative;
    .my-info{
      padding:Rem(42) Rem(42);
      text-align: left;
      img{
        width: Rem(90);
        float: left;
        border-radius: 50%;
        margin-right: Rem(24);
      }
      div{
        color: #64caf4;
        span{
          color:#f4e54b;
        }
      }
    }
    .home-img{
      position: absolute;
      width: Rem(106);
      right: Rem(42);
      top: Rem(10);
    }
  }
  .subject-content{
    width: Rem(700);
    height: 80vh;
    margin: 0 auto;
    background-color: #fff;
    color:#000;
    border-radius: 5px;
    overflow: scroll;
    ul{
      li{
        height: Rem(90);
        line-height: Rem(74);
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        p{
          font-size: 16px;
        }
        .li-btn{
          width: Rem(120);
          height: Rem(50);
          line-height: Rem(50);
          border: 1px solid #70eaca;
          &.is-disalbed {
            border: 1px solid #ddd;
            color: #ddd;
          }
        }
        .li-btn2{
          border: 1px solid #88CEF1;
          color: #64caf4;
        }
      }
    }
  }
  .subject-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    height: Rem(116);
    width: 100%;
    background-color: #2881e5;
    line-height: Rem(116);
  }
  .last {
    float: right;
    margin-right: Rem(120);
  }
</style>
