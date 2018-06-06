<template lang="html">
  <div class="bargain" :style="{background:config && config.bg_hue}">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import share from './share';

export default {
  created() {
    this.getUser();
    this.getConfig();
  },
  computed: {
    config() {
      let config = this.$store.state.config;
      if(config) {
        if (config.type == 2) {
          const name = this.$route.name == 'bargainDetail' ? 'bargain2Detail':'bargain2Home';
          const params = this.$route.params;
          const query = this.$route.query;
          this.$router.push({name, params,query});
        }
        const title1 = config.share_title;
        const title2 = config.share_title;
        const des = config.share_detail;
        const link = location.href;
        const img = config.share_image;
        share(title1, title2, des, link, img);
      }
      return config;
    }
  },
  methods: {
    getUser() {
      const url = `/api/frontend/user/userinfo`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          window.user = res.data.data;
          window.isrenzheng = user.detail.isrenzheng>0;
          if (user.subscribe == 1) {
            window.subscribe = true;
          } else {
            window.subscribe = false;
          }
        }
      })
    },
    getConfig() {
      const id = this.$route.query.activity_id;
      this.$store.dispatch('getConfig', id);
    }
  }
}
</script>

<style lang="scss">
@import '~src/assets/scss/config';
.bargain {
  @extend %fullpage;
  background: #CEE3FC;
  .master-weixin{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:rgba(0,0,0,.8);
    z-index: 99;
  }
  .wexin-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: Rem(600);
    transform: translate(-50%, -50%);
    color: #fff;
    letter-spacing: 4px;
  }
  .wexin-code {
    width: Rem(360);
    margin-bottom: Rem(20);
  }
  .wexin-yk {
    color: #fa6852;
  }
  .mt-progress-content {
    margin: 0 Rem(18);
  }
  .mt-progress-progress {
    background-color: $color-red;
    border-radius: Rem(20);
  }
  .mt-progress-runway {
    border-radius: Rem(20);
  }
}
</style>
