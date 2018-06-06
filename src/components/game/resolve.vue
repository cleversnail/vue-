<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/true_answer.png" alt="head" class="head">
      <img src="../../assets/img/game/close.png" alt="close" class="close" @click="close">
      <ul>
        <li v-for="(item,index) in list">
          <div class="question">
            {{index+1}},{{item.question.content}}
          </div>
          <div class="answer" v-for="(ans,aIndex) in item.question.answer">
            <input :id="ans.id" type="radio" :name="ans.question_id" disabled>
            <label :class="{right:ans.is_right==='1'}" :for="ans.id">{{ans.content}}</label>
          </div>
          <div class="explain">
            <h3>解析：</h3>
            {{item.question.explain}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'gameResolve',
  components: {},
  data() {
    return {
      list: [],
      can_lottery:false,
    };
  },
  created() {
    this.getData();
    this.$gameShare();
    this.$wxConfig();
  },
  methods: {
    getData() {
      const url = '/api/frontend/game/userrecord'
      this.$axios.get(url)
        .then((res) => {
          if (res.data.status==0) {
            this.can_lottery = isLottery(res.data.data);
            this.list = res.data.data.reverse();
          }
        })
    },
    close(){
      this.$router.go(-1);
    }
  }
};

function isLottery(arr){
  let can_lottery = 0;
  arr.forEach(item=>{
    can_lottery+=parseInt(item.is_right)
  });
  return can_lottery === 3;
}
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
            }
            li {
                margin-bottom: Rem(40);
                .question {
                    margin-bottom: Rem(10);
                }
                .answer {
                    input {
                        display: none;
                    }
                    label {
                        display: block;
                        padding: Rem(4) Rem(35);
                        border-radius: Rem(8);
                        background: $color-pippin;
                        margin-bottom: Rem(10);
                        &.right {
                            background: $color-green;
                        }
                    }
                }
                .explain {
                  background: lighten($color-gray, 50%);
                  padding: Rem(4) Rem(35);
                  border-radius: Rem(8);
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
