<template>
<div class="container" v-if="info.enroll_info">
  <div class="head">
      <div v-if="info.enroll_info.status==0">
          <h1>审核中</h1>
          <div class="content">
              您的报名信息已提交，工作人员正在审核中....审核通过后，
              我们将以微信/短信的方式通知您，请耐心等待。请务必
              <span class="code" @click="show">添加[医看]服务号</span>以获取具体通知
          </div>
      </div>
      <div v-else-if="info.enroll_info.status==1">
          <h1>报名成功</h1>
          <div class="content">
              <p>恭喜您!您已报名成功!</p>
              <p>请务必 <span class="code" @click="show">添加[医看]服务号</span>以获取具体通知 </p>
              <p>快去 <router-link :to="{path:'/'}">活动主页</router-link>参与评分吧！</p>
          </div>
      </div>
      <div v-else>
          <h1>报名失败</h1>
      </div>
    <router-link :to="{path:'/'}">
        <img class="index" src="../../assets/img/apply/index.png" alt="主页">
    </router-link>
  </div>
  <form class="form">
    <div class="input">
      <div class="name">
        真实姓名
      </div>
      <input type="text" name="name" v-model="info.enroll_info.name" disabled>
    </div>
    <div class="input">
      <div class="name">
        手机号码*
      </div>
      <input type="text" name="phone" v-model="info.enroll_info.phone" disabled>
    </div>
    <div class="input">
      <div class="name">
        所在医院
      </div>
      <input type="text" name="hospital" v-model="info.enroll_info.hospital" disabled>
    </div>
    <div class="input">
      <div class="name">
        科室
      </div>
      <input type="text" name="department" v-model="info.enroll_info.keshi" disabled>
    </div>
    <div class="input">
      <div class="name">
        职称
      </div>
      <input type="text" name="title" v-model="info.enroll_info.zhicheng" disabled>
    </div>
    <div class="input">
      <div class="name">
        邮寄地址*
      </div>
      <textarea type="text" name="address" v-model="info.enroll_info.address" disabled>
      </textarea>
    </div>
    <div class="submit audit" v-if="info.enroll_info.status==0">
      <img src="../../assets/img/apply/audit.png" alt="审核">
      <div class="text">
        报名审核中
      </div>
    </div>
    <div class="submit success" v-else-if="info.enroll_info.status==1">
      <img src="../../assets/img/apply/success.png" alt="成功">
      <div class="text">
        报名成功！
      </div>
    </div>
  </form>
  <div class="info">
    <p>如对本活动有任何疑问，请咨询工作人员小看</p>
    <p>(微信号/电话:15700057027)</p>
  </div>
  <div v-if="showLayer" @click="close">
      <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import layer from '../common/layer';

export default {
  name: 'applyResulter',
  components:{
      layer
  },
  data() {
    return {
      info: {},
      showLayer:false
    };
  },
  created() {
    this.$wxShare();
    axios.get('/api/frontend/activity/soft_index')
      .then((res) => {
        if (res.data.status == 0) {
          this.info = res.data.data;
        }else if (res.data.status == -3) {
          var smart_url = encodeURIComponent(location.href);
          location.href = '/api/frontend/account/signin?smart_url=' + smart_url;
        }
      });
  },
  methods:{
      show(){
          this.showLayer = true;
      },
      close(){
          this.showLayer = false;
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.head {
    position: relative;
    width: 100%;
    height: Rem(350);
    // background: url('../assets/img/index/banner.png');
    background: url('http://img.kankanyisheng.com/6291486815535yjxbZnDnJS.jpg');
    background-size: cover;
    overflow: hidden;
    color: $color-white;
    text-align: center;
    h1 {
        font-size: Rem(56);
        margin: Rem(30) 0;
    }
    .content {
        width: 80%;
        margin: 0 auto;
        text-align: left;
        font-size: Rem(32);
        p {
            text-align: center;
        }
        a {
            color: $color-orange;
            font-weight: bold;
            text-decoration: underline;
        }
        .code {
            color: $color-black;
            text-decoration: underline;
        }
    }
    .index {
        position: absolute;
        right: Rem(30);
        top: Rem(20);

        width: Rem(100);
    }
}
.form {
    padding: Rem(30);
    .input {
        display: flex;
        margin: Rem(20) 0;
        padding: Rem(5);
        border: $border-gray;
        border-radius: Rem(10);
        background: $color-bg;
        font-size: Rem(32);
        .name {
            width: Rem(150);
            padding: Rem(5);
        }
        input,
        textarea {
            flex: 1;
            border: 0;
            outline: 0;
            background: $color-bg;
            padding: Rem(5);
        }
    }
}
.submit {
    width: Rem(240);
    margin: 0 auto;
    padding: Rem(10) Rem(18);
    border-radius: Rem(40);
    overflow: hidden;
    background: $main-color-blue;
    color: $color-white;
    img {
        float: left;
        width: Rem(50);
        margin-left: Rem(5);
    }
    .text {
        margin-left: Rem(60);
        font-size: Rem(36);
    }
    &.audit {
        background: lighten($color-gray, 30%);
    }
    &.success {
        background: $color-green;
    }
}
.info {
    width: 75%;
    margin: Rem(20) auto;
    text-align: center;
}
</style>
