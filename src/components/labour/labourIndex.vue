<template lang="html">
  <div class="page">
    <div class="header">
      <img src="../../assets/img/labour/index/title.png" alt="">
      <div class="header-say">
        <span>[千万不可错过的福利活动 ! ]</span>
        <div>活动时间: 4月21日-5月20日</div>
        <!-- <div class="join">
          <div class="join-btn">
            <a @click="tomine" v-if="isrenzheng>0 && subscribe==1" >排名:{{ranks}} 去我的主页</a>
            <a @click="tooge" v-else>我也要参加</a>
          </div>
        </div> -->
        <!-- <span>只显示前500名，已有{{listTotal.see_num}}人浏览</span> -->
        <div class="over">
          <p>活动于5月20日 24:00 正式截止</p>
          <p>以下为时间截止时排名情况，请获奖老师与工作人员小看（xiaokankan2016）联系，领奖。</p>
        </div>
      </div>
    </div>
    <router-link :to="{path:'labourRank'}">
      <div class="rank fiexd">榜单</div>
    </router-link>
    <router-link :to="{path:'labourdetail'}">
      <div class="detail fiexd">活动</br>详情</div>
    </router-link>
    <div class="container">
      <ul>
        <li v-for="item in list">
          <div class="ranks">{{item.rank}}</div>
          <img class="pic" :src="item.member.headimg" alt="">
          <div class="name">
            <span>{{item.member.true_name}}</span>
            <img class="v" src="../../assets/img/labour/index/v.png" alt="">
          </div>
          <div class="like">
            粉丝  {{item.times}}人
          </div>
          <div class="hospict">
            {{item.member.hospital}}</br>{{item.member.zhicheng}}
          </div>
          <!-- <div class="showbtn" @click.stop="toogegz(item)" v-if="item.is_fan == 0">
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
          </div> -->
        </li>
      </ul>

    </div>
    <div class="footer-btn">
      <div class="befor" @click="before">
        上一页
      </div>
      <div class="now">
        第{{page}}/25页
      </div>
      <div class="after" @click="next">
        下一页
      </div>
    </div>
    <div class="masker" @click="showMaster = !showMaster" v-show="showMaster">
      <div class="masker-sao">
        <span>扫码关注医看 参与赢pad！</span>
        <img class="sys" src="../../assets/img/labour/index/saoyisao.png">
      </div>
    </div>
    <div class="masker" @click="showMasters = !showMasters" v-show="showMasters">
      <div class="masker-sao">
        <span>扫码关注医看，成为ta的粉丝</span>
        <img class="sys" :src="`/api/frontend/user/iniqrcode?info=${userId}&is_temp=true`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      listTotal: [],
      page: 1,
      status: true,
      mineId: 7200,
      code: '',
      guanZhu: true,
      showMaster: false,
      showMasters: false,
      subscribe: 1,
      isrenzheng: 1,
      times: 0,
      userId:0,
      ranks: 501,
    };
  },
  created() {
    this.getUser();
    this.isGuanZhu();
    let title1 = '「医看」5.1劳模医生人气大比拼';
    let title2 = '「医看」5.1劳模医生人气大比拼，赚粉丝，得大奖！';
    let desc = '平板电脑、小米手环等大奖等着你！';
    let url = location.href;
    this.$kepuShare(title1,title2,desc,url);
  },
  methods: {
    // 去用户的个人主页
    touser (item) {
      if(this.subscribe == 0){
        this.userId = item.member.id;
        this.showMasters = true;
      } else {
        location.href = `https://community.kankanyisheng.com/#/otherInfo/${item.member.id}`
      }
    },
    // 去我的个人主页
    tomine() {
      location.href = `https://community.kankanyisheng.com/#/otherInfo/${this.mineId}`
    },
    // 未关注 则关注后去认证
    tooge() {
      if(this.subscribe == 0){
        this.showMaster = true;
      } else {
        location.href = 'http://community.kankanyisheng.com/muke/#/identificate?type=2';
      }
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
    before() {
      if(this.page <= 1) {
        this.$toast('已经是第一页了');
      } else {
        this.page--;
        this.getUser();
        this.status = true;
      }
    },
    next() {
      if(this.status === false){
        this.$toast('已经是最后一页了');
      } else {
        this.page++;
        this.getUser();
      }
    },
    //  获取用户数据
    getUser() {
      const url = `/api/frontend/index/rank?type=fans&limit=20&page=${this.page}`;
      this.$axios.get(url).then((res) => {
        this.list = res.data.data.data;
        this.listTotal = res.data.data;
        this.ranks = res.data.data.rank;
        if(this.ranks >= 500) {
          this.ranks = '未上榜';
        }
        if(this.list.length < 20 || this.page >= 25){
          this.status = false;
        };
      });
    },
    //我的个人信息
    isGuanZhu() {
      const url = '/api/frontend/user/userinfo';
      this.$axios.get(url).then((res) => {
        this.mineId = res.data.data.detail.id;
        // subscribe  判断是否关注  关注了就去认证 未关注就扫码
        this.subscribe = res.data.data.subscribe;
        this.isrenzheng = res.data.data.detail.isrenzheng;
      });
    },
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
    color: #000;
    .masker-sao{
      width: Rem(550);
      height: Rem(550);
      margin: 50% auto;
      background-color: #fff;
      border-radius: 8%;
      span{
        display: block;
        height: Rem(100);
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
    color: #fff;
  }
  .over {
    background: #fff;
    color: #333;
    width: 70%;
    margin: 0 auto;
    border: 1px solid $color-red;
    border-radius: 5px;
  }
  .header{
    background: url("~src/assets/img/labour/index/bgc.png") no-repeat;
    background-size: cover;
    height:Rem(789);
    text-align: center;
    font-weight: bold;
    margin-bottom: Rem(30);
    img{
      width: Rem(654);
      margin-top:Rem(148);
      margin-bottom: Rem(10);
    }
    .header-say{
      span{
        font-size: Rem(29);
      }
      div{
        font-size: Rem(24);
      }
      .join{
        .join-btn{
          display: inline-block;
          height: Rem(61);
          line-height: Rem(61);
          background-color: #F47014;
          padding: 0 Rem(20);
          border-radius: Rem(10);
          font-size: Rem(32);
          margin: Rem(20) 0;
          a{
            color:#fff;
          }
        }
      }
    }
  }
  .fiexd{
    position: fixed;
    width: Rem(91);
    height: Rem(91);
    border-radius: 50%;
    background-color: #fff;
    color: #428DE0;
    text-align: center;
    top: Rem(597);
    font-weight: bold;
    border: 1px solid #F47014;
    z-index: 1000;
  }
  .rank{
    left: Rem(28);
    font-size: Rem(38);
    line-height: Rem(91);
  }
  .detail{
    right: Rem(28);
    line-height: Rem(30);
    font-size: Rem(29);
    padding-top: Rem(18);
    box-sizing: border-box;
  }
  .container{
    ul{
      padding: 0 Rem(22);
      color: #000;
      li{
        display: inline-block;
        width: Rem(340);
        height: Rem(450);
        list-style: none;
        background: url('~src/assets/img/labour/index/every.png') no-repeat;
        background-size: cover;
        text-align: center;
        box-sizing: border-box;
        float: left;
        margin-bottom: Rem(20);
        position: relative;
        .ranks{
          width: Rem(50);
          height: Rem(50);
          line-height: Rem(50);
          box-sizing: border-box;
          text-align: center;
          background-color: #F47014;
          border-radius: 50%;
          color: #fff;
          position: absolute;
          top: Rem(10);
          left: Rem(10);
          font-size: Rem(28);
          font-weight: bold;
        }
        &:nth-child(odd){
          margin-right: Rem(24);
        }
        .pic{
          display: inline-block;
          width: Rem(120);
          height: Rem(120);
          border-radius: 50%;
          margin-top: Rem(40);
          margin-bottom: Rem(14);
        }
        .name{
          font-size: Rem(34);
          position: relative;
          height: Rem(44);
          span{
            display:block;
            width: 100px;
            margin: 0 auto;
            overflow:hidden;
            word-break:keep-all;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          img{
            position: absolute;
            right: Rem(120);
            top: Rem(-36);
            width: Rem(30);
          }
        }
        .like{
          font-size: Rem(26);
        }
        .hospict{
          font-size: Rem(24);
          margin-top: Rem(14);
          padding: 0 Rem(25);
          line-height: Rem(34);
          height: Rem(100);
          text-align: center;
          color:lighten(#000,30%);
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .showbtn{
          .btn{
            width: Rem(180);
            height: Rem(50);
            line-height: Rem(52);
            background-color: #F47014;
            border-radius: Rem(10);
            margin: Rem(10) auto;
            color: #fff;
            font-weight: bold;
            font-size: Rem(26);
            text-align: center;
            img{
              width: Rem(26);
              margin-bottom: Rem(6);
              margin-right: Rem(8);
            }
          }
          .added{
            width: Rem(180);
            height: Rem(50);
            line-height: Rem(52);
            background-color:#009944;
            border-radius: Rem(10);
            margin: Rem(10) auto;
            color: #fff;
            font-weight: bold;
            font-size: Rem(26);
            text-align: center;
            img{
              width: Rem(26);
              margin-bottom: Rem(6);
              margin-right: Rem(8);
            }
          }
        }
      }
    }
  }
  .footer-btn{
    height: Rem(140);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #000;
    .befor,.after{
      width: Rem(200);
      height: Rem(66);
      background-color: #F0DC21;
      line-height: Rem(66);
      border-radius: Rem(50);
      text-align: center;
      font-size: Rem(34);
    }
    .now{
      width: Rem(200);
      height: Rem(64);
      background-color: #F0DC21;
      line-height: Rem(64);
      text-align: center;
      font-size: Rem(34);
      margin: 0 Rem(30);

    }
  }
</style>
