<template>
<div class="hello">
  <img class="bg" src="../../assets/img/kepu/lipin.png" alt="">
  <router-link :to="{path:'/kepu'}">
    <img class="index" src="../../assets/img/apply/index.png" alt="">
  </router-link>
  <div class="footer">
    <div class="btn" @click="share">
      邀请好友参加
    </div>
    <div class="btn" v-if="isGuanzhu">
      <router-link :to="{path:'/kepu/applyer'}">
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
import layer from '../common/layer';
import kepuShare from '../../utils/kepu-share';

export default {
  name: 'helloer',
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
    this.getUser();
    let title1 = ' 我在「医看」为世界卫生日代言，快来帮我投上宝贵一票！（有奖科普代言活动进行时，和我一起来参加~）';
    let title2 = '我在「医看」为世界卫生日代言，快来帮我投上宝贵一票！';
    let desc = ' 我在「医看」为世界卫生日代言，快来帮我投上宝贵一票！';
    let url = location.href;
    kepuShare(title1,title2,desc,url);
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
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
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
            background: $color-pink;
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
