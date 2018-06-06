<template lang="html">
  <div class="answer" v-if="data">
    <div class="answer__head">
      <img class="answer__logo" src="~assets/img/dissection/answer_logo.png" alt="">
      <div>
        <p>题目：{{this.name}}</p>
        <p>倒计时：{{time}}s</p>
      </div>
    </div>
    <div class="answer__main">
      <div class="answer__title">
        ({{no+1}}/{{data.question.length}}) {{data.question[no].content}}
      </div>
      <img class="answer__img" :src="initImg(data.question[no].img)" @click="open(data.question[no].img)">
      <div class="tc">
        <a class="open">点击图片可放大查看</a>
      </div>
      <ul class="list">
        <li class="list__item" :class="{'active': item.id === (temp && temp.answer_ids)}" v-for="(item, index) in data.question[no].game_answer" @click="choose(item)">
          {{sort[index]}}：{{item.content}}
        </li>
      </ul>
    </div>
    <div class="answer__btns">
      <a @click="prev">
        <img class="btn" src="~assets/img/dissection/prev.png" alt="">
      </a>
      <a>
        <img class="btn" src="~assets/img/dissection/next.png" alt="" @click="next" v-if="no<data.question.length-1">
        <img class="btn" src="~assets/img/dissection/submit.png" alt=""@click="submit" v-else>
      </a>
    </div>
  </div>
</template>

<script>
import openswipe from './openswipe';
import {shuffle} from '../../utils/utils';
export default {
  data() {
    return {
      data: null,
      user: null,
      sort: {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D'
      },
      no: 0,
      answer: {
        record: [],
        answer_times: 0,
        dcategory_id: '',
        not_commit: 0,
      },
      temp: null,
      time: 300,
      name: '',
      num: 0,
    }
  },
  created() {
    this.name = this.$route.query.name;
    this.getData(this.$route.query.id);
    this.getUser();
    this.countDown();
  },
  methods: {
    getData(id) {
      const url = `/api/frontend/dissect_game/question?dcategory_id=${id}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
          if (this.data.question.length>1) {
            this.data.question = shuffle(this.data.question);
          }
        }
      })
    },
    getUser() {
      const url = '/api/frontend/dissect_game/person';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
        }
      });
    },
    initImg(img) {
      if (img.indexOf('http')>-1) {
        return img;
      }
      return `http://img.kankanyisheng.com/${img}`;
    },
    countDown() {
      const timer = setInterval(() => {
        this.time --;
        if (this.time<=0) {
          clearInterval(timer);
        }
      }, 1000)
    },
    open(img) {
      openswipe(img);
    },
    choose(item) {
      this.temp = {
        question_id: item.question_id,
        answer_ids: item.id,
        is_right: item.is_right
      };
    },
    prev() {
      if (this.no>0) {
        this.no --;
      }
    },
    next() {
      if (this.no <this.data.question.length-1 && this.temp) {
        this.judge();
        this.no++;
        this.answer.record.push(this.temp);
        this.temp = null;
      } else {
        this.$toast('请选择答案');
      }
    },
    judge() {
      this.answer.record.forEach((item, index) => {
        if (this.data.question[this.no].id === item.question_id) {
          this.answer.record.splice(index, 1);
        }
      })
    },
    isGreater() {
      let rightNum = 0;
      this.answer.record.forEach((item) => {
        if (item.is_right == 1) {
          rightNum ++;
        }
      });
      this.num = rightNum;
      const lastRightNum = parseInt(this.data.record.right_question_num) || 0;
      const lastTime = parseInt(this.data.record.answer_time) || 300;
      const condition1 = rightNum>lastRightNum;
      const condition2 = rightNum == lastRightNum && this.answer.answer_times < lastTime;
      if (condition1 || condition2) {
        return true;
      }
      return false;
    },
    submit() {
      if (this.temp) {
        this.judge();
        this.answer.record.push(this.temp);
        this.answer.answer_times = 300 - this.time;
        this.answer.dcategory_id = this.$route.query.id;
        this.temp = null;

        const query = {
          num: this.num,
          all: this.data.question.length,
          name: this.$route.query.name,
          time: this.answer.answer_times
        }
        const url = '/api/frontend/dissect_game/answer';

        if (this.isGreater()) {
          query.num = this.num;
          this.$axios.post(url, this.answer).then((res) => {
            if (res.data.status == 0) {
              this.$router.replace({name: 'dissectionResult', query});
            } else {
              this.$toast(res.data.msg);
            }
          })
        } else {
          query.num = this.num;
          this.answer.not_commit = 1;
          this.$axios.post(url, this.answer).then((res) => {
            if (res.data.status == 0) {
              this.$router.replace({name: 'dissectionResult', query});
            } else {
              this.$toast(res.data.msg);
            }
          })
        }
      } else {
        this.$toast('请选择答案');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.answer {
  @extend %fullpage;
  color: #05104F;
  background: url('~assets/img/dissection/answer_bg.png') no-repeat;
  background-size: 100% 100%;
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: Rem(20);
  }
  &__logo {
    width: Rem(430);
    height: Rem(114);
  }
  &__main {
    width: Rem(618);
    margin: 0 auto;
    padding: Rem(20) Rem(25);
    background: rgba(255, 255, 255, .5);
  }
  &__img {
    display: block;
    width: 100%;
    margin: Rem(26) auto;
    background: #000;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: Rem(668);
    margin: Rem(30) auto;
    a {
      display: inline-block;
      width: 48%;
    }
  }
}
.open {
  position: relative;
  color: $color-red;
  &:before {
    position: absolute;
    left: Rem(-30);
    top: 0;
    content: '';
    border: Rem(12) solid;
    border-color: transparent transparent $color-red transparent;
  }
}
.list {
  margin-bottom: Rem(50);
  &__item {
    margin-top: Rem(16);
    padding: 0 Rem(26);
    line-height: 2.5;
    border-radius: Rem(4);
    background: rgba(255, 255, 255, .4);
    &.active {
      background: rgba(#99EBAB, .8);
    }
  }
}
</style>
