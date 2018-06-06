<template>
  <div class="detail" v-if="data">
    <div class="detail__content">
      <div class="detail__header">
        <div class="detail__menu">已有<span class="color-red">{{data.unlock_num}}人</span>解锁</div>
        <div class="detail__menu color-red">{{data.name}}</div>
        <div class="detail-user" v-if="data.need_lock == 2">
          <img class="detail-user__headimg" src="http://wx.qlogo.cn/mmhead/PiajxSqBRaEKUD0Gfy5icWqrI5oxvoNwbWefFD54dl9lJNkzmEbxGib1g/0" alt="">
          <div class="detail-user__main">
            <p>小看</p>
            <p>已为您解锁</p>
          </div>
        </div>
        <div class="a-btn" v-else-if="isBlock" @click="goUnlock">
          <img class="close" src="../../assets/img/anatomy/close.png" alt="">
          去解锁
        </div>
        <div class="detail-user" v-else>
          <img class="detail-user__headimg" :src="data.unlock_member.headimg" alt="">
          <div class="detail-user__main">
            <p>{{data.unlock_member.nickname}}</p>
            <p>已为您解锁</p>
          </div>
        </div>
      </div>
      <div class="detail__imgs">
        <ul class="img-list">
          <li class="img-list__item" v-for="(item, index) in data.pics" @click="preview(data.pics, index)">
            <img class="img-list__pic" v-lazy="item.site+'@1e_1c_0o_0l_196h_196w_90q.src'" alt="">
            <img class="img-list__key" v-if="isBlock" src="../../assets/img/anatomy/key2.png" alt="">
            <img class="img-list__key" v-else src="../../assets/img/anatomy/key1.png" alt="">
          </li>
        </ul>
      </div>
      <ul class="detail-utils">
        <li class="detail-utils__item">
          <img class="detail-utils__icon" src="../../assets/img/anatomy/detail/fenxiang.png" alt="">
          {{data.share_num}}
        </li>
        <li class="detail-utils__item">
          <img class="detail-utils__icon" src="../../assets/img/anatomy/detail/talk.png" alt="">
          {{data.answer_num}}
        </li>
        <li class="detail-utils__item">
          <img class="detail-utils__icon" src="../../assets/img/anatomy/detail/eye.png" alt="">
          {{data.show_num}}
        </li>
      </ul>
    </div>
    <template v-for="item in data.reply">
      <answer :item="item" :extData="extData"></answer>
      <answer2 :item="item2" :extData="extData" v-for="item2 in item.nodes">{{item.member.nickname}}</answer2>
    </template>
    <div class="detail__footer">
      <div class="detail__uploadimgs">
        <div class="detail__uploadimg" v-for="(pic, index) in form.pics">
          <img :src="`http://img.kankanyisheng.com/${pic}`" alt="">
          <a class="detail__delete" @click="deletePic(index)">x</a>
        </div>
      </div>
      <textarea class="detail__textarea" v-model="form.content"></textarea>
      <div class="detail__handle">
        <!-- <a class="detail__addlink">添加链接</a> -->
        <a class="detail__btn" @click="submit">回答</a>
        <div class="detail__addimg">
          <upload :extData="extData" :form.sync="form"></upload>
        </div>
      </div>
      <img class="detail__ad" src="../../assets/img/anatomy/detail/qr.png" alt="">
    </div>
    <aMenu></aMenu>
    <master v-show="showMaster" :type="'detail'" @click.native="goUnlock"></master>
    <div class="master-weixin" v-show="isShow" @click="hide">
      <div class="wexin-box">
        <img class="wexin-code" src="http://community.kankanyisheng.com/api/frontend/user/iniqrcode?info=1000007" alt="">
        <p>长按二维码关注<span class="wexin-yk">[医看]</span>公众号</p>
        <p>即可参与解锁</p>
      </div>
    </div>
    <preview v-show="showPreview" :imgs="data.pics" :target.sync="target" :close="close"></preview>
  </div>
</template>

<script>
import answer from './common/answer';
import answer2 from './common/answer2';
import upload from './common/upload';
import getName from 'src/utils/getName.js';
import openSwipe from 'src/utils/openswipe.js';
import aMenu from './common/menu';
import master from './common/master';
import preview from './common/preview';
import share from 'src/utils/anatomy_share';

export default {
  components: {
    answer,
    answer2,
    upload,
    aMenu,
    master,
    preview,
  },
  computed: {
    isBlock() {
      if (this.data.need_lock == 1 && this.data.unlock_info.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      data: null,
      form: {
        dissect_id: '',
        content: '',
        pics: [],
        parent_id: '',
        type: 4,
      },
      extData: {
        key: null,
        policy: null,
        OSSAccessKeyId: null,
        success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        signature: null,
      },
      showMaster: false,
      showPreview: false,
      isShow: false,
      user: null,
      target: {
        index: 0,
      },
      index: 0,
    }
  },
  created() {
    this.form.dissect_id = this.$route.params.id;
    this.getDetail();
    this.getSign();
    setInterval(() => {
      this.getSign();
    }, 20000);
  },
  watch: {
    $route() {
      this.form.dissect_id = this.$route.params.id;
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      const url = `/api/bk/baike/dissect/detail/${this.$route.params.id}`;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
          this.getUser(this.data);
          setTimeout(()=>{
            this.preload(this.data.pics);
          }, 2000);
        }
      })
    },
    getSign() {
      this.$axios.get('/api/frontend/utils/uploadsign')
        .then((res) => {
          const res2 = res.data;
          const data = {
            key: res2.dir,
            policy: res2.policy,
            OSSAccessKeyId: res2.accessid,
            success_action_status: '200', // 让服务端返回200,不然，默认会返回204
            signature: res2.signature,
          };
          this.extData = data;
        });
    },
    deletePic(index) {
      this.form.pics.splice(index, 1);
    },
    getUser(data) {
      const url = `/api/frontend/user/userinfo`;
      const that = this;
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data.detail;
          const title1 = `请帮我解锁这部${data.name}医学影像解剖图`;
          const title2 = `我在「医看」发现了这部${data.name}医学影像解剖图，请帮我解锁一下~`;
          const desc = '更多部位解剖图，分享即可免费查看';
          let link = `${location.origin}/active_web/#/anatomy/unlock?id=${this.$route.params.id}&uid=${this.user.id}`;
          if (data.special_category_id.indexOf(data.category_id)>-1 ) {
            link = `${location.origin}/active_web/#/anatomy/unlock?uid=${this.user.id}`;
            console.log(link);
          }
          const imgUrl = 'http://img.kankanyisheng.com/yikan-t/20170831/15041798515158478091.jpeg';
          var config1 = {
            title: title1,
            desc,
            link,
            imgUrl,
            success: function(res) {
              that.shareCallBack();
            },
            fail: function(res) {
              alert('error');
            }
          }
          // 微信朋友圈分享
          var config2 = {
            title: title2, // 分享标题
            link, // 分享链接
            imgUrl, // 分享图标
            success: function(res) {
              // 用户确认分享后执行的回调函数
              that.shareCallBack();
            },
            fail: function(res) {
              alert('error');
            }
          }
          wx.ready(function() {
            wx.onMenuShareAppMessage(config1);
            wx.onMenuShareTimeline(config2);
          });
        }
      })
    },
    shareCallBack() {
      const url = `/api/bk/baike/dissect/share/${this.$route.params.id}`;
      this.$axios.put(url).then((res) => {
        console.log(res);
      })
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
    goUnlock() {
      if (subscribe) {
        this.showMaster = !this.showMaster;
      } else {
        this.isShow = true;
      }
    },
    preview(photos, index) {
      if (!this.isBlock) {
        // openSwipe(photos, index);
        this.target.index = index;
        this.showPreview = true;
      } else {
        if (subscribe) {
          this.showMaster = !this.showMaster;
        } else {
          this.isShow = true;
        }
      }
    },
    hide() {
      this.isShow = false;
    },
    close() {
      this.showPreview = false;
    },
    preload(imgs) {
      imgs.forEach((item) => {
        const img = new Image();
        img.src = item.site;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.detail {
  background: #f5f5f5;
  min-height: 100vh;
  &__content {
    margin-bottom: Rem(20);
    padding: Rem(20);
    background: $color-white;
  }
  &__header {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__menu {
    width: Rem(200);
    text-align: center;
    @include ellipsis-single;
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
  &__handle {
    overflow: hidden;
  }
  &__addlink {
    text-decoration: underline;
    color: $color-blue;
  }
  &__addimg {
    float: right;
    width: Rem(70);
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
  &__ad {
    width: 100%;
    margin-top: Rem(20);
  }
  &-user {
    display: flex;
    &__headimg {
      $length: Rem(60);
      width: $length;
      height: $length;
      border-radius: 50%;
    }
    &__main {
      font-size: Rem(20);
    }
  }
  &-utils {
    display: flex;
    margin-top: Rem(25);
    padding-top: Rem(20);
    border-top: 1px solid #e6e6e6;
    &__item {
      width: 33%;
      &:not(:last-of-type) {
        border-right: 1px solid #e6e6e6;
      }
      text-align: center;
    }
    &__icon {
      width: Rem(30);
      margin-bottom: Rem(9);
    }
  }
  &-answer {
    margin-bottom: Rem(20);
    padding: Rem(20);
    background: $color-white;
    &__content {
      margin-top: Rem(10);
    }
    &__handle {
      text-align: right;
    }
    &__btn {
      display: inline-block;
      padding: Rem(6) Rem(20);
      border: 1px solid #e6e6e6;
      border-radius: Rem(6);
    }
  }
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    position: relative;
    width: Rem(220);
    height: Rem(220);
    margin-top: Rem(25);
    background: url('~src/assets/img/anatomy/kong.png') no-repeat;
    background-size: cover;
    &:not(:nth-of-type(3n)) {
      margin-right: Rem(25);
    }
  }
  &__pic {
    width: 100%;
  }
  &__key {
    position: absolute;
    right: Rem(10);
    bottom: Rem(10);
    width: Rem(40);
  }
}
.color-red {
  color: $color-red;
}
.close {
  width: Rem(20);
  margin-bottom: Rem(6);
}
img[lazy=loading] {
  display: block;
  width: Rem(80);
  height: Rem(80);
  margin:  Rem(70) auto;
}
</style>
