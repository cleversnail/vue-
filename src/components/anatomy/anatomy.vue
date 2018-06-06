<template lang="html">
  <div class="anatomy">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.getUser();
  },
  mounted() {
    document.getElementsByTagName('title')[0].innerHTML = '［医看］医学影像解剖大全';
  },
  methods: {
    getUser() {
      const url = `/api/frontend/user/userinfo`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          if (this.user.subscribe == 1) {
            window.subscribe = true;
          } else {
            window.subscribe = false;
            wx.hideMenuItems({
              menuList: ['menuItem:share:appMessage','menuItem:share:timeline']
            });
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.anatomy {
  max-width: 640px;
  margin: 0 auto;
}
</style>
