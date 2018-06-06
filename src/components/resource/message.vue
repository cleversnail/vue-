<template lang="html">
  <div class="message">
    <textarea class="message__text" v-model="form.content" placeholder="您有什么想要的资料请告诉我们，我们会努力为您准备。在使用过程中遇到任何困难也请告诉我们，我们会第一时间为您解决"></textarea>
    <img class="message__btn" @click="submit" src="~assets/img/resource/message_btn.png" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content: '',
      }
    }
  },
  methods: {
    submit() {
      const url = '/api/frontend/gift/leave_msg';
      if (this.form.content.length>0) {
        this.$axios.post(url, this.form).then((res) => {
          this.$toast(res.data.msg);
          if (res.data.status === 0) {
            this.form.content = '';
          }
        })
      } else {
        this.$messagebox.alert('内容不能为空')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config';
.message {
  &__text {
    display: block;
    width: 90%;
    height: Rem(470);
    margin: Rem(40) auto;
    padding: Rem(20);
    border: 1px dotted darken(#d7dbdc, 40%);
    outline: 0;
    box-sizing: border-box;
  }
  &__btn {
    display: block;
    width: Rem(300);
    margin: 0 auto;
  }
}
</style>
