<template>
  <div>
    <div class="answer">
      <div class="user">
        <div class="user__main">
          <div class="user__name">{{item.member.nickname}}</div>
          <div class="user__time">{{item.addtime}}</div>
        </div>
      </div>
      <div class="answer__content">
        回复<span class="answer__name"><slot></slot></span>:{{item.content}}
      </div>
      <div class="answer__imgs">
        <img :src="`http://img.kankanyisheng.com/${pic.site}@1e_1c_0o_0l_196h_196w_90q.src`" alt="" v-for="pic in item.pic">
      </div>
      <div class="answer__handle">
        <a class="answer__reply" @click="reply">{{isShow?'取消': '回复'}}</a>
      </div>
      <div class="answer__footer" v-show="isShow">
        <div class="answer__uploadimgs">
          <div class="answer__uploadimg" v-for="(pic, index) in form.pics">
            <img :src="`http://img.kankanyisheng.com/${pic}`" alt="">
            <a class="answer__delete" @click="deletePic(index)">x</a>
          </div>
        </div>
        <textarea class="answer__textarea"></textarea>
        <div class="answer__handle2">
          <!-- <a class="answer__addlink">添加链接</a> -->
          <a class="answer__btn" @click="submit">回答</a>
          <div class="answer__addimg">
            <upload :extData="extData" :form.sync="form"></upload>
          </div>
        </div>
      </div>
    </div>
    <template v-if="item.nodes&&item.nodes.length>0">
      <answer2 :item="item2" :extData="extData" v-for="item2 in item.nodes">{{item.member.nickname}}</answer2>
    </template>
  </div>
</template>

<script>
import upload from './upload';

export default {
  name: 'answer2',
  data() {
    return {
      isShow: false,
      form: {
        dissect_id: '',
        content: '',
        pics: [],
        parent_id: '',
        type: 4,
      }
    }
  },
  created() {
    this.form.dissect_id = this.$route.params.id;
  },
  props: ['item', 'extData'],
  components: {
    upload,
  },
  methods: {
    reply() {
      this.isShow = !this.isShow;
    },
    deletePic(index) {
      this.form.pics.splice(index, 1);
    },
    submit() {
      if (this.form.content.length>0) {
        this.$messagebox.confirm('确定提交？').then((action) => {
          const url = '/api/frontend/operation/comment';
          this.$axios.post(url, this.form).then((res) => {
            if (res.data.status === 0) {
              location.reload();
            } else {
              this.$toast(res.data.msg);
            }
          })
        }).catch((action) => {
          console.log(action);
        })
      } else {
        this.$toast('请填写内容');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.answer {
  margin-top: Rem(-20);
  margin-bottom: Rem(20);
  padding: Rem(20);
  background: $color-white;
  border-top: 1px solid #f0f0f0;
  &__content {
    margin-bottom: Rem(20);
    padding: Rem(10) Rem(20);
    background: $color-white;
  }
  &__imgs {
    display: flex;
    flex-wrap: wrap;
    img {
      width: Rem(100);
      height: Rem(100);
      margin-right: Rem(10);
    }
  }
  &__handle {
    text-align: right;
  }
  &__reply {
    display: inline-block;
    padding: Rem(6) Rem(20);
    border: 1px solid #e6e6e6;
    border-radius: Rem(6);
  }
  &__name {
    font-weight: bold;
  }
  &__footer {
    padding: Rem(30);
    background: $color-white;
  }
  &__uploadimgs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: Rem(10);
  }
  &__uploadimg {
    position: relative;
    img {
      width: Rem(120);
      height: Rem(120);
      margin-right: Rem(20);
    }
  }
  &__delete {
    position: absolute;
    right: Rem(5);
    top: Rem(-10);
    display: block;
    width: Rem(30);
    height: Rem(30);
    text-align: center;
    line-height: Rem(28);
    background: $color-red;
    color: #fff;
    border-radius: 50%;
  }
  &__textarea {
    width: 100%;
    padding: Rem(10);
    border: 1px solid #e6e6e6;
    outline: 0;
    border-radius: Rem(6);
    box-sizing: border-box;
  }
  &__handle2 {
    overflow: hidden;
  }
  &__addlink {
    text-decoration: underline;
    color: $color-blue;
  }
  &__addimg {
    float: right;
    width: Rem(60);
    margin-right: Rem(10);
  }
  &__btn {
    display: inline-block;
    float: right;
    padding: Rem(6) Rem(20);
    background: $color-red;
    color: $color-white;
    border-radius: Rem(6);
  }
}
.user {
  display: flex;
  &__media {
    position: relative;
    margin-right: Rem(20);
  }
  &__name {
    color: #1dcda6;
  }
  &__headimg {
    $length: Rem(95);
    width: $length;
    height: $length;
    border-radius: 50%;
  }
  &__main {
    padding-top: Rem(6);
    padding-left: Rem(20);
  }
  &__time {
    font-size: Rem(20);
    color: #999;
  }
  &__info {
    font-size: Rem(24);
    color: #999;
  }
}
</style>
