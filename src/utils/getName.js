/**
 * 生成图片名字
 * @return {[String]} [文件格式：20160222/时间戳+随机数]
 */
export default function getName() {
  var year = new Date().getFullYear(),
    month = get_month(),
    day = get_day();
  var time = new Date().valueOf();
  var random = Math.ceil(Math.random() * 10000000);
  var filename = year + '' + month + '' + day + '/' + time + '' + random;
  return filename;
}

function get_month() {
  var date = new Date();
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return month;
}

function get_day() {
  var date = new Date();
  var day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return day;
}
