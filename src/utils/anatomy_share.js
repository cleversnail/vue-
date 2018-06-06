export default function robot_share(title1, title2, desc , link, imgUrl) {
  title1 = title1 || '医看推出阅片机器人,快来和机器人一起标注吧!';
  title2 = title2 || '医看推出阅片机器人,快来和机器人一起标注吧!';
  desc = desc || '让我们一起提高业务水平,拓宽行业知识';
  link = link || `${location.origin}/active_web/#/anatomy/home`;
  imgUrl = imgUrl || 'http://img.kankanyisheng.com/yikan-t/20170831/15041798515158478091.jpeg';

  //微信分享给好友
  var config1 = {
    title: title1,
    desc,
    link,
    imgUrl,
    success: function(res) {
      // 用户确认分享后执行的回调函数
    },
    fail: function(res) {
      alert('error');
    }
  }
  // 微信朋友圈分享
  var config2 = {
    title: title2, // 分享标题
    link, // 分享链接
    imgUrl, // 分享图标
    success: function(res) {
      // 用户确认分享后执行的回调函数
    },
    fail: function(res) {
      alert('error');
    }
  }
  wx.ready(function() {
    wx.onMenuShareAppMessage(config1);
    wx.onMenuShareTimeline(config2);
  });
}
