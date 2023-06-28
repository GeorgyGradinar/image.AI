<template>
  <div class="editor" ref="editorPlace">
    <canvas id="canvasTest" :width="widthCanvas" :height="heightCanvas"></canvas>
  </div>
</template>

<script setup>
import {editorStore} from "~/store/editorStore";
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import {fabric} from "fabric"

const editor = editorStore();
const {clearTempImages, changeCurrentZoom, callFunctionDownload} = editor;
const {
  tempImages,
  hasActiveEraser,
  currentWidthEraser,
  isSelectedAllElement,
  currentZoom,
  download,
  setCenter
} = storeToRefs(editor);

let canvas;
let frame;
let images = ref([]);
let selectableImages = ref([]);

let widthCanvas = ref(window.innerWidth - 350);
let heightCanvas = ref(window.innerHeight);


onMounted(() => {
  canvas = new fabric.Canvas('canvasTest');
  frame = new fabric.Object(canvas)
  canvas.freeDrawingBrush.color = "#1f2023";
  canvas.freeDrawingBrush.width = 5;

  canvas.on("path:created", handlePathCreated);
  changeViewPort();
  mouseWheel();
})

watch(tempImages, () => {
  addImageToCanvas();
})

watch(setCenter, () => {
  findCanvasCenter();
})

watch(isSelectedAllElement, (isSelected) => {
  if (isSelected) {
    canvas.discardActiveObject();
    canvas.defaultCursor = 'grab';
    canvas.moveCursor = 'grabbing';

    selectableImages.value = images.value.filter((image) => image.selectable);

    images.value.forEach(image => {
      image.set({
        selectable: false,
        hoverCursor: 'grab',
        moveCursor: 'grabbing'
      })
    })
  } else {
    selectableImages.value.forEach(image => {
      image.set({
        selectable: true,
        hoverCursor: 'pointer',
        moveCursor: 'move'
      })
    })

    selectableImages.value = [];
    canvas.defaultCursor = 'default';
    canvas.moveCursor = 'default';
  }

  canvas.renderAll();
})

watch(hasActiveEraser, (newData) => {
  canvas.isDrawingMode = newData;
})

watch(currentWidthEraser, (newData) => {
  canvas.freeDrawingBrush.width = newData;
})

watch(currentZoom, (newData) => {
  changeZoom(newData)
})

watch(download, () => {
  imageDownload();
})

function addImageToCanvas() {
  if (!tempImages.value?.length) {
    return;
  }

  fabric.Image.fromURL(tempImages.value, image => {
    image.set({
      hoverCursor: 'pointer',
      moveCursor: 'move'
    })
    images.value.push(image);
    canvas.add(image);
  });
  clearTempImages();
}

function findCanvasCenter() {
  changeCurrentZoom(1);
  canvas.absolutePan({x: widthCanvas.value / 4 * -1, y: 0});
}

function handlePathCreated(opt) {
  if (!canvas) return
  opt.path.globalCompositeOperation = 'destination-out';
  opt.path.set({
    '_type': 'path',
    selectable: false,
    hasRotatingPoint: false,
    hoverCursor: 'default',
    moveCursor: 'default',
  })

  opt.path.bringToFront()
  images.value.forEach((i) => {
    if (i.selectable) {
      i.set({
        selectable: false,
        hoverCursor: 'default',
        moveCursor: 'default',
      })
    }

  })
  canvas.renderAll();
}

function changeViewPort() {
  canvas.on('mouse:down', function (opt) {
    let evt = opt.e;
    if (isSelectedAllElement.value) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  });
  canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
      let e = opt.e;
      let vpt = this.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
      // updateMove()
    }
  });
  canvas.on('mouse:up', function (opt) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    this.setViewportTransform(this.viewportTransform);
    this.isDragging = false;
    this.selection = true;
  });
}

function changeZoom(z) {
  canvas.zoomToPoint({
    x: (canvas.width) / 2, y: canvas.height / 2
  }, z);
  canvas.setZoom(z);
  // const n = Math.round(brushSize * z);
  // canvasRef.current.set({
  //   freeDrawingCursor: `url(${getBrushCursor(n)}) ${n / 2} ${n / 2}, crosshair`,
  // })
}

function mouseWheel() {
  canvas.on("mouse:wheel", function (opt) {
    opt.e.preventDefault()
    opt.e.stopPropagation()
    if (opt.e.ctrlKey || opt.e.metaKey) {
      const delta = opt.e.deltaY;
      let z = canvas.getZoom();
      z *= 0.999 ** delta;
      if (z > 20) z = 20;
      if (z < 0.01) z = 0.01;
      // canvas.zoomToPoint({
      //   x: opt.e.offsetX,
      //   y: opt.e.offsetY
      // }, z);
      changeCurrentZoom(z);
    } else if (opt.e.shiftKey) {
      const e = opt.e;
      const vpt = canvas.viewportTransform;
      if (vpt) {
        vpt[4] += e.deltaY;
        vpt[5] -= e.deltaX;
        canvas.requestRenderAll();
      }
    } else {
      const e = opt.e;
      const vpt = canvas.viewportTransform;
      if (vpt) {
        vpt[4] -= e.deltaX;
        vpt[5] += e.deltaY;
        canvas.requestRenderAll();
      }
    }
  })
}

function imageDownload() {
  const fileName = `НейроХолст.png`;
  const link = document.createElement("a");
  link.href = getDataUrl();
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();

  // posthog.capture("Download Canvas")
}

function getDataUrl(thumbnail = false, multiplier = 1) {
  // get outermost coordinates
  let left;
  let right;
  let top;
  let bottom;

  for (const image of images.value) {
    let il = image.left ? image.left : 0
    if (left === undefined || il < left) {
      left = il
    }
    let ir = il + image.getScaledWidth()
    if (right === undefined || ir > right) {
      right = ir;
    }
    let it = image.top ? image.top : 0;
    if (top === undefined || it < top) {
      top = it
    }
    let ib = it + image.getScaledHeight()
    if (bottom === undefined || ib > bottom) {
      bottom = ib
    }
  }

  canvas.requestRenderAll()

  const vpt = [...canvas.viewportTransform];
  canvas.viewportTransform = [1, 0, 1, 0, 0, 0]

  const dataURL = canvas.toDataURL({
    format: 'png',
    left: left,
    top: top,
    width: right - left,
    height: bottom - top,
    multiplier: thumbnail ? 420 / (right - left) : multiplier
  })
  canvas.viewportTransform = vpt;

  return dataURL;
}

</script>

<style scoped lang="scss">
.editor {
  position: relative;
  min-width: calc(100vw - 356px);
  height: 100vh;
  padding-top: 70px;
  background-image: url("assets/images/editor/background-dot.svg");
  background-repeat: repeat;

  canvas {
  }
}
</style>
