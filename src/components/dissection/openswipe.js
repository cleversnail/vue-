export default function openswipe(photo) {
    var e = window.event;

    var pswpElement = document.querySelectorAll('.pswp')[0];

    var title = arguments[1];
    var items = [];
    var img = new Image();
    var src;
    if (photo.indexOf('http')>-1) {
      src = photo;
    } else {
      src = 'http://img.kankanyisheng.com/' + photo;
    }
    img.src = src;

    var tmp = {
        src: src,
        w: img.width,
        h: img.height,
    }
    items.push(tmp);
    // define options (if needed)
    var options = {
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,

        showAnimationDuration: 0,
        hideAnimationDuration: 0,
        shareEl: false,
        fullscreenEl: false

    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.listen('preventDragEvent', function(e, isDown, preventObj) {
        // e - original event
        // isDown - true = drag start, false = drag release

        // Line below will force e.preventDefault() on:
        // touchstart/mousedown/pointerdown events
        // as well as on:
        // touchend/mouseup/pointerup events
        preventObj.prevent = true;
    });
    gallery.init();
};
