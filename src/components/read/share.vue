<template lang="html">
  <div class="page">
    <div class="header">
      <div class="header-img1">
        <img src="../../assets/img/read/share/title.png" alt="">
      </div>
      <div class="header-img2">
        <img :src="list.img_url" alt="">
      </div>
    </div>
    <div class="page-content">
      <div>
        长按识别二维码,[医看]会推送今日阅读计划文章,点击阅读即打卡。
        <span>打卡</span>
      </div>
      <div>
        长按图片,保存至手机,发送给好友,让TA也能阅读这篇好文。
        <span>推荐</span>
      </div>
      <div>
        点击右上角“...” 分享到朋友圈或好友,让更多人感受阅读的乐趣。
        <span>分享</span>
      </div>
    </div>
    <div class="btn-fixed">
      <router-link to="/read_plan">
        <img src="../../assets/img/read/index/index.png" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
import readShare from '../../utils/read_share';

export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const url = '/api/frontend/daily_read/show';
      this.$axios.get(url)
        .then((res) => {
          this.list = res.data.data;
          let title1 = '医看］阅读计划，扫码轻松阅读',
            title2 = `［医看］阅读计划，${this.list.month}月${this.list.day}日优选文章《${this.list.name}》`,
            desc = `${this.list.month}月${this.list.day}日优选文章《${this.list.name}》`,
            url1 = `${location.href}?invite_uid=${this.list.member.id}`;
          readShare(title1, title2, desc, url1);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.btn-fixed {
    position: fixed;
    top: Rem(40);
    right: Rem(40);
    img {
        width: Rem(100);
    }
}
.page {
    background: url('../../assets/img/read/index/bgc.png') repeat;
    background-size: cover;
}
.header {
    overflow: hidden;
    .header-img1 {
        margin-bottom: Rem(60);
        img {
            width: 100%;
        }
    }
    .header-img2 {
        text-align: center;
        margin-bottom: Rem(60);
        img {
            width: Rem(500);
        }
    }
}
.page-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: Rem(220);
    div {
        box-sizing: border-box;
        padding: Rem(20) Rem(10);
        width: Rem(220);
        font-size: Rem(22);
        border: 1px dashed #e27352;
        margin-right: Rem(20);
        position: relative;
        padding-top: Rem(30);
        &:last-child {
            margin-right: 0;
        }
        span {
            position: absolute;
            top: Rem(-24);
            left: 50%;
            transform: translateX(-50%);
            width: Rem(100);
            text-align: center;
            font-size: Rem(34);
            background-color: #fffbe0;
            color: #f3711b;
        }
    }
}
</style>
