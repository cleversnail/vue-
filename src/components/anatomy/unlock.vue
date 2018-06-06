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
      点击下面按钮，帮我解锁吧!每人可解锁一套解剖图集！
    </div>
    <router-link :to="{ name: 'anatomyHome'}">
      <div class="a-btn--gohome"></div>
    </router-link>
  </div>
  <div class="unlock__main" v-if="type == 2">
    <div v-for="item in list" v-if="isSpecial(item.id)">
      <div class="unlock__headline">
        <span>{{item.name}}</span>
      </div>
      <ul class="list" :class="{'hide': !isBlock(item)}">
        <li class="list__item" v-for="(item2, index) in item.dissect" @click="goDetail(item2.id)">
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
          <div class="list__btn" v-else-if="item2.need_lock == 1 && item2.unlock_info.length == 0" @click="unlock(item2.id,uid)">
            帮ta解锁
          </div>
          <div class="list__btn2" v-else>
            <img class="list__headimg" :src="item2.unlock_info.member.headimg" alt="">
            已解锁
          </div>
        </li>
        <li class="list__model" v-if="isSpecial(item.id) && !isBlock(item)">
          <div class="preferential">
            <p class="preferential__text">一键帮TA解锁整集[{{item.name}}]</p>
            <img class="preferential__img" @click="unlock2(item.dissect,uid)" src="~src/assets/img/anatomy/preferential_btn.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div v-for="item in list" v-if="!isSpecial(item.id)">
      <div class="unlock__headline">
        <span>{{item.name}}</span>
      </div>
      <ul class="list">
        <li class="list__item" v-for="(item2, index) in item.dissect" @click="goDetail(item2.id)">
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
          <div class="list__btn" v-else-if="item2.need_lock == 1 && item2.unlock_info.length == 0" @click="unlock(item2.id,uid)">
            帮ta解锁
          </div>
          <div class="list__btn2" v-else>
            <img class="list__headimg" :src="item2.unlock_info.member.headimg" alt="">
            已解锁
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="unlock__main2" v-if="data && type == 1">
    <div class="unlock__media">
      <img :src="data.title_img" alt="">
      <div class="list__tips">
        {{data.name}}
      </div>
    </div>
    <div class="color-fa tc">
      解锁成功，您的头像将会出现在好友的解锁列表中！
    </div>
    <div class="unlock__btn" @click="unlock(id,uid)">
      帮 TA 解锁
    </div>
  </div>
  <router-link :to="{ path: '/anatomy/home' }">
    <div class="a-btn--block">去我的解剖主页</div>
  </router-link>
  <div class="master-weixin" v-show="isShow" @click="hide">
    <div class="wexin-box">
      <img class="wexin-code" src="../../assets/img/robot/guanzhu.png" alt="">
      <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
      <p>即可参与解锁</p>
    </div>
  </div>
</div>
</template>

<script>
import share from 'src/utils/anatomy_share';
import { shuffle } from 'src/utils/utils';

export default {
  data() {
    return {
      list: null,
      data:null,
      user: null,
      userInfo: null,
      type: 1,
      isShow: false,
      id: '',
      uid: ''
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.uid = this.$route.query.uid;
    this.getUser();
    this.getInfo(this.uid);
    if (this.id) {
      this.type = 1;
      this.getDetail();
    } else {
      this.type = 2;
      this.getData();
    }
  },
  methods: {
    unlock(dissect_id, share_uid) {
      const url = '/api/bk/baike/dissect/unlock';
      const form = {
        dissect_id,
        share_uid,
      }
      if (this.userInfo.subscribe == 1) {
        this.$axios.post(url, form).then((res) => {
          if (res.data.status === 0) {
            this.$toast('成功解锁');
          } else {
            this.$toast(res.data.msg);
          }
          setTimeout(() => {
            location.href = `${location.origin}/active_web/#/anatomy/unlock?uid=${this.uid}`;
          }, 500);
        })
      } else {
        this.isShow = true;
      }
      window.event.stopPropagation();
    },
    unlock2(arr, share_uid) {
      let dissect_id;
      arr.forEach((item) => {
        if (item.need_lock === '1' && item.unlock_info.length <= 0) {
          dissect_id = item.id;
        }
      });
      this.unlock(dissect_id, share_uid);
    },
    getDetail() {
      const url = `/api/bk/baike/dissect/detail/${this.$route.query.id}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
        }
      })
    },
    getData() {
      const url = `/api/bk/baike/dissect/dissect_list?type=all&uid=${this.uid}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.list = res.data.data.list;
          this.special = res.data.data.special_category_id;
        }
      });
    },
    getUser() {
      const url = `/api/frontend/user/userinfo`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.userInfo = res.data.data;
        }
      })
    },
    getInfo(uid) {
      const url = `/api/bk/baike/dissect/unlock_num?uid=${uid}`;
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
    hide() {
      this.isShow = false;
    },
    goDetail(id) {
      this.$router.push({path: `/anatomy/detail/${id}`});
    },
    isBlock(data) {
      let result = true;
      data.dissect.forEach((item) => {
        if (item.need_lock === '1' && item.unlock_info.length <= 0) {
          result = false ;
        }
      });
      return result;
    },
    isSpecial(id) {
      return this.special.indexOf(id) >= 0;
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.unlock {
  padding-bottom: Rem(160);
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
  position: relative;
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
    margin-top: Rem(16);
    padding: Rem(8);
    background: $color-red;
    color: #fff;
    text-align: center;
    border-radius: Rem(5);
  }
  &__btn2 {
    margin-top: Rem(16);
    padding: Rem(8) 0;
    color: #34d28a;
    text-align: center;
  }
  &__headimg {
    width: Rem(40);
    height: Rem(40);
    border-radius: 50%;
  }
  &__model {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $color-white;
    background: rgba(#E0745B, .8);
  }
  &.hide {
    max-height: 5.12rem;
    overflow: hidden;
  }
}
.preferential {
  text-align: center;
  &__img {
    width: Rem(340);
  }
  &__text {
    font-size: 16px;
    text-align: center;
    letter-spacing: 2px;
  }
}
.block {
  width: Rem(140);
}
</style>
