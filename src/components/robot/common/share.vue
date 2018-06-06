<template>
<div class="layer" @click="hideLayer">
  <a class="layer-btn">
    关闭
  </a>
  <!-- <img class="layer-img" src="../../../assets/img/robot/share.png" alt=""> -->
  <img class="layer-img2" src="~assets/img/dissection/share.png" alt="">
</div>
</template>

<script>
export default {
  methods: {
    hideLayer() {
      this.$emit('hide');
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/config.scss";

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
  &-img2 {
    display: block;
    width: 96%;
    margin: 0 auto;
  }
  &-btn {
    position: absolute;
    left: Rem(40);
    top: Rem(40);
    display: inline-block;
    color: #fff;
    padding:Rem(20) Rem(40);
    border: 1px solid #fff;
    border-radius: Rem(10);
  }
 }
</style>
