<template>
<div class="container" v-if="info">
  <div class="head">
    <router-link :to="{path:'/kepu/helloer'}">
      <img class="list-index" src="../../assets/img/kepu/xq/xq2.png" alt="活动详情">
    </router-link>
    <div class="company-name">
      <img src="../../assets/img/kepu/xq/xq-2.png" alt="">
    </div>
    <router-link :to="{path:'/kepu'}">
      <img class="index" src="../../assets/img/kepu/xq/xq1.png" alt="返回主页">
    </router-link>
  </div>

  <div class="tit" v-if="info.member">
    <img :src="info.member.headimg" alt="">
    <span>{{info.member.nickname}}</span>
  </div>
  <div class="kepu">
    <div class="kepu-bg">
      <p>
        <span>我为健康科普代言:</span><br/>
        {{info.slogan}}
      </p>
    </div>
    <div class="piaoshu">
      <div class="count">
        <span>票数 : {{info.vote_num}}</span>
        <span>排行 : {{info.rank}}</span>
      </div>
      <p>参赛人 : {{info.name}}</p>
      <p>医院: {{info.hospital}}</p>
    </div>
  </div>
  <div class="footer" v-if="isGuanzhu">
    <div class="btn" v-if="info.my_detail&&info.my_detail.uid===info.uid" @click="share">
      发到朋友圈拉票
    </div>
    <div class="btn" v-else>
      <router-link :to="{path:'/kepu/applyer'}">
        我也要参加 >
      </router-link>
    </div>
    <div class="btn" @click="rate(info)">
      我要投票
    </div>
  </div>
  <div class="footer" v-else>
    <div class="btn" v-if="info.my_detail&&info.my_detail.uid===info.uid" @click="share">
      发到朋友圈拉票
    </div>
    <div class="btn"@click="show" v-else>
        我也要参加 >
    </div>
    <div class="btn" @click="show">
      我要投票
    </div>
  </div>

  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import layer from '../common/layer';
import Qs from 'qs';
import openswipe from '../../utils/openswipe.js';
import kepuShare from '../../utils/kepu-share';


export default {
  name: 'rateer',
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
    let title1 = '「医看」我为科普健康代言活动正在报名中，那些不得不看的活动详情！';
    let title2 = '「医看」我为健康科普代言活动正在报名中，那些不得不看的活动详情！（「医看」有奖活动邀你来参加，丰厚礼品等你拿！）';
    let desc = '「医看」我为健康科普代言活动正在报名中，那些不得不看的活动详情！（「医看」有奖活动邀你来参加，丰厚礼品等你拿！）';
    let url = location.href;
    kepuShare(title1,title2,desc,url);
  },
  methods: {
    getCompany() {
      let id = this.$route.params.id;
      let url = `/api/frontend/vote/detail/${id}?casual_activity_id=3`;
      this.$axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.data.status == 0) {
            this.info = res.data.data;
            this.info.pics.forEach((item) => {
              let img = new Image();
              img.src = item.site;
            })
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
        casual_activity_id : 3
      };
      this.$axios.post(url,data)
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
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
.container {
    background-color: #fff;
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
            width: Rem(540);
        }
    }
}
.tit {
  position: relative;
  img{
    display: inline-block;
    border-radius:50%;
    width: Rem(140);
    height: Rem(140);
    margin: Rem(50) auto;
    margin-left: Rem(70);
    margin-right: Rem(44);
  }
  span{
    font-size: Rem(55);
    font-family: sans-serif;
    font-weight: bold;
    position: absolute;
    top: Rem(80);
  }
}
.kepu{
  display: block;
  width: Rem(700);
  height: Rem(880);
  border-radius: Rem(30);
  background-color: #7aaa13;
  margin: 0 auto;
  padding-top: Rem(48);
  .kepu-bg{
    display: block;
    width: Rem(630);
    height: Rem(600);
    border-radius: Rem(30);
    background-color: #cceb88;
    margin: 0 auto;
    p {
      padding: Rem(50) Rem(34);
      font-size: Rem(36);
      span {
        line-height: Rem(80);
        font-size: Rem(44);
        font-weight: bold;
        font-family: serif;
      }
    }
  }
}
.piaoshu{
  text-align: left;
  margin:  Rem(40) Rem(40);
  .count{
    font-size: Rem(44);
    color: white;
    font-weight: bold;
    span{
      display: inline-block;
      margin-right: Rem(20);
    }
  }
  p {
    font-size: Rem(36);
    color: white;
  }
}
.myheadimg {
    $length: Rem(100);
    display: block;
    width: $length;
    height: $length;
    border-radius: 50%;
    margin: Rem(0) auto;
    border: 1px solid $color-pink;
}
.name {
    text-align: center;
}
.content {
    background: $color-pink;
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
    color: #7aaa13;
    margin-top: Rem(40);
    font-size: Rem(30);
    .btn {
        display: inline-block;
        width: Rem(250);
        height: Rem(50);
        line-height: Rem(50);
        text-align: center;
        border: 2px solid #7aaa13;
        border-radius: Rem(30);
    }
    .btn:last-child {
      background-color: #7aaa13;
      color: white;
    }
}
</style>
