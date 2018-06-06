<template>
<div class="hello">
  <img class="bg" src="../assets/img/detail.gif" alt="">
  <router-link :to="{path:'/zuimei'}">
    <img class="index" src="../assets/img/apply/index.png" alt="">
  </router-link>
  <div class="footer">
    <div class="btn" @click="share">
      邀请好友参加
    </div>
    <div class="btn" v-if="isGuanzhu">
      <router-link :to="{path:'/zuimei/apply'}">
        我也要参加
      </router-link>
    </div>
    <div class="btn" v-else>
      <div class="btn" @click="show">
        我也要参加
      </div>
    </div>
  </div>
  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import layer from './common/layer';
export default {
  name: 'hello',
  components: {
    layer
  },
  data() {
    return {
      isGuanzhu: false,
      showLayer: false,
    }
  },
  created() {
    this.$wxShare(1);
    this.getUser();
  },
  methods: {
    share() {
      this.$toast('请点击右上角分享按钮，分享');
    },
    getUser() {
      let url = `/api/frontend/user/userinfo`;
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            this.isGuanzhu = !!res.data.data.subscribe;
          }
        })
    },
    show() {
      this.showLayer = true;
    },
    close() {
      this.showLayer = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.hello {
    position: relative;
    .bg {
        width: 100%;
    }
    .index {
        position: fixed;
        right: Rem(20);
        top: Rem(10);
        width: Rem(90);
    }
    .footer {
        position: fixed;
        bottom: 0;

        display: flex;
        justify-content: space-around;

        width: 100%;
        padding-bottom: Rem(40);
        color: $color-white;
        .btn {
            background: $color-blue;
            padding: Rem(10) 0;
            width: Rem(240);
            text-align: center;
            border-radius: Rem(30);
            a {
                color: $color-white;
            }
        }
    }
}
</style>
