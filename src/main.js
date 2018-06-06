// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import {
  Rate,
  Message,
  Upload,
} from 'element-ui';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
// import VueTouch from 'vue-touch/dist/vue-touch';
import AlloyFinger from 'alloyfinger/alloy_finger';
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue';

import wxShare from './utils/wxShare';
import gameShare from './utils/gameShare';
import kepuShare from './utils/kepu-share';
import './utils/tingyun-rum';

import 'element-ui/lib/theme-default/index.css';

import axios from 'axios';
import Qs from 'qs';

Vue.use(Rate);
Vue.use(Upload);
Vue.use(MintUI);
// Vue.use(VueTouch, {name: 'v-touch'});
Vue.use(AlloyFingerVue, { AlloyFinger });

Vue.prototype.$message = Message;
Vue.prototype.$wxShare = wxShare;
Vue.prototype.$gameShare = gameShare;
Vue.prototype.$kepuShare = kepuShare;

Vue.prototype.$axios = axios;
Vue.prototype.$wxConfig = wxConfig;

Vue.prototype.$axios.interceptors.response.use(function(response) {
  // Do something with response data
  if (response.data.status == -3) {
    var smart_url = encodeURIComponent(location.href);
    location.href = '/api/frontend/account/signin?smart_url=' + smart_url;
  }
  return response;
}, function(error) {
  // Do something with response error
  return Promise.reject(error);
});

Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios.defaults.transformRequest = [function(data) {
  data = Qs.stringify(data);
  return data;
}];

function wxConfig() {
  let url = '/api/frontend/account/jssdk?url=' + encodeURIComponent(location.href);
  console.log(location.href);
  axios.get(url).then(res => {
    eval(res.data);
  })
}

window.vueT = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  data: {
    time: 100,
    timer: null,
  }
});
/**
 * 计算根元素字体大小
 */
document.addEventListener('DOMContentLoaded', function() {

  var html = document.documentElement;
  var windowWidth = html.clientWidth;

  if (windowWidth > 640) {
    windowWidth = 640;
  }
  html.style.fontSize = windowWidth / 7.5 + 'px';
}, false);

