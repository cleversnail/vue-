<template>
<div id="app">
    <router-view></router-view>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        <!-- Background of PhotoSwipe.
             It's a separate element, as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>
        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">
            <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
            <div class="pswp__container">
                <!-- don't modify these 3 pswp__item elements, data is added later on -->
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <!--  Controls are self-explanatory. Order can be changed. -->
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('getUser');
  }
};
</script>

<style lang="scss">
@import './assets/scss/main';
@import "./assets/scss/config";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
}
.a-btn{
  width: Rem(194);
  height: Rem(64);
  line-height: Rem(64);
  text-align: center;
  color: #fff;
  font-size: Rem(20);
  font-weight: bold;
  background: url('~src/assets/img/anatomy/btn.png') no-repeat;
  background-size: 100%;
  &--gohome {
    width: Rem(90);
    height: Rem(80);
    background: url('~src/assets/img/anatomy/homeBtn.png') no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0;
    top: Rem(64);
  }
  &--block {
    width: Rem(712);
    height: Rem(100);
    line-height: Rem(100);
    text-align: center;
    color: #fff;
    font-size: Rem(28);
    letter-spacing: 2px;
    background: url('~src/assets/img/anatomy/btn2.png') 0 0 no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: Rem(20);
    left: 50%;
    transform: translateX(-50%);
  }
}

.container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin: 0 auto;
    min-width: 320px;
    max-width: 640px;
}
.color-orange {
    color: $color-orange;
}
.color-black {
    color: $color-black;
}
.submit {
    width: Rem(260);
    margin: 0 auto;
    padding: Rem(16) Rem(20);
    border-radius: Rem(40);
    overflow: hidden;
    background: $main-color-blue;
    color: $color-white;
    img {
        float: left;
        width: Rem(45);
        margin-left: Rem(20);
    }
    .text {
        margin-left: Rem(80);
        font-size: Rem(36);
    }
}

.master-weixin{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(0,0,0,.8);
}
.wexin-box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: Rem(600);
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  letter-spacing: 4px;
}
.wexin-code {
  width: Rem(360);
  margin-bottom: Rem(20);
}
.wexin-yk {
  color: #fa6852;
}
</style>
