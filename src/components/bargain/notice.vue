<template lang="html">
  <div class="notice">
    <div class="swiper-container notice__swiper" v-if="notice">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in notice.help">
          <div class="slide">
            <img class="notice__headimg" :src="item.member.headimg" alt="">
            <p class="notice__info"><span class="notice__name">{{item.member.true_name}}</span>刚刚砍了{{item.value}}元</p>
          </div>
        </div>
        <div class="swiper-slide" v-for="item in notice.record">
          <div class="slide">
            <img class="notice__headimg" :src="item.member.headimg" alt="">
            <p class="notice__info"><span class="notice__name">{{item.member.true_name}}</span>成功领取了《{{item.goods.title}}》</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: null,
    }
  },
  created() {
    this.getNotice();
  },
  methods: {
    initSwiper() {
      var mySwiper = new Swiper('.notice__swiper', {
        slidesPerView: 2,
        initialSlide: 1,
        autoplay: 3000,
        loop: true,
      });
    },
    getNotice() {
      const url = '/api/frontend/bargain/notice';
      const activity_id = this.$route.query.activity_id;
      const params = {
        activity_id
      }
      this.$axios.get(url, {params}).then((res) => {
        if (res.data.status == 0) {
          this.notice = res.data.data;
          this.$nextTick(()=>{
            this.initSwiper();
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.notice {
  background: #8d9fb2;
  &__headimg {
    @include circle(Rem(48));
    margin-left: Rem(20);
    margin-right: Rem(10);
  }
  &__info {
    display: flex;
    align-items: center;
  }
  &__name {
    display: inline-block;
    width: Rem(100);
    text-align: center;
    @include ellipsis-single;
  }
}
.slide {
  display: flex;
  align-items: center;
  height: Rem(78);
  color: #fff;
  font-size: 12px;
}
</style>
