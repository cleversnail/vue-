<template lang="html">
  <div class="introduce">
    <div class="introduce__banner">
      <router-link :to="{ name: 'dissectionHome' }">
        <img class="introduce__home" src="~assets/img/dissection/gohome.png" alt="">
      </router-link>
    </div>
    <img class="introduce__img" src="~src/assets/img/dissection/introduce.png" alt="">
    <img class="btn--fixed" src="~assets/img/dissection/share_library.png" @click="showLayer" v-if="isMine">
    <img class="btn--fixed" src="~assets/img/dissection/join.png" @click="goHome" v-else>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import robot_share from '../../utils/robot_share';
import share from '../robot/common/share';
export default {
  data () {
    return {
      layerShow: false,
      isMine: true,
    }
  },
  components: {
    share,
  },
  created() {
    this.getInfo();
    this.getUser();
    const title1 = '［医看］全国影像解剖有奖大赛';
    const title2 = '医看］全国影像解剖有奖大赛隆重开启，快来答题赢奖励吧！';
    const desc = ' 快来参加有奖大赛吧，千元图书奖励等你拿！';
    robot_share(title1, title2, desc, location.href);
  },
  methods: {
    getInfo() {
      const url = `/api/bk/baike/dissect/unlock_num`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
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
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.introduce{
  font-size:  12px;
  letter-spacing: 1px;
  line-height: Rem(44);
  padding-bottom: Rem(140);
  &__banner{
    width: 100%;
    height: Rem(210);
    background: url('~src/assets/img/dissection/introduce_banner.png') 0 0 no-repeat;
    background-size: 100%;
    position: relative;
  }
  &__home {
    position: absolute;
    right: Rem(20);
    top: 50%;
    width: Rem(100);
    transform: translateY(-50%);
  }
  &__content {
    padding: Rem(90) Rem(70);
  }
  &__title {
    margin-bottom: Rem(100);
  }
  &__img {
    width: 100%;
  }
}
</style>
