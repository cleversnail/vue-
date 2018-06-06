<template lang="html">
  <div class="library" v-if="userList">
    <navbar></navbar>
    <div class="library-title">
      <div class="my-info">
        <img :src="userList.member.headimg" alt="">
        <p v-if="userList.member">
          {{userList.member.nickname }}
          <span class="last">剩余次数:{{userList.rest_count}}次</span>
        </p>
        <div>总共答对<span>{{ userList.right_question_nums || 0}}</span>套题，全国排名:<span>{{ userList.rank }}</span></div>
      </div>
      <router-link :to="{ name:'dissectionHome' }">
        <img src="~assets/img/dissection/gohome.png" class="home-img">
      </router-link>
    </div>
    <div class="library-content">
      <ul>
        <li>
          <p>我的题库</p>
        </li>
        <li v-for="(item, index) in data">
          <span>{{index+1}}题</span>
          <span class="list__name">{{item.name}}</span>
          <span>{{item.result.answer_time || 0}}S</span>
          <span v-if="item.result.length == 0">未答</span>
          <span class="success" v-else-if="isAllRight(item.result.right_question_num, item.result.wrong_num)">全对</span>
          <span class="error" v-else>{{item.result.right_question_num}}/{{all(item.result.right_question_num, item.result.wrong_num)}}</span>
          <div class="li-btn" :class="{'is-disalbed': userList.rest_count == 0}" @click="goGame(item)" v-if="isMine">马上去答题</div>
        </li>
      </ul>
    </div>
    <img class="btn--fixed" src="~assets/img/dissection/share_library.png" @click="showLayer" v-if="isMine">
    <img class="btn--fixed" src="~assets/img/dissection/join.png" @click="goHome" v-else>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import share from '../robot/common/share';
import robot_share from '../../utils/robot_share';

export default {
  components: {
    navbar,
    share,
  },
  data() {
    return {
      userList: null,
      answerList: [],
      not_answerList: [],
      data: {},
      layerShow: false,
      isMine: true,
    }
  },
  created() {
    const id = this.$route.query.id;
    this.getData(id);
    this.getUserInfo(id);
    this.getUser();
    robot_share('1','2','3',`${location.origin}/#/dissection/library`)
  },
  methods: {
    goHome() {
      this.$router.push({name: 'dissectionHome'});
    },
    goGame(item) {
      if (this.userList.rest_count>0) {
        this.$router.push({ name: 'dissectionCount',query: { id:item.id, name: item.name}});
      } else {
        this.$toast('剩余次数已经用完');
        this.$router.push({name:'dissectionChance'});
      }
    },
    getUserInfo(uid) {
      const url = '/api/frontend/dissect_game/person';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
          let title1 = `［医看］全国影像解剖有奖大赛`,
              title2 = `我在［医看］全国影像解剖有奖大赛中排名全国第${this.userList.rank}，快来参与领奖励！`,
              desc = `我在大赛中排名全国第${this.userList.rank}，快来参与领奖励！`,
              link = `${location.origin}/active_web/#/dissection/library?id=${this.userList.member.id}`;
              robot_share(title1, title2, desc, link);
          }
      });
    },
    getData(uid) {
      const url = '/api/frontend/dissect_game/category_result';
      const params = {
        uid,
      }
      this.$axios.get(url, { params }).then((res) => {
        if (res.data.status === 0) {
          this.data = res.data.data;
        }
      })
    },
    getUser() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.user = res.data.data;
          if(this.$route.query.id&&this.$route.query.id !== this.user.detail.id) {
            this.isMine = false;
          }
        }
      })
    },
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
    all(right, wrong) {
      return parseInt(right) + parseInt(wrong);
    },
    isAllRight(right, wrong) {
      return parseInt(right) === parseInt(right) + parseInt(wrong);
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
  .error{
    color: red;
  }
  .success {
    color: #00B1B2;
  }
  .library{
    @extend %fullpage;
    padding-bottom: Rem(140);
    background: url('~assets/img/dissection/bg.png') no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    color:#05104F;
  }
  .library-title{
    position: relative;
    .my-info{
      padding:Rem(42) Rem(42);
      text-align: left;
      img{
        width: Rem(90);
        float: left;
        border-radius: 50%;
        margin-right: Rem(24);
      }
      div{
        color: #05104F;
      }
    }
    .home-img{
      position: absolute;
      width: Rem(106);
      right: Rem(42);
      top: Rem(30);
    }
  }
  .library-content{
    width: Rem(700);
    height: Rem(900);
    margin: Rem(20) auto;
    padding-bottom: Rem(20);
    background-color: #fff;
    color:#000;
    border-radius: 5px;
    overflow: scroll;
    ul{
      li{
        height: Rem(90);
        line-height: Rem(74);
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        p{
          font-size: 16px;
        }
      }
    }
  }
  .list {
    &__name {
      min-width: Rem(140);
      text-align: center;
    }
  }
  .li-btn{
    height: Rem(50);
    line-height: Rem(50);
    padding: 0 Rem(10);
    border: 1px solid #00B1B2;
    color: #00B1B2;
    &.is-disalbed {
      border: 1px solid #ddd;
      color: #ddd;
    }
  }
  .li-btn2{
    border: 1px solid #88CEF1;
    color: #64caf4;
  }
  .library-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    height: Rem(116);
    width: 100%;
    background-color: #2881e5;
    line-height: Rem(116);
  }
  .last {
    float: right;
    margin-right: Rem(120);
    color: #DD3521;
  }
</style>
