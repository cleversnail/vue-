<template lang="html">
  <div class="robot" v-if="data">
    <navbar></navbar>
    <div class="chance">
      <router-link :to="{ path: '/chance' }">今日剩余机会:{{data.rest_count}}次</router-link>
    </div>
    <music class="musicPosition" :type="'homeMusic'"></music>
    <img class="sanjiao" src="../../assets/img/robot/sanjiao.png" alt="">
    <img src="../../assets/img/robot/robot.png" alt="" class="robotimg">
    <div class="tagging" @click="go">和推想AI一起标注结节</div>
    <div class="tagging" @click="goSubject">我的题库 ({{data.is_answer.length}}/{{data.is_answer.length+data.not_answer.length}})</div>
    <copyright></copyright>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="../../assets/img/robot/guanzhu.png" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>即可体验阅片机器人</p>
      </div>
    </div>
    <register :show.sync="dialogVisible" @hide="hideDialog"></register>
  </div>
</template>

<script>
import navbar from './common/navbar';
import music from './common/music';
import copyright from './common/copyright';
import register from './common/register';
import robot_share from '../../utils/robot_share';
export default {
  data() {
    return {
      data: null,
      isShow: false,
      dialogVisible: false,
      notRegister: false,
    }
  },
  components: {
    navbar,
    music,
    copyright,
    register
  },
  methods: {
    go() {
      if (this.user.subscribe === 1) {
        if (this.notRegister) {
          this.dialogVisible = true;
        } else if (this.data.rest_count>0) {
          this.$router.push({path:'/count'});
        } else {
          this.$toast('您已经用完所有次数');
          this.$router.push({path:'/chance'});
        }
      } else {
        this.isShow = true;
      }
    },
    goSubject() {
      if (this.user.subscribe === 1) {
        if (this.notRegister) {
          this.dialogVisible = true;
        } else {
          this.$router.push({path:'/subject'});
        }
      } else {
        this.isShow = true;
      }
    },
    getData() {
      const url = '/api/frontend/robot_read/question?game_id=1';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
          if(res.data.data.not_answer.length>0) {
            const data = JSON.stringify(res.data.data.not_answer[0]);
            sessionStorage.setItem('answer', data);
          } else {
            const random = Math.round(Math.random()*(res.data.data.is_answer.length-1));
            const data = JSON.stringify(res.data.data.is_answer[random]);
            sessionStorage.setItem('answer', data);
          }
          sessionStorage.setItem('index', this.data.rest_count);
        } else if(res.data.status === -2){
          this.data = res.data.data;
          this.dialogVisible = true;
          this.notRegister = true;
        }
      });
    },
    getUser() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        robot_share();
        if (res.data.status === 0) {
          this.user = res.data.data;
          const user = JSON.stringify(this.user);
          sessionStorage.setItem('user', user);
        }
      })
    },
    hide() {
      this.isShow = false;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
  },
  created() {
    this.getData();
    this.getUser();
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.musicPosition{
    position: absolute;
    right: Rem(14);
    top: Rem(126);
}
.robot {
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/robot/bgc.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    overflow: scroll;
    background-attachment: fixed;
    .sanjiao {
        width: Rem(640);
    }
    .robotimg {
        width: Rem(136);
        margin-top: Rem(10);
    }
    .tagging {
        width: Rem(460);
        margin: Rem(50) auto 0;
        color: #fff;
        @extend %btn;
    }
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
.chance {
  text-align: left;
  padding: Rem(40) Rem(20);
  a {
    color: #0373ff;
    text-decoration: underline;
  }
}
</style>
