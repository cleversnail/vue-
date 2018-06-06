<template>
<div class="container">
  <div class="main">
    <div class="content">
      <img src="../../assets/img/game/head.png" alt="head" class="head">
      <ul>
        <li v-for="(item,index) in list">
          <div class="question">
            {{index+1}},{{item.content}}
          </div>
          <div class="answer" v-for="(ans,aIndex) in item.answer">
            <input :id="ans.id" type="radio" :name="ans.question_id">
            <label :for="ans.id">{{num[aIndex]}}.&nbsp;{{ans.content}}</label>
          </div>
        </li>
      </ul>
      <div class="submit-wrap">
        <a class="btn">提交答案</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'gameHelp',
  components: {},
  data() {
    return {
      list:[],
      num:['A','B','C','D'],
    };
  },
  created() {
    this.getData();
    this.$gameShare();
  },
  methods: {
    getData(){
      let url = '/api/frontend/game/index';
      this.$axios
        .get(url)
        .then((res)=>{
          this.list = res.data.data.list;
        })
    },
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
          padding: Rem(30) Rem(50);
          border-radius: Rem(10);
          .head {
            width: 100%;
            position: absolute;
            left: 0;
            top: Rem(-130);
          }
          li{
            margin-bottom: Rem(40);
            .question {
              margin-bottom: Rem(10);
            }
            .answer {
              input {
                display: none;
                &:checked+label{
                  background: $color-pippin;
                }
              }
              label {
                display: block;
                padding:Rem(4) Rem(35);
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
