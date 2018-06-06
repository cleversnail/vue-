<template>
  <div class="hello">
      <img class="bg" :src="pic" alt="公司介绍">
      <router-link :to="{path:'/'}">
          <img class="index" src="../../assets/img/apply/index.png" alt="">
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'companyInfoer',
  data() {
    return {
      pic:null
    };
  },
  created(){
       this.pic = this.$route.query.pic;
       this.$wxShare();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
    .hello {
        .bg {
            width: 100%;
        }
        .index {
            position: fixed;
            right:Rem(20);
            top: Rem(10);
            width: Rem(90);
        }
    }
</style>
