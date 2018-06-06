<template lang="html">
  <div>
    <div class="menu-list">
      <div class="menu-list__title" @click="isOpen = !isOpen">
        <img class="menu-list__icon" src="~src/assets/img/anatomy/close.png" alt="" v-if="isBlock(dataList)">
        <img class="menu-list__icon2" src="~src/assets/img/anatomy/open.png" alt="" v-else>
        <span>{{ dataList.name }}</span>
        <img class="menu-list__arrow" :class="{'isShow' : isOpen}" src="~src/assets/img/anatomy/arrow.png" alt="">
      </div>
      <transition-group name="list">
        <ul class="menu-list__options" key="item" v-for="item in dataList.dissect" v-show="isOpen">
          <li  class="menu-list__option" @click="goDetail(item.id)">
            <img class="menu-list__icon" src="~src/assets/img/anatomy/close.png" alt="" v-if="isUnlock(item)">
            <img class="menu-list__icon2" src="~src/assets/img/anatomy/open.png" alt="" v-else>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'anatomyDetail', params: { id: id}});
    },
    isBlock(data) {
      let result = false;
      data.dissect.forEach((item) => {
        if (item.need_lock === '1' && item.unlock_info.length <= 0) {
          result = true ;
        }
      });
      return result;
    },
    isUnlock(item) {
      if (item.need_lock === '1' && item.unlock_info.length <= 0) {
        return true ;
      }
      return false;
    }
  },
  props: [ 'dataList' ],
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
.menu-list {
  width: 90%;
  margin: 0 auto;
  color: #d1d1d1;
  font-size: Rem(26);
  &__title {
    display: flex;
    align-items: center;
    position: relative;
    height: Rem(76);
    border-bottom: 1px solid #6a6d70;
  }
  &__icon {
    width: Rem(20);
    height: Rem(28);
    margin-bottom: Rem(6);
    margin-right: Rem(20);
    margin-left: Rem(10);
  }
  &__icon2 {
    width: Rem(28);
    height: Rem(28);
    margin-bottom: Rem(6);
    margin-right: Rem(20);
    margin-left: Rem(10);
  }
  &__arrow {
    width: Rem(20);
    height: Rem(16);
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(-180deg);
    transition: transform .3s;
    &.isShow {
      transform: translateY(-50%) rotate(0deg);
    }
  }
  .list-enter-active, .list-leave-active {
    transition: all .2s
  }
  .list-enter, .list-leave-to{
    height: 0px;
  }
  .list-enter-to, .list-leave {
    height: auto;
  }
  &__options {
    margin-left: Rem(50);
    overflow: hidden;
  }
  &__option {
    height: Rem(76);
    line-height: Rem(76);
    border-bottom: 1px solid #6a6d70;
  }
}
</style>
