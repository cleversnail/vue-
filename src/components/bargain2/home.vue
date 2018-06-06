<template lang="html">
  <div class="home" v-if="config">
    <div class="home__header">
      <router-link :to="{ name: 'bargain2Rule', query: {activity_id: config.id}}">
        <img class="home__rule" :src="config.rule_link" alt="">
        <!-- <img class="home__rule" src="~assets/img/bargain/rule2.png" alt=""> -->
      </router-link>
      <!-- <img class="home__title" src="~assets/img/bargain/home_title2.png" alt=""> -->
      <img class="home__title" :src="config.banner_image" alt="">
    </div>
    <div class="home__notice">
      <notice></notice>
    </div>
    <!-- <div class="home__tips" v-if="data">
      <p v-if="isStart(data.game_at)">砍价火热进行中.....</p>
      <p v-else>开始时间:{{data.game_at}},敬请期待</p>
    </div>
    <div class="home__list">
      <div class="list" v-for="item in goods">
        <div class="slide" @click="bargain(item.id)">
          <div class="slide__status info" v-if="!isStart(item.game_at)">
            砍价尚未开始,敬请期待
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
            <div class="slide__name">《{{item.title}}》</div>
            <div class="slide__info">
              <div>
                进度:<span class="color-fa">￥{{goodsValue(item.help)}}/￥{{item.value}}</span>
              </div>
              <div>
                库存:<span class="color-fa">{{item.stock}}/{{item.total}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="home__handle">
          <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" :href="item.goods_url">购买¥{{item.value}}</a>
          <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" @click="bargain(item.id)">免费砍这本!</a>
        </div>
      </div>
    </div> -->
    <template v-for="(value, key) in sorts1" v-if="isStart(key)">
      <div class="home__tips">
        <p v-if="isStart(key)">砍价火热进行中.....</p>
        <p v-else>开始时间:{{key}},敬请期待</p>
      </div>
      <div class="home__list">
        <div class="list" v-for="item in value">
          <div class="slide" @click="bargain(item.id)">
            <div class="slide__status info" v-if="!isStart(item.game_at)">
              砍价尚未开始,敬请期待
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
              <div class="slide__name">《{{item.title}}》</div>
              <div class="slide__info">
                <div>
                  进度:<span class="color-fa">￥{{goodsValue(item.help)}}/￥{{item.value}}</span>
                </div>
                <div>
                  库存:<span class="color-fa">{{item.stock}}/{{item.total}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="home__handle">
            <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" :href="item.goods_url">购买¥{{item.value}}</a>
            <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" @click="bargain(item.id)">免费砍这本!</a>
          </div>
        </div>
      </div>
    </template>
    <template v-for="(value, key) in sorts2" v-if="!isStart(key)">
      <div class="home__tips">
        <p v-if="isStart(key)">砍价火热进行中.....</p>
        <p v-else>开始时间:{{key}},敬请期待</p>
      </div>
      <div class="home__list">
        <div class="list" v-for="item in value">
          <div class="slide" @click="bargain(item.id)">
            <div class="slide__status info" v-if="!isStart(item.game_at)">
              砍价尚未开始,敬请期待
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
              <div class="slide__name">《{{item.title}}》</div>
              <div class="slide__info">
                <div>
                  进度:<span class="color-fa">￥{{goodsValue(item.help)}}/￥{{item.value}}</span>
                </div>
                <div>
                  库存:<span class="color-fa">{{item.stock}}/{{item.total}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="home__handle">
            <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" :href="item.goods_url">购买¥{{item.value}}</a>
            <a class="home__btn" :style="{backgroundImage:`url(${config.button_image})`}" @click="bargain(item.id)">免费砍这本!</a>
          </div>
        </div>
      </div>
    </template>
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
import share from './share';

export default {
  components: {
    notice,
  },
  data(){
    return {
      goods: null,
      data: null,
      sorts1: null,//已经开始
      sorts2: null,//还未开始
      isShow: false,
    }
  },
  created() {
    this.getGoods();
  },
  computed: {
    user() {
      return user;
    },
    config() {
      var config = this.$store.state.config;
      if(config) {
        const title1 = config.share_title;
        const title2 = config.share_title;
        const des = config.share_detail;
        const link = location.href;
        const img = config.share_image;
        share(title1, title2, des, link, img);
      }
      return config;
    },
    startTime() {
      let time;
      if (this.goods) {
        this.goods.forEach((item) => {
          if (!this.isStart(item.game_at)) {
            time = item.game_at;
          }
        });
      }
      return time;
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
      const params = {
        activity_id: this.$route.query.activity_id
      }
      this.$axios.get(url, {params}).then((res) => {
        if (res.data.status == 0) {
          this.goods = res.data.data;
          this.data = this.goods[0];
          this.sortGoods(this.goods);
        }
      })
    },
    sortGoods(goods) {
      var temp = {};
      var sorts = {};
      goods.forEach((item) => {
        if (!temp[item.game_at]) {
          temp[item.game_at] = [];
        }
        temp[item.game_at].push(item);
      })
      var arr = Object.keys(temp).sort((a,b) => {
        const x = getTime(a);
        const y = getTime(b);
        return y - x;
      });
      arr.forEach((item) => {
        sorts[item] = temp[item];
      });
      this.sorts1 = sorts; //已经开始的倒序排列
      this.sorts2 = temp; //还未开始的正常排序
    },
    bargain(id) {
      if (subscribe) {
        this.$router.push({name: 'bargain2Detail', params: { id }, query:{activity_id: this.config.id}});
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

function getTime(time) {
  const trueTime = time.replace(/\-/g, "/");
  return new Date(trueTime).getTime();
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
    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: Rem(16);
    }
    &__header {
        position: relative;
    }
    &__rule {
        position: absolute;
        top: 0;
        left: 50%;
        width: Rem(220);
        transform: translateX(-50%);
    }
    &__tips {
        width: 90%;
        margin: Rem(10) auto;
        padding: Rem(15) 0;
        text-align: center;
        color: #f6d147;
        background: url('~assets/img/bargain/tips.png') no-repeat;
        background-size: 100% 100%;
    }
    &__handle {
        display: flex;
        justify-content: space-between;
        margin-top: Rem(10);
        margin-bottom: Rem(20);
    }
    &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: Rem(169);
        height: Rem(60);
        padding-bottom: Rem(6);
        background-image:url('~assets/img/bargain/btn.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fa6852;
        font-size: 10px;
        box-sizing: border-box;
        &.red {
          background: url('~assets/img/bargain/btn2.png') no-repeat;
          background-size: 100% 100%;
        }
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
  position: relative;
  width: Rem(352);
  margin-bottom: Rem(16);
  background: #fff;
  &__status {
    position: absolute;
    right: Rem(24);
    top: Rem(250);
    max-width: Rem(300);
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
    height: Rem(289);
    background: #f1f1f1;
  }
  &__img {
    display: block;
    width: Rem(190);
  }
  &__footer {
    padding: Rem(22);
    font-size: 12px;
  }
  &__name {
    @include ellipsis-single;
  }
  &__info {
    display: flex;
    justify-content: space-between;
  }
}
</style>
