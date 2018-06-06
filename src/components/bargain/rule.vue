<template lang="html">
  <div class="rule" v-if="config">
    <img class="rule__img" :src="config.rule_image" alt="">
    <!-- <img class="rule__img" src="~assets/img/bargain/rule_content.png" alt=""> -->
    <router-link class="rule__btn" :to="{ name: 'bargainHome', query: {activity_id: config.id}}">
      去主页参加活动
    </router-link>
  </div>
</template>

<script>
import share from './share';
export default {
  computed: {
    config() {
      return this.$store.state.config;
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.rule {
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
}
</style>
