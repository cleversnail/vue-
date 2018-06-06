<template lang="html">
  <div class="result" v-if="data">
    <img class="result__bg" src="~assets/img/resource/result.png" alt="">
    <div class="result__name">
      <!-- 《2017MRI医师上岗证考及参考答案试题集》 -->
      {{data.name}}
    </div>
    <div class="result__main">
      <p>可转存到自己的网盘中</p>
      <img class="result__baidu" src="~assets/img/resource/baidu.png" alt="">
      <p class="result__code">提取码:<span class="color-fa">{{data.pw}}</span></p>
      <p class="result__tips">提取码字母均为小写，中间无空格</p>
      <p class="result__tips">部分资料包过大，有些内容不能直接在手机上打开／预览，建议直接在电脑上下载／查看。(注：不用购买百度云会员也可以正常下载)</p>
      <p class="result__tips">下载过多偶尔会出现链接被取消或者无法正常下载的情况，可以联系小看(微信：xiaokankan2016)或者后台留言，医看定会为您及时解决。</p>
      <img class="result__btn" src="~assets/img/resource/btn.png" alt="" @click="goBaidu">
    </div>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="../../assets/img/robot/focus_code.jpg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </div>
    </div>
  </div>
</template>

<script>
import share from './share';
export default {
  data() {
    return {
      data: null,
      isShow: false,
    }
  },
  created() {
    this.getData();
    share();
  },
  methods: {
    getData() {
      const url = `/api/frontend/gift/pan/${this.$route.query.id}`;
      this.$axios.get(url).then((res)=>{
        if (res.data.status == 0) {
          this.data = res.data.data;
        }
      })
    },
    goBaidu() {
      if (subscribe) {
        const url = `/api/frontend/gift/get_gift/${this.$route.query.id}`;
        this.$axios.put(url).then((res) => {
          // this.$toast(res.data.msg);
          if (res.data.status == 0) {
            // window.open(this.data.url);
            location.href = this.data.url;
          }
        });
      } else {
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.result {
  position: relative;
  color: #000;
  padding-bottom: Rem(130);
  &__bg {
    width: 100%;
  }
  &__name {
    position: absolute;
    top: 16%;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  &__main {
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
  }
  &__baidu {
    width: Rem(100);
    margin-right: .2rem;
  }
  &__code {
    display: inline-block;
    font-size: 18px;
    vertical-align: middle;
  }
  &__btn {
    width: Rem(380);
    margin-top: Rem(80);
  }
  &__tips {
    width: 80%;
    margin: .1rem auto;
    text-align: left;
  }
}
</style>
