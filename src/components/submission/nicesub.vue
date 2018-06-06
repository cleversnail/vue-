<template lang="html">
  <div class="nicesub">
    <div class="page">
      <div class="header">
        <span>优秀稿件发布</span>
        <router-link :to="{path:'contribution'}">
          <div class="back">
            返回</br>主页
          </div>
        </router-link>
      </div>
      <div class="content">
        <ul>
          <li v-for="item in 10">
            <img src="../../assets/img/submission/nicesub/pic.jpeg" alt="">
            <div class="ours">
              <div class="time">
                <div>《我们的故事》</div>
                <span>2017-3-24</span>
              </div>
              <div>张上可 河南商丘医院 影像科 主任医师</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .nicesub{
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
        padding: Rem(20) Rem(40);
        padding-bottom: Rem(10);
        height: Rem(200);
        display: flex;
        justify-content:center;
        align-items: center;
        border-bottom: 1px solid #FBA838;
        color: #000;
        img{
          width: Rem(156);
          height: Rem(156);
          margin-left: Rem(-50);
          margin-right: Rem(20);
        }
        .ours{
          margin-right: Rem(-50);
          .time{
            display: flex;
            justify-content:space-between;
            div{
              font-size: Rem(38);
              margin-left: Rem(-14)
            }
          }
        }
      }
    }
  }
</style>
