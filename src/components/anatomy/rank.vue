<template lang="html">
  <div class="rank">
    <div class="rank__banner">
      <router-link :to="{ name: 'anatomyHome'}">
        <div class="a-btn--gohome"></div>
      </router-link>
    </div>
    <div class="rank__content">
      <div class="rank-list">
        <p class="tc" style="width:100%">排行榜已截止</p>
      </div>
      <div class="rank-list">
        <div class="rank-list__flex" v-if="data.my_result">
          <span class="rank-list__number">{{ data.my_result.rank }}</span>
          <img class="rank-list__img" :src="data.my_result.member_info.headimg" alt="">
          <span class="rank-list__name">{{ data.my_result.member_info.true_name }} (我)</span>
        </div>
        <span class="rank-list__result">解锁 {{ data.my_result&&data.my_result.times }} 套</span>
        <div class="rank-list__icon">
        </div>
      </div>
      <ul class="rank__info">
        <li class="rank-list" v-for="item in data.data">
          <div class="rank-list__flex">
            <span class="rank-list__number">{{ item.rank }}</span>
            <img class="rank-list__img" :src="item.member.headimg" alt="" @click="goUnlock(item.member.id)">
            <span class="rank-list__name">{{ item.member.true_name }}</span>
          </div>
          <div class="rank-list__result">
            <template v-if="item.times == 120">
              全部解锁
            </template>
            <template v-else>
              解锁 {{ item.times }} 套
            </template>
          </div>
          <div class="rank-list__icon">
            <img src="~assets/img/anatomy/price1.png" v-if="item.rank<4">
            <img src="~assets/img/anatomy/price2.png" v-else-if="item.rank<6">
            <img src="~assets/img/anatomy/price3.png" v-else-if="item.rank<16 && item.times == 120">
            <!-- <img src="~assets/img/anatomy/price4.png" v-else-if="item.rank<31 && item.times == 120"> -->
          </div>
        </li>
        <li class="rank-list" v-if="data.data&&data.data.length>=20">
          <div class="rank-list__more" @click="more">
            点击查看更多
          </div>
        </li>
      </ul>
    </div>
    <div class="a-btn--block" @click="toogel">分享给好友,晒出我的排名</div>
    <div v-show="showMaster">
      <master @click.native="toogel"></master>
    </div>
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
import master from './common/master';
import share from 'src/utils/anatomy_share';

export default {
  data () {
    return {
      showMaster: false,
      isShow: false,
      data: [],
    }
  },
  created() {
    this.getList();
    this.getInfo();
  },
  methods: {
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
    getList() {
      const url = '/api/frontend/index/rank?type=unlock';
      this.$axios.get(url).then((res) => {
        this.data = res.data.data;
      })
    },
    more() {
      const page = this.data.page + 1;
      const url = `/api/frontend/index/rank?type=unlock&page=${page}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0 && res.data.data.data.length>0) {
          this.data.data = this.data.data.concat(res.data.data.data);
          this.data.page = parseInt(res.data.data.page);
        }else if (res.data.data.data.length === 0) {
          this.$toast('没有更多数据');
        } else {
          this.$toast(res.data.msg);
        }
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
    goUnlock(uid) {
      this.$router.push({name:'anatomyUnlock', query:{uid}});
    }
  },
  components: {
    master,
  }
};
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.rank {
  padding-bottom: Rem(120);
  color: #000;
  &__banner {
    width: 100%;
    height: Rem(254);
    background: url('~src/assets/img/anatomy/rankbanner.png') 0 0 no-repeat;
    background-size: 100%;
  }
  &__content {
    width: Rem(700);
    margin: 0 auto;
    transform: translateY(Rem(-40));
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
  }
  &__info {
    width: 100%;
    height: 88%;
    overflow: scroll;
    box-shadow:0px 3px 3px 0px #f1f1f1 inset;
  }
  &-list {
    height: Rem(110);
    padding-left: Rem(24);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    &__flex {
      display: flex;
      align-items: center;
    }
    &__number {
      display: inline-block;
      width: Rem(60);
      text-align: center;
    }
    &__img{
      width: Rem(64);
      height: Rem(64);
      margin-bottom: Rem(6);
      margin-right: Rem(26);
      border-radius: 50%;
    }
    &__name {
      display: inline-block;
      width: Rem(200);
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &__result {
      display: inline-block;
      width: Rem(150);
      text-align: center;
    }
    &__more {
      flex-grow: 1;
      text-align: center;
    }
    &__icon {
      width: Rem(120);
      img {
        width: 100%;
      }
    }
  }
}
</style>
