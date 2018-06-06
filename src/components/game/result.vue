<template>
<div class="container">
  <div class="main" :class="{error:!can_lottery}">
    <router-link :to="{name:'gameRule'}">
      <img src="../../assets/img/game/game_rule.png" alt="" class="rule" v-if="!can_lottery">
    </router-link>
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head" v-if="can_lottery">
      <ul class="answer">
        <li v-for="(item,index) in list" :class="{error:!+item.is_right}">
          <div class="question">
            第{{index+1}}题：{{!!+item.is_right?'正确':'错误'}}
          </div>
          <router-link :to="{name:'gameResolve'}">
            <div class="result">
              查看解答
            </div>
          </router-link>
        </li>
      </ul>
      <div class="submit-wrap">
        <img src="../../assets/img/game/result/success.png" alt="" v-if="can_lottery">
        <img src="../../assets/img/game/result/defeat.png" alt="" v-else>
        <template v-if="can_lottery">
          <div class="success">
            <p>成功!</p>
            <p>太棒啦!</p>
          </div>
          <router-link :to="{path:'/game/dial'}" replace>
            <img src="../../assets/img/game/result/lucky.png" alt="">
          </router-link>
        </template>
        <template v-else>
            <div class="defeat">
              <p>失败!</p>
              <p>离奖励只有一步之遥</p>
            </div>
            <div class="again">
              <img src="../../assets/img/game/result/again.png" alt="" @click="again">
              <div class="number">
                {{likeList.length-(count-1)}}
              </div>
            </div>
            <img src="../../assets/img/game/result/share.png" alt="share" @click="share">
        </template>
      </div>
    </div>

    <div class="add-list">
      <ul>
        <li v-for="(item,index) in likeList">
          <img :src="item.member.headimg" :alt="index">
          <div class="mask" v-if="index<count-1">
            已用
          </div>
        </li>
      </ul>
    </div>
  </div>
  <router-link :to="{path:'/game/dial'}">
    <img class="go-dial" src="../../assets/img/game/go_dial.png" alt="go dial">
  </router-link>
</div>
</template>

<script>
export default {
  name: 'gameResult',
  components: {},
  data() {
    return {
      user:{},
      list: [],
      count:1,
      status:1,
      likeList:[],
      num: ['A', 'B', 'C', 'D'],
      can_lottery: false,
    };
  },
  created() {
    this.getData();
    this.$wxConfig();
  },
  mounted(){
    this.getUser();
  },
  methods: {
    getData() {
      const url = '/api/frontend/game/userrecord'
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status==0) {
            this.can_lottery = isLottery(res.data.data);
            this.list = res.data.data.reverse();
          }
        })
    },
    getUser() {
      const url = `/api/frontend/game/index`;

      this.$axios
        .get(url)
        .then((res) => {
          this.user     = res.data.data.user_info;
          this.likeList = res.data.data.like_list;
          this.count    = res.data.data.answer_count;
          this.status   = res.data.data.status;
          this.initShare();
        })
    },
    initShare(){
      const title1 = `医看］每日有奖答题`;
      const title2 = `${this.user.name}在「医看」答题遇到困难，快来帮ta一把~`;
      const desc   = `${this.user.name}在「医看」答题遇到困难，快来帮ta一把~`;
      const url    = `${location.origin}/active_web/#/game/like/${this.user.id}`;
      this.$gameShare(title1, title2, desc, url);
    },
    again() {
      if(this.status==1){
        this.$router.push('/game/answer');
      }else {
        this.$toast('请分享补充血条');
      }
    },
    share() {
      this.$toast('点击右上角分享')
    }
  }
};

function isLottery(arr){
  let can_lottery=0;
  arr.forEach(item=>{
    can_lottery+=parseInt(item.is_right)
  });
  return can_lottery === 3;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";

.container {
    background: url('http://img.kankanyisheng.com/yikan-t/20170317/14897412838245553908.png');
    background-size: cover;
    .main {
        padding: Rem(160) Rem(40) Rem(100);
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
            padding: Rem(100) Rem(40) Rem(100);
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
                    width: 65%;
                }
                .success {
                    color: $color-orange;
                    font-size: Rem(40);
                    text-align: center;
                    p {
                        &:first-of-type {
                            font-size: Rem(46);
                        }
                    }
                }
                .defeat {
                    font-size: Rem(40);
                    text-align: center;
                    p {
                        &:first-of-type {
                            font-size: Rem(46);
                        }
                    }
                }
                .again {
                    position: relative;
                    .number {
                        position: absolute;
                        right: Rem(150);
                        top: 0;
                        width: Rem(60);
                        height: 100%;
                        line-height: Rem(120);
                        color: $color-white;
                        font-size: Rem(44);
                        text-align: center;
                    }
                }
            }
        }

        .add-list {
            margin-top: Rem(20);
            padding: 0 Rem(60);
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    $length: Rem(114);
                    position: relative;
                    width: $length;
                    height: $length;
                    margin-right: Rem(22);
                    margin-bottom: Rem(20);
                    img {
                        @include circle($length - Rem(8));
                        border: Rem(4) solid $color-orange;
                    }
                    .mask {
                        position: absolute;
                        left: 0;
                        top: 0;
                        @include circle($length);
                        background: rgba(0, 0, 0, .6);
                        text-align: center;
                        line-height: $length;
                        color: $color-white;
                        font-size: Rem(36);
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
    .go-dial {
      position: fixed;
      right: Rem(50);
      bottom: Rem(400);
      width: Rem(100);
    }
}
</style>
