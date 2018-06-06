<template>
<div class="container">
  <div class="head">
    <router-link :to="{path:'/zuimei/hello'}">
      <img class="index" src="../assets/img/index/active2.png" alt="活动详情">
    </router-link>
    <router-link :to="{path:'/zuimei/rank'}">
      <img class="rank" src="../assets/img/rank2.png" alt="活动详情">
    </router-link>
    <img src="../assets/img/index/banner2.png" alt="banner" class="banner">
    <div class="state" v-if="isGuanzhu==0">
      <div class="state-text" @click="show">
        现在报名加入
      </div>
    </div>
    <div v-else>
      <div v-if="info.enroll_info&&info.enroll_info.rank==0">
        <index-state :status="'4'"></index-state>
      </div>
      <div v-if="info.enroll_info&&info.enroll_info.rank!=0">
        <index-state :status="'1'" :id="info.enroll_info.id"></index-state>
      </div>
    </div>
  </div>
  <div class="num">
    已有{{info.enroll_num}}人参加，{{info.show_num}}人查看
  </div>
  <div v-if="!isEmptyObject(info.enroll_info)">
    <company-item :list="info.data" :status="info.enroll_info.status" :page="info.page"></company-item>
  </div>
  <div v-else>
    <company-item :list="info.data" :status="'4'"></company-item>
  </div>

  <div class="footer">
    <div class="btn" @click="addData(0)">
      上一页
    </div>
    <div class="page">
      第{{page}}页
    </div>
    <div class="btn" @click="addData(1)">
      下一页
    </div>
  </div>
  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import companyItem from './companyItem';
import indexState from './common/indexState';
import layer from './common/layer';

export default {
  name: 'index',
  components: {
    companyItem,
    indexState,
    layer
  },
  data() {
    return {
      info: {},
      page: 1,
      isGuanzhu: false,
      showMore: true,
      showLayer: false,
    };
  },
  created() {
    this.$wxShare(1);
    this.getData(this.page);
    this.getUser();
  },
  methods: {
    getData(page) {
      let url = `/api/frontend/vote/index?casual_activity_id=4&page=${page}&limit=10`;
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            this.info = res.data.data;
            if (res.data.data.data.length < 10) {
              this.showMore = false;
            }
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
    addData(type) {
      if (type) {
        if (this.showMore) {
          this.page += 1;
        } else {
          this.$toast('已经没有数据了')
        }
      } else {
        if (this.page === 1) {
          this.page = 1;
        } else {
          this.page -= 1;
        }
        this.showMore = true;
      }
      this.getData(this.page);

    },
    isEmptyObject(e) {
      var t;
      for (t in e)
        return !1;
      return !0
    },
    show() {
      this.showLayer = true;
    },
    close() {
      this.showLayer = false;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/config.scss";

.head {
    position: relative;
    width: 100%;
    min-height: Rem(465);
    // background: url('../assets/img/index/head_bg.png');
    background: url('http://img.kankanyisheng.com/yikan-t/20170411/14918846635056091859.png');
    background-size: cover;
    overflow: hidden;
    img {
        display: block;
        width: Rem(600);
        margin: Rem(40) auto 0;
    }
    .index {
        position: fixed;
        right: Rem(30);
        top: Rem(400);

        width: Rem(100);
        z-index: 99;
    }
    .rank {
        position: fixed;
        left: Rem(30);
        top: Rem(400);

        width: Rem(100);
        z-index: 99;
    }
    .content {
        $length: 450;
        width: Rem($length);
        height: Rem($length);
        margin: Rem(40) auto 0;
        padding-top: Rem(30);
        background: $color-white;
        border-top-left-radius: 100%;
        border-top-right-radius: 100%;
        text-align: center;
        font-size: Rem(32);
    }
    .banner {
        width: Rem(650);
        margin: Rem(70) auto Rem(20);
    }
}
.num {
    text-align: center;
    color: $color-blue;
    font-size: Rem(32);
    margin-top: Rem(10);
}
.state {
    width: Rem(300);
    height: Rem(50);
    margin: Rem(20) auto;
    padding: Rem(10) Rem(15);
    background: $color-blue;
    border-radius: Rem(80);
    color: $color-white;
    font-size: Rem(32);
    line-height: Rem(50);
    overflow: hidden;
    img {
        width: Rem(50);
        height: Rem(50);
        margin-left: Rem(10);
        float: left;
    }
    .state-text {
        // float: left;
        text-align: center;
        color: $color-white;
        margin-left: Rem(20);
    }
}
.footer {
    display: flex;
    justify-content: center;
    padding: Rem(20) 0;
    .page {
        width: Rem(80);
        line-height: Rem(60);
        padding: 0 Rem(10);
        margin: 0 Rem(10);
        text-align: center;
        background: $color-white;
    }
    .btn {
        background: $color-blue;
        padding: Rem(10) Rem(30);
        border-radius: Rem(30);
        color: $color-white;
        a {
            color: $color-white;
        }
    }
}
</style>
