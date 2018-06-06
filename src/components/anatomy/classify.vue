<template lang="html">
  <div class="classify">
    <div class="classify__banner">
      <img class="classify__bannerImg" :src="banners[id]" alt="">
      <div class="classify__title">
        已有 <span class="classify__title--red">{{Data.total_unlock_num}}人</span> 解锁完成此类项目
      </div>
    </div>
    <div class="classify__body">
      <ul class="img-list">
        <li class="img-list__item" v-for="item in Data.list" @click="goDetail(item.id)">
          <div class="img-list__imgs">
            <img class="img-list__pic" v-lazy="filterUrl(item.title_img)" alt="">
            <img class="img-list__key" v-if="isBlockHome(item)" src="~src/assets/img/anatomy/key1.png" alt="">
            <img class="img-list__key" v-else src="~src/assets/img/anatomy/key2.png" alt="">
            <span class="img-list__num">{{ item.pic.length }}P</span>
          </div>
          <div class="img-list__part"><span>{{ item.name }}</span></div>
        </li>
        <!-- <li class="img-list__item" v-if="Data.list && Data.list.length > 0">
          <img class="img-list__pic" src="~src/assets/img/anatomy/kong.png" alt="">
          <div class="img-list__part img-list__more">更多敬请期待...</div>
        </li> -->
      </ul>
    </div>
    <div class="a-btn--block" @click="toogel">分享给好友,解锁更多吧!</div>
    <master v-show="showMaster" :type="'home'" @click.native="toogel"></master>
    <aMenu></aMenu>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="http://community.kankanyisheng.com/api/frontend/user/iniqrcode?info=1000007" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>即可参与解锁</p>
      </div>
    </div>
  </div>
</template>

<script>
import imgList from './common/img-list';
import aMenu from './common/menu';
import master from './common/master';
import share from 'src/utils/anatomy_share';
import toujin from 'src/assets/img/anatomy/152.png';
import xiongbu from 'src/assets/img/anatomy/153.png';
import sizhi from 'src/assets/img/anatomy/155.png';
import fubu from 'src/assets/img/anatomy/156.png';
import pengu from 'src/assets/img/anatomy/158.png';
import jizhu from 'src/assets/img/anatomy/159.png';
import linba from 'src/assets/img/anatomy/160.png';
import keshi from 'src/assets/img/anatomy/161.png';
import pet from 'src/assets/img/anatomy/162.png';

export default {
  data () {
    return {
      id: '',
      Data: [],
      user: null,
      showMaster: false,
      isShow: false,
      banners: {
        152: toujin,
        153: xiongbu,
        155:sizhi,
        156: fubu,
        158: pengu,
        159: jizhu,
        160: linba,
        161: keshi,
        162: pet,
      }
    }
  },
  created() {
    this.getList();
    this.getInfo();
    this.id = this.$route.params.id;
  },
  methods: {
    filterUrl(url) {
      if( url.indexOf('http') >= 0) {
        return `${url}@1e_1c_0o_0l_196h_196w_90q.src`;
      } else {
        return `http://img.kankanyisheng.com/${url}@1e_1c_0o_0l_196h_196w_90q.src`;
      }
    },
    goDetail(id) {
      this.$router.push({ name: 'anatomyDetail', params: { id: id}})
    },
    getList(id) {
      const url = `/api/bk/baike/dissect/dissect_list?type=category&category_id=${this.$route.params.id}`;
      this.$axios.get(url).then((res) => {
        this.Data = res.data.data;
      })
    },
    getInfo() {
      const url = `/api/bk/baike/dissect/unlock_num`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          const title1 = `我在「医看」收藏了${this.user.total_num}部全身医学影像高清解剖图谱，来帮我解锁吧！`;
          const title2 = `我在「医看」收藏了${this.user.total_num}部全身医学影像高清解剖图谱，朋友们快来帮我解锁！`;
          const desc = '史上最强解剖图谱，分享即可免费查看';
          const link = `${location.origin}/active_web/#/anatomy/unlock?uid=${this.user.member.id}`;
          share(title1,title2,desc,link);
        }
      })
    },
    isBlockHome(data) {
      if (data.need_lock === '1' && data.unlock_info.length <= 0) {
        return false ;
      }
      return true;
    },
    toogel() {
      if (subscribe) {
        this.showMaster = !this.showMaster;
      } else {
        this.isShow = true;
      }
    },
    hide() {
      this.isShow = false;
    },
  },
  components: {
    imgList,
    aMenu,
    master,
  }
};
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
  .classify {
    padding-bottom: 80px;
    &__banner {
      position: relative;
    }
    &__bannerImg {
      width: 100%;
    }
    &__title {
      position: absolute;
      left: 0;
      bottom: Rem(20);
      width: 100%;
      font-size: 12px;
      text-align: center;
      &--red {
        color: $color-red;
      }
    }
    &__body {
      margin-top: Rem(25);
    }
  }
  .img-list {
    width: Rem(700);
    margin: 0 auto;
    overflow: hidden;
    &__item {
      position: relative;
      width: Rem(220);
      float: left;
      border-radius: 5px;
      margin-right: Rem(20);
      &:nth-of-type(3n+3) {
        margin-right: 0;
      }
    }
    &__imgs {
      position: relative;
      width: Rem(220);
      height: Rem(220);
      background: url('~src/assets/img/anatomy/kong.png') no-repeat;
      background-size: cover;
    }
    &__pic {
      width: 100%;
    }
    &__key{
      position: absolute;
      width: Rem(50);
      right: Rem(10);
      bottom: Rem(16);
    }
    &__part {
      height: Rem(80);
      text-align: center;
      font-size: Rem(22);
      font-weight: bold;
      span {
        display: inline-block;
        text-align: left;
      }
    }
    &__num {
      position: absolute;
      width: Rem(80);
      height: Rem(40);
      line-height: Rem(40);
      color: #fff;
      font-size: 12px;
      text-align: center;
      right: 50%;
      transform: translateX(50%);
      bottom: Rem(24);
      background-color: rgba(80, 150, 250, .5);
    }
    &__more {
      color: #676767;
    }
  }
  img[lazy=loading] {
    display: block;
    width: Rem(80);
    height: Rem(80);
    margin:  Rem(70) auto;
  }
</style>
