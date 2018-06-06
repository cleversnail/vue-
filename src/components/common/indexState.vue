<template>
<div>
    <div class="state" v-if="status==0">
     <router-link :to="{path:'/applyResult'}">
         <!-- <img src="../../assets/img/index/check.png" alt=""> -->
         <div class="state-text">
           报名审核中
         </div>
     </router-link>
    </div>
    <div class="state" v-if="status==1">
    <router-link :to="{path:`/zuimei/rate/${id}`}">
      <!-- <img src="../../assets/img/index/success.png" alt=""> -->
      <div class="state-text">
        已经报名成功
      </div>
    </router-link>
    </div>
    <div class="state" v-if="status==2">
    <router-link :to="{path:'/applyResult'}">
      <!-- <img src="../../assets/img/index/check.png" alt=""> -->
      <div class="state-text">
        审核不通过
      </div>
    </router-link>
    </div>
    <div class="state" v-if="status==4">
    <router-link :to="{path:'/zuimei/apply'}">
      <!-- <img src="../../assets/img/index/hot.png" alt=""> -->
      <div class="state-text">
        现在报名加入
      </div>
    </router-link>
    </div>
</div>
</template>

<script>
export default {
  name: 'indexState',
  props: {
    status: {
      type: String
    },
    id:{
      type:String
    }
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.state {
    width: Rem(300);
    height: Rem(50);
    margin: Rem(20) auto;
    padding: Rem(10) Rem(15);
    background: $color-blue;
    border-radius: Rem(80);
    color: $color-white;
    font-size: Rem(32);
    line-height: Rem(50);
    overflow: hidden;
    img {
        width: Rem(50);
        height: Rem(50);
        margin-left: Rem(10);
        float: left;
    }
    .state-text {
        // float: left;
        text-align: center;
        color: $color-white;
        margin-left: Rem(20);
    }
}
</style>
