<template>
<div class="container" v-if="info">
  <div class="head">
    <div class="company-name">
      榜单
    </div>
    <router-link :to="{path:'/zuimei'}">
      <img class="index" src="../assets/img/rank_index.png" alt="返回主页">
    </router-link>
  </div>
  <div class="content">
    <div class="title flex">
      <div class="flex-item">排名</div>
      <div class="flex-item">头像</div>
      <div class="flex-item">昵称</div>
      <div class="flex-item">票数</div>
      <div class="flex-item">投票</div>
    </div>
    <!-- <div class="load-wrap" ref="wrapper" :style="{ height: wrapperHeight + 'px' }"> -->
    <!-- <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
    <div class="rank-item flex" v-for="(item,index) in info.data">
      <div class="flex-item">{{(page-1)*15+index+1}}</div>
      <div class="flex-item">
        <img :src="item.member.headimg" alt="头像" class="headimg">
      </div>
      <div class="flex-item">
        {{item.member.nickname}}
      </div>
      <div class="flex-item">{{item.vote_num}}</div>
      <div class="flex-item">
        <img src="../assets/img/rate2.png" alt="投票" class="rate" @click="rate(item)">
      </div>
    </div>
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
import layer from './common/layer';
import Qs from 'qs';

export default {
  name: 'rank',
  components: {
    layer
  },
  data() {
    return {
      info: {},
      user: {},
      showLayer: false,
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0,
      page: 1,
      showMore: true,
    }
  },
  created() {
    this.getData(this.page);
    this.$wxShare(1);
  },
  methods: {
    getData(page) {
      let url = `/api/frontend/vote/index?casual_activity_id=4&page=${page}&limit=15`;
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status == 0) {
            this.info = res.data.data;
            if (res.data.data.data.length < 15) {
              this.showMore = false;
            }
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
    share() {
      this.$toast('请点击右上角分享按钮，分享');
    },
    rate(item) {
      let url = `/api/frontend/vote/vote/${item.id}`;
      let data = {
        casual_activity_id : 4
      };
      this.$axios.post(url, data)
        .then((res) => {
          if (res.data.status == 0) {
            item.vote_num = parseInt(item.vote_num) + 1;
            this.$toast('投票成功');
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
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {

        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    }
  },
  // mounted() {
  //   this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/config.scss";
.container {
    background-color: #F9ECF3;
}
.head {
    position: relative;
    height: Rem(100);
    background: $color-blue;
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
.content {
    // padding: Rem(45);
    min-height: Rem(1100);
    margin-top: Rem(20);
    font-size: Rem(36);
    color: $color-blue;
    .flex {
        display: flex;
        justify-content: space-between;
        .flex-item {
            width: 20%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .rate {
                width: Rem(91);
            }
            .headimg {
                width: Rem(50);
                height: Rem(50);
                border-radius: 50%;
            }
        }
    }
    .rank-item {
        margin-bottom: Rem(10);
    }
    .load-wrap {
        overflow: scroll;
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
