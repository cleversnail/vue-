export function shuffle(input) {
  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

export function createInvitation(bg, name, doms, cb) {
  const {canvas, headimg, code} = doms;
  const context = canvas.getContext('2d');
  const ratio = resetCanvas(canvas, context);
  const width = canvas.width;
  const height = canvas.height;
  const imgBg = new Image();
  imgBg.onload = () => {
    context.drawImage(imgBg, 0, 0, width, height);
    context.drawImage(code, 6*ratio, 353*ratio, code.width*ratio/2.2, code.height*ratio/2.2);
    context.drawImage(headimg, 18*ratio, 18*ratio, headimg.width * ratio, headimg.height * ratio);
    context.font = '30px Arial';
    context.fillText(name, 55*ratio, 35*ratio);
    cb(canvas.toDataURL('image/png'));
  }
  imgBg.src = bg;
}

function resetCanvas(canvas, context) {
  // var devicePixelRatio = window.devicePixelRatio || 1,
  //   backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
  //   ratio = devicePixelRatio / backingStoreRatio;
  var ratio = 4;
  var oldWidth = canvas.dataset.width;
  var oldHeight = canvas.dataset.height;
  canvas.width = oldWidth * ratio;
  canvas.height = oldHeight * ratio;
  canvas.style.width = oldWidth + 'px';
  canvas.style.height = oldHeight + 'px';
  return ratio;
}
