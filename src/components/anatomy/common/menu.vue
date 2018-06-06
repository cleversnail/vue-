<template lang="html">
  <div>
    <div class="menu" :class="{'show' : isShowMenu}">
      <div class="menu__content">
        <div class="menu__title">
          <div class="menu__link">
            <img class="menu__icon" src="~src/assets/img/anatomy/menu-house.png" alt="">
            <span>
              <a href="/" class="menu__homeBtn">医看主页</a></span>
          </div>
          <div>
            <img class="menu__icon" src="~src/assets/img/anatomy/menu-house2.png" alt="">
            <router-link :to="{ name: 'anatomyHome' }">
              <span class="menu__homeBtn">解剖主页</span>
            </router-link>
          </div>
          <img class="menu__btn" src="~src/assets/img/anatomy/menu-btn.png" @click="isShowMenu = !isShowMenu" alt="">
        </div>
        <menuList :dataList="item" v-for="item in Data.list"></menuList>
      </div>
    </div>
    <div class="menu__open" :class="{'show': !isShowMenu}" @click="isShowMenu = !isShowMenu">
      <img class="menu__btn menu__btn2" src="~src/assets/img/anatomy/menu-btn.png" alt="">
    </div>
  </div>
</template>

<script>
import menuList from './menu-list';
export default {
  data () {
    return {
      isShowMenu: false,
      Data: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const url = '/api/bk/baike/dissect/dissect_list?type=all';
      this.$axios.get(url).then((res) => {
        this.Data = res.data.data;
      })
    }
  },
  components: {
    menuList,
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.menu {
  position: fixed;
  top: 0;
  left: Rem(-444);
  bottom: 0;
  color: #fff;
  transform: translateX(0);
  transition: transform .3s;
  &.show {
    transform: translateX(Rem(444));
  }
  &__content {
    width: Rem(444);
    height: 100%;
    background-color: rgba(0, 0, 0, .9);
    overflow: scroll;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: Rem(26);
    padding-top: Rem(26);
    color: $color-red;
  }
  &__link {
    margin-left: Rem(10);
  }
  &__icon {
    width: Rem(34);
    margin-bottom: Rem(14);
    margin-right: Rem(6);
  }
  &__homeBtn {
    color: $color-red;
  }
  &__btn {
    width: Rem(58);
    height: Rem(58);
    transform: rotate(180deg);
    margin-bottom: Rem(8);
  }
  &__open {
    position: fixed;
    top: Rem(22);
    transform: translateX(-100%);
    &.show {
      transform: translateX(0%);
      transition: transform .1s .4s;
    }
  }
  &__btn2 {
    transform: rotate(0deg);
  }
}
</style>
