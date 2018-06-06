<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head">
      <div class="" class="close">
        <img src="../../assets/img/game/cutdown.png">
        <div class="text">
          {{time}}S
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in list">
          <div class="question">
            {{index+1}},{{item.content}}
          </div>
          <div class="answer" v-for="(ans,aIndex) in item.answer">
            <input :id="ans.id" type="radio" :name="ans.question_id" v-model="data.record[index].answer_ids[0]" :value="ans.id">
            <label :for="ans.id">{{ans.content}}</label>
          </div>
        </li>
      </ul>
      <div class="submit-wrap">
        <a class="btn" @click="submit">提交答案</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Qs from 'qs';

export default {
  name: 'gameAnswer',
  components: {},
  data() {
    return {
      list: [],
      time:90,
      data: {
        record: [{
            question_id: null,
            answer_ids: []
          },
          {
            question_id: null,
            answer_ids: []
          },
          {
            question_id: null,
            answer_ids: []
          }
        ]
      }
    };
  },
  created() {
    this.getData();
    this.$gameShare();
    this.cutdown();
  },
  methods: {
    getData() {
      let url = '/api/frontend/game/index';
      this.$axios
        .get(url)
        .then((res) => {
          this.list = res.data.data.list;
          this.initData(this.list, this.data.record);
        })
    },
    submit() {
      const url = '/api/frontend/game/answer';
      if(this.time<=0){
        this.$toast('超过90秒规定时间，无法答题');
      }else {
        this.$messagebox
          .confirm('确定提交？')
          .then(action => {
            this.$axios
              .post(url, this.data)
              .then((res) => {
                if (!res.data.status) {
                  let answer = JSON.stringify(res.data.data);
                  localStorage.setItem('answer', answer);
                  this.$router.replace('/game/result');
                } else {
                  this.$toast(res.data.msg);
                }
              })
          })
      }
    },
    initData(obj, target) {
      obj.forEach((item, index) => {
        target[index].question_id = item.id;
      })
    },
    cutdown(){
      let that = this;
      let time;
      time = setInterval(function(){
        if(that.time<=0){
          that.time=0;
          time = null;
        }else {
          that.time-=1;
        }
      },1000);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.container {
    background: url('http://img.kankanyisheng.com/yikan-t/20170317/14897412838245553908.png');
    background-size: cover;
    .main {
        padding: Rem(160) Rem(40) 0;
        .content {
            position: relative;
            background: $color-white;
            margin-bottom: Rem(100);
            padding: Rem(30) Rem(50);
            border-radius: Rem(10);
            .head {
                width: 100%;
                position: absolute;
                left: 0;
                top: Rem(-130);
            }
            .close {
              width: Rem(93);
              position: absolute;
              right: Rem(10);
              top: Rem(-80);
              img {
                width: 100%;
              }
              .text {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                color: $color-white;
                font-size: Rem(40);
              }
            }
            li {
                margin-bottom: Rem(40);
                .question {
                    margin-bottom: Rem(10);
                }
                .answer {
                    input {
                        display: none;
                        &:checked+label {
                            background: $color-pippin;
                        }
                    }
                    label {
                        display: block;
                        padding: Rem(4) Rem(35);
                        border-radius: Rem(8);
                        background: #F2F2F2;
                        margin-bottom: Rem(10);
                    }
                }
            }
            .submit-wrap {
                margin-top: Rem(20);
                text-align: center;
            }
        }
    }
    .btn {
        padding: Rem(10) Rem(70);
        background: #F1A177;
        color: $color-white;
        border-radius: Rem(30);
    }
}
</style>
