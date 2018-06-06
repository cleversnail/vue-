<template lang="html">
  <div>
    <ul class="img-list">
      <li class="img-list__item" @click="goClassify(item.id)" v-for="item in homeData">
        <img class="img-list__pic" :src="item.image+ '@1e_1c_0o_0l_196h_196w_90q.src'" alt="">
        <img class="img-list__key" v-if="isBlockHome(item)" src="~src/assets/img/anatomy/key1.png" alt="">
        <img class="img-list__key" v-else src="~src/assets/img/anatomy/key2.png" alt="">
        <img class="img-list__preferential" src="~src/assets/img/anatomy/preferential.png" alt="" v-if="isSpecial(item.id)">
        <div class="img-list__part">{{ item.name }}</div>
      </li>
      <!-- <li class="img-list__item">
        <img class="img-list__pic" src="~src/assets/img/anatomy/kong.png" alt="">
        <div class="img-list__part img-list__more">更多敬请期待...</div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: ['homeData', 'special'],
  created() {
  },
  methods: {
    goClassify(id) {
      this.$router.push({ name:'classify', params:{ id: id}});
    },
    isBlockHome(data) {
      let result = true;
      data.dissect.forEach((item) => {
        if (item.need_lock === '1' && item.unlock_info.length <= 0) {
          result = false ;
        }
      });
      return result;
    },
    isSpecial(id) {
      return this.special.indexOf(id) >= 0;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';
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
  &__pic {
    width: 100%;
  }
  &__key{
    position: absolute;
    width: Rem(50);
    right: Rem(10);
    bottom: Rem(70);
  }
  &__part {
    line-height: Rem(60);
    text-align: center;
    font-size: Rem(22);
    font-weight: bold;
  }
  &__more {
    color: #676767;
  }
  &__preferential {
    position: absolute;
    left: Rem(-10);
    top: Rem(10);
    width: Rem(180);
  }
}
</style>
