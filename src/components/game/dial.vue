<template>
<div class="container">
  <img src="../../assets/img/game/head.png" alt="head" class="head">
  <div class="title">
    <p>幸运大转盘天天转</p>
    <p>每日答对三题，即可抽取</p>
  </div>
  <div id="box" class="box">
    <div class="outer KinerLottery KinerLotteryContent">
      <img src="../../assets/img/game/lanren.png">
    </div>
    <!-- 大专盘分为三种状态：活动未开始（no-start）、活动进行中(start)、活动结束(completed),可通过切换class进行切换状态，js会根据这3个class进行匹配状态 -->
    <div class="inner KinerLotteryBtn start"></div>
  </div>
  <div class="lotteryusers">
    <mt-swipe :show-indicators="false">
      <template v-for="item in user">
        <mt-swipe-item>
          <div class="user">
            <img :src="item.member.headimg" alt="">
            <div class="name">
              {{item.member.nickname}}
            </div>
            <div class="zhicheng">
              {{item.member.zhicheng}}
            </div>
            <div class="gold">
              {{item.gold}}k币
            </div>
          </div>
        </mt-swipe-item>
      </template>
    </mt-swipe>
    <div class="btn-box">
      <router-link :to="{path:'/game/rank'}">
        <a class="btn">排行榜</a>
      </router-link>
      <router-link :to="{path:'/game'}">
        <a class="btn">游戏主页</a>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import KinerLottery from '../../utils/lottery';
export default {
  name: 'gameResult',
  components: {},
  data() {
    return {
      type: 1,
      user: [],
      prize: 0,
      status: 1
    };
  },
  created() {
    this.type = this.$route.params.type;
    this.getUsers();
    this.$gameShare();
  },
  mounted() {
    this.initLottery();
  },
  methods: {
    getUsers() {
      let url = `/api/frontend/game/lotteryusers`;
      this.$axios.get(url).then(res => {
        this.user = res.data.data.lists;
      })
    },
    initLottery() {
      const vm = this;
      const config = {
        rotateNum: 8, //转盘转动圈数
        body: "#box", //大转盘整体的选择符或zepto对象
        direction: 0, //0为顺时针转动,1为逆时针转动
        disabledHandler: function(key) {
          switch (key) {
            case "noStart":
              alert("活动尚未开始");
              break;
            case "completed":
              alert("活动已结束");
              break;
          }
        }, //禁止抽奖时回调
        clickCallback: function() {
          //此处访问接口获取奖品
          const url = '/api/frontend/game/lottery';
          const that = this;
          vm.$axios
            .post(url)
            .then(res => {
              if (res.data.status == 0) {
                that.goKinerLottery(vm.initPrize(res.data.data.prize));
              } else {
                vm.$toast(res.data.msg);
              }
            })
        }, //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面
        KinerLotteryHandler: function(deg) {
          vm.$router.replace('/game/lottery/1');

        } //抽奖结束回调
      }
      new KinerLottery(config);
    },
    kprize(prize) {
      let kprize;
      switch (+prize) {
        case 1:
          kprize = '66';
          break;
        case 2:
          kprize = '28';
          break;
        case 3:
          kprize = '18';
          break;
        case 4:
          kprize = '8';
          break;
        case 5:
          kprize = '5';
          break;
        default:
          kprize = '0';
      }
      return kprize;
    },
    initPrize(prize) {
      let deg = 60;
      switch (+prize) {
        case 1:
          deg = 0;
          break;
        case 2:
          deg = 300;
          break;
        case 3:
          deg = 240;
          break;
        case 4:
          deg = 120;
          break;
        case 5:
          deg = 60;
          break;
        default:
          deg = 180;
      }
      return deg;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";

.container {
    background: url('http://img.kankanyisheng.com/yikan-t/20170317/14897412838245553908.png');
    background-size: cover;
    text-align: center;
    .head {
        width: 90%;
        margin-top: Rem(60);
    }
    .title {
        color: darken($color-green, 30%);
        font-size: Rem(32);
    }
    .box {
        $length: Rem(600);
        width: $length;
        height: $length;
        position: relative;
        margin: Rem(20) auto;
        .outer {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            transform: rotate(0deg);
            img {
                width: 100%;
            }
        }
        .inner {
            $length: Rem(200);
            position: relative;
            width: $length;
            height: $length;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            background-image: url("http://img.kankanyisheng.com/yikan-t/20170317/14897417268771695764.png");
            background-size: auto $length;
            background-repeat: no-repeat;
            cursor: pointer;
            .start:active {
                transform: translate(-50%, -50%) scale(.95);
            }
            &.start {
                background-position: 0 0;
            }
            &.no-start {
                background-position: -5rem 0;
            }
            &.completed {
                background-position: -10rem 0;
            }
        }
    }
    .lotteryusers {
        $length: Rem(100);
        width: Rem(500);
        height: $length;
        margin: 0 auto;
        background: $color-white;
        border: 1px solid $color-green;
        /* overflow: hidden; */
        .user {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: $length;
            line-height: $length;
            img {
                margin-top: Rem(10);
                @include circle(Rem(80));
                border: 1px solid $color-orange;
            }
        }
        .btn-box {
          display: flex;
          justify-content: space-between;
          margin-top: Rem(20);
        }
        .btn {
          display: inline-block;
          background: darken($color-green,30%);
          color: $color-white;
          padding: Rem(12) Rem(60);
          border-radius: Rem(40);
        }
    }
}
</style>
