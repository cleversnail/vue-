<template lang="html">
  <div class="calendar">
    <div class="calendar-header">我的打卡记录 [ {{year}}年-{{month + 1}}月 ]</div>
    <div class="calendar-content">
      <div class="week">
        <ul>
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li v-for="item in arrs" :class="{ today:second == item.time, gou:isGou(item), cha:isCha(item)}">{{item.date}}</li>
        </ul>
      </div>
    </div>
    <div class="left" @click="toogemonth()">
      <img src="../../assets/img/read/index/left.png" alt="">
    </div>
    <div class="right" @click="toogemonth('next')">
      <img src="../../assets/img/read/index/right.png" alt="">
    </div>
  </div>
</template>

<script>
  //判断当前年份是否是闰年(闰年2月份有29天，平年2月份只有28天)
  function isLeap(year) {
    return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
  }
  let i, k,
  arr = [],
  today = new Date(),                    //获取当前日期
  y = today.getFullYear(),              //获取年
  m = today.getMonth(),                //获取月(需要注意的是：月份是从0开始计算，获取的值比正常月份的值少1)
  d = today.getDate(),                //获取日(方便在建立日期表格时高亮显示当天)
  todaysecond = new Date(y, m, d),
  momthsecond = new Date(y, 5, 1);
export default {
  data () {
    return {
      str_nums: Number,
      arrs: [],
      month: Number,
      second: todaysecond.getTime(),
      signArr: [],
      momthtimes: momthsecond.getTime(),
    }
  },
  created () {
    this.getDays();
    this.allDate();
  },
  methods: {
    getDays() {
      const url = `/api/frontend/daily_read/readdays?year=${y}&month=${m+1}`;
      this.signArr = [];
      this.$axios.get(url)
      .then((res) => {
        this.signArr = res.data.data.map((item) => {
          return parseInt(item);
        });
      });
    },
    isGou(item) {
      if(this.signArr.indexOf(item.date) >= 0) {
        return true;
      }
    },
    isCha(item) {
      if(this.signArr.indexOf(item.date) <= -1 && item.date > 0 && item.time < this.second && item.time >= this.momthtimes){
        return true;
      }
    },
    toogemonth(item) {
      arr = [];
      if(item == 'next') {
        m ++;
        if (m > 11) {
          m = 0;
          y++;
        }
        this.getDays();
        this.changemonth();
      } else {
        arr = [];
        m --;
        if(m < 0) {
          m = 11;
          y--;
        }
        this.getDays();
        this.changemonth();
      }
    },
    allDate() {
      let i, k,
      arr = [],
      today = new Date(),                    //获取当前日期
      y = today.getFullYear(),              //获取年
      m = today.getMonth(),                //获取月(需要注意的是：月份是从0开始计算，获取的值比正常月份的值少1)
      d = today.getDate(),                //获取日(方便在建立日期表格时高亮显示当天)
      firstday = new Date(y, m, 1),            //获取当月的第一天
      dayOfWeek = firstday.getDay(),           //判断1号是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
      days_per_month = new Array(31, 28 + isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),         //创建月份数组
      str_nums = Math.ceil((dayOfWeek + days_per_month[m]) / 7);        //确定当前这个月所需的行数
      this.str_nums = str_nums;
      this.today = d;
      this.month = m;
      this.year = y;
      for (i = 0; i < str_nums; i += 1) {         //tr  第一行是0
        for (k = 0; k < 7; k++) {
         var idx = 7 * i + k;                     //为每个表格创建索引,从0开始
         var date = idx - dayOfWeek + 1;          //将当月的1号与星期进行匹配
         (date <= 0 || date > days_per_month[m]) ? date = ' ': date = idx - dayOfWeek + 1;  //索引小于等于0或者大于月份最大值就用空表格代替
         var s = new Date(y, m, date);
         var s = s.getTime();
         arr.push({date, time: s});
        }
      }
      this.arrs = arr;
    },
    changemonth() {
      const firstday = new Date(y, m, 1),            //获取当月的第一天 传当前月m
      dayOfWeek = firstday.getDay(),           //判断1号是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
      days_per_month = new Array(31, 28 + isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),         //创建月份数组
      str_nums = Math.ceil((dayOfWeek + days_per_month[m]) / 7);//确定当前这个月所需的行数
      this.today = d;
      this.month = m;
      this.year = y;
      for (i = 0; i < str_nums; i += 1) {         //tr  第一行是0
        for (k = 0; k < 7; k++) {
         var idx = 7 * i + k;                     //为每个表格创建索引,从0开始
         var date = idx - dayOfWeek + 1;          //将当月的1号与星期进行匹配
         (date <= 0 || date > days_per_month[m]) ? date = ' ': date = idx - dayOfWeek + 1;  //索引小于等于0或者大于月份最大值就用空表格代替
         var s = new Date(y, m, date);
         var s = s.getTime();
         arr.push({date, time: s});
        }
      }
      this.arrs = arr;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/config.scss";
  .calendar{
    width: Rem(580);
    margin: 0 auto;
    background-color: #fff;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    .calendar-header{
      color: #fe5a01;
      font-size: Rem(34);
      padding: Rem(20) 0;
      font-weight: bold;
    }
    .calendar-content{
      color: #000;
      padding: 0 Rem(26);
      box-sizing: border-box;
      .week{
        ul{
          overflow: hidden;
          li{
            float: left;
            width: 14%;
            height: Rem(54);
          }
          .today{
            color: #fe5a01;
          }
          .gou{
            background: url('../../assets/img/read/index/gou.png') no-repeat 85% 90%;
            background-size: 60%;
          }
          .cha{
            background: url('../../assets/img/read/index/cha.png') no-repeat 85% 90%;
            background-size: 60%;
          }
        }
      }
    }
    .left{
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-160%, -50%);
      img{
        width: Rem(34);
      }
    }
    .right{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(160%, -50%);
      img{
        width: Rem(34);
      }
    }
  }
</style>
