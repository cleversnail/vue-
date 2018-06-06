<template lang="html">
  <div class="home">
    <div class="home__banner">
      <div class="home__btns">
        <router-link :to="{ name: 'introduce'}">
          <div class="a-btn">详情介绍</div>
        </router-link>
        <router-link :to="{ name: 'anatomyMyUnlock'}">
          <div class="a-btn">解锁列表</div>
        </router-link>
      </div>
      <div class="home__title">
        全国有 <span class="color-fa">{{Data.total_unlock_num}}</span> 人参与解锁,
        <router-link :to="{ name: 'anatomyRank' }">
          <span class="home__link"> 排行榜已截止，查看排行 ></span>
        </router-link>
      </div>
    </div>
    <mt-swipe class="home-news" :show-indicators="false" :auto="6000">
      <mt-swipe-item v-for="item in news">
        <router-link :to="{ path: `/anatomy/detail/${item.dissect.id}`}">
          <img class="home-news__headimg" :src="item.share_member.headimg" alt="">
          <span>{{item.share_member.nickname}}解锁了一套{{item.dissect.name}}</span>
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <div class="home__body">
      <imgList :homeData="Data.list" :special="Data.special_category_id"></imgList>
    </div>
    <div class="a-btn--block" @click="toogel">分享给好友,解锁更多吧!</div>
    <aMenu></aMenu>
    <master v-show="showMaster" :type="'home'" @click.native="toogel"></master>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="http://community.kankanyisheng.com/api/frontend/user/iniqrcode?info=1000007" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>即可参与解锁</p>
      </div>
    </div>
    <!-- <preview v-show="true" :imgs="imgs" :index="0"></preview> -->
  </div>
</template>

<script>
import imgList from './common/img-list';
import aMenu from './common/menu';
import master from './common/master';
import share from 'src/utils/anatomy_share';
import preview from './common/preview';
export default {
  data () {
    return {
      Data: [],
      user: null,
      news: null,
      showMaster: false,
      isShow: false,
      imgs: [
        {
          site: 'http://img.kankanyisheng.com/yikan-t/7141504146416vV0Z2NjDdw.jpg'
        },
        {
          site: 'http://img.kankanyisheng.com/yikan-t/8731504146459SlghjgfOjU.jpg'
        },
        {
          site: 'http://img.kankanyisheng.com/yikan-t/9641504146464IJe4zaBTiP.jpg'
        },
      ]
    };
  },
  created() {
    this.getList();
    this.getInfo();
    this.getNews();
  },
  methods: {
    getList() {
      const url = '/api/bk/baike/dissect/dissect_list?type=all';
      this.$axios.get(url).then((res) => {
        this.Data = res.data.data;
      })
    },
    getNews() {
      const url = '/api/bk/baike/dissect/unlock_news';
      this.$axios.get(url).then((res) => {
        this.news = res.data.data;
      })
    },
    getUser() {
      const url = `/api/frontend/user/userinfo`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data.detail;
          const title1 = '我在「医看」收藏了136部全身医学影像高清解剖图谱，来帮我解锁吧！';
          const title2 = '我在「医看」收藏了136部全身医学影像高清解剖图谱，朋友们快来帮我解锁！';
          const desc = '史上最强解剖图谱，分享即可免费查看';
          const link = `${location.origin}/active_web/#/anatomy/unlock?uid=${this.user.id}`;
          share(title1,title2,desc,link);
        }
      })
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
    formatDate(time) {
      return new Date(time).toLocaleTimeString();
    },
  },
  components: {
    imgList,
    aMenu,
    master,
    preview
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
  .home {
    color: #000;
    padding-bottom: 80px;
    &__banner {
      width: 100%;
      background: url('~src/assets/img/anatomy/homebanner.png') 0 0 no-repeat;
      background-size: 100%;
      overflow: hidden;
    }
    &__btns {
      padding: Rem(150) Rem(150) 0 Rem(150);
      display: flex;
      justify-content: space-between;
    }
    &__title {
      font-size: 12px;
      text-align: center;
      letter-spacing: 1px;
      margin-top: Rem(10);
    }
    &__link {
      color: $color-red;
      text-decoration: underline;
    }
  }
  .home-news {
      height: Rem(60);
      margin: Rem(10) Rem(26);
      &__headimg {
        width: Rem(50);
        height: Rem(50);
        border-radius: 50%;
      }
  }
</style>
