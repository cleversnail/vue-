<template lang="html">
  <div class="home" v-if="config">
    <div class="home__header">
      <router-link :to="{ name: 'bargainRule', query: {activity_id}}">
        <!-- <img class="home__rule" src="~assets/img/bargain/rule.png" alt=""> -->
        <img class="home__rule" :src="config.rule_link" alt="">
      </router-link>
      <!-- <img class="home__title" src="~assets/img/bargain/home_title.png" alt=""> -->
      <img class="home__title" :src="config.banner_image" alt="">
    </div>
    <div class="home__notice">
      <notice></notice>
    </div>
    <div class="home__swiper">
      <div class="swiper-container book__swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :class="{'swiper-slide-active': index == 0}" v-for="(item, index) in goods">
            <div class="slide" @click="bargain(item.id)">
              <div class="slide__status info" v-if="!isStart(item.game_at)">
                即将于{{item.game_at}}开始
              </div>
              <div class="slide__status active" v-else-if="item.stock>0">
                正在进行中
              </div>
              <div class="slide__status over" v-else>
                已抢完
              </div>
              <img class="slide__logo" src="~assets/img/bargain/logo.png" alt="">
              <div class="slide__imgbox">
                <img class="slide__img" :src="item.pic_url" alt="">
              </div>
              <div class="slide__footer">
                <div>《{{item.title}}》</div>
                <div class="slide__info">
                  <div>
                    售价:<span class="color-fa">￥{{item.value}}</span>
                  </div>
                  <div>
                    进度:<span class="color-fa">￥{{goodsValue(item.help)}}/￥{{item.value}}</span>
                  </div>
                  <div>
                    库存:<span class="color-fa">{{item.stock}}/{{item.total}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <div class="home__tips">
      每人限制免费领取一本书
    </div>
    <div class="home__handle" v-if="data">
      <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" :href="data.goods_url">购买（¥{{data.value}}）</a>
      <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" @click="bargain(data.id)">免费砍这本!</a>
    </div>
    <!-- 关注公众号 -->
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="~assets/img/bargain/guanzhu.jpeg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </div>
    </div>
  </div>
</template>

<script>
import notice from './notice';

export default {
  components: {
    notice,
  },
  data(){
    return {
      goods: null,
      data: null,
      isShow: false,
      activity_id: 1,
    }
  },
  created() {
    this.activity_id = this.$route.query.activity_id;
    this.getGoods();
  },
  computed: {
    user() {
      return user;
    },
    config() {
      return this.$store.state.config;
    }
  },
  methods: {
    initSwiper() {
      const self = this;
      var mySwiper = new Swiper('.book__swiper', {
        centeredSlides: true,
        slidesPerView: 2,
        loop: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        onSlideChangeEnd(swiper) {
          self.data = self.goods[swiper.activeIndex];
        }
      });
    },
    getGoods() {
      const url = '/api/frontend/bargain/list';
      const activity_id = this.activity_id;
      const params = {
        activity_id,
      }
      this.$axios.get(url, {params}).then((res) => {
        if (res.data.status == 0) {
          this.goods = res.data.data;
          this.data = this.goods[0];
          this.$nextTick(()=>{
            this.initSwiper();
          })
        }
      })
    },
    bargain(id) {
      if (subscribe) {
        const params = { id };
        const activity_id = this.activity_id;
        const query = { activity_id };
        this.$router.push({name: 'bargainDetail', params, query});
      } else {
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
    isStart(time) {
      const trueTime = time.replace(/\-/g, "/");
      const start = new Date(trueTime).getTime();
      const now = new Date().getTime();
      return start < now;
    },
    goodsValue(help) {
      let value = 0;
      if (help.length == 0) {
        return 0;
      } else {
        help.forEach((item)=>{
          value+= Number(item.value);
        })
      }
      return Number(value.toFixed(2));
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
%right {
    width: Rem(64);
    height: Rem(64);
    background-image: url('~assets/img/bargain/right.png');
    background-size: Rem(64) Rem(64);
}
.home {
    &__title {
        width: 100%;
    }
    &__wrap {
      padding: 0 Rem(20);
    }
    &__swiper {
        margin-top: Rem(70);
    }
    &__header {
        position: relative;
    }
    &__rule {
        position: absolute;
        top: Rem(20);
        left: 50%;
        width: Rem(150);
        transform: translateX(-50%);
    }
    &__tips {
        margin-top: Rem(80);
        text-align: center;
        color: #e60006;
    }
    &__handle {
        display: flex;
        justify-content: space-around;
        margin-top: Rem(40);
        padding: 0 Rem(30);
    }
    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: Rem(318);
        height: Rem(111);
        padding-bottom: Rem(10);
        background-image: url('~assets/img/bargain/btn.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        box-sizing: border-box;
    }
}
.swiper {
    &-container {
        overflow: inherit;
    }
    &-slide {
        height: Rem(498);
        transform: scale(0.8);
        transition: transform 0.3s;
        z-index: 1;
    }
    &-button {
        &-next {
            @extend %right;
            right: 0;
        }
        &-prev {
            @extend %right;
            left: 0;
            transform: rotate(180deg);
        }
    }
}
.swiper-slide-active {
    transform: scale(1.2);
    z-index: 9;
}
.slide {
  position: absolute;
  top: 0;
  left: 50%;
  width: Rem(476);
  height: 100%;
  transform: translateX(-50%);
  background: #fff;
  &__status {
    position: absolute;
    right: Rem(17.5);
    top: Rem(21);
    padding: Rem(6) Rem(24);
    font-size: Rem(20);
    color: #fff;
    border-radius: Rem(24);
    &.active {
      background: #f14853;
    }
    &.info {
      background: #31769d;
    }
    &.over {
      background: #c0c1c2;
    }
  }
  &__logo {
    position: absolute;
    left: Rem(6);
    top: Rem(6);
    width: Rem(100);
  }
  &__imgbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: Rem(392);
    background: #f1f1f1;
  }
  &__img {
    display: block;
    width: Rem(270);
  }
  &__footer {
    padding: Rem(22);
    font-size: Rem(20);
  }
  &__info {
    display: flex;
    justify-content: space-between;
    font-size: Rem(16.67);
  }
}
</style>
