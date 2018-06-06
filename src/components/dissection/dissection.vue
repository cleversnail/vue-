<template lang="html">
  <div class="dissection">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '~src/assets/scss/config';
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.dissection {
  .btn {
    display: block;
    width: 100%;
    &--fixed {
      position: fixed;
      bottom: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 7.12rem;
    }
  }
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: Rem(20);
    &__icon {
      width: Rem(185);
    }
  }
}
</style>
