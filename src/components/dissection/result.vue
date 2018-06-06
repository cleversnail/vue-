<template lang="html">
  <div class="result">
    <navbar></navbar>
    <div class="result__main">
      <div class="result__board">
        <p>题目:{{result.name}}</p>
        <p v-if="result.num === result.all">恭喜您全部答正确！</p>
        <p v-else>抱歉，只答对{{result.num}}/{{result.all}}题</p>
        <p>用时{{result.time}}s</p>
      </div>
      <div class="result__score" v-if="user">
        <p>累计答对{{user.right_question_nums}}套题，总用时{{user.answer_times}}秒</p>
        <p>全国排名: {{user.rank}}</p>
      </div>
      <div class="result__tips">
        想获得更好的成绩，快去解剖大全复习吧！
      </div>
      <router-link :to="{ name: 'anatomyHome'}">
        <img class="result__review" src="~assets/img/dissection/result.png" alt="">
      </router-link>
      <img class="result__share" src="~assets/img/dissection/share_result.png" alt="" @click="showLayer">
      <div class="result__btns">
        <a>
          <img class="btn" src="~assets/img/dissection/result_again.png" alt="" @click="again">
        </a>
        <router-link :to="{name: 'dissectionHome'}">
          <img class="btn" src="~assets/img/dissection/result_home.png" alt="">
        </router-link>
      </div>
    </div>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import share from '../robot/common/share';
import robot_share from '../../utils/robot_share';
export default {
  components: {
    navbar,
    share,
  },
  data() {
    return {
      layerShow: false,
      user: null,
      result: {
        num: this.$route.query.num,
        all: this.$route.query.all,
        name: this.$route.query.name,
        time: this.$route.query.time
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const url = '/api/frontend/dissect_game/person';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          let title1 = '［医看］全国影像解剖有奖大赛',
              title2 = `我参与［医看］影像解剖有奖大赛中遇到困难，快给我补血吧！`,
              desc = `快给我补血吧！我要拿图书奖励！`,
              link = `${location.origin}/active_web/#/dissection/blood?uid=${this.user.member.id}`;
          robot_share(title1, title2, desc, link);
        }
      });
    },
    again() {
      if (this.user.rest_count>0) {
        this.$router.push({name: 'dissectionCount'});
      } else {
        this.$toast('分享给好友增加答题机会');
      }
    },
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.result {
  @extend %fullpage;
  color: #05104F;
  background: url('~assets/img/dissection/answer_bg.png') no-repeat;
  background-size: 100% 100%;
  &__main {
    padding: Rem(40);
    text-align: center;
  }
  &__board {
    padding: Rem(35) 0;
    font-size: 20px;
    color: #489CA8;
    background: rgba(#fff, .4);
  }
  &__score {
    margin: Rem(56) 0;
    font-size: 18px;
    color: #2840AC;
  }
  &__tips {
    margin-bottom: Rem(20);
    font-size: 16px;
    color: #CD4576;
  }
  &__review {
    display: inline-block;
    width: Rem(329);
    margin-bottom: Rem(64);
  }
  &__share {
    width: 100%;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: Rem(10) auto;
    a {
      display: inline-block;
      width: Rem(330);
    }
  }
}
</style>
