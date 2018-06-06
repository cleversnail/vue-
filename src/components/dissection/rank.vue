<template lang="html">
  <div class="rank" v-if="data">
    <navbar></navbar>
    <div class="rank__banner">
      <router-link :to="{ name: 'dissectionIntroduce' }">
        <img class="rank__title" src="~assets/img/dissection/rank_title.png" alt="">
      </router-link>
      <router-link :to="{ name: 'dissectionHome'}">
        <img class="rank__gohome" src="~assets/img/dissection/gohome.png" alt="">
      </router-link>
    </div>
    <div class="rank__content" v-if="userList">
      <div class="rank-list">
        <div class="rank-list__flex">
          <span class="rank-list__number">{{ userList.rank }}</span>
          <img class="rank-list__img" :src="userList.member.headimg" alt="">
          <span class="rank-list__name">{{ userList.member.name }} (我)</span>
        </div>
        <span class="rank-list__result">答对 {{ userList.right_question_nums || 0}} 套题</span>
        <span class="rank-list__time">{{userList.answer_times || 300}}s</span>
        <div class="rank-list__icon">
          <template v-if="userList.rank">
            <img src="~assets/img/dissection/price1.png" v-if="userList.rank<4">
            <img src="~assets/img/dissection/price2.png" v-else-if="userList.rank<6">
            <img src="~assets/img/dissection/price3.png" v-else-if="userList.rank<16 && userList.right_question_nums == 120">
            <img src="~assets/img/dissection/price4.png" v-else-if="userList.rank<31 && userList.right_question_nums == 120">
          </template>
        </div>
      </div>
      <ul class="rank__info">
        <li class="rank-list" v-for="item in data.data">
          <div class="rank-list__flex">
            <span class="rank-list__number">{{ item.rank }}</span>
            <img class="rank-list__img" :src="item.member.headimg" alt="">
            <span class="rank-list__name">{{ item.member.true_name }}</span>
          </div>
          <div class="rank-list__result">
            <template v-if="item.right_question_nums == 120">
              全部答对
            </template>
            <template v-else>
              答对 {{ item.right_question_nums }} 套题
            </template>
          </div>
          <span class="rank-list__time">{{item.answer_times}}s</span>
          <div class="rank-list__icon">
            <img src="~assets/img/dissection/price1.png" v-if="item.rank==1">
            <img src="~assets/img/dissection/price2.png" v-else-if="item.rank<4">
            <img src="~assets/img/dissection/price3.png" v-else-if="item.rank<6">
            <img src="~assets/img/dissection/price4.png" v-else-if="item.rank<11">
            <img src="~assets/img/dissection/price5.png" v-else-if="item.rank<21">
            <img src="~assets/img/dissection/price6.png" v-else-if="isPrice(item.rank)">
          </div>
        </li>
        <li class="rank-list" v-if="data.data&&data.data.length>=20">
          <div class="rank-list__more" @click="more">
            点击查看更多
          </div>
        </li>
      </ul>
    </div>
    <img class="btn--fixed" src="~assets/img/dissection/share_rank.png" @click="showLayer" v-if="isMine">
    <img class="btn--fixed" src="~assets/img/dissection/join.png" v-else>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import robot_share from 'src/utils/robot_share';
import share from '../robot/common/share';

export default {
  components: {
    share,
    navbar,
  },
  data () {
    return {
      layerShow: false,
      isShow: false,
      data: null,
      userList: null,
      isMine: true,
    }
  },
  created() {
    const id = this.$route.query.id;
    this.getList();
    this.getUserInfo(id);
    this.getUser();
  },
  methods: {
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
    hide() {
      this.isShow = false;
    },
    getList() {
      const url = '/api/frontend/index/rank?type=dissect_game';
      this.$axios.get(url).then((res) => {
        this.data = res.data.data;
      })
    },
    more() {
      const page = this.data.page + 1;
      const url = `/api/frontend/index/rank?type=dissect_game&page=${page}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0 && res.data.data.data.length>0) {
          this.data.data = this.data.data.concat(res.data.data.data);
          this.data.page = parseInt(res.data.data.page);
        }else if (res.data.data.data.length === 0) {
          this.$toast('没有更多数据');
        } else {
          this.$toast(res.data.msg);
        }
      })
    },
    getUserInfo(uid) {
      const url = '/api/frontend/dissect_game/person';
      const params = {
        uid,
      }
      this.$axios.get(url, {params}).then((res) => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
          let title1 = `［医看］全国影像解剖有奖大赛`,
              title2 = `我在［医看］全国影像解剖有奖大赛中排名全国第${this.userList.rank}，快来参与领奖励！`,
              desc = `我在大赛中排名全国第${this.userList.rank}，快来参与领奖励！`,
              link = `${location.origin}/active_web/#/dissection/rank?id=${this.userList.member.id}`;
              console.log(link);
              robot_share(title1, title2, desc, link);
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
        }
      })
    },
    isPrice(rank) {
      const str = rank+'';
      const last = str.charAt(str.length-1);
      if (last == 8 && rank<100) {
        return true;
      }
      return false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.rank {
  @extend %fullpage;
  background: url('~assets/img/dissection/bg.png') no-repeat;
  background-size: cover;
  padding-bottom: Rem(120);
  color: #000;
  &__banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: Rem(700);
    margin: 0 auto;
  }
  &__title {
    width: Rem(566.8);
    height: Rem(150.8);
  }
  &__gohome {
    width: Rem(100);
    height: Rem(100);
  }
  &__content {
    width: Rem(700);
    height: 76vh;
    margin: 0 auto;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
  }
  &__info {
    width: 100%;
    height: 88%;
    overflow: scroll;
    box-shadow:0px 3px 3px 0px #f1f1f1 inset;
  }
  &-list {
    height: Rem(110);
    padding-left: Rem(5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    &__flex {
      display: flex;
      align-items: center;
    }
    &__number {
      display: inline-block;
      width: Rem(60);
      text-align: center;
    }
    &__img{
      width: Rem(64);
      height: Rem(64);
      margin-bottom: Rem(6);
      margin-right: Rem(16);
      border-radius: 50%;
    }
    &__name {
      display: inline-block;
      width: Rem(180);
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &__result {
      display: inline-block;
      width: Rem(160);
      text-align: center;
    }
    &__time {
      width: Rem(100);
      text-align: center;
    }
    &__more {
      flex-grow: 1;
      text-align: center;
    }
    &__icon {
      width: Rem(100);
      img {
        width: 100%;
      }
    }
  }
}
</style>
