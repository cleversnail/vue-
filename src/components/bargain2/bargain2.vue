<template lang="html">
  <div class="bargain2" :style="{background:config && config.bg_hue}">
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
      return config;
    }
  },
  methods: {
    getUser() {
      const url = `/api/frontend/user/userinfo`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          window.user = res.data.data;
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
      if(id) {
        this.$store.dispatch('getConfig', id);
      }
    }
  }
}
</script>

<style lang="scss">
@import '~src/assets/scss/config';
.bargain2 {
  background: #f6d147;
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
