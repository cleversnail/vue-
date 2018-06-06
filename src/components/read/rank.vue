<template lang="html">
  <div class="page">
    <div class="header-img">
      <img src="../../assets/img/read/rank/bgc.png" alt="">
    </div>
    <div class="content">
      <div class="content-header">
        <div class="header-title">
          <span :class="{toogecolor: isToogecolor}" @click="isToogecolor= true">阅读榜</span>
          <span :class="{toogecolor: !isToogecolor}" @click="isToogecolor= false">号召榜</span>
        </div>
        <div class="mine first">
          <div class="num" v-if="isToogecolor">{{list.user_rank || '未上榜'}}</div>
          <div class="num" v-else="!isToogecolor">{{list.invite_rank || '未上榜'}}</div>
          <div class="middel">
            <img :src="list.member&&list.member.headimg" alt="">
            <span class="overhide">{{list.member&&list.member.name}}(我)</span>
          </div>
          <div v-if="isToogecolor" class="date">{{list.user_days}} 天</div>
          <div v-else class="date">号召 {{list.invite_times}} 人</div>
        </div>

        <div class="rankers">
          <ul @touchmove.stop>
            <li v-if="isToogecolor" v-for="item in readRank">
              <div class="mine">
                <div class="num">{{item.rank}}</div>
                <div class="middel">
                  <img :src="item.member&&item.member.headimg" alt="">
                  <span class="overhide">{{item.member.name}}</span>
                </div>
                <div class="date">{{item.times}}天</div>
              </div>
            </li>
            <li v-if="!isToogecolor" v-for="item in inviteRank">
              <div class="mine">
                <div class="num">{{item.rank}}</div>
                <div class="middel">
                  <img :src="item.member&&item.member.headimg" alt="">
                  <span class="overhide">{{item.member.name}}</span>
                </div>
                <div class="date">号召 {{item.times}} 人 </div>
              </div>
            </li>
            <li class="loadermore" @click="loadermore()">点击加载更多...</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="btn-fixed">
      <router-link to="/read_plan">
        <img src="../../assets/img/read/index/index.png" alt="">
      </router-link>
    </div>
    <div class="fixed" v-if="ismine" @click="showmask = true">
      我要晒成绩
    </div>
    <div class="fixed" v-else @click="joinmask = true" >
      我也要加入阅读计划
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
</template>

<script>
import readShare from '../../utils/read_share';

export default {
  data() {
    return {
      isToogecolor: true,
      showmask: false,
      joinmask: false,
      ismine: true,
      list: [],
      readRank: [],
      inviteRank: [],
      page: 1,
      status: true,
      statu: true,
      listinfo: [],
      ismine: Boolean,
    }
  },
  created() {
    this.getUser();
    this.getRead();
    this.getInviteRead();
  },
  methods: {
    loadermore() {
      // 阅读榜
      if (this.isToogecolor) {
        if (this.status) {
          this.page++;
          this.getRead();
        } else {
          this.$toast('没有更多数据了');
        }
      } else {
        if (this.statu) {
          this.page++;
          this.getInviteRead();
        } else {
          this.$toast('没有更多数据了');
        }
      }
    },
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
    getRead() {
      const url = `/api/frontend/index/rank?type=read_days&limit=10&page=${this.page}`;
      this.$axios.get(url)
        .then((res) => {
          this.readRank = this.readRank.concat(res.data.data.data);
          if (res.data.data.data.length < 10) {
            this.status = false;
          }
        })
    },
    getInviteRead() {
      const url = `/api/frontend/index/rank?type=invite_read&limit=10&page=${this.page}`;
      this.$axios.get(url)
        .then((res) => {
          this.inviteRank = this.inviteRank.concat(res.data.data.data);
          if (res.data.data.data.length < 10) {
            this.statu = false;
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/config.scss";
.content {
    padding-bottom: Rem(100);
}
.masker {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    img {
        width: 100%;
        margin-top: Rem(-30);
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
.overhide {
    display: inline-block;
    width: 60%;
    height: Rem(100);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: Rem(40);
}
.btn-fixed {
    position: fixed;
    top: Rem(40);
    right: Rem(40);
    img {
        width: Rem(100);
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
.page {
    background: url('../../assets/img/read/index/bgc.png') repeat;
    background-size: cover;
}
.header-img {
    img {
        width: 100%;
    }
}
.content-header {
    width: Rem(694);
    background-color: #fff;
    margin: 0 auto;
    .header-title {
        height: Rem(80);
        background-color: #f3f3f3;
        span {
            float: left;
            width: 50%;
            height: Rem(80);
            line-height: Rem(80);
            text-align: center;
            font-size: Rem(30);
        }
        .toogecolor {
            background-color: #fff;
        }
    }
    .mine {
        display: flex;
        align-items: center;
        text-align: left;
        height: Rem(100);
        line-height: Rem(100);
        .num {
            flex: 0.6;
            text-align: center;
        }
        .middel {
            flex: 1.2;
            height: Rem(100);
            img {
                width: Rem(70);
                border-radius: 50%;
                float: left;
                transform: translate(20%,20%);
            }
        }
        .date {
            flex: 0.7;
            text-align: right;
            margin-right: Rem(100);
        }
    }
    .rankers {
        box-shadow: 0 7px 10px -8px #dddadc inset;
        ul {
            width: 100%;
            height: Rem(810);
            overflow: scroll;
            .loadermore {
                text-align: left;
                height: Rem(100);
                line-height: Rem(100);
                text-align: center;
                background-color: #f3f3f3;
            }
        }
    }
}
</style>
