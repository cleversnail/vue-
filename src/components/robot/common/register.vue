<template>
<div class="layer" v-show="show">
  <div class="form">
    <h3>请您输入真实姓名和联系方式</h3>
    <h3>方便领取奖品</h3>
    <div class="form__close" @click="close">
      ×
    </div>
    <input class="form__input" type="text" v-model="form.name" placeholder="请输入真实姓名">
    <input class="form__input" type="text" v-model="form.phone" placeholder="请输入电话号码">
    <div class="form__btn" @click="submit">
      确定
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      form: {
        name: '',
        phone: '',
      }
    }
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    submit() {
      const url = '/api/frontend/robot_read/enroll';
      if (this.form.name && this.form.phone) {
        this.$axios.post(url, this.form).then((res) => {
          if (res.data.status === 0) {
            location.reload();
          } else {
            this.$toast(res.data.msg);
          }
        })
      } else {
        this.$toast('表单不能为空');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/config.scss";

.layer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.7);
    z-index: 2;
}
.form {
    position: relative;
    width: Rem(500);
    margin: Rem(300) auto;
    padding: Rem(40);
    background: #F5F9FF;
    text-align: left;
    &__input {
        box-sizing: border-box;
        width: 100%;
        margin-top: Rem(20);
        padding: Rem(30);
        border: 1px solid #E2E8F4;
        outline: 0;
    }
    &__btn {
        box-sizing: border-box;
        width: 100%;
        margin-top: Rem(40);
        padding: Rem(30);
        background: #75BCFA;
        border: 1px solid #3F7EEA;
        color: #fff;
        text-align: center;
    }
    &__close {
      position: absolute;
      right: Rem(10);
      top: 0;
      font-size: Rem(60);
    }
}
</style>
