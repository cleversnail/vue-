<template>
<div class="container">
  <div class="head">
    <router-link :to="{path:'/kepu/helloer'}">
      <img class="index" src="../../assets/img/kepu/hd.png" alt="活动详情">
    </router-link>
    <router-link :to="{path:'/kepu/ranker'}">
      <img class="rank" src="../../assets/img/kepu/bd.png" alt="活动详情">
    </router-link>
    <img src="../../assets/img/kepu/wenzi.png" class="banner">
    <div class="state" v-if="!isGuanzhu">
      <div class="state-text" @click="show" v-if="info.enroll_info&&info.enroll_info.rank==0">
        现在报名> >
      </div>
      <div class="state-text"  @click="show" v-else>
        报名成功
      </div>
    </div>
    <div class="state" v-else>
      <div class="state-text" v-if="info.enroll_info&&info.enroll_info.rank==0">
        <router-link :to="{path:'/kepu/applyer'}">
        现在报名> >
        </router-link>
      </div>
      <div class="state-text" v-else>
        报名成功
      </div>
    </div>
  </div>
  <div class="num">
    已有{{ info.enroll_num }}人参加，{{info.show_num}}人查看
  </div>
  <div class="kepu-container">
    <ul>
      <li v-for="(item,index) in info.data" @click="gorateer(item)">
        <div class="header-img">
          <img :src="item.member.headimg" alt="">
          <h2>第{{(page-1)*10+index+1}}名 {{ item.vote_num }}票</h2>
        </div>
        <div class="zzh">
          <div class="name">
            <p>代言人 : {{item.name}}</p>
            <p>医院 : {{item.hospital}}</p>
          </div>
          <div class="say">
            <p>{{item.slogan}}</p>
          </div>
          <div class="chose">
            投票!
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="footer">
    <div class="btn" @click="addData(0)">
      < 上一页
    </div>
    <div class="page">
      第{{page}}/{{Math.ceil(info.enroll_num/10)}}页
    </div>
    <div class="btn" @click="addData(1)">
      下一页 >
    </div>
  </div>
  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import companyItem from './companyItemer';
import indexState from '../common/indexState';
import layer from '../common/layer';
import kepuShare from '../../utils/kepu-share';

export default {
  name: 'indexer',
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
    kepuShare();
    this.getData(this.page);
    this.getUser();
  },
  methods: {
    rate (item) {
      let url = `/api/frontend/vote/vote/${item.id}`;
      let data = {
        casual_activity_id : 3
      };
      this.$axios.post(url,data)
          .then((res) => {
              if (res.data.status == 0) {
                  this.$toast('投票成功');
                  item.vote_num=parseInt(item.vote_num)+1;
              } else if(res.data.status == 2003){
                this.show();
              } else {
                  this.$toast(res.data.msg);
              }
          })
    },
    gorateer (item) {
      const event = window.event;
      if(event.target.className == 'chose') {
          this.rate(item);
      }else {
          this.$router.push(`/kepu/rateer/${item.id}`);
      }

    },
    getData(page) {
      let url = `/api/frontend/vote/index?casual_activity_id=3&page=${page}&limit=10`;
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
        if (this.page < Math.ceil(this.info.enroll_num/10)) {
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
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
.head {
    position: relative;
    width: 100%;
    height: Rem(465);
    background: url('~src/assets/img/kepu/tu.png');
    background-size: cover;
    overflow: hidden;
    img {
        display: block;
        width: Rem(600);
        margin: Rem(40) auto 0;
    }
    .index {
        position: fixed;
        right: Rem(20);
        top: Rem(400);
        width: Rem(100);
        height: Rem(100);
        z-index: 99;
    }
    .rank {
        position: fixed;
        left: Rem(20);
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
    .banner{
      display: block;
      height: Rem(266);
      width: Rem(600);
    }
}
.num {
    text-align: center;
    font-size: Rem(32);
    margin-top: Rem(20);
}
.state {
    width: Rem(250);
    height: Rem(50);
    margin: Rem(50) auto;
    padding: Rem(10) Rem(15);
    border: 2px solid #f77b0e;
    border-radius: Rem(80);
    color: $color-white;
    font-size: Rem(32);
    line-height: Rem(50);
    overflow: hidden;
    .state-text {
        font-size: 18px;
        line-height: Rem(50);
        text-align: center;
        color: #f77b0e;
        font-weight: bold;
        a {
            color: #f77b0e;
        }
    }
}
.kepu-container {
    padding: 0 Rem(20);
    li{
      display: inline-block;
      position: relative;
      float: left;
      width:  Rem(300);
      height: Rem(450);
      margin: Rem(20) Rem(20);
      border: 2px solid #8fc320;
      background: url('~src/assets/img/kepu/beijin.png') no-repeat;
      background-size: cover;
      .header-img {
        text-align: center;
        margin-top: Rem(10);
        img{
          display: inline-block;
          width: Rem(70);
          height: Rem(70);
          margin: Rem(6);
        }
        h2{
          font-size: Rem(30);
        }
      }
      .zzh{
          font-family: inherit;
          padding: 0 Rem(8);
          .name {
            font-size: Rem(26);
            line-height: 1.2;
            p{
              width: 100%;
              height: Rem(30);
              overflow: hidden;
            }
          }
          .say {
            display: inline-block;
            margin-top: Rem(20);
            width: Rem(276);
            height: Rem(130);
            background-color: white;
            border-radius: 8%;
            font-size: Rem(26);
            p{
              margin-top: Rem(10);
              position: relative;
              line-height: 20px;
              max-height: 64px;
              overflow: hidden;
              padding:0 Rem(6);
            }
              p::after{
                content: " ";
                position: absolute;
                bottom: 0;
                right: 0;
                padding-left: 40px;
              }
          }
          .chose {
            display:block;
            position: absolute;
            text-align: center;
            width: Rem(180);
            height: Rem(50);
            border-radius:0.8rem;
            border: 2px solid #f77b0e;
            color: #f77b0e;
            bottom:Rem(20);
            left: 50%;
            transform: translateX(-50%);
            font-size: Rem(38);
            line-height: Rem(50);
          }
      }
    }
}
.kepu-container::after {
  display: block;
  content: '';
  clear: both;
}
.footer {
    display: flex;
    justify-content: center;
    padding: Rem(20) 0;
    .page {
        width: Rem(180);
        line-height: Rem(60);
        border: 1px solid #8fc320;
        padding: 0 Rem(10);
        margin: 0 Rem(10);
        text-align: center;
        background: $color-white;
    }
    .btn {
        background: #8fc320;
        padding: Rem(10) Rem(50);
        border-radius: Rem(30);
        font-size: Rem(28);
        font-weight: bold;
        color: $color-white;
        a {
            color: $color-white;
        }
    }
}
</style>
