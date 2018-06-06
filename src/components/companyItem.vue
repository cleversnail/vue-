<template>
<div class="company-box">
    <div class="company-item" v-for="(item,index) in list" :style="{backgroundImage:`url(${item.pics[0].site})`}">
        <!-- <router-link :to="{path:`rate/${item.id}`}"> -->
            <div class="company-bg" @click="goRate(item)">
                <div class="company-head">
                    第{{(page-1)*10+index+1}}名
                    <div class="num">
                        <p>{{item.vote_num}}</p>
                        <p>票</p>
                    </div>
                    <div class="headimg">
                      <img :src="item.member.headimg" alt="">
                    </div>
                </div>
                <div class="company-cont">
                </div>
                <div class="company-foot">
                    <div class="go-rate">
                        投票！
                    </div>
                    <div class="text">
                        <p>参赛人:{{item.name}}</p>
                        <p>医院:{{item.hospital}}</p>
                        <p>描述:{{item.content}}</p>
                    </div>
                </div>
            </div>
        <!-- </router-link> -->
    </div>
    <div v-if="showLayer" @click="close">
        <layer :status="showLayer" :type="'yk'" :statustype="'4'"></layer>
    </div>
</div>
</template>

<script>
import layer from './common/layer';

export default {
    name: 'companyItem',
    components:{
      layer
    },
    props: {
        list: {
            type: Array
        },
        page: {
            type: String
        }
    },
    data() {
        return {
            showLayer: false,
            limitArray: [1, 5, 8, 9, 11]
        };
    },
    methods: {
        rate(item) {
            let url = `/api/frontend/vote/vote/${item.id}`;
            let data = {
              casual_activity_id : 4
            };
            this.$axios.post(url, data)
                .then((res) => {
                    if (res.data.status == 0) {
                        this.$toast('投票成功');
                        item.vote_num=parseInt(item.vote_num)+1;
                    } else if(res.data.status == 2003){
                      this.show();
                    } else {
                        this.$toast(res.data.msg);
                    }
                })
        },
        goRate(item){
          const event = window.event;
          if(event.target.className === 'go-rate'){
            this.rate(item);
          }else{
            this.$router.push(`/zuimei/rate/${item.id}`);
          }
        },
        show(){
            this.showLayer = true;
        },
        close(){
            this.showLayer = false;
        },
        htmlAce(html) {
            var newHtml = html.replace(/\n/g, '<br>');
            return newHtml;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>@import "../assets/scss/config.scss";
.company-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 Rem(55);
    .company-item {
        width: 46%;
        margin: Rem(30) 0;
        background: url("http://img.kankanyisheng.com/5121486815846jrvTS5AWbt.jpg");
        background-size: cover;
        color: $color-white;
        border: 1px solid $color-blue;
        .company-bg {
            background: rgba(0,0,0,.6);
        }
        .company-head {
            position: relative;
            height: Rem(60);
            line-height: Rem(60);
            font-size: Rem(30);
            padding-left: Rem(20);
            .num {
                $length: Rem(74);
                box-sizing: border-box;
                position: absolute;
                right: Rem(10);
                top: Rem(10);
                width: $length;
                height: $length;
                line-height: 1;
                padding-top: Rem(12);
                text-align: center;
                border-radius: 50%;
                background: $color-white;
                color: $color-blue;
                font-size: Rem(24);
            }
            .headimg {
              $length: Rem(70);
              position: absolute;
              left: Rem(20);
              top: Rem(60);
              width: $length;
              height: $length;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid $color-blue;
              }
            }
        }
        .company-cont {
            min-height: Rem(170);
            overflow: hidden;
        }
        .company-foot {
            overflow: hidden;
            .go-rate {
                width: Rem(200);
                height: Rem(50);
                margin: 0 auto;
                line-height: Rem(50);
                text-align: center;
                background: $color-blue;
                color: $color-white;
                border-radius: Rem(26);
            }
            .text {
                padding: Rem(20);
                font-size: Rem(20);
                line-height: 1.1;
            }
        }
    }
}
</style>
