<template lang="html">
  <div class="c-robot-title">
    <img src="../../../assets/img/robot/robot.png" alt="" class="robotimg">
    <div class="title">
      {{ say }}
      <slot name="result-title"></slot>
      <span></span>
    </div>
    <slot name="robot-music"></slot>
  </div>
</template>

<script>
import music from './music';

export default {
  data() {
    return {

    }
  },
  props: ['say'],
  components: {
    music,
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .c-robot-title{
    margin-top: Rem(30);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .robotimg{
      width: Rem(136);
      height: Rem(106);
    }
    .title{
      width: Rem(454);
      height: Rem(80);
      text-align: left;
      padding-left: Rem(20);
      font-size: 12px;
      background-color: rgba(22,57,103,.8);
      position: relative;
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        position: absolute;
        width: Rem(20);
        height: Rem(20);
        transform: rotate(45deg);
        background-color: rgba(22,57,103,.8);
        left: Rem(-10);
        top: Rem(26);
      }
    }
  }
</style>
