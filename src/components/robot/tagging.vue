<template lang="html">
  <div class="tagging">
    <div class="tagging-title">
      <div>标记位置：{{isShow?1:0}}/1</div>
      <div>剩余次数： {{index}}次</div>
      <div>倒计时：{{count}}s</div>
    </div>
    <robotTitle :say='say'>
      <music slot="robot-music" :type="'homeMusic'"></music>
    </robotTitle>
    <div class="tagging-img">
      <img :src="data.x_img" alt="" @click="tagging">
      <img src="../../assets/img/robot/my-tagging.png" alt="" class="my-tagging" v-show="isShow" ref="tagging">
    </div>
    <div class="tagging-btns">
      <router-link :to="{path:'/backCT'}" class="tagging-btn">返回上一步</router-link>
      <div class="tagging-btn" @click="submit">完成标注</div>
    </div>
    <copyright :is-hide="true"></copyright>
    <audio ref="clickMusic">
      <source src="../../assets/music/click.mp3" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>

<script>
import robotTitle from './common/robot-title';
import music from './common/music';
import copyright from './common/copyright';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      say: '点击你觉得可疑的结节，完成标注',
      isShow: false,
      data: {},
      left: 0,
      top: 0,
      index: 0,
      count: 0,
    }
  },
  components: {
    robotTitle,
    music,
    copyright,
  },
  methods: {
    tagging(e) {
      this.$refs.clickMusic.playbackRate = 2.0;
      this.$refs.clickMusic.play();
      this.isShow = true;
      const tagging = this.$refs.tagging;
      const {x , y} = getOffset(e.target);
      const pageX = e.pageX;
      const pageY = e.pageY;
      const disX = pageX-x;
      const disY = pageY-y;
      this.left = (disX/e.target.offsetWidth).toFixed(3);
      this.top = (disY/e.target.offsetHeight).toFixed(3);
      this.$nextTick(()=>{
        tagging.style.left = disX-tagging.offsetWidth/2+'px';
        tagging.style.top = disY-tagging.offsetHeight/2+'px';
      });
    },
    outTime() {
      const url = '/api/frontend/robot_read/answer?game_id=1';
      const data = {
        question_id: this.data.id,
        position: '0,0',
        is_right: 0,
        answer_time: 100,
      }
      this.$axios.post(url, data).then((res) => {
        if (res.data.status === 0) {
          sessionStorage.setItem('time', '');
          this.$router.push({path:'/taggingResult', query: { id: this.data.id }});
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
    submit() {
      if (this.count <= 0) {
        this.$toast('您已超时');
        this.$router.replace({path:'/robot'});
      } else if (this.isShow) {
        const url = '/api/frontend/robot_read/answer?game_id=1';
        const position = `${this.left},${this.top}`;
        sessionStorage.setItem('position', position);
        const currentPosition = this.data.position.split(',');
        const left = currentPosition[0];
        const top = currentPosition[1];
        const distance = Math.sqrt(Math.pow(this.left - left, 2) + Math.pow(this.top - top, 2));
        const is_right = (1-distance)>0.96?1:0;
        const data = {
          question_id: this.data.id,
          position,
          is_right,
          answer_time: 100-this.count,
        }
        this.$axios.post(url, data).then((res) => {
          if (res.data.status === 0) {
            sessionStorage.setItem('time', '');
            this.$router.replace({path:'/taggingResult', query: { id: this.$route.query.id }});
          } else {
            this.$toast(res.data.msg);
          }
        });
      } else {
        this.$toast('请先标记');
      }
    },
  },
  created() {
    robot_share();
    this.index = sessionStorage.getItem('index');
    this.data = JSON.parse(sessionStorage.getItem('answer'));
    this.count = sessionStorage.getItem('time');
    clearInterval(window.timer);
    window.timer = setInterval(()=>{
      if (this.count>0) {
        this.count --;
        sessionStorage.setItem('time', this.count);
      } else {
        sessionStorage.removeItem('time');
        clearInterval(window.timer);
      }
    }, 1000);
  }
};

function getOffset(obj) {
  let x = 0;
  let y = 0;
  x = obj.getBoundingClientRect().left + document.body.scrollLeft;
  y = obj.getBoundingClientRect().top + document.body.scrollTop;
  return { x, y };
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.tagging {
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/robot/bgc1.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    color: #fff;
    overflow: scroll;
    background-attachment: fixed;
}
.tagging-title {
    display: flex;
    justify-content: space-around;
    padding-top: Rem(30);
}
.tagging-img {
    position: relative;
    width: Rem(624);
    margin: Rem(20) auto;
    img {
        width: 100%;
    }
    .my-tagging {
        position: absolute;
        width: Rem(70);
    }
}
.tagging-btns {
    width: Rem(624);
    margin: Rem(34) auto;
    display: flex;
    justify-content: space-between;
    .tagging-btn {
        display: inline-block;
        width: Rem(290);
        color: #fff;
        @extend %btn;
    }
}
.tuixiang {
    margin-top: 40px;
    @extend %tx;
}
</style>
