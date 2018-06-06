<template lang="html">
  <div class="">
    <img v-show="!isStop" src="../../../assets/img/robot/music.png" alt="" class="music" @click="stopMusic()" ref="music">
    <img v-show="isStop" src="../../../assets/img/robot/music2.png" alt="" class="music2" @click="stopMusic()" ref="music2">
    <audio ref="audios" autoplay :loop="!loops" id="audio">
      <source :src="music[type]" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio>
    <a @click="play" ref="play"></a>
  </div>
</template>

<script>
const homeMusic = 'http://img.kankanyisheng.com/admin/bgmusic.mp3';
const count = 'http://img.kankanyisheng.com/admin/count.mp3';
const defeated = 'http://img.kankanyisheng.com/admin/defeated.mp3';
const victory = 'http://img.kankanyisheng.com/admin/victory.mp3';
// import homeMusic from '../../../assets/music/bgmusic.mp3';
// import count from '../../../assets/music/count.mp3';
// import defeated from '../../../assets/music/defeated.mp3';
// import victory from '../../../assets/music/victory.mp3';

export default {
  data() {
    return {
      isStop: false,
      music: {
        homeMusic,
        count,
        defeated,
        victory,
      },
    }
  },
  methods: {
    stopMusic() {
      this.isStop = !this.isStop;
      if(this.isStop) {
        this.$refs.audios.pause();
      } else {
        this.$refs.audios.play();
      }
    },
    play() {
      this.$refs.audios.load();
      this.$refs.audios.play();
    }
  },
  props: ['type','loops'],
  created() {
    document.addEventListener("WeixinJSBridgeReady", function () {
      document.getElementById('audio').load();
      document.getElementById('audio').play();
    }, false);
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.music{
    width: Rem(60);
    /* animation: change 5s linear infinite; */
}
.music2{
    width: Rem(60);
}
@keyframes change {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
