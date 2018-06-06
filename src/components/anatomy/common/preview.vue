<template lang="html">
  <div class="preview">
    <div class="preview__container">
      <!-- <v-touch tag="a" @pinch="onPin" @pan="onPan" :enabled="true">
        <img class="preview__img" ref="img" :src="imgs[index].site" alt="">
      </v-touch> -->
      <img class="preview__img"
      ref="img"
      :src="imgs[target.index].site" alt=""
      v-finger:pinch="pinch"
      v-finger:multipoint-start="multipointStart"
      v-finger:press-move="pressMove">
      <div class="preview__prograss">
        <mt-range
          v-model="target.index"
          :max="imgs.length-1"
          :step="1"
          :bar-height="4">
          <div slot="start">
            <img class="left" src="~src/assets/img/anatomy/right.png" alt="" @click="prev">
          </div>
          <div slot="end">
            <img class="right" src="~src/assets/img/anatomy/right.png" alt="" @click="next">
          </div>
        </mt-range>
      </div>
      <div class="icon preview__close" @click="closePreview"></div>
      <div class="preview__number">
        {{target.index+1}}/{{imgs.length}}
      </div>
    </div>
  </div>
</template>

<script>
import To from '../../../utils/alloyfinder/to';
import transform from '../../../utils/alloyfinder/transform';

let initScale = 1;

function ease(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function imageLoaded(dom,onload){
    var img=new Image() ;
    img.onload=function(){
        onload.call(dom,this.width,this.height);
        img.onload=null;
        img=null;
    };
    img.src=dom.getAttribute("src");
}

function initPosition(el) {
  To.stopAll();
  if (el.scaleX < 1) {
      new To(el, "scaleX", 1, 500, ease);
      new To(el, "scaleY", 1, 500, ease);
  }
  if (el.scaleX > 1) {
      new To(el, "scaleX", 1, 500, ease);
      new To(el, "scaleY", 1, 500, ease);
  }
  new To(el, "translateX", 0, 500, ease);
  new To(el, "translateY", 0, 500, ease);
}

export default {
  props: ['imgs','close', 'target'],
  mounted() {
    this.$nextTick(()=> {
      const el = this.$refs.img;
      transform(el);
      imageLoaded(el, function(w, h) {
        const topPx=(window.innerHeight-(h*window.innerWidth/w))/2;
        el.style.top = topPx+"px";
      })
    })
  },
  watch: {
    target: {
      handler(val, oldVal) {
        this.touchEnd();
      },
      deep: true,
    }
  },
  methods: {
    closePreview() {
      this.close();
    },
    prev() {
      if (this.target.index>0) {
        this.target.index --;
        this.touchEnd();
      }
    },
    next() {
      if (this.target.index < this.imgs.length -1) {
        this.target.index ++;
        this.touchEnd();
      }
    },
    multipointStart(evt) {
      var evt = evt || window.event;
      To.stopAll();
      initScale = this.$refs.img.scaleX;
      evt.preventDefault();
    },
    pinch(evt) {
      var evt = evt || window.event;
      const el = this.$refs.img;
      el.scaleX = el.scaleY = initScale * evt.zoom;
      evt.preventDefault();
    },
    pressMove(evt) {
      var evt = evt || window.event;
      const el = this.$refs.img;
      el.translateX += evt.deltaX;
      el.translateY += evt.deltaY;
      evt.preventDefault();
    },
    touchEnd() {
      const el = this.$refs.img;
      initPosition(el);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~src/assets/scss/config.scss';

.icon {
  display: inline-block;
  width: 44px;
  height: 44px;
  background: url('http://cdn.bootcss.com/photoswipe/4.1.1/default-skin/default-skin.svg') 0 0 no-repeat;
  background-size: 264px 88px;
}

.preview {
  /* display: none; */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &__container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
  }
  &__img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  &__prograss {
    position: absolute;
    left: 50%;
    bottom: Rem(120);
    width: 96%;
    transform: translateX(-50%);
    z-index: 2;
  }
  &__close {
    position: absolute;
    top: 0;
    right: 0;
    background-position: 0 -44px;
  }
  &__number {
    position: absolute;
    left: Rem(20);
    top: Rem(20);
    color: $color-white;
    font-weight: bold;
  }
}
.prograss {
  position: relative;
  width: 100%;
  height: Rem(8);
  background: #C3D2F2;
  border-radius: Rem(8);
  &__btn {
    position: absolute;
    left: 0;
    top: 50%;
    width: Rem(50);
    height: Rem(50);
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,.4);
    transform: translateY(-50%);
  }
}
.left {
  width: Rem(50);
  margin-right: Rem(10);
  transform: rotate(180deg);
}
.right {
  width: Rem(50);
  margin-left: Rem(10);
}
</style>
