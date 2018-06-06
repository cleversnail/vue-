<template lang="html">
  <div class="c-ctimg">
    <img :src="formatImg(img[index].site)" alt="" class="ctimg" @click="next">
    <span class="tagging-page">{{index+1}}/{{img.length}}</span>
    <img src="../../../assets/img/robot/right.png" alt="" class="right" @click="next">
    <img src="../../../assets/img/robot/right.png" alt="" class="left" @click="prev">
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    }
  },
  props: ['img'],
  methods: {
    next() {
      if (this.index < this.img.length-1) {
        this.index++;
      } else {
        this.index = 0;
      }
    },
    prev() {
      if (this.index>0) {
        this.index--;
      }
    },
    formatImg(img) {
      const value = img && img.replace('http://img.kankanyisheng.com/', '');
      return `http://img.kankanyisheng.com/${value}`;
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.c-ctimg {
    position: relative;
    .ctimg {
        width: Rem(624);
        margin-top: Rem(20);
    }
    .tagging-page {
        position: absolute;
        bottom: Rem(20);
        right: 50%;
        transform: translateX(50%);
        color: #1f80fa;
    }
    .right {
        position: absolute;
        width: Rem(40);
        right: Rem(10);
        top: 50%;
        transform: translateY(-50%);
    }
    .left {
        position: absolute;
        width: Rem(40);
        left: Rem(10);
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
    }
}
</style>
