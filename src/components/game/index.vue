<template>
<div class="container">
  <div class="head"></div>
  <div class="main">
    <img class="title" src="../../assets/img/game/index/index_text.png" alt="医看每日问答">
    <img class="content" src="../../assets/img/game/index/content.png" alt="">
    <router-link :to="{name:'gameRule'}">
      <a class="rule">游戏规则</a>
    </router-link>
    <router-link :to="{path:'/game/dial'}">
      <img class="go-dial" src="../../assets/img/game/go_dial.png" alt="go dial">
    </router-link>
    <router-link :to="{path:goArea}">
      <img class="btn" src="../../assets/img/game/index/btn.png" alt="开始答题">
    </router-link>
  </div>
  <div v-if="showLayer" @click="close">
      <layer :status="showLayer" :type="'game'" :statustype="'4'"></layer>
  </div>

</div>
</template>

<script>
import layer from '../common/layer';

export default {
  name: 'gameIndex',
  components: {
    layer
  },
  data() {
    return {
      user:{},
      goArea:'/game/answer',
      showLayer:false,
    };
  },
  created() {
    this.getUser();
    this.$gameShare();
  },
  methods: {
    getUser() {
      const url = `/api/frontend/game/index`;
      this.$axios
        .get(url)
        .then((res) => {
          this.user = res.data.data;
          this.initStatus(this.user.status);
        })
    },
    initStatus(status){
      switch(status){
        case 1:
          this.goArea = '/game/answer';
          break;
        case 2:
          this.goArea = '/game/result';
          this.$router.push('/game/result');
          // location.href = `${location.origin}/active_web/#/game/result`;
          break;
        case 3:
          this.goArea = '/game/lottery/2';
          this.$router.push('/game/lottery/2');
          // location.href = `${location.origin}/active_web/#/game/lottery/2`;
          break;
        case 4:
          this.goArea = '/game/result';
          this.$router.push('/game/result');
          // location.href = `${location.origin}/active_web/#/game/result`;
          break;
      }
    },
    show(){
        this.showLayer = true;
    },
    close(){
        this.showLayer = false;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.container {
    background: url('http://img.kankanyisheng.com/yikan-t/20170317/14897414319386367224.png');
    background-size: cover;
    .head {
        height: Rem(255);
    }
    .main {
        padding: Rem(60);
        img {
            width: 100%;
        }
        .title {
          margin-bottom: Rem(60);
        }
        .content {
          margin-bottom: Rem(40);
        }
        .rule {
          display: block;
          text-decoration: underline;
          color: $color-white;
          font-size: Rem(60);
          text-align: center;
        }
        .go-dial {
          display: block;
          width: Rem(100);
          margin: Rem(40) auto;
        }
        .btn {
          display: block;
          width: 70%;
          margin:Rem(0) auto;
        }
    }

}
</style>
