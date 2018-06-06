<template>
<div class="container" v-if="info">
  <div class="head">
    <div class="company-name">
      榜单
    </div>
    <router-link :to="{path:'/kepu'}">
      <img class="index" src="../../assets/img/kepu/ranker/01.png" alt="返回主页">
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
      <img class="jb" src="../../assets/img/kepu/ranker/jb.png" v-if="showjb(index)">
      <div class="flex-item">{{(page-1)*15+index+1}}</div>
      <div class="flex-item">
        <img :src="item.member.headimg" alt="头像" class="headimg">
      </div>
      <div class="flex-item">
        {{item.member.nickname}}
      </div>
      <div class="flex-item">{{item.vote_num}}</div>
      <div class="flex-item">
        <img src="../../assets/img/kepu/ranker/02.png" alt="投票" class="rate" @click="rate(item)">
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
import layer from '../common/layer';
import Qs from 'qs';
import kepuShare from '../../utils/kepu-share';

export default {
  name: 'ranker',
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
    this.showjb();
    let title1 = '「医看」科普健康代言活动排行榜新鲜出炉，看看你是不是最受欢迎代言人？（2016年度健康科普活动人气排行~前50十名百分百中奖~）';
    let title2 = '医看」科普健康代言活动排行榜新鲜出炉，看看你是不是最受欢迎代言人？';
    let desc = '医看」科普健康代言活动排行榜新鲜出炉，看看你是不是最受欢迎代言人？';
    let url = `${location.origin}/active_web/#/kepu/ranker`;
    kepuShare(title1,title2,desc,url);
  },
  methods: {
    showjb (index) {
      let rak = (this.page-1)*15+index+1;
      rak = rak.toString();
      if( rak<= 50){
        return true;
      }else if ( rak >= 58 && rak <=198 && rak.charAt(rak.length-1) == 8 ) {
        return true;
      }else {
        return false;
      }
    },
    getData(page) {
      let url = `/api/frontend/vote/index?casual_activity_id=3&page=${page}&limit=15`;
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
    show() {
      this.showLayer = true;
    },
    close() {
      this.showLayer = false;
    },
    addData(type) {
      if (type) {
        if (this.page < Math.ceil(this.info.enroll_num/15)) {
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
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
.container {
    background-color: #FFF;
}
.title {
  padding-left: Rem(20);
}
.head {
    position: relative;
    height: Rem(100);
    background: #7aaa13;
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
    color: #7aaa13;
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
        margin-left: Rem(10);
        margin-bottom: Rem(10);
        position: relative;
        .jb{
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: Rem(40);
          height: Rem(50);
        }
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
        width: Rem(100);
        line-height: Rem(60);
        padding: 0 Rem(10);
        margin: 0 Rem(10);
        text-align: center;
        background: $color-white;
    }
    .btn {
        background: #7aaa13;
        padding: Rem(10) Rem(30);
        border-radius: Rem(30);
        color: #fff;
        a {
            color: $color-white;
        }
    }
}
</style>
