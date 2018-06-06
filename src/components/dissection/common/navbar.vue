<template lang="html">
  <nav class="navbar">
    <a href="/">
      <img class="navbar__icon" src="~assets/img/dissection/home.png" alt="">
    </a>
    <router-link :to="{ name: 'dissectionIntroduce' }">
      <img class="navbar__icon" src="~assets/img/dissection/detail.png" alt="">
    </router-link>
    <router-link :to="{ name: 'dissectionRank' }">
      <img class="navbar__icon" src="~assets/img/dissection/rank.png" alt="">
    </router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
