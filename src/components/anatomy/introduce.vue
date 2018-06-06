<template lang="html">
  <div class="introduce">
    <div class="introduce__banner">
      <router-link :to="{ name: 'anatomyHome' }">
        <div class="a-btn--gohome"></div>
      </router-link>
    </div>
    <!-- <div class="introduce__content">
      <div class="introduce__title">
        医看解剖大全详尽收录了50多部图片资料，通过分享朋友圈的方式能让您免费观看所有资料，一个好友能解锁一部，发动你的好友为你解锁全部资料吧！
      </div>
      如何解锁？</br>
      1，在解剖主页中点击“分享给好友，解锁更多！”，分享到朋友圈，好友可为您点击解锁任意一部。</br>
      2，在每一部的详情页面里点击右上角的 去解锁 ，分享给好友，可以解锁指定的那一部。</br>
    </div> -->
    <img class="introduce__img" src="~src/assets/img/anatomy/introduce.png" alt="">
    <aMenu></aMenu>
  </div>
</template>

<script>
import share from 'src/utils/anatomy_share';
import aMenu from './common/menu';
export default {
  data () {
    return {

    }
  },
  components: {
    aMenu,
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const url = `/api/bk/baike/dissect/unlock_num`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          const title1 = `我在「医看」收藏了${this.user.total_num}部全身医学影像高清解剖图谱，来帮我解锁吧！`;
          const title2 = `我在「医看」收藏了${this.user.total_num}部全身医学影像高清解剖图谱，朋友们快来帮我解锁！`;
          const desc = '史上最强解剖图谱，分享即可免费查看';
          const link = `${location.origin}/active_web/#/anatomy/unlock?uid=${this.user.member.id}`;
          share(title1,title2,desc,link);
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.introduce{
  font-size:  12px;
  letter-spacing: 1px;
  line-height: Rem(44);
  &__banner{
    width: 100%;
    height: Rem(210);
    background: url('~src/assets/img/anatomy/introduce-banner.png') 0 0 no-repeat;
    background-size: 100%;
    position: relative;
  }
  &__content {
    padding: Rem(90) Rem(70);
  }
  &__title {
    margin-bottom: Rem(100);
  }
  &__img {
    width: 100%;
  }
}
</style>
