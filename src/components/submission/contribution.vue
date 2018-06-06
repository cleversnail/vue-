<template lang="html">
  <div class="page">
    <div class="header">
      <img class="zi" src="../../assets/img/submission/contribution/zi.png" alt="">
      <router-link :to="{path: 'subdetail'}">
        <p>活动详情</p>
      </router-link>
      <router-link :to="{path: 'contribute'}">
        <img class="btn" src="../../assets/img/submission/contribution/btn.png" alt="">
      </router-link>
      <div class="release">
        <img src="../../assets/img/submission/contribution/release.png" alt="">
        <router-link :to="{path: 'nicesub'}">
          <span>查看全部</span>
        </router-link>
      </div>
      <div class="mysubs">
        <router-link :to="{path: 'mysubmission'}">
          <img src="../../assets/img/submission/contribution/mysubs.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="swipers">
      <mt-swipe :auto="4000">
        <mt-swipe-item class="slide1">1</mt-swipe-item>
        <mt-swipe-item class="slide2">2</mt-swipe-item>
        <mt-swipe-item class="slide3">3</mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="mymission">
      <img src="../../assets/img/submission/contribution/have.png" alt="">
    </div>
    <div class="missioned">
      <div>已有{{listTotal.show_num}}人投稿</div>
      <router-link :to="{path: 'alreadysub'}">
        <span>查看全部</span>
      </router-link>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in list">
          <div class="content-position">
            <div class="header-img">
              <img :src="item.member.headimg" alt="">
              <div class="name">
                <span class="name1">{{item.name}}</span>
                <span class="time2">{{item.created_at}}</span>
              </div>
              <div class="xinxi">{{item.member.hospital}} {{item.member.administrative}} {{item.member.zhicheng}}</div>
            </div>
            <div class="ours">
              投稿:《{{item.title}}》
            </div>
            <div class="says">
              摘要: {{item.content}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      listTotal: [],
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    // 首页接口
    getUser() {
      const url = `/api/frontend/vote/index?casual_activity_id=5&limit=5`;
      this.$axios.get(url).then((res) => {
        this.list = res.data.data.data;
        this.listTotal = res.data.data;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .page{
    width: 100%;
    height: 100%;
    .header{
      height: Rem(800);
      background: url('../../assets/img/submission/contribution/bgc.png') no-repeat;
      background-size: cover;
      text-align: center;
      .zi{
        width: Rem(720);
        margin-top: Rem(140);
      }
      p{
        margin: Rem(50) auto;
        text-decoration: underline;
        font-size: Rem(32);
        font-weight: bold;
      }
      .btn{
        width: Rem(618);
      }
      .release{
        margin-top: Rem(120);
        margin-left: Rem(140);
        img{
          width: Rem(372);
          margin-right: Rem(30);
        }
        span{
          color:#faa233;
          text-decoration: underline;
        }
      }
      .mysubs{
        position: fixed;
        top: Rem(50);
        right: Rem(50);
        z-index: 2000;
        img{
          width: Rem(120);
        }
      }
    }
    .swipers{
      height: Rem(370);
      margin-top: Rem(-10);
      .slide1 {
        background-color: #0089dc;
        color: #fff;
      }
      .slide2 {
        background-color: #ffd705;
        color: #000;
      }
      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
    }
    .mymission {
      background: url('../../assets/img/submission/contribution/dian.png') no-repeat;
      background-size: cover;
      text-align: center;
      height: Rem(200);
      img{
        width: Rem(234);
        margin-top:Rem(80);
      }
    }
    .missioned{
      background: url('../../assets/img/submission/contribution/missioned.png') no-repeat;
      background-size: cover;
      height: Rem(96);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding:Rem(0) Rem(20);
      div{
        font-size: Rem(38);
        font-weight: bold;
      }
      span{
        font-size: Rem(22);
        color: #fff;
        text-decoration: underline;
      }
    }
    .content{
      ul{
        li{
          background: url('../../assets/img/submission/contribution/book.png') no-repeat;
          background-size: cover;
          width: Rem(718);
          height: Rem(347);
          margin: Rem(30) auto;
          position: relative;
          .content-position{
            position: absolute;
            width: 100%;
            top: Rem(-6);
            left: Rem(70);
            .header-img{
              margin-bottom: Rem(30);
              img{
                width: Rem(120);
                float: left;
                margin-top: Rem(-60);
                margin-right: Rem(20);
                border-radius: 50%;
              }
              .name{
                margin-top: Rem(60);
                line-height: Rem(28);
                .name1{
                  font-size: Rem(32);
                  font-weight: bold;
                  display: inline-block;
                }
                .time2{
                  display: inline-block;
                  font-size: Rem(30);
                  width: Rem(160);
                  overflow: hidden;
                  height: Rem(24);
                }
              }
              .xinxi{
                min-height: Rem(40);
              }
            }
            .ours{
              font-size: Rem(28);
              font-weight: bold;
              margin-bottom: Rem(30);
            }
          }
        }
      }
    }
  }

</style>
