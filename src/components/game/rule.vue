<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head">
      <img src="../../assets/img/game/close.png" alt="close" class="close" @click="back">
      <img src="../../assets/img/game/rule.png" alt="rule" class="rule">
      <ul>
        <li>1，每人每天只有1次抽奖机会</li>
        <li>2，三题全部答对方可获得抽奖机会（1〜66k币不等，k币可在平台兑换奖品）</li>
        <li>3，每日有一次初始答题机会，需要额外答题机会根据好友加血次数获得。</li>
        <li>4，分享至朋友圈才能获得有效的加血。</li>
        <li>5，需要关注 <a @click="show">［医看］微信公众号(kankanyish)</a>才能答题。</li>
        <li>6，根据微信平台规则，医看平台认证用户可以兑换奖品 。</li>
        <li>7，答题活动每天都可以参与。</li>
      </ul>
      <p>活动最终解释权归［医看］所有， 活动中遇到任何疑问请咨询工作人员 小看: </p>
      <p>（微信／手机 15700057027）</p>
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
      list: [],
      num: ['A', 'B', 'C', 'D'],
      showLayer:false,
    };
  },
  created() {
    this.getData();
    this.$gameShare();
  },
  methods: {
    getData() {
      let url = '/api/frontend/game/index';
      this.$axios
        .get(url)
        .then((res) => {
          this.list = res.data.data.list;
        })
    },
    show(){
        this.showLayer = true;
    },
    close(){
        this.showLayer = false;
    },
    back(){
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../../assets/scss/config.scss";
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
            .rule {
                display: block;
                width: Rem(275);
                margin: Rem(40) auto Rem(80);
            }
            .close {
              width: Rem(93);
              position: absolute;
              right: Rem(10);
              top: Rem(-80);
            }
            li {
              margin-bottom: Rem(10);
              a {
                text-decoration: underline;
                color:$color-red;
              }
            }
        }
    }
}
</style>
