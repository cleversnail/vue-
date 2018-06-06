<template lang="html">
  <div class="navbar">
    <a href="/">
      <img class="img1" src="../../../assets/img/robot/home.png" alt="">
    </a>
    <router-link :to="{ path: '/detail' }">
      <img class="img2" src="../../../assets/img/robot/detail.png" alt="">
    </router-link>
    <router-link :to="{ path: '/robotRank' }">
      <img class="img3" src="../../../assets/img/robot/rank.png" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .navbar{
    width: 100%;
    text-align: center;
    img{
      margin-right: Rem(70);

    }
    .img1{
      width:Rem(201);
    }
    .img2{
      width: Rem(154);
    }
    .img3{
      width: Rem(176);
      margin-right: 0;
    }
  }
</style>
