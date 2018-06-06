<template>
<div class="container" v-if="info">
  <div class="head">
    <router-link :to="{path:'/zuimei/hello'}">
      <img class="list-index" src="../assets/img/index/active2.png" alt="活动详情">
    </router-link>
    <div class="company-name">
      <img src="../assets/img/title2.png" alt="">
    </div>
    <router-link :to="{path:'/zuimei'}">
      <img class="index" src="../assets/img/index2.png" alt="返回主页">
    </router-link>
  </div>
  <img :src="info.member.headimg" alt="" class="myheadimg" v-if="info.member">
  <div class="name" v-if="info.member">
    {{info.member.nickname}}
  </div>
  <div class="content">
    <div class="swipe" @click="open(info.pics)">
      <img :src="info.pics[0].site" alt="" v-if="info.pics">
    </div>
    <div class="info">
      <div>
        票数：{{info.vote_num}}
      </div>
      <div>
        排名：{{info.rank}}
      </div>
    </div>
    <div class="text">
      <!-- <p>主题:《{{info.zhicheng}}》</p> -->
      <p>参赛人:{{info.name}}</p>
      <p>医院:{{info.hospital}}</p>
      <p>描述:{{info.content}}</p>
    </div>
  </div>
  <div class="footer" v-if="isGuanzhu">
    <div class="btn" v-if="info.my_detail&&info.my_detail.uid===info.uid" @click="share">
      发到朋友圈拉票
    </div>
    <div class="btn" v-else>
      <router-link :to="{path:'/zuimei/apply'}">
        我也要参加
      </router-link>
    </div>
    <div class="btn" @click="rate(info)">
      我要投票
    </div>
  </div>
  <div class="footer" v-else>
    <div class="btn" @click="show">
      我也要参加
    </div>
    <div class="btn" @click="rate(info)">
      我要投票
    </div>
  </div>

  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import layer from './common/layer';
import Qs from 'qs';
import openswipe from '../utils/openswipe.js';

export default {
  name: 'rate',
  components: {
    layer
  },
  data() {
    return {
      info: {},
      user: {},
      showLayer: false,
      isGuanzhu: false
    };
  },
  created() {
    this.getCompany();
    this.getUser();
  },
  methods: {
    getCompany() {
      let id = this.$route.params.id;
      let url = `/api/frontend/vote/detail/${id}?casual_activity_id=4`;
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            this.info = res.data.data;
            this.info.pics.forEach((item) => {
              let img = new Image();
              img.src = item.site;
            })
            this.$wxShare(3, this.$route.params.id, this.info.member);
          }
        })
    },
    getUser() {
      let url = `/api/frontend/user/userinfo`;
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            this.isGuanzhu = !!res.data.data.subscribe;
          }
        })
    },
    share() {
      this.$toast('请点击右上角分享按钮，分享');
    },
    show() {
      this.showLayer = true;
    },
    close() {
      this.showLayer = false;
    },
    rate(item) {
      let url = `/api/frontend/vote/vote/${item.id}`;
      let data = {
        casual_activity_id : 4
      };
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.status == 0) {
            this.$toast('投票成功');
            item.vote_num = parseInt(item.vote_num) + 1;
          } else if (res.data.status == 2003) {
            this.show();
          } else {
            this.$toast(res.data.msg);
          }
        })

    },
    isEmptyObject(e) {
      var t;
      for (t in e)
        return !1;
      return !0
    },
    open(pics) {
      openswipe(pics)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.container {
    background-color: #F9ECF3;
}
.head {
    position: relative;
    height: Rem(100);
    text-align: center;
    line-height: Rem(100);
    font-size: Rem(38);
    color: $color-white;
    .list-index {
        position: absolute;
        left: Rem(20);
        top: Rem(10);
        width: Rem(80);
    }
    .index {
        position: absolute;
        top: Rem(10);
        right: Rem(10);
        width: Rem(80);
    }
    .company-name {
        width: 100%;
        img {
            width: Rem(440);
            margin-top: Rem(10);
        }
    }
}
.myheadimg {
    $length: Rem(100);
    display: block;
    width: $length;
    height: $length;
    border-radius: 50%;
    margin: Rem(10) auto;
    border: 1px solid $color-blue;
}
.name {
    text-align: center;
}
.content {
    background: $color-blue;
    padding: Rem(30);
    border-radius: Rem(30);
    margin: Rem(20);
    .mint-swipe {
        height: Rem(780);
    }
    .swipe {
        height: 100%;
        background: $color-white;
        img {
            width: 100%;
        }
    }
    .info {
        display: flex;
        justify-content: space-around;
        margin: Rem(10) 0;
        color: $color-white;
        font-size: Rem(40);
    }
    .text {
        padding-left: Rem(30);
        color: $color-white;
        font-size: Rem(32);
    }
}
.footer {
    display: flex;
    justify-content: space-around;
    padding-bottom: Rem(40);
    color: $color-white;
    .btn {
        background: $color-blue;
        padding: Rem(10) Rem(30);
        border-radius: Rem(30);
        a {
            color: $color-white;
        }
    }
}
</style>
