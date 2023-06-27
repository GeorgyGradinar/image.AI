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
const {clearTempImages} = editor;
const {
  tempImages,
  hasActiveEraser,
  currentWidthEraser,
  isSelectedAllElement
} = storeToRefs(editor);

let canvas;
let frame;
let images = ref([]);

let widthCanvas = ref(window.innerWidth - 350);
let heightCanvas = ref(window.innerHeight - 70);


onMounted(() => {
  canvas = new fabric.Canvas('canvasTest');
  frame = new fabric.Object(canvas)
  canvas.freeDrawingBrush.color = "#1f2023";
  canvas.freeDrawingBrush.width = 5;

  canvas.on("path:created", handlePathCreated);

  changeViewPort();
})

watch(tempImages, () => {
  addImageToCanvas();
})

watch(hasActiveEraser, (newData) => {
  canvas.isDrawingMode = newData;
})

watch(currentWidthEraser, (newData) => {
  canvas.freeDrawingBrush.width = newData;
})

function addImageToCanvas() {
    fabric.Image.fromURL(tempImages.value, image => {
      images.value.push(image);
      canvas.add(image);
    });
  clearTempImages();
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
