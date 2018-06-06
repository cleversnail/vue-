<template lang="html">
  <div class="backCT">
    <div class="backCT-title">
      <div>标记位置：0/1</div>
      <div>剩余次数:{{index}}次</div>
      <div>倒计时：{{count}}s</div>
    </div>
    <robotTitle :say='say'>
      <music slot="robot-music" :type="'homeMusic'"></music>
    </robotTitle>
    <ctimg :img="data.pic"></ctimg>
    <div class="tagging-btns">
      <div class="tagging-btn" @click="showMaster = true">病人详情</div>
      <div class="tagging-btn" @click="goTagging">标记X光</div>
    </div>
    <copyright :is-hide="true"></copyright>
    <div v-show="showMaster" class="backCT-master"  @click="showMaster = false">
      <p>难度系数:{{data.level}}</p>
      <p>{{data.description}}</p>
      <div class="master-btn" @click="showMaster = false">
        返回标注
      </div>
    </div>
  </div>
</template>

<script>
import robotTitle from './common/robot-title';
import ctimg from './common/ctimg';
import music from './common/music';
import copyright from './common/copyright';
import robot_share from '../../utils/robot_share';

export default {
  data() {
    return {
      say: '左右滑动或点击图片翻页，确认结节后，点击［x光标记］去标记吧！',
      showMaster: false,
      data: {},
      index: 0,
      count: 0,
    }
  },
  created() {
    robot_share();
  },
  methods: {
    goTagging() {
      sessionStorage.setItem('time', this.count);
      this.$router.replace({path:'/tagging', query: { id: this.$route.query.id }});
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
  },
  components: {
    robotTitle,
    ctimg,
    music,
    copyright
  },
  created() {
    this.index = sessionStorage.getItem('index');
    this.data = JSON.parse(sessionStorage.getItem('answer'));
    const count = sessionStorage.getItem('time');
    this.count = count || 100;
    window.timer = setInterval(()=>{
      if (this.count>0) {
        this.count --;
      } else {
        sessionStorage.removeItem('time');
        clearInterval(window.timer);
        window.timer = null;
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .backCT{
    width: 100%;
    height: 100vh;
    background: url('../../assets/img/robot/bgc1.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    color:#fff;
    overflow: scroll;
    background-attachment: fixed;
  }
  .backCT-title{
    display: flex;
    justify-content: space-around;
    padding-top:Rem(30);
  }
  .tagging-btns{
    width: Rem(624);
    margin: Rem(34) auto;
    display: flex;
    justify-content: space-between;
    .tagging-btn{
      display: inline-block;
      width: Rem(290);
      @extend %btn;
      color:#fff;
    }
  }
  .tuixiang {
    margin-top:Rem(80);
    @extend %tx;
  }
  .backCT-master{
    background-color:rgba(0,0,0,.8);
    position: fixed;
    top: Rem(72);
    font-weight: bold;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: left;
    padding: Rem(50);
    line-height: Rem(50);
    font-size: 16px;
    letter-spacing: 2px;
    .master-btn{
      position: fixed;
      bottom: Rem(100);
      left: 50%;
      transform: translateX(-50%);
      width: Rem(266);
      height: Rem(80);
      line-height: Rem(80);
      border: 1px solid #fff;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
