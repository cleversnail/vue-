const DEFAULT_TITLE_1 = '［医看］医学书籍砍价免费送啦！手慢无！';
const DEFAULT_TITLE_2 = '［医看］医学书籍砍价免费送啦！手慢无！';
const DEFAULT_DESC    = '喜欢哪本砍拿本，［医看］来买单';
const DEFAULT_LINK    = `${location.origin}/active_web/#/bargain`;
const DEFAULT_IMG     = 'http://img.kankanyisheng.com/yikan-t/20171027/15090820099047115534.jpg';

export default function share(title1 = DEFAULT_TITLE_1, title2 = DEFAULT_TITLE_2, desc = DEFAULT_DESC, link = DEFAULT_LINK, imgUrl = DEFAULT_IMG) {

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
