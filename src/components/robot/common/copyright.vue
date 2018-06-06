<template>
<div class="tuixiang">
  <img class="tuixiang-logo" src="../../../assets/img/robot/logo.png" alt="">
  <div class="tuixiang-text">
    推想科技提供技术支持
  </div>
  <div class="tuixiang-btn" v-show="!isHide" @click="show">
    关注推想科技
  </div>
  <div class="layer" v-show="isShow" @click="hide">
    <img class="layer-img" src="../../../assets/img/robot/tuixiang.png" alt="">
  </div>
</div>
</template>

<script>
export default {
  props: ['isHide'],
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/config.scss';

.tuixiang {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: Rem(70);
    flex-wrap: wrap;
    @extend %tx;
    &-logo {
        width: Rem(156);
        height: Rem(60);
        margin-right: Rem(20);
    }
    &-text {
        padding: 0 Rem(20);
        border-left: 1px solid rgba(200, 200, 200, 0.7);
    }
    &-btn {
        display: flex;
        align-items: center;
        padding: Rem(10) Rem(20);
        background: RGBA(109, 203, 216, .7);
        border: 1px solid #6DCBD8;
        color: #fff;
        font-size: 12px;
        text-shadow: 0 2px 6.96px rgba(0, 0, 0, 0.66);
    }
}

.layer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.7);
    z-index: 2;
    &-img {
        width: 100%;
    }
}
</style>
