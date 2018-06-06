/**
 * 微信分享
 * @return {[type]} [description]
 */
export default function kepuShare(title1, title2, desc, url) {

  title1 = title1 || '有奖活动丨和「医看」一起迎接世界卫生日，为健康科普代言！（我是医生，我为家人朋友的健康出分力！）';
  title2 = title2 || '有奖活动丨和「医看」一起迎接世界卫生日，为科普健康代言！';
  desc   = desc || '有奖活动丨和「医看」一起迎接世界卫生日，为科普健康代言！';
  url    = url || `${location.origin}/active_web/#/kepu`;

  const share = {
    title1: title1,
    title2: title2,
    desc:   desc,
    link:   url,
    img:    'http://img.kankanyisheng.com/94014773985655DFdjQcWDi.jpg'
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
    wx.onMenuShareAppMessage(config);
    // wx.hideMenuItems({
    //   menuList: ["menuItem:share:appMessage"]
    // });
  });
}
