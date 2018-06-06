<template>
<div class="unlock">
  <div class="unlock__header">
    <img class="unlock__bg" src="~src/assets/img/anatomy/unlock.png" alt="">
    <div class="unlock__headbox" v-if="user">
      <div class="unlock__user">
        <img :src="user.member.headimg" alt="">
        <p>{{user.member.nickname}}</p>
      </div>
      <div class="unlock__title">
        <h2>医看影像解剖大全</h2>
        <h3>已经解锁 <span class="color-fa">{{user.unlock_num}}/{{user.total_num}}</span> 部</h3>
      </div>
      <div class="block"></div>
    </div>
    <div class="unlock__tips">
      点击右上角“…”，分享到朋友圈，让好友免费帮你解锁！
    </div>
    <router-link :to="{ name: 'anatomyHome'}">
      <div class="a-btn--gohome"></div>
    </router-link>
  </div>
  <div class="unlock__main" v-for="item in data">
    <div class="unlock__headline">
      <span>{{item.name}}</span>
    </div>
    <ul class="list">
      <li class="list__item" v-for="item2 in item.dissect" @click="goDetail(item2.id)">
        <div class="list__media">
          <img :src="item2.title_img" alt="">
          <div class="list__tips">
            {{item2.name}}
          </div>
        </div>
        <div class="list__btn2" v-if="item2.need_lock == 2">
          <img class="list__headimg" src="http://wx.qlogo.cn/mmhead/PiajxSqBRaEKUD0Gfy5icWqrI5oxvoNwbWefFD54dl9lJNkzmEbxGib1g/0" alt="">
          已解锁
        </div>
        <div class="list__btn" v-else-if="item2.need_lock == 1 && item2.unlock_info.length == 0">
          未解锁
        </div>
        <div class="list__btn2" v-else>
          <img class="list__headimg" :src="item2.unlock_info.member.headimg" alt="">
          已解锁
        </div>
      </li>
    </ul>
  </div>
  <div class="a-btn--block" @click="toogel">分享给好友,解锁更多吧!</div>
  <master v-show="showMaster" :type="'home'" @click.native="toogel"></master>
  <div class="master-weixin" v-show="isShow" @click="hide">
    <div class="wexin-box">
      <img class="wexin-code" src="http://community.kankanyisheng.com/api/frontend/user/iniqrcode?info=1000007" alt="">
      <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
      <p>即可参与解锁</p>
    </div>
  </div>
</div>
</template>

<script>
import share from 'src/utils/anatomy_share';
import master from './common/master';
import { shuffle } from 'src/utils/utils';

export default {
  components: {
    master,
  },
  data() {
    return {
      data: null,
      user: null,
      showMaster: false,
      isShow: false,
    }
  },
  created() {
    this.getData();
    this.getInfo();
  },
  methods: {
    getData() {
      const url = '/api/bk/baike/dissect/dissect_list?type=all';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = shuffle(res.data.data.list);
        }
      });
    },
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
    goDetail(id) {
      this.$router.push({path: `/anatomy/detail/${id}`});
    },
    toogel() {
      if (subscribe) {
        this.showMaster = !this.showMaster;
      } else {
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.unlock {
  padding-bottom: 80px;
  &__header {
    position: relative;
    color: $color-white;
  }
  &__bg {
    width: 100%;
  }
  &__headbox {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 Rem(40);
  }
  &__user {
    img {
      $length: Rem(90);
      width: $length;
      height: $length;
      border-radius: 50%;
    }
    p {
      width: Rem(140);
      @include ellipsis-single;
    }
  }
  &__main {
    padding: 0 Rem(20);
  }
  &__title {
    text-align: center;
    flex-grow: 1;
    h2 {
      margin-bottom: Rem(10);
      font-size: Rem(36);
      letter-spacing: 6px;
    }
  }
  &__tips {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: Rem(6) 0;
    text-align: center;
    font-size: Rem(24);
    background: rgba(0,0,0,.6);
    color: $color-red;
    @include ellipsis-single;
  }
  &__headline {
    padding: Rem(40) 0;
    font-size: Rem(32);
    text-align: center;
    span {
      border-bottom: 1px solid $color-red;
    }
  }
  &__main2 {
    padding: Rem(100) Rem(50);
    text-align: center;
  }
  &__media {
    position: relative;
    width: Rem(300);
    margin: 0 auto Rem(40);
    img {
      width: 100%;
    }
  }
  &__btn {
    width: Rem(330);
    height: Rem(80);
    margin: Rem(40) auto;
    color: #fff;
    font-size: Rem(36);
    line-height: Rem(80);
    background: url('~src/assets/img/anatomy/btn3.png') no-repeat;
    background-size: contain;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    margin-bottom: Rem(20);
    &:not(:nth-of-type(4n)) {
      margin-right: Rem(20);
    }
  }
  &__media {
    position: relative;
    img {
      width: Rem(162.5);
      height: Rem(162.5);
    }
  }
  &__tips {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: Rem(20);
    text-align: center;
    background: rgba(0,0,0,.7);
    color: #fff;
    @include ellipsis-single;
  }
  &__btn {
    margin-top: Rem(10);
    padding: Rem(8);
    text-align: center;
    font-size: Rem(20);
  }
  &__btn2 {
    margin-top: Rem(10);
    padding: Rem(8) 0;
    color: #34d28a;
    text-align: center;
    font-size: Rem(20);
  }
  &__headimg {
    width: Rem(40);
    height: Rem(40);
    border-radius: 50%;
  }
}
.block {
  width: Rem(140);
}
</style>
