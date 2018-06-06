<template lang="html">
  <div class="resource">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    // this.getUser();
  },
  mounted() {
    document.getElementsByTagName('title')[0].innerHTML = '［医看］医学资料大礼包';
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
  }
}
</script>

<style lang="scss">
@import '~src/assets/scss/config';
.resource {
  @extend %fullpage;
  background: url('~assets/img/resource/home_bg.png') no-repeat;
  background-size: cover;
  .master-weixin{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:rgba(0,0,0,.8);
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
}
</style>
