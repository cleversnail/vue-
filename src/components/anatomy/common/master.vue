<template lang="html">
  <div class="master">
    <img class="master__img" src="~src/assets/img/anatomy/block-master.png" alt="" v-if="type == 'home'">
    <img class="master__img" src="~src/assets/img/anatomy/unblock-master.png" alt="" v-else>
  </div>
</template>

<script>
export default {
  props: ['type'],
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
  .master{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .8);
    &__img{
      margin-top: Rem(100);
      width: 100%;
    }
  }
</style>
