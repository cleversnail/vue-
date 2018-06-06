<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head">
      <div class="submit-wrap">
        <img src="../../assets/img/game/result/success.png" alt="">
        <template v-if="type==1">
          <div class="success">
            <h1>恭喜您!</h1>
            <h3>在今日的医看答题有奖赛中</h3>
            <h2>抽到{{prize}}k币</h2>
            <h3>实力与运气并存!!</h3>
          </div>
          <img src="../../assets/img/game/sharemsg.png" alt="" @click="share">
          <a href="/#/charge">
            <img src="../../assets/img/game/check.png" alt="">
          </a>
        </template>
        <template v-else-if="type==2">
          <div class="success">
            <h3>您今天已成功答对全部题目</h3>
            <h2>获得{{prize}}K币</h2>
            <h3>约您明天再战</h3>
          </div>
          <img src="../../assets/img/game/sharemsg.png" alt="" @click="share">
          <a href="/#/charge">
            <img src="../../assets/img/game/check.png" alt="">
          </a>
        </template>
        <template v-else>
          <div class="success">
            <h1>恭喜您!</h1>
            <h3>在今日的医看答题有奖赛中</h3>
            <h2>抽到{{prize}}k币</h2>
            <h3>实力与运气并存!!</h3>
          </div>
          <router-link :to="{path:'/game'}">
            <img src="../../assets/img/game/goPlay.png" alt="">
          </router-link>
        </template>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'gameResult',
  components: {},
  data() {
    return {
      type: 1,
      user: {},
      prize:0,
      status: 1
    };
  },
  created() {
    this.type = this.$route.params.type;
    this.getUser();
    this.$wxConfig();
  },
  methods: {
    getUser() {
      const id = this.$route.query.id;
      let url  = `/api/frontend/game/index`;

      if (id) {
        url = `/api/frontend/game/index?member_id=${id}`;
      }
      this.$axios.get(url).then(res => {
        this.user = res.data.data;
        this.prize = this.kprize(this.user.prize);
        this.initShare();
      })
    },
    initShare(){
      const title1 = `［医看］每日有奖答题`;
      const title2 = `我在［医看］每日有奖答题中领到了${this.prize}k币！医生们都来试试吧！`;
      const desc   = `我在［医看］每日有奖答题中领到了${this.prize}k币！医生们都来试试吧！`;
      const url   = `${location.origin}/active_web/#/game/lottery/3?id=${this.user.user_info.id}`;
      this.$gameShare(title1, title2, desc, url);
    },
    share() {
      this.$toast('点击右上角分享');
    },
    lottery() {
      const url = '/api/frontend/game/lottery';

      this.$axios
        .post(url)
        .then(res => {
          this.$toast(res.data.msg);
        })
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
    .main {
        padding: Rem(160) Rem(40) 0;
        width: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
        position: relative;
        .rule {
            position: absolute;
            right: Rem(-20);
            top: Rem(-20);
            width: Rem(147);
        }
        &.error {
            padding: Rem(100) Rem(40) 0;
        }
        .content {
            position: relative;
            padding: Rem(30) Rem(50);
            border-radius: Rem(10);
            .head {
                width: 100%;
                position: absolute;
                left: 0;
                top: Rem(-130);
            }
            .answer {
                padding: Rem(10);
                border: Rem(4) dashed $color-orange;
                border-radius: Rem(10);
                li {
                    display: flex;
                    justify-content: space-between;
                    background: $color-white;
                    margin-bottom: Rem(10);
                    padding: Rem(20) Rem(30);
                    border-radius: Rem(10);
                    font-size: Rem(40);
                    &:last-of-type {
                        margin-bottom: 0;
                    }
                    .question {
                        color: $color-green;
                    }
                    .result {
                        color: $color-orange;
                    }

                    &.error {
                        background: $color-pippin;
                        .question {
                            color: $color-red;
                        }
                    }
                }
            }
            .submit-wrap {
                margin-top: Rem(20);
                text-align: center;
                img {
                    width: 70%;
                }
                .success {
                    font-size: Rem(40);
                    text-align: center;
                    color: #4d4d4d;
                    h3 {
                        font-weight: normal;
                    }
                    h1 {
                        font-size: Rem(60);
                        color: $color-orange;
                        @extend h3;
                    }
                    h2 {
                        @extend h3;
                        color: $color-orange;
                        font-size: Rem(50);
                    }
                    &+img {
                        margin-top: Rem(20);
                    }
                }
            }
        }
    }
    .btn {
        padding: Rem(10) Rem(70);
        background: #F1A177;
        color: $color-white;
        border-radius: Rem(30);
    }
}
</style>
