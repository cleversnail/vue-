<template lang="html">
  <div class="receive" v-if="data && user">
    <div class="receive__title" v-if="data.mid.num<3">
      下图是您的专属学习海报，将海报转发到医生群/朋友圈，获得3位同仁扫码支持，即可免费领资料！
      <span>当前完成:{{data.mid.num}}/3(人)</span>
    </div>
    <div class="receive__title" v-else>
      恭喜您！完成任务！点击红色按钮去领取资料吧！仍然可以继续将学习资料分享给医生们共同学习！
    </div>
    <img class="receive__tips" src="~assets/img/resource/tips.png" alt="">
    <!-- <img class="receive__img" :src="`/api/frontend/user/giftimg?member_id=${data.mid.member_id}&gift_id=${data.id}`" alt=""> -->
    <img class="receive__img" :src="receiveImg" alt="">
    <div class="receive__btn" @click="go" v-if="data.mid.num >= 3">
      完成任务！点击去领取!
    </div>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="../../assets/img/robot/focus_code.jpg" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>参加活动</p>
      </div>
    </div>
    <img class="qrcode" ref="qrcode" @load="load" crossOrigin="*" :src="`/api/frontend/user/iniqrcode?info=material_${data.id}_${user.id}&is_temp=true&size=4`">
  </div>
</template>

<script>
import share from './share';
import MC from 'mcanvas';
// import bg from '../../assets/img/resource/bg.jpg';
// import headimg from '../../assets/img/resource/headimg.jpg';
// import qrcode from '../../assets/img/robot/focus_code.jpg';
export default {
  data() {
    return {
      data: null,
      isShow: false,
      receiveImg: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.getData();
    const title1 = '动动手指，来和我一起领取这份医学影像好资料~';
    const title2 = '分享一份医学影像好资料给你，和我一起领取吧！';
    const desc = '我和影像资料的距离，只差一个你~';
    const link = location.href;
    share(title1,title2,desc, link);
  },
  methods: {
    getData() {
      const url = `/api/frontend/gift/poster/${this.$route.params.id}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status == 0) {
          this.data = res.data.data;
          if (this.data.mid.status == 2 && this.data.mid.num >= 3) {
            this.$messagebox.confirm('完成任务！是否去领取资料?').then(action => {
              this.go();
            });
          }
        }
      })
    },
    error(e) {
      alert(e.type)
    },
    load() {
        let mc = new MC({
          width: 320,
          height: 480,
          backgroundColor: 'white',
        })
        mc.background(this.data.bg_img, {
          left: 0,
          top: 0,
          color: '#000000',
          type: 'origin',
        }).add(this.user.headimg, {
          width: 100,
          pos: {
            x: 60,
            y: 55
          }
        }).add(this.$refs.qrcode.src, {
          width: 180,
          pos: {
            x: 50,
            y: 715
          }
        }).text(this.user.name, {
          normalStyle: {
            font: '36px arial,sans-serif'
          },
          pos: {
            x: 170,
            y: 95
          }
        }).draw(b64 => {
          this.receiveImg = b64;
        });
        // const url = '/api/frontend/user/img2base64';
        // const params = {
        //   urls: [this.data.bg_img, this.user.headimg]
        // }
        // this.$axios.get(url, {params}).then(res => {
        //   const bg = 'data:image/png;base64,' + res.data.data[0]
        //   const headimg = 'data:image/png;base64,' + res.data.data[1]
        // })
        //imgFilter(this.data.bg_img)imgFilter(this.user.headimg)this.$refs.qrcode.src
    },
    go() {
      const id = this.$route.params.id;
      if (subscribe) {
        this.$router.push({name: 'resourceResult', query: {id}});
      } else {
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
  }
}

  function imgFilter(img) {
    var type1 = 'http://wx.qlogo.cn';
    var type2 = 'http://img.kankanyisheng.com';
    if (img.indexOf(type1)>-1) {
      return img.replace(type1, location.origin);
    } else if(img.indexOf(type2)>-1) {
      return img.replace(type2, `${location.origin}/oss-img`);
    }
  }
</script>
<style lang="scss" scoped>
@import '~src/assets/scss/config';
.receive {
  color: #000;
  &__title {
    padding: Rem(10);
    margin: Rem(24);
    background: rgba(#fff, .4);
    font-size: 12px;
  }
  &__img {
    display: block;
    width: Rem(640);
    margin: 0 auto Rem(40);
  }
  &__btn {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: Rem(130);
    background: #D83A35;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  &__tips {
    display: block;
    width: Rem(520);
    margin: 0 auto;
  }
  .qrcode {
    display: none;
  }
}
</style>
