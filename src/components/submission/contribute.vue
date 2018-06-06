<template lang="html">
  <div class="contribute">
    <div class="page">
      <div class="header">
        <span>我要投稿</span>
        <router-link :to="{path:'contribution'}">
          <div class="back">
            返回</br>主页
          </div>
        </router-link>
      </div>
      <div class="content">
        <ul>
          <li>
            <input type="text" v-model="message.name" placeholder="请输入您的姓名">
            <div class="title-lf">投稿者姓名</div>
          </li>
          <li>
            <input type="text" v-model="message.hospital" placeholder="请填写您所任职的医院">
            <div class="title-lf">所在医院</div>
          </li>
          <li>
            <input type="text" v-model="message.keshi" placeholder="请填写您所在的科室">
            <div class="title-lf">科室</div>
          </li>
          <li>
            <input type="text" v-model="message.zhicheng" placeholder="请填写您的职称信息">
            <div class="title-lf">职称</div>
          </li>
          <li>
            <input type="text" v-model="message.title" placeholder="请输入稿件的标题">
            <div class="title-lf">投稿标题</div>
          </li>
          <li class="last-li">
            <textarea name="name"  v-model="message.content" placeholder="请直接填写详细稿件内容，我们 将进行审核。一经采用，即可获 得丰富稿酬！">
            </textarea>
            <div class="title-lf">投稿内容</div>
          </li>
        </ul>
        <div class="footer">
          <div class="footer-btn" @click="putlist">
            <img src="../../assets/img/submission/contribute/btn.png" alt="">
          </div>
          <span>
            如对您的稿件内容很长，或有图片等形式。请添加医看 小助手的微信(微信号/电话：15700057027),发送电子 文档。
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      message: {
        name: '',
        hospital: '',
        keshi: '',
        zhicheng: '',
        title: '',
        content: '',
        casual_activity_id: 5,
      },
      status: true,
    }
  },
  methods: {
    putlist() {
      const url = `/api/frontend/vote/enroll`;
      for(const item in this.message){
        if(this.message[item] == ''){
          this.status = false;
          break;
        } else {
          this.status = true;
        }
      }
      if(this.status){
        this.$axios.post(url,this.message).then((res) => {
          if (res.data.status == 0) {
            // 提交成功
            this.$toast(res.data.msg);
            this.$router.push('contribution');
          } else {
            this.$toast('提交失败');
          }
        })
      } else {
        this.$toast('请先填满表单');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .contribute,.page{
    width: 100%;
    height: 100%;
  }
  .page{
    .header{
      background:url('../../assets/img/submission/contribute/bgc.png') no-repeat;
      background-size: cover;
      text-align: center;
      position: relative;
      height: Rem(130);
      span{
        line-height: Rem(130);
        font-size: Rem(52);
        color: #fff;
      }
      .back{
        position: absolute;
        width: Rem(90);
        height: Rem(90);
        border-radius: 50%;
        background-color: #fff;
        line-height: Rem(30);
        top: Rem(20);
        right: Rem(38);
        box-sizing: border-box;
        padding-top: Rem(14);
        color: #F89626;
        font-size: Rem(29);
      }
    }
    .content{
      text-align: center;
      padding-top: Rem(50);
      li{
        position: relative;
        font-size: Rem(32);
        margin-bottom: Rem(20);
        input{
          width: Rem(680);
          height: Rem(80);
          box-sizing: border-box;
          border: 1px solid #A0A0A0;
          border-radius: Rem(10);
          padding-left: Rem(220);
          line-height: Rem(80);
        }
        .title-lf{
          position: absolute;
          top: Rem(16);
          left: Rem(80);
          color: #333;
        }
      }
      .last-li{
        textarea{
          height: Rem(378);
          width: Rem(680);
          box-sizing: border-box;
          border: 1px solid #A0A0A0;
          border-radius: Rem(10);
          padding-left: Rem(220);
          padding-top: Rem(50);
        }
        .title-lf{
          top: Rem(80);
        }
      }
    }
    .footer{
      text-align: center;
      .footer-btn{
        img{
          width: Rem(260);
        }
      }
      span{
        display: inline-block;
        width: 90%;
        font-size: Rem(24);
        color: #333;
        margin-top: Rem(38);
      }
    }
  }
</style>
