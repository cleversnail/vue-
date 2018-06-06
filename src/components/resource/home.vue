<template lang="html">
  <div class="home">
    <div class="home__title">
      <img src="~assets/img/resource/home_title.png" alt="">
    </div>
    <div class="home-leave">
      <img class="home-leave__img" src="~assets/img/resource/leave.png" alt="">
      <a href="/#/detail/20306">
        <img class="home-leave__btn" src="~assets/img/resource/leave_btn.png" alt="">
      </a>
    </div>
    <div class="home__main">
      <ul>
        <li class="list" :class="{'list__remind':index==0}" v-for="(item, index) in data" @click="receive(item.id)">
          <div class="list__main">
            <i class="point">{{item.key_words}}</i>
            <div class="list__title">
              <div class="color-fa">
                {{item.addtime}}
              </div>
              <div class="">
                已有{{getNum(item.get_num, item.addtime)}}人领取
              </div>
            </div>
            <p><!-- 《2017MRI医师上岗证考及参考答案试题集》 -->{{item.name}}</p>
            <div class="list__bottom">
              <span>大小：{{item.size}}</span>
              <span>好友帮助：{{item.mid.num}}/3</span>
              <span v-if="item.mid.status==2 && item.mid.num < 3">状态：未领取</span>
              <span v-else-if="item.mid.status==2 && item.mid.num == 3" class="on">状态：可领取</span>
              <span class="active" v-else>状态：已领取</span>
            </div>
          </div>
          <div class="list__sub">
            <span>领取</span>
          </div>
        </li>
      </ul>
      <div class="home__next" @click="getMore">下一页</div>
    </div>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" :src="`/api/frontend/user/iniqrcode?info=material_${gift_id}_${user&&user.id}&is_temp=true&size=4`" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </div>
    </div>
  </div>
</template>

<script>
import share from './share';
export default {
  data() {
    return {
      data: null,
      gift_id: '',
      isShow: false,
      page: 1
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getData();
    share();
  },
  methods: {
    getData() {
      const url = '/api/frontend/gift/list';
      this.$axios.get(url).then((res)=>{
        if (res.data.status == 0) {
          this.data = res.data.data.data;
        }
      })
    },
    getMore() {
      const url = '/api/frontend/gift/list';
      const params = {
        page: ++ this.page
      }
      this.$axios.get(url, {params}).then((res)=>{
        if (res.data.status == 0 && res.data.data.data.length>0) {
          this.data = this.data.concat(res.data.data.data);
        } else {
          this.page --;
          this.$toast('没有更多数据')
        }
      })
    },
    receive(id) {
      if (subscribe) {
        this.$router.push({name: 'resourceReceive', params:{id}});
      } else {
        this.gift_id = id;
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
    getNum(num, time) {
      const trueTime = time.replace(/\-/g, "/");
      const day = new Date(trueTime).getTime();
      const today = new Date().getTime();
      const diff = Math.ceil((today - day)/1000/24/60/60);
      return +num + diff*103;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.home {
  &__title {
    padding-top: Rem(42);
    img {
      width: 100%;
    }
  }
  &-leave {
    position: relative;
    padding: 0 Rem(42);
    margin-top: Rem(10);
    &__img {
      width: 100%;
    }
    &__btn {
      position: absolute;
      top: Rem(12);
      right: Rem(56);
      width: Rem(190);
    }
  }
  &__main {
    padding: Rem(20) Rem(42);
  }
  &__next {
    width: 100%;
    padding: Rem(20) 0;
    text-align: center;
    color: #fff;
    background-color: #C0584D;
    font-size: 16px;
    &:active {
      background-color: darken(#C0584D, 10);
    }
  }
}
.list {
  display: flex;
  background-color: #fff;
  border-radius: Rem(4);
  margin-bottom: Rem(20);
  color: #000;
  &__remind {
    background: #fff url('~assets/img/resource/new.png') left center no-repeat;
    background-size:3.6rem auto;
  }
  &__main {
    position: relative;
    flex-grow: 1;
    font-size: 12px;
    padding: Rem(21) Rem(36) Rem(21) Rem(19);
  }
  &__sub {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: Rem(76);
    padding: 0 Rem(24);
    background: #FCE76F;
    color: #cf5047;
    font-size: 18px;
    font-weight: 600;
    box-sizing: border-box;
    box-shadow : -4px 0 8px -2px rgba(#000, .1);
    span {
      animation: bigger 1.5s linear infinite;
    }
  }
  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: Rem(20);
    padding-left: Rem(26);
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    margin-top: Rem(20);
    span {
      display: inline-block;
      min-width: Rem(160);
      &.on {
        color: #ed6a3b;
      }
    }
    span.active {
      color: #31BA8A;
    }
  }
}
.point {
  position: absolute;
  left: 0;
  top: 0;
  width: Rem(38.7);
  height: Rem(58.5);
  padding-top: Rem(6);
  text-align: center;
  color: #fff;
  font-weight: 500;
  background: url('~assets/img/resource/index.png') no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
@keyframes bigger {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
