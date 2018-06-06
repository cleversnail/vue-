<template lang="html">
  <div class="home" v-if="data">
    <navbar></navbar>
    <div class="main">
      <img class="main__img" src="~assets/img/dissection/index.png" alt="">
      <router-link :to="{name: 'dissectionChance'}" class="chance">今日剩余机会：{{data.rest_count}}次</router-link>
      <a class="main__start" @click="goAnswer">
        <img class="btn" src="~assets/img/dissection/start.png" alt="">
      </a>
      <div class="main__btns">
        <router-link :to="{name:'dissectionLibrary'}" class="main__list">
          <img class="btn" src="~assets/img/dissection/list.png" alt="">
        </router-link>
        <router-link :to="{name: 'anatomyHome'}">
          <img class="btn" src="~assets/img/dissection/review.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="../../assets/img/robot/focus_code.jpg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './common/navbar';
import robot_share from '../../utils/robot_share';
export default {
  components: {
    navbar,
  },
  data() {
    return {
      data: null,
      user: null,
      isShow: false,
    }
  },
  created() {
    this.getQus();
    this.getUser();
    const title1 = '［医看］全国影像解剖有奖大赛';
    const title2 = '医看］全国影像解剖有奖大赛隆重开启，快来答题赢奖励吧！';
    const desc = ' 快来参加有奖大赛吧，千元图书奖励等你拿！';
    robot_share(title1, title2, desc, location.href);
  },
  methods: {
    getQus() {
      const url = '/api/frontend/dissect_game/question';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
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
    goAnswer() {
      if (this.user.subscribe == 0) {
        this.isShow = true;
        return;
      }
      if (this.data.rest_count>0) {
        this.$router.push({name: 'dissectionCount'});
      } else {
        this.$toast('今日次数已用完');
        this.$router.push({name: 'dissectionChance'});
      }
    },
    hide() {
      this.isShow = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.home {
  @extend %fullpage;
  background: url('~assets/img/dissection/bg.png') no-repeat;
  background-size: cover;
}
.main {
  text-align: center;
  &__img {
    width: 85%;
    margin-top: Rem(80);
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    width: Rem(698);
    margin: Rem(10) auto;
    a {
      display: inline-block;
      width: Rem(339);
    }
  }
  &__start {
    display: block;
    width: Rem(698);
    margin: 0 auto;
  }
}
.chance {
  display: inline-block;
  margin-bottom: Rem(50);
  color: #FCF082;
  font-size: 16px;
  text-decoration: underline;
  text-shadow: 1px 1px 4px rgba(0,0,0,.5);
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
