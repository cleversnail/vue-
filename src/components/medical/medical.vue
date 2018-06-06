<template lang="html">
  <div class="page">
    <img src="../../assets/img/medical/bgc.png" alt="">
    <div class="section">
      <div class="section-one">
        <img src="../../assets/img/medical/one.png" @click="push" alt="">
        <router-link :to="{ name: 'robot'}">
          <img src="../../assets/img/medical/robot.png" alt="">
        </router-link>
        <img src="../../assets/img/medical/three.png" alt="">
      </div>
    </div>
    <div class="home">
      <img @click="goHome" src="../../assets/img/medical/home.png" alt="">
    </div>
  </div>
</template>

<script>
import readShare from '../../utils/read_share';

export default {
  data() {
    return {

    }
  },
  created() {
    document.querySelector('title').innerHTML = '医看－智能医学影像体验专区';
    let title1 = '「医看」智能医疗诊断体验专区，邀你感受人工智能的魅力！',
      title2 = '「医看」智能医疗诊断体验专区，邀你感受人工智能的魅力！',
      desc = '点击进入体验专区，人工智能医疗给你赋能~',
      url1 = `${location.href}`,
      img = `https://ooo.0o0.ooo/2017/06/30/59563ec560d8b.png`;
    readShare(title1, title2, desc, url1, img);
  },
  methods: {
    push() {
      this.$router.push({ path: 'medicalresult' });

    },
    goHome() {
      location.href = '/';
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .page{
    width: 100%;
    height: 100vh;
    background-color: #000;
    background-attachment: fixed;
    overflow: scroll;
    img{
      width: 100%;
    }
  }
  .home{
    position:  absolute;
    top: Rem(30);
    right: Rem(30);
    img{
      width: Rem(130);
    }
  }
  .section{
    height: 100%;
    padding: 0 Rem(40);
    .section-one{
      overflow: hidden;
      img{
        width: 100%;
        margin-bottom: Rem(20);
      }
      .two{
        opacity: 0.8;
      }
    }

  }
</style>
