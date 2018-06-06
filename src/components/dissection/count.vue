<template lang="html">
<div class="count">
  <img class="count__num" :src="img[count]" alt="">
</div>
</template>

<script>
import img1 from 'assets/img/dissection/1.png';
import img2 from 'assets/img/dissection/2.png';
import img3 from 'assets/img/dissection/3.png';

export default {
  data() {
    return {
      img: {
        1: img1,
        2: img2,
        3: img3,
      },
      count: 3,
    }
  },
  created() {
    this.getData();
  },
  methods: {
    timeout() {
      let num = 3;
      let id,random,name;
      const timer = setInterval(() => {
          num = num-1;
          this.count = num;
          if(num <1) {
            if (this.$route.query.id) {
              id = this.$route.query.id;
              name = this.$route.query.name;
            } else {
              random = Math.floor(Math.random()*10);
              id = this.list[random].id;
              name = this.list[random].name;
            }
            this.$router.replace({name:'dissectionAnswer', query:{id,name}});
            clearInterval(timer);
          }
      },1000)
    },
    getData() {
      const url = '/api/frontend/dissect_game/category_result';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.list = res.data.data;
          this.timeout();
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.count {
  @extend %fullpage;
  background: url('~assets/img/dissection/count_bg.png') no-repeat;
  background-size: 100% 100%;
  &__num {
    position: absolute;
    left: 50%;
    top: Rem(320);
    width: Rem(200);
    transform: translateX(-50%);
  }
}
</style>
