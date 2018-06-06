<template lang="html">
  <div class="rank">
    <div class="rank-item" v-for="item in data">
      <div class="rank-item__header">
        <img class="book__img" :src="item.pic_url" alt="">
        <p class="book__name">《{{item.title}}》</p>
      </div>
      <ul class="rank-list">
        <li class="rank-list__item" v-for="user in item.winner" v-if="user.member">
          <div class="">
            <img class="rank-list__headimg" src="~assets/img/bargain/headimg.jpg" alt="" v-if="user.member.headimg == null || user.member.headimg == '/0'">
            <img class="rank-list__headimg" :src="user.member.headimg" alt="" v-else>
          </div>
          <div class="rank-list__name">
            {{user.member.true_name}}<span v-if="user.member.hospital">({{user.member.hospital}})</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const id = this.$route.query.activity_id || 2;
      const url = '/api/frontend/bargain/winner/'+id;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.rank {
  background: #f6d147;
  &-item {
    &__header {
      padding: Rem(20);
    }
  }
  &-list {
    padding: Rem(30);
    background: #ca5d4b;
    color: #fff;
    &__headimg {
      $length: Rem(80);
      display: block;
      width: $length;
      height: $length;
    }
    &__name {
      margin-left: Rem(20);
    }
    &__item {
      display: flex;
      align-items: center;
      margin-bottom: Rem(10);
    }
  }
}
.book {
  &__img {
    display: block;
    width: Rem(300);
    margin: 0 auto;
  }
  &__name {
    margin-top: Rem(20);
    color: #ca5d4b;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
