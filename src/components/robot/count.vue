<template lang="html">
  <div class="count" v-if="data">
    <music class="musicPosition" :type="'count'"></music>
    <img src="../../assets/img/robot/time.png" alt="" class="time">
    <img class="sanjiao" src="../../assets/img/robot/sanjiao-count.png" alt="">
    <img :src="images[number]" alt="" class="count-num">
    <div class="count-box">
      <img src="../../assets/img/robot/robot.png" alt="" class="robotimg">
      <p>查看CT后, 于30秒内</br>在X光片上标记结节</p>
      <p>本题难度系数: {{data.level}}</p>
    </div>
    <copyright :is-hide="true"></copyright>
  </div>
</template>

<script>
import img3 from '../../assets/img/robot/3.png';
import img2 from '../../assets/img/robot/2.png';
import img1 from '../../assets/img/robot/1.png';
import music from './common/music';
import copyright from './common/copyright';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      images: {
        1: img1,
        2: img2,
        3: img3,
      },
      number: 3,
      data: null,
    }
  },
  components: {
    music,
    copyright,
  },
  mounted() {
    this.timeout();
    this.data = JSON.parse(sessionStorage.getItem('answer'));
    sessionStorage.setItem('time', '');
  },
  methods: {
    timeout() {
      let num = 3;
      const timer = setInterval(() => {
          num = num-1;
          this.number = num;
          if(num < 1) {
            const id = JSON.parse(sessionStorage.getItem('answer')).id;
            this.$router.replace({path:'backCT', query: { id: id }});
            clearInterval(timer);
          }
      },1000)
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.musicPosition{
    position: absolute;
    right: Rem(14);
    top: Rem(126);
}
  .count{
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/robot/bgc.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    overflow: scroll;
    background-attachment: fixed;
    .time{
      width: Rem(210);
      margin-top: Rem(100);
    }
    .sanjiao{
      width: Rem(640);
      margin-top: Rem(80);
    }
    .count-num{
      width:Rem(140);
      position: absolute;
      top: Rem(270);
      right: 50%;
      transform: translateX(50%);
    }
    .robotimg{
      width: Rem(136);
      margin: Rem(30) 0;
    }
    .count-box{
      width: Rem(530);
      height: Rem(400);
      margin: Rem(40) auto;
      color: #fff;
      font-size: 24px;
      background-color: rgba(45,80,168,.6);
    }
    .tuixiang{
      margin-top: Rem(60);
      @extend %tx;
    }
  }
</style>
