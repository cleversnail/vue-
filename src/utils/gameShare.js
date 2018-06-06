/**
 * 微信分享
 * @return {[type]} [description]
 */
export default function gameShare(title1, title2, desc, url) {

  title1 = title1 || '［医看］每日有奖答题';
  title2 = title2 || '有一种红包只有影像医生才可以领';
  desc   = desc || '「医看」每日有奖问答，医生的自测题库，现金红包天天领！';
  url    = url || `${location.origin}/active_web/#/game`;

  const share = {
    title1: title1,
    title2: title2,
    desc:   desc,
    link:   url,
    img:    'http://img.kankanyisheng.com/yikan-t/20170309/14890493717061845865.jpg'
  }
  //微信分享
  var config = {
    title: share.title1, // 分享标题
    desc: share.desc,
    link: share.link, // 分享链接
    imgUrl: share.img, // 分享图标
    success: function(res) {
      // 用户确认分享后执行的回调函数
    },
    fail: function(res) {
      alert('error');
    }
  }
  var config2 = {
    title: share.title2, // 分享标题
    link: share.link, // 分享链接
    imgUrl: share.img, // 分享图标
    success: function(res) {
      // 用户确认分享后执行的回调函数
    },
    fail: function(res) {
      alert('error');
    }
  }

  wx.ready(function() {
    wx.onMenuShareTimeline(config2);
    // wx.onMenuShareAppMessage(config);
    wx.hideMenuItems({
      menuList: ["menuItem:share:appMessage"]
    });
  });
}
