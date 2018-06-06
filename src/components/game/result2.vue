<template>
<div class="container">
  <div class="main" :class="{error:!can_lottery}">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head" v-if="can_lottery">
      <ul class="answer">
        <li v-for="(item,index) in list" :class="{error:!item.is_right}">
          <div class="question">
            第{{index+1}}题：{{!!item.is_right?'正确':'错误'}}
          </div>
          <router-link :to="{name:'gameResolve'}">
            <div class="result">
              查看解答
            </div>
          </router-link>
        </li>
      </ul>
      <div class="submit-wrap">
        <template v-if="can_lottery">
          <div class="success">
            <p>成功!</p>
            <p>太棒啦!</p>
          </div>
          <img src="../../assets/img/game/result/lucky.png" alt="" @click="lottery">
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
</div>
</template>

<script>
export default {
  name: 'gameResult2',
  components: {},
  data() {
    return {
      list: [],
      user: {},
      count: 1,
      status: 0,
      likeList: [],
      num: ['A', 'B', 'C', 'D'],
      can_lottery: false,
    };
  },
  created() {
    this.getData();
    this.getUser();
  },
  methods: {
    getData() {
      const answer     = JSON.parse(localStorage.getItem('answer'));
      this.can_lottery = !!parseInt(answer.can_lottery);
      this.list        = answer.result;
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
          this.$gameShare(`${location.origin}/active_web/#/game/like/${this.user.id}`);
        })
    },
    again() {
      if(this.status==1){
        this.$router.push('/game/answer');
      }else {
        this.$toast('请分享补充血条');
      }
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
          this.$router.push('/game/lottery/1');
        })
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
                justify-content: space-between;
                li {
                    $length: Rem(114);
                    position: relative;
                    width: $length;
                    height: $length;
                    margin-bottom: Rem(20);
                    img {
                        width: $length - Rem(8);
                        height: $length - Rem(8);
                        @include circle($length - Rem(8));
                        border: Rem(4) solid $color-orange;
                    }
                    .mask {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
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
}
</style>
