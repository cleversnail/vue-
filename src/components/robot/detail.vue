<template lang="html">
  <div class="detail">
    <navbar></navbar>
    <div class="detail-header">
      <img src="../../assets/img/robot/robot.png" alt="" class="robotimg">
      <img src="../../assets/img/robot/detail-img.png" alt="" class="detail-img">
      <router-link :to="{ path: 'robot' }">
        <img src="../../assets/img/robot/home-btn.png" alt="" class="home-img">
      </router-link>
    </div>
    <p class="detail-title">和推想AI一起标注结节</p>
    <div class="detail-content">
      <div>
        ［深度学习阅片机器人］近几年被多方报道，但是只闻其声不见其人，来近距离体验吧，同时提高业务水平，拓宽行业知识</br>
        <br>
        《医看-初识智能阅片机器人》活动和AI机器人通力合作，一齐阅片。
      </div>
      <ul class="detail-introd">
        <li>
          <p>如何操作:</p>
          <span>游戏开始后，你有90秒的时间来观察CT并标注结节，完成后，即可看到机器人的标注结果和正确答案。</span>
          <br>
          <span>每人每天有10次试标注机会，想要获取更多试玩机会请分享到朋友圈让好友给您加血即可，每加一次血获得一次机会，每天都可加血。</span>
        </li>
        <li>
          <p>游戏要求:</p>
          <span>参与需要关注［医看］公众号，去关注</span>
        </li>
        <li>
          <p>游戏排名:</p>
          <span>根据正确标记次数为排名依据，相同次数下按用时长短排名，用时越短排名越高。</span>
        </li>
        <li>
          <p>特别鸣谢:</p>
          <div>推想科技提供技术支持</div>
          <div>With A.I., We Improve Human Life</div>
          <div class="tuixiang-des">
            推想科技是一家人工智能高科技公司, 致力于应用深度学习技术为医疗影像辅助筛查提供快捷、准确的解决方案. 全面推动医疗领域精准化发展。推想目前已推出智能X线、CT辅助筛查产品和深度学习科研运算平台，并与北京协和、武汉同济、上海长征、大连中山等20余家三甲医院建立合作关系。
          </div>
          <div>
            长按下方二维码，推想未来。
          </div>
          <img class="tuixiang-qrcode" src="../../assets/img/robot/tuixiang_qrcode.jpeg" alt="">
        </li>
      </ul>
    </div>
    <div v-if="isMine" class="detail-footer" @click="showLayer">
      邀请好友来参加
    </div>
    <div v-else class="detail-footer" @click="goRobot">
      我也要和机器人一起阅片
    </div>
    <share v-show="layerShow" @hide="hideLayer"></share>
  </div>
</template>

<script>
import navbar from './common/navbar';
import share from './common/share';
import robot_share from '../../utils/robot_share';

export default {
  data () {
    return {
      layerShow: false,
      isShow: false,
      isMine: true,
      userList: [],
    }
  },
  created() {
    this.getUserInfo();
  },
  components: {
    navbar,
    share,
  },
  methods: {
    goRobot() {
      this.$router.push({path: '/count'});
    },
    getUserInfo() {
      const url = '/api/frontend/robot_read/person?game_id=1';
      this.$axios.get(url).then((res) => {
        if (res.data.status === 0) {
          this.userList = res.data.data;
          if(this.$route.query.id&&this.$route.query.id !== this.userList.member.id) {
            this.isMine = false;
          }
          let link = `${location.href}?id=${this.userList.member.id}`;
          robot_share('', '', '', link);
        }
      });
    },
    showLayer() {
      this.layerShow = true;
    },
    hideLayer() {
      this.layerShow = false;
    },
    showTuixiang() {
      this.isShow = true;
    },
    hideTuixiang() {
      this.isShow = false;
    },
  }
};
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/config';
  .detail{
    width: 100%;
    height: 100vh;
    padding-bottom: Rem(140);
    background: url('../../assets/img/robot/bgc1.png') 0 0 no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
    color:#fff;
    overflow: scroll;
    background-attachment: fixed;
    .detail-header{
      margin-top: Rem(30);
      .robotimg{
        width: Rem(136);
      }
      .detail-img{
        width: Rem(444);
      }
      .home-img{
        width: Rem(106);
      }
    }
    .detail-title{
      font-weight: bold;
      font-size: 14px;
      margin: Rem(40) 0;
      letter-spacing: 5px;
    }
    .detail-content{
      padding: 0 Rem(50);
      text-align: left;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 2px;
      .detail-introd{
        li{
          margin-top: Rem(30);
          p{
            color: #2881e5;
          }
        }
      }
    }
    .detail-footer{
      position: fixed;
      bottom: 0;
      left: 0;
      height: Rem(116);
      width: 100%;
      background-color: #2881e5;
      line-height: Rem(116);
    }
  }
  .layer {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.7);
      z-index: 2;
      &-img {
          width: 100%;
      }
  }
  .tuixiang-btn {
    display: inline-block;
    padding: Rem(10) Rem(20);
    background: RGBA(109, 203, 216, .7);
    border: 1px solid #6DCBD8;
    color: #fff;
    font-size: 12px;
    text-shadow: 0 2px 6.96px rgba(0, 0, 0, 0.66);
  }
  .tuixiang-des {
    margin-top: Rem(40);
    margin-bottom: Rem(40);
  }
  .tuixiang-qrcode {
    display: block;
    width: Rem(300);
    margin: 20px auto;
  }
</style>
