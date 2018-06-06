<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head">
      <router-link :to="{name:'gameRule'}">
        <img src="../../assets/img/game/game_rule.png" alt="rule" class="like">
      </router-link>
      <div class="info">
        <img :src="user.headimg" alt="headimg" class="headimg">
        <div class="text">
          <p>答题遇到困难</p>
          <p class="add">帮我补滴血吧！</p>
          <p>{{user.name}}</p>
        </div>
      </div>
      <img src="../../assets/img/game/life.png" alt="" class="life">
      <img src="../../assets/img/game/add_btn.png" alt="" class="add-btn" @click="like">
      <router-link :to="{path:'/game'}">
        <img src="../../assets/img/game/play.png" alt="" class="add-btn">
      </router-link>
    </div>
    <div class="add-list">
      <ul>
        <li v-for="item in likeList">
          <img :src="item.member.headimg" alt="">
        </li>
      </ul>
    </div>
  </div>
  <div v-if="showLayer" @click="close">
    <layer :status="showLayer" :type="'game'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import layer from '../common/layer';

export default {
  name: 'gameHelp',
  components: {
    layer
  },
  data() {
    return {
      user: {},
      likeList: [],
      showLayer: false,
    };
  },
  created() {
    this.getUser();
    this.$wxConfig();
  },
  methods: {
    getUser() {
      const id  = this.$route.params.id;
      const url = `/api/frontend/game/index?member_id=${id}`;

      this.$axios
        .get(url)
        .then((res) => {
          this.user     = res.data.data.user_info;
          this.likeList = res.data.data.like_list;
          this.initShare();
        })
    },
    like() {
      const id = this.$route.params.id;
      const url = `/api/frontend/game/like/${id}`;
      this.$messagebox
        .confirm('确定提交操作？')
        .then(action => {
          this.$axios
            .put(url)
            .then(res => {
              this.$toast(res.data.msg);
              if (res.data.status == 0) {
                // this.$router.push(`/game/like/${this.$route.params.id}`);
                location.reload();
              } else if (res.data.status == 2003) {
                this.show();
              }
            })
        });
    },
    initShare(){
      const title1 = '［医看］每日有奖答题';
      const title2 = `${this.user.name}在「医看」每日有奖答题中遇到困难，快来帮ta一把~`;
      const desc   = `${this.user.name}在「医看」每日有奖答题中遇到困难，快来帮ta一把~`;
      const url   = `${location.origin}/active_web/#/game/like/${this.user.id}`;
      this.$gameShare(title1, title2, desc, url);
    },
    show() {
      this.showLayer = true;
    },
    close() {
      this.showLayer = false;
    },
    watch: {
      '$route' (to, from) {
      // 对路由变化作出响应...
      this.getUser();
      }
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
        .content {
            position: relative;
            padding: Rem(30) Rem(20) Rem(30) Rem(30);
            font-size: Rem(30);
            .head {
                width: 100%;
                position: absolute;
                left: 0;
                top: Rem(-130);
            }
            .like {
                position: absolute;
                right: 0;
                top: Rem(5);
                width: Rem(127);

            }
            .info {
                display: flex;
                margin-top: Rem(30);
                .headimg {
                    $length: Rem(198);
                    @include circle($length);
                    border: Rem(10) solid $color-orange;
                }
                .text {
                    padding-top: Rem(20);
                    font-size: Rem(44);
                    margin-left: Rem(30);
                }
            }
            .life {
                display: block;
                width: Rem(449);
                margin: Rem(65) auto Rem(15);
            }
            .add-btn {
                display: block;
                width: Rem(367);
                margin: 0 auto;
            }

        }
        .add-list {
            margin-top: Rem(30);
            padding: 0 Rem(60);
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    $length: Rem(114);
                    width: $length;
                    height: $length;
                    margin-right: Rem(22);
                    margin-bottom: Rem(20);
                    img {
                        @include circle($length);
                        border: Rem(4) solid $color-orange;
                    }
                }
            }
        }
    }
    .add {
        color: $color-orange;
    }
}
</style>
