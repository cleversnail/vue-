export default function openswipe(photos, index) {
    var e = window.event;

    var pswpElement = document.querySelectorAll('.pswp')[0];

    var title = arguments[1];

    // build items array
    var items = [];
    photos.forEach(function(item) {
        var tmp;
        var type = typeof item;
        if (type == 'object') {
            var img = new Image();
            img.src = item.site;
            tmp = {
                src: item.site,
                w: img.width,
                h: img.height,
                title: title
            };
        } else {
            var img = new Image();
            img.src = 'http://img.kankanyisheng.com/' + item;

            tmp = {
                src: 'http://img.kankanyisheng.com/' + item,
                w: img.width,
                h: img.height,
                title: title
            }
        }
        items.push(tmp)
    })

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
    gallery.goTo(index);
};
