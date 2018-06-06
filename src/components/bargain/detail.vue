<template lang="html">
<div class="detail" v-if="data&&user&&config">
  <div class="detail__container" >
    <div class="detail__header">
      <div class="detail__user">
        <img class="detail__headimg" ref="headimg" :src="imgFilter(user.headimg)" alt="">
        <span class="detail__name">{{user.true_name}}</span>
      </div>
      <div>
        <router-link :to="{name: 'bargainHome', query:{activity_id: config.id}}" class="detail__link">活动主页>></router-link>
        <router-link :to="{name: 'bargainRule', query:{activity_id: config.id}}" class="detail__link">活动规则>></router-link>
      </div>
    </div>
    <div class="book">
      <img class="book__logo" src="~assets/img/bargain/logo.png" alt="医看">
      <div class="book__container">
        <img class="book__img" :src="data.pic_url" alt="">
        <div class="book__main">
          <div class="book__name">
          《{{data.title}}》
          </div>
          <p class="book__content">{{data.introduction}}</p>
          <div class="book__info">
            <div class="book__price">
              售价: <span class="color-fa">￥{{data.value}}</span>
            </div>
            <div class="book__num">
              库存: <span class="color-fa">{{data.stock}}/{{data.total}}</span>
            </div>
            <div class="book__status" v-if="!isStart">
              未开始
            </div>
            <div class="book__status" v-else-if="data.stock<=0">
              已抢光
            </div>
            <div class="book__status active" v-else>
              砍价中...
            </div>
          </div>
        </div>
      </div>
      <div class="book__tips" v-if="!isStart">
        <span class="point"></span>活动开始后，最先完成砍价的前{{data.total}}人,免费获得此书
      </div>
      <div class="book__tips" v-else>
        <span class="point"></span>点击手机下方两个按钮，两种方法均可砍价并免费获得此书
      </div>
    </div>
    <mt-progress :value="percent" :bar-height="11">
      <div slot="start">￥0</div>
      <div slot="end">￥{{data.value}}</div>
    </mt-progress>
    <div class="detail__alert" v-if="!isStart">
      开始时间: {{data.game_at}} 请准时参加
    </div>
    <div class="detail__tips" v-else-if="!isSelf">
      已经砍了{{goodsValue}}元，还需砍掉{{remain(data.value, goodsValue)}}元
    </div>
    <div class="detail__tips" v-else-if="data.get_goods_id > 0 && data.get_goods_id == data.id">
      <div>
        已经成功砍了{{goodsValue}}元,点击按钮领取,<span class="color-fa">先 [领券] 再 [拿书]</span>
      </div>
      <p>(领券后进入拿书页面，拍下自动抵扣所有费用)</p>
      <div class="book__handle">
        <a class="book__btn" v-if="data.status == 1" @click="recieve">领券</a>
        <a class="book__btn over" v-else>已领券</a>
        <a class="book__btn" :href="data.goods_url">拿书</a>
      </div>
    </div>
    <div class="detail__tips" v-else-if="data.get_goods_id>0 && data.get_goods_id != data.id">
      <p>已经砍了{{goodsValue}}元，由于<span class="color-fa">每人限制免费领取一本书！</span></p>
      <p>默认最快完成的一本为砍到商品，<router-link :to="{name: 'bargainDetail', params: {id: data.get_goods_id}, query:{activity_id: config.id}}" class="detail__link2">去查看我最快砍到的商品</router-link></p>
    </div>
    <div class="detail__tips" v-else-if="data.stock<=0">
      抱歉，这本书已被抢光，请尝试别的书籍，<router-link :to="{name: 'bargainHome', query:{activity_id: config.id}}" class="detail__link2">点击去活动主页</router-link>
    </div>
    <div class="detail__tips" v-else>
      已经砍了{{goodsValue}}元，还需砍掉{{remain(data.value, goodsValue)}}元
    </div>
    <div class="list">
      <div class="list__title">
        砍价高手
      </div>
      <ul>
        <li class="list__item" v-for="item in data.help">
          <img class="detail__headimg" :src="item.member.headimg" alt="">
          <div class="list__info">
            <p>{{item.time}}</p>
            <p>{{item.member.true_name}}帮你砍了一刀</p>
          </div>
          <div class="list__price">
            {{item.value}}元
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="detail__handle" v-if="!isStart" @click="share">
    将这个好消息告诉好友
  </div>
  <div class="detail__handle" v-else-if="isSelf">
    <a class="detail__btn" :style="{background:config.button_color}" @click="showPoster">生成砍价海报</a>
    <a class="detail__btn" :style="{background:config.button_color}" @click="share">分享给好友帮忙砍价</a>
  </div>
  <div class="detail__handle" v-else>
    <router-link class="detail__btn" :style="{background:config.button_color}" :to="{name: 'bargainHome', query:{activity_id: config.id}}">我也要参加</router-link>
    <a class="detail__btn" :style="{background:config.button_color}" @click="bargain">帮TA砍一刀</a>
  </div>
  <div class="poster" v-show="isShowPoster">
    <img class="poster__title" src="~assets/img/bargain/poster_title.png" alt="">
    <!-- <canvas class="poster__img" ref="canvas" data-width="250" data-height="444" v-show="false"></canvas>
    <img class="poster__img" :src="inviteImg" alt=""> -->
    <img class="poster__img" :src="`/api/frontend/user/bargainimg?member_id=${user.id}&goods_id=${data.id}`" alt="">
    <a class="poster__btn" @click="hidePoster">返回</a>
  </div>
  <div class="poster" v-if="isShowShare" @click="share">
    <img class="share__img" src="~assets/img/bargain/share.png" alt="" v-if="isStart">
    <img class="share__img" src="~assets/img/bargain/share_1.png" alt="" v-else>
  </div>
  <!-- 关注公众号 -->
  <div class="master-weixin" v-show="isShow" @click="hide">
    <div class="wexin-box">
      <template v-show="isSelf">
        <img class="wexin-code" src="~assets/img/bargain/guanzhu.jpeg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </template>
      <template v-show="!isSelf">
        <img class="wexin-code" ref="code" :src="`/api/frontend/user/iniqrcode?info=bargain_${data.id}_${user.id}&is_temp=true&size=4`" alt="">
        <p>扫码帮TA砍一刀</p>
      </template>
    </div>
  </div>
</div>
</template>

<script>
import share from './share';
import { createInvitation } from 'src/utils/utils';
export default {
  data() {
    return {
      data: null,
      user: null,
      isSelf: true,
      isShowPoster: false,
      isShowShare: false,
      isShow: false,
      inviteImg: '',
    }
  },
  computed: {
    goodsValue() {
      const help = this.data.help;
      let value = 0;
      if (help.length == 0) {
        return 0;
      } else {
        help.forEach((item)=>{
          value+= Number(item.value);
        })
      }
      return Number(value.toFixed(2));
    },
    percent() {
      const num = this.goodsValue/this.data.value;
      return Math.floor(num*100);
    },
    isStart() {
      const time = this.data && this.data.game_at;
      const trueTime = time && time.replace(/\-/g, "/");
      const start = new Date(trueTime).getTime();
      const now = new Date().getTime();
      return start < now;
    },
    config() {
      return this.$store.state.config;
    },
  },
  created() {
    this.initData();
  },
  watch:{
    '$route' (to,from){
      this.initData();
    }
  },
  methods: {
    initData() {
      const id = this.$route.params.id;
      const uid = this.$route.query.id;
      this.getData(id, uid);
    },
    getData(id, uid) {
      let url = `/api/frontend/bargain/show/${id}`;
      if (uid) {
        url = url + '?member_id='+uid;
      }
      this.$axios.get(url).then((res)=>{
        if (res.data.status === 0) {
          this.data = res.data.data;
          this.getUser(uid);
        }
      })
    },
    getUser(id) {
      let url = '/api/frontend/user/index';
      if (id) {
        url = url+'?id='+id;
      }
      this.$axios.get(url).then((res) => {
        if (res.data.status == 0) {
          this.user = res.data.data.userinfo;
          this.isSelf = !!res.data.data.isself;
          let title = `［医看］活动，《${this.data.title}》即将砍价免费送`;
          let title2 = `［医看］活动，《${this.data.title}》即将砍价免费送,请准时参加！`;
          let desc = `请小伙伴们准时参加！`;
          if (this.isStart) {
            title = `《${this.data.title}》砍价免费送`;
            title2 = `${this.user.true_name}的书就快到手了，小伙伴们，快来帮我砍一刀吧`;
            desc = `${this.user.true_name}的书就快到手了，小伙伴们，快来帮我砍一刀吧`;
          }
          const link = `${location.origin}/active_web/#/bargain/detail/${this.data.id}?id=${this.user.id}`;
          share(title,title2,desc, link, this.config.share_image);
        }
      })
    },
    bargain() {
      const url = '/api/frontend/bargain/help';
      const params = {
        goods_id: this.data.id,
        member_id: this.user.id
      }
      if (subscribe) {
        this.$axios.post(url, params).then((res) => {
          this.$toast(res.data.msg);
          if (res.data.status == 0) {
            this.initData();
          }
        })
      } else {
        this.isShow = true;
      }
    },
    recieve() {
      const url = `/api/frontend/bargain/get_ticket/${this.data.id}`;
      if (!subscribe) {
        this.isShow = true;
      } else if (!isrenzheng) {
        this.$messagebox.confirm('认证用户才能领取，是否认证？').then(action => {
          location.href = '/muke/#/identificate';
        });
      } else {
        this.$axios.put(url).then((res) => {
          this.$toast(res.data.msg);
          if (res.data.status == 0) {
            this.initData();
          }
        })
      }
    },
    remain(total, now) {
      const value = total - now;
      return value.toFixed(2);
    },
    showPoster() {
      // var bg = this.imgFilter(this.data.bg_img)
      // this.imgTogether(bg, this.user.name, (url)=>{
      //   this.inviteImg = url;
      // });
      this.isShowPoster = true;
    },
    hidePoster() {
      this.isShowPoster = false;
    },
    share() {
      this.isShowShare = !this.isShowShare;
    },
    hide() {
      this.isShow = false;
    },
    imgFilter(img) {
      var type1 = 'http://wx.qlogo.cn';
      var type2 = 'http://img.kankanyisheng.com';
      if (img.indexOf(type1)>-1) {
        return img.replace(type1, '');
      } else if(img.indexOf(type2)>-1) {
        return img.replace(type2, '/oss-img');
      }
    },
    imgTogether(bg,name, cb) {
      const canvas = this.$refs.canvas;
      const headimg = this.$refs.headimg;
      const code = this.$refs.code;
      const doms = {
        canvas,
        headimg,
        code
      }
      createInvitation(bg, name, doms, cb);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.detail {
    &__container {
        width: Rem(702);
        margin: Rem(20) auto Rem(110);
        padding: Rem(12) Rem(23);
        min-height: calc(100vh - 1.3rem);
        background: #fff;
        border-radius: Rem(3);
        box-shadow: 0 0 17.82px 0.18px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__headimg {
        @include circle(Rem(62));
        display: inline-block;
        background: $color-red;
        vertical-align: middle;
    }
    &__name {
        margin-left: Rem(10);
        vertical-align: middle;
    }
    &__link {
        display: inline-block;
        padding: Rem(6) Rem(10);
        border: 1px solid #f14853;
        border-radius: Rem(3);
        background: #fee6e5;
        font-size: 12px;
        color: #f14853;
    }
    &__link2 {
      text-decoration: underline;
      color: blue;
    }
    &__tips {
      margin-top: Rem(10);
      text-align: center;
      font-size: 12px;
    }
    &__alert {
      padding: Rem(5) 0;
      background: $color-red;
      text-align: center;
      color: #fff;
    }
    &__handle {
      position: fixed;
      left: 0;
      bottom: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: Rem(110);
      background: #387fd1;
      color: #fff;
    }
    &__btn {
      width: 50%;
      color: #fff;
      line-height: Rem(110);
      text-align: center;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
    }
}

.book {
    position: relative;
    margin: Rem(20) 0;
    padding: Rem(32) 0  Rem(12);
    background: #f1f1f1;
    &__container {
      display: flex;
      justify-content: space-around;
      width: 85%;
      margin-left: 15%;
    }
    &__logo {
      position: absolute;
      left: Rem(6);
      top: Rem(6);
      width: Rem(120);
    }
    &__img {
        width: Rem(160);
        height: Rem(240);
        flex-shrink: 0;
    }
    &__main {
        width: Rem(327);
        color: #2f312d;
    }
    &__content {
        font-size: 10px;
        color: #808285;
        line-height: 1.2;
        @include ellipsis-multi(4);
    }
    &__info {
      position: relative;
      margin-top: Rem(20);
      padding: Rem(6) 0;
    }
    &__status {
      position: absolute;
      left: 60%;
      top: 45%;
      padding: Rem(5) Rem(17);
      background: #c0c1c2;
      border-radius: Rem(24);
      color: #fff;
      font-size: 12px;
      &.active {
        top: 0;
        background: #06bebd;
      }
    }
    &__tips {
      margin-top: Rem(10);
      text-align: center;
      font-size: 10px;
      color: $color-red;
    }
    &__handle {
      display: flex;
      justify-content: space-between;
      width: Rem(370);
      margin: Rem(20) auto;
    }
    &__btn {
      width: Rem(166);
      height: Rem(62);
      line-height: Rem(62);
      border: 1px solid $color-red;
      border-radius: Rem(4);
      color: $color-red;
      background: #f9e8e6;
      &.over {
        background: #d8d9da;
        border: 1px solid #808182;
        color: #808182;
      }
    }
}
.list {
  position: relative;
  margin-top: Rem(60);
  padding-top: Rem(20);
  border-top: 1px dotted #666;
  &__title {
    position: absolute;
    left: 50%;
    top: 0;
    width: Rem(180);
    background: #fff;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  &__item {
    position:relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: Rem(15) 0;
    border-bottom: 1px solid #c5ced5;
  }
  &__info {
    flex-grow: 1;
    margin-left: Rem(20);
    font-size: 12px;
  }
  &__price {
    color: $color-red;
  }
}

@media(-webkit-min-device-pixel-ratio: 2) {
  .list__item {
    border: none;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        background: #c5ced5;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        transform-origin: 0 0;
    }
  }
}

.poster {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: Rem(30);
  background: rgba(#000, .8);
  color: #fff;
  &__title {
    width: 100%;
  }
  &__img {
    display: block;
    width: Rem(480);
    margin: Rem(20) auto;
  }
  &__btn {
    display: block;
    width: Rem(180);
    margin: Rem(45) auto;
    padding: Rem(16) 0;
    border: 1px solid #fff;
    text-align: center;
    color: #fff;
  }
}

.share__img {
  width: 100%;
}

.point {
  @include circle(Rem(16));
  display: inline-block;
  margin-right: Rem(6);
  background: $color-red;
}

</style>
