/**
 * 微信分享
 * @return {[type]} [description]
 */
export default function wxShare(type, id, user) {

  var type = type || 1;
  var share = {
    title1: '',
    title2: '',
    desc: '',
    link: '',
    img: ''
  }

  switch (type) {
    case 1:
      share.title1 = '送春迎夏，医看举办“影像科室宣教栏展示摄影大赛”我来宣传你来拍！';
      share.title2 = '送春迎夏，医看举办“影像科室宣教栏展示摄影大赛”！';
      share.desc = '分享科室影像科室宣教栏，医看帮你宣传科室文化！诚邀广大影像科医生参加！';
      share.link = location.origin + '/active_web/#/zuimei';
      share.img = 'http://img.kankanyisheng.com/94014773985655DFdjQcWDi.jpg';
      break;
    case 2:
      share.title1 = '我在参加医看“最美影像人”有奖摄影大赛，你也试试吧！';
      share.title2 = '我在参加医看“最美影像人”有奖摄影大赛，你也一起来吧！';
      share.desc = '晒晒医学影像界台前/幕后的女神们，医看诚邀男/女影像医生及家属参加！';
      share.link = location.origin + '/active_web/#/zuimei/hello';
      share.img = 'http://img.kankanyisheng.com/94014773985655DFdjQcWDi.jpg';
      break;
    case 3:
      share.title1 = '医看“影像科室宣教栏摄影大赛”，快为他投上一票吧！';
      share.title2 = '“我来宣传你来拍”，快为' + user.nickname + '医生投上一票，让医看为他宣传科室吧！';
      share.desc = '帮他宣传科室文化！快投他！';
      share.link = location.origin + '/active_web/#/zuimei/rate/' + id;
      share.img = user.headimg;
      break;
    case 4:
      share.title1 = '喜迎3.8妇女节，医看举办“最美影像人”有奖摄影大赛！';
      share.title2 = '迎3.8妇女节，重金悬赏“最美影像人”，医看诚邀男/女影像医生及家属参加！';
      share.desc = '晒晒医学影像界台前/幕后的女神们，医看诚邀男/女影像医生及家属参加！';
      share.link = location.origin + '/active_web/#/zuimei/rank';
      share.img = 'http://img.kankanyisheng.com/94014773985655DFdjQcWDi.jpg';
      break;
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
  });
}
