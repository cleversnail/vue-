<template lang="html">
  <div class="rule" v-if="config">
  <!--   <img class="rule__img" src="~assets/img/bargain/rule_content2.png" alt=""> -->
    <img class="rule__img" :src="config.rule_image" alt="">
    <a class="rule__link" href="/muke/#/identificate">
      <img src="~assets/img/bargain/rule_link.png" alt="">
    </a>
    <router-link class="rule__btn" :to="{ name: 'bargain2Home', query: {activity_id: config.id}}">
      去主页参加活动
    </router-link>
  </div>
</template>

<script>
import share from './share';
export default {
  created() {},
  computed: {
    config() {
      var config = this.$store.state.config;
      if(config) {
        const title1 = config.share_title;
        const title2 = config.share_title;
        const des = config.share_detail;
        const link = location.href;
        const img = config.share_image;
        share(title1, title2, des, link, img);
      }
      return config;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.rule {
  position: relative;
  padding-bottom: Rem(120);
  &__img {
    width: 100%;
  }
  &__btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: Rem(120);
    line-height: Rem(120);
    background: #387fd1;
    color: #fff;
    text-align: center;
  }
  &__link {
    position: absolute;
    top: Rem(895);
    right: Rem(40);
    img {
      width: Rem(260);
    }
  }
}
</style>
