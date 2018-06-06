<template lang="html">
  <div class="page">
    <div class="header">
      <router-link :to="{path:'labourIndex'}">
        <span class="zhuye">主页</span>
      </router-link>
      <span class="rank">排行榜</span>
      <router-link :to="{path:'labourdetail'}">
        <span class="guize">规则</span>
      </router-link>
    </div>
    <div class="back">只显示前五百名</div>
    <div class="container">
      <img class="daocao" src="../../assets/img/labour/rank/daocao.png" alt="">
      <img class="jiang" src="../../assets/img/labour/rank/jiang.png" alt="">
      <div class="top-rank" v-if="list">
        <div class="card" @click="touser(list[1])" v-if="list[1]">
          <div class="top-img">
            <div class="img-one">
              <img class="img-name" :src="list[1]&&list[1].member.headimg" alt="">
              <img class="img-num" src="../../assets/img/labour/rank/2.jpg" alt="">
            </div>
          </div>
          <div class="top-say">
            <div class="gcx name">{{list[1]&&list[1].member.true_name}}</div>
            <span>粉丝 {{list[1].times}}</span>
            <!-- <div class="showbtn" @click.stop="toogegz(list[1])" v-if="list[1].is_fan == 0">
              <div class="btn">
                <img class="adding" src="../../assets/img/labour/adding.png" alt="">
                加关注
              </div>
            </div>
            <div class="showbtn" @click.stop="toogegz(list[1])" v-else>
              <div class="added">
                <img class="adding" src="../../assets/img/labour/added.png" alt="">
                已关注
              </div>
            </div> -->
          </div>
        </div>
        <div class="card" @click="touser(list[0])" v-if="list[0]">
          <div class="top-img">
            <div class="img-one">
              <img class="img-name" :src="list[0]&&list[0].member.headimg" alt="">
              <img class="img-num" src="../../assets/img/labour/rank/1.jpg" alt="">
            </div>
          </div>
          <div class="top-say">
            <div class="gcx name">{{list[0]&&list[0].member.true_name}}</div>
            <span>粉丝 {{list[0].times}}</span>
            <!-- <div class="showbtn" @click.stop="toogegz(list[0])" v-if="list[0].is_fan == 0">
              <div class="btn">
                <img class="adding" src="../../assets/img/labour/adding.png" alt="">
                加关注
              </div>
            </div>
            <div class="showbtn" @click.stop="toogegz(list[0])" v-else>
              <div class="added">
                <img class="adding" src="../../assets/img/labour/added.png" alt="">
                已关注
              </div>
            </div> -->
          </div>
        </div>
        <div class="card" @click="touser(list[2])" v-if="list[2]">
          <div class="top-img">
            <div class="img-one">
              <img class="img-name" :src="list[2]&&list[2].member.headimg" alt="">
              <img class="img-num" src="../../assets/img/labour/rank/3.jpg" alt="">
            </div>
          </div>
          <div class="top-say">
            <div class="gcx name">{{list[2]&&list[2].member.true_name}}</div>
            <span>粉丝 {{list[2].times}}</span>
            <!-- <div class="showbtn" @click.stop="toogegz(list[2])" v-if="list[2].is_fan == 0">
              <div class="btn">
                <img class="adding" src="../../assets/img/labour/adding.png" alt="">
                加关注
              </div>
            </div>
            <div class="showbtn" @click.stop="toogegz(list[2])" v-else>
              <div class="added">
                <img class="adding" src="../../assets/img/labour/added.png" alt="">
                已关注
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <div class="footer-rank">
          <ul id="more">
            <li class="footer-li"  v-if="index > 2" v-for="(item, index) in list">
              <div class="num">{{item.rank}}</div>
              <div v-if="showjb(index)" class="more-jiang">奖</div>
              <div v-else class="no-jiang"></div>
              <div class="footer-say">
                <img :src="item&&item.member.headimg" alt="">
                <div class="lh">
                  <div class="name">
                    {{item&&item.member.true_name}}</br>
                    粉丝 {{item.times}}
                  </div>
                </div>
              </div>
              <!-- <div class="showbtn">
                <div class="showbtn" @click.stop="toogegz(item)" v-if="item.is_fan == 0">
                  <div class="btn">
                    <img class="adding" src="../../assets/img/labour/adding.png" alt="">
                    加关注
                  </div>
                </div>
                <div class="showbtn" @click.stop="toogegz(item)" v-else>
                  <div class="added">
                    <img class="adding" src="../../assets/img/labour/added.png" alt="">
                    已关注
                  </div>
                </div>
              </div> -->
            </li>
          </ul>
      </div>
      <div class="kong" @click="loadermore">{{loader}}</div>
    </div>
    <div class="masker" @click="showMasters = !showMasters" v-show="showMasters">
      <div class="masker-sao">
        <span>扫码关注医看，成为ta的粉丝</span>
        <img class="sys" :src="`/api/frontend/user/myworkspaceimg?member_id=${userId}&is_qrcode=1&activity_name=fans`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: 1,
      allLoaded: false,
      subscribe: 0,
      showMasters: false,
      status: true,
      loader: '点我加载更多',
      userId:0,
      mineId: 7200,
    };
  },
  created() {
    this.getUser();
    this.isGuanZhu();
    this.showjb();
    this.share();
  },
  methods: {
    showjb(index) {
      let rak = index +1;
      rak = rak.toString();
      if(rak <= 20){
        return true;
      }else if ( rak >= 28 && rak <=198 && rak.charAt(rak.length-1) == 8 ) {
        return true;
      }else {
        return false;
      }
    },
    // 去用户的个人主页
    touser (item) {
      if(this.subscribe == 0){
        this.userId = item.member.id;
        this.showMasters = true;
      } else {
        location.href = `https://community.kankanyisheng.com/#/otherInfo/${item.uid}`
      }
    },
    getUser() {
      const url = `/api/frontend/index/rank?type=fans&limit=50&page=${this.page}`;
      this.$axios.get(url).then((res) => {
        this.loader = '点我加载更多',
        this.list = this.list.concat(res.data.data.data);
        if(res.data.data.data.length < 50){
          this.status = false;
        }
      })
    },
    //我的个人信息
    isGuanZhu() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        // subscribe  判断是否关注  关注了就去认证 未关注就扫码
        this.subscribe = res.data.data.subscribe;
        this.mineId = res.data.data.detail.id;
      });
    },
    // 分享
    share() {
      const url = '/api/frontend/user/index';
      this.$axios.get(url).then((res) => {
        let title1 = '「医看」5.1劳模医生人气大比拼';
        let title2 = '「医看」5.1劳模医生人气大比拼，赚粉丝，得大奖！';
        let desc = `我现在已经有${res.data.data.userinfo.fans_count}名粉丝了！快来关注我吧！`;
        let url = location.href;
        this.$kepuShare(title1,title2,desc,url);
      });
    },
    // 切换关注 未关注
    toogegz(item) {
      const url = `/api/frontend/operation/follow/${item.member.id}`;
      if(item.member.id == this.mineId) {
        this.$toast({
          message:'您不能关注自己',
          duration:800
        });
        return false;
      }
      if(this.subscribe == 0){
        this.userId = item.member.id;
        this.showMasters = true;
      } else {
        this.$axios.put(url).then((res) => {
          if(item.is_fan == 0){
            item.is_fan = 1;
            item.times += 1;
            this.$toast({
              message:'关注成功',
              duration:800
            });
          } else{
            item.is_fan = 0;
            item.times -= 1;
            this.$toast({
              message:'已取消关注',
              duration:800
            });
          }
        })
      }
    },
    loadermore() {
      if(this.status == true){
        this.page++;
        this.loader = '努力加载中...',
        this.getUser();
        this.$toast({
          message:'加载完成',
          position: 'middle',
          duration:800
        });
      } else {
        this.$toast('没有更多数据了');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .masker{
    position: fixed;
    text-align: center;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    .masker-sao{
      width: Rem(550);
      height: Rem(550);
      margin: 50% auto;
      background-color: #fff;
      border-radius: 8%;
      span{
        display: block;
        height: Rem(100);
        color: #000;
        line-height: Rem(100);
        font-size: Rem(36);
        border-bottom: 1px solid #000;
      }
      img{
        width: 70%;
        transform: translateY(4%);
      }
    }
  }
  .page{
    width: 100%;
    background-color: #4e55a6;
    background-size: 100%;
    position: relative;
  }
  a,span{
    color: #fff;
  }
  .showbtn{
    .btn{
      width: Rem(140);
      height: Rem(44);
      line-height: Rem(48);
      background-color: #F47014;
      border-radius: Rem(10);
      margin: Rem(10) auto;
      color: #fff;
      font-weight: bold;
      font-size: Rem(24);
      text-align: center;
      img{
        width: Rem(24);
        margin-bottom: Rem(6);
        margin-right: Rem(4);
      }
    }
    .added{
      width: Rem(140);
      height: Rem(44);
      line-height: Rem(48);
      background-color:#009944;
      border-radius: Rem(10);
      margin: Rem(10) auto;
      color: #fff;
      font-weight: bold;
      font-size: Rem(24);
      text-align: center;
      img{
        width: Rem(24);
        margin-bottom: Rem(6);
        margin-right: Rem(4);
      }
    }
  }
  .header{
    color: #fff;
    font-size: Rem(42);
    display: flex;
    justify-content: space-between;
    align-items:flex-end;
    position: fixed;
    background-color: #4e55a6;
    width: 100%;
    top: 0;
    height: Rem(80);
    z-index: 10000;
    .zhuye{
      margin-left: Rem(50);
    }
    .guize{
      margin-right: Rem(50);
    }
    .rank{
      font-size: Rem(50);
    }
  }
  .back{
    width: 100%;
    height: Rem(150);
    color: #F47014;
    text-align: center;
    font-size: Rem(36);
    margin-top: Rem(80);
  }
  .container{
    width: Rem(690);
    background-color: #fff;
    border-radius: Rem(20);
    margin-top:Rem(160);
    min-width: 0;
    .daocao{
      width: Rem(380);
      position: absolute;
      top: Rem(84);
      left: Rem(196);
    }
    .jiang{
      width: Rem(240);
      height: Rem(300);
      position: absolute;
      top: Rem(150);
      left: Rem(266);
    }
  }
  .top-rank{
    margin: Rem(34);
    margin-bottom: Rem(20);
    display: flex;
    justify-content:space-between;
    z-index: 1000;
    .card{
      display: inline-block;
      .top-img{
        .img-one{
          width: Rem(146);
          height: Rem(146);
          position: relative;
          .img-name{
            width: Rem(146);
            height: Rem(146);
            border-radius: 50%;
          }
          .img-num{
            width: Rem(40);
            height: Rem(40);
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
      .top-say{
        text-align: center;
        color: #000;
        line-height: Rem(32);
        .gcx{
          font-size: Rem(30);
          margin-top: Rem(14);
        }
        span{
          font-size: Rem(21);
          color:lighten(#000,30%);
        }
      }
      &:nth-child(2){
        .top-img{
          margin-top: Rem(-32);
          margin-bottom: Rem(46);
        }
      }
    }
  }
  .footer-rank{
    border-top: 1px solid lighten(#999,20%);
    color: #000;
    ul{
      .footer-li{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: Rem(100);
        border-bottom: 1px solid lighten(#999,20%);
          .num{
            font-size: Rem(50);
            color: lighten(#999,4%);
            font-weight: bold;
            width: Rem(30);
          }
          .more-jiang{
            width: Rem(40);
            height: Rem(40);
            line-height: Rem(40);
            background-color: #F47014;
            border-radius: 50%;
            color: #fff;
            font-weight: bold;
            text-align: center;
          }
          .no-jiang{
            width: Rem(40);
            height: Rem(40);
            line-height: Rem(40);
            background-color: #fff;
            border-radius: 50%;
            text-align: center;
          }
          .footer-say{
            width: Rem(260);
            height: Rem(100);
            margin-top: Rem(14);
            img{
              width: Rem(86);
              border-radius: 50%;
              float: left;
              margin-right: Rem(20);
            }
            div{
              margin-top: Rem(14);
              text-align: center;
            }
            .lh{
              .name{
                display:block;
                margin: 0 auto;
                overflow:hidden;
                word-break:keep-all;
                white-space:nowrap;
                text-overflow:ellipsis;
                text-align: center;
              }
              div{
               font-size: Rem(24);
              }
              span{
                font-size: Rem(21);
                color:lighten(#000,30%);
              }
            }
          }
      }
    }
  }
  .kong{
    display: block;
    height: Rem(90);
    width: 100%;
    text-align: center;
    line-height: Rem(90);
    font-size: Rem(36);
  }
</style>
