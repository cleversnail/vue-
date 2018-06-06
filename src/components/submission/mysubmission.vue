<template lang="html">
  <div class="mysubmission">
    <div class="page">
      <div class="header">
        <span>我的投稿</span>
        <router-link :to="{path:'contribution'}">
          <div class="back">
            返回</br>主页
          </div>
        </router-link>
      </div>
      <div class="contents">
        <ul>
          <li v-for="item in list">
            <div class="lf">
              <span class="shu"></span>
              <span>投稿</span>
            </div>
            <div class="ours">《{{item.name}}》</div>
            <div class="time">{{item.created_at}}</div>
            <div v-if="item.is_accept" class="toogel">未采纳</div>
            <div v-else class="toogel toogeled">已采纳</div>
          </li>
        </ul>
        <div class="more" @click="more">{{loadermore}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      loadermore: '加载更多',
      list: [],
      status: true,
      page: 1,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const url = `/api/frontend/vote/index?casual_activity_id=5&is_my=1&limit=10&page=${this.page}`;
      this.$axios.get(url).then((res) => {
        this.list = this.list.concat(res.data.data.data);
        if(res.data.data.data.length < 10){
          this.status = false;
        }
      })
    },
    more() {
      if(this.status == true) {
        this.page++;
        this.loadermore = '努力加载中...';
        this.getUser();
        this.loadermore = '加载更多';
        this.$toast('加载完成');
      } else {
        this.$toast('没有更多数据了');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .more{
    display: block;
    height: Rem(90);
    width: 100%;
    text-align: center;
    line-height: Rem(90);
    font-size: Rem(30);
  }
  .mysubmission{
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
  }
  .contents{
    width: 100%;
    margin-top: Rem(30);
    li{
      height: Rem(74);
      border: 1px dashed #F99929;
      border-left: 0;
      border-right: 0;
      display: flex;
      align-items:center;
      justify-content:space-around;
      font-size: Rem(34);
      margin-bottom: Rem(30);
      &:last-child{
        margin-bottom: 0;
      }
      .lf{
        color: #F99929;
        position: relative;
        margin-left: Rem(44);
        .shu{
          display: inline-block;
          position: absolute;
          width: Rem(4);
          height: Rem(28);
          background-color: #F99929;
          left: Rem(-22);
          top: Rem(10);
        }
      }
      div{
        width: 10%;
      }
      .ours{
        width: Rem(300);
        height: Rem(50);
        text-align: center;
        overflow: hidden;
      }
      .time{
        display: inline-block;
        font-size: Rem(28);
        width: Rem(160);
        overflow: hidden;
        height: Rem(40);
      }
      .toogel{
        font-size: Rem(28);
        width: Rem(110);
        height: Rem(44);
        line-height: Rem(46);
        background-color: #FCAE3E;
        border-radius: Rem(10);
        color: #fff;
        text-align: center;
      }
      .toogeled{
        background-color: #22AC38;
      }
    }
  }
</style>
