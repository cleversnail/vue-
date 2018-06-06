<template>
<div class="wrap">
    <div class="go-apply" v-if="status&&type=='apply'">
        <div class="content">
            <p>您尚未填写报名信息</p>
            <p>无法参与评测!</p>
            <index-state :status="statustype"></index-state>
        </div>
    </div>
    <div class="go-yk" v-if="status&&type=='yk'">
        <img src="../../assets/img/yk_code.png" alt="二维码">
    </div>
    <div class="go-yk" v-if="status&&type=='game'">
        <img src="../../assets/img/game/game_code.png" alt="二维码">
    </div>
</div>
</template>

<script>
import indexState from './indexState';
export default {
  name: 'layer',
  components:{
      indexState
  },
  props: {
    status: {
      type: Boolean
    },
    type:{
        type:String
    },
    statustype:{
        type:String
    }
  },
  data() {
    return {

    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    z-index: 99;

    .go-apply {
        width: Rem(600);
        height: Rem(600);
        margin:Rem(300) auto;
        background: url(http://img.kankanyisheng.com/5581486816013b206Qy1lXb.jpg) no-repeat;
        background-size: cover;

        .content {
            padding-top: Rem(300);
            text-align: center;
            color: $color-black;
            font-size: Rem(46);
            .submit {
                margin-top: Rem(20);
            }
        }
    }
    .go-yk {
        width: Rem(600);
        // height: Rem(600);
        margin:Rem(300) auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
