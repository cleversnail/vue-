<template lang="html">
  <div class="page">
    <div class="header">
      <img class="header-img" src="../../assets/img/read/index/tou.png" alt="">
      <div class="header-flex">
        <div class="header-left">
          <img :src="list.member&&list.member.headimg" alt="">
          <div class="name">
            <div>{{list.member&&list.member.name}}</div>
            <div>成绩: {{list.user_days}}天 &nbsp 排名: {{list.user_rank}}</div>
          </div>
        </div>
        <div class="header-right">
          <img src="../../assets/img/read/index/jiangb.png" alt="">
          <router-link to="/read_plan/rank">
            <div>查看排行榜 >></div>
          </router-link>
          </div>
      </div>
      <div class="header-btn" v-if="ismine" @click="goshare">
        进入今日优选文章 [去打卡]
      </div>
      <div class="header-btn" v-else @click="joinmask = true">
        我也加入阅读计划,和 ta 一起阅读
      </div>
    </div>
    <calendar></calendar>
    <div class="footer">
      <div class="footer-head">
        活动简介
      </div>
      <div>
       ［医看］为你每天精心准备一篇医学相关文章，充分利用空闲时间，学习更多医学知识。进入医看公众号参与医看阅读计划，做更优秀的医生，养成更好的阅读习惯。</br>
        <div class="saycolor">如何打卡</div>
        点击进入今日优选文章按钮,扫码并阅读推送的文章，记作一次打卡。（每天只发布一次打卡阅读计划，超时打卡将不计入成绩</br>
        <div class="saycolor">关于号召榜</div>
        点击“展现阅读力量，打卡朋友圈”按钮，分享出去，通过这个分享链接，加入阅读计划的人的数量来计算号召人数。</br>
        <div class="saycolor">联系我们</div>
        对本次活动有任何疑问或建议，请添加［医看］客服务：小看（手机／微信号：15700057027），进行交流。
      </div>
    </div>
    <div class="fixed" v-show="ismine" @click="showmask = true">
      展现阅读力量，打卡朋友圈
    </div>
    <div class="masker" v-show="showmask">
      <span @click="showmask = false">关闭</span>
      <img src="../../assets/img/read/index/mask.png" alt="">
    </div>
    <div class="masker" v-show="joinmask">
      <span @click="joinmask = false">关闭</span>
      <img src="../../assets/img/read/index/joinmask.png" alt="">
    </div>
    </div>
  </div>
</template>

<script>
import calendar from '../common/calendar.vue';
import readShare from '../../utils/read_share';
export default {
  data() {
    return {
      showmask: false,
      joinmask: false,
      list: [],
      listinfo: [],
      ismine: Boolean,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const id = this.$route.query.invite_uid;
      const uid = id || ' ';
      const url = `/api/frontend/daily_read/show?invite_uid=${uid}`;
      const urlinfo = `/api/frontend/user/userinfo`;
      this.$axios.get(urlinfo)
        .then((res) => {
          this.listinfo = res.data.data.detail;
          this.$axios.get(url)
            .then((res) => {
              this.list = res.data.data;
              let title1 = '［医看］阅读计划 ',
                title2 = `我参加了［医看］阅读计划，打卡${this.list.user_days}天，排名${this.list.user_rank}，你也来参加吧`,
                desc = `我参加了［医看］阅读计划，打卡${this.list.user_days}天，排名${this.list.user_rank}，你也来参加吧`,
                url1 = `${location.href}?invite_uid=${this.listinfo.id}`;
              readShare(title1, title2, desc, url1);
              if (this.listinfo.id == uid) {
                this.ismine = true;
              }else if (id) {
                this.ismine = false; // 找到了是别人
              } else {
                this.ismine = true; // 没找到 是自己
              }
            });
        })
    },
    goshare() {
      this.$router.push('/read_plan/share');
    },
  },
  components: {
    calendar,
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.masker {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    left: 0;
    img {
        width: 100%;
        margin-top: Rem(-30);
        z-index: 99999;
    }
    span {
        color: #d7d5d1;
        border: 1px solid #d7d5d1;
        padding: Rem(5) Rem(40);
        position: relative;
        top: Rem(50);
        left: Rem(60);
    }
}

.saycolor {
    color: #fe5a01;
    margin-top: Rem(20);
}

.page {
    background: url('../../assets/img/read/index/bgc.png') repeat;
    background-size: cover;
}

.header {
    .header-img {
        width: 100%;
        margin-top: Rem(50);
    }
    .header-flex {
        display: flex;
        .header-left {
            flex: 1.3;
            margin-left: Rem(60);
            img {
                width: Rem(70);
                border-radius: 50%;
                float: left;
                margin-right: Rem(20);
                margin-top: Rem(4);
            }
        }
        .header-right {
            flex: 1;
            img {
                width: Rem(60);
                margin-right: Rem(20);
                float: left;
                margin-top: Rem(10);
            }
            div {
                line-height: Rem(80);
                color: #f3711a;
            }
        }
    }
    .header-btn {
        width: Rem(680);
        height: Rem(100);
        line-height: Rem(100);
        background: linear-gradient(#f57c4f, #e86940);
        border-radius: Rem(50);
        margin: Rem(20) auto;
        text-align: center;
        color: #fff;
        font-size: Rem(36);
        font-weight: bold;
    }
}

.footer {
    width: Rem(590);
    height: Rem(950);
    margin: Rem(40) auto 0;
    .footer-head {
        color: #fe5a01;
        text-align: center;
        font-weight: bold;
        font-size: Rem(30);
        margin-bottom: Rem(20);
    }
}

.fixed {
    position: fixed;
    width: 100%;
    height: Rem(100);
    line-height: Rem(100);
    background: linear-gradient(#f57c4f, #e86940);
    bottom: 0;
    text-align: center;
    color: #fff;
    font-size: Rem(32);
}
</style>
