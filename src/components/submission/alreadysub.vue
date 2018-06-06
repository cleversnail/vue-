<template lang="html">
  <div class="alreadysub">
    <div class="page">
      <div class="header">
        <span>已投稿件</span>
        <router-link :to="{path:'contribution'}">
          <div class="back">
            返回</br>主页
          </div>
        </router-link>
      </div>
      <div class="content">
        <ul>
          <li v-for="item in list">
            <img :src="item.member.headimg" alt="">
            <div class="ours">
              <div class="time">
                <div>《{{item.name}}》</div>
                <span>{{item.created_at}}</span>
              </div>
              <div class="xinxi">{{item.member.hospital}} {{item.member.administrative}} {{item.member.zhicheng}}</div>
            </div>
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
    // 首页接口
    getUser() {
      const url = `/api/frontend/vote/index?casual_activity_id=5&page=${this.page}`;
      this.$axios.get(url).then((res) => {
        this.list = this.list.concat(res.data.data.data);
        if(res.data.data.data.length < 20){
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
    },
  }
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
  .alreadysub{
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
      li{
        padding: Rem(30) Rem(30) Rem(0) Rem(30);
        height: Rem(200);
        align-items: center;
        border-bottom: 1px solid #FBA838;
        color: #000;
        img{
          width: Rem(156);
          height: Rem(156);
          float: left;
        }
        .ours{
          margin-left: Rem(180);
          margin-top: Rem(30);
          .time{
            display: flex;
            justify-content:space-between;
            div{
              font-size: Rem(34);
              margin-left: Rem(-14);
              width: Rem(400);
              overflow: hidden;
              height: Rem(50);
            }
            span{
              display: inline-block;
              font-size: Rem(30);
              width: Rem(200);
              overflow: hidden;
              height: Rem(34);
            }
          }
          .xinxi{
            min-height: Rem(40);
          }
        }
      }
    }
  }
</style>
