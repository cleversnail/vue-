<template>
  <div class="container">
    <div class="hello">
        <a href="http://viewer.weiyunyingxiang.com/s/N3IySXJhLjEyMg==">
          MR 头部
        </a>
        <a href="http://viewer.weiyunyingxiang.com/s/RlJKakFmLjI=">
          DR 胸部
        </a>
        <a href="http://viewer.weiyunyingxiang.com/s/Yk1CajZqLjkwNQ==">
          900幅大CT胸部
        </a>
        <a href="http://viewer.weiyunyingxiang.com/s/N0pON3JlLjk4">
          XA 血管造型
        </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created(){
      this.$wxShare();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.hello {
  padding:Rem(20);
  a {
    display: block;
    padding:Rem(30);
    margin: Rem(40) 0;
    border:1px solid $main-color-blue;
    border-radius: Rem(30);
    color: $main-color-blue;
    text-align: center;
  }
}
</style>
