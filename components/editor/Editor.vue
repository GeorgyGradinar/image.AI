<template>
  <div class="editor" ref="editorPlace">
    <div v-for="image in tempImages" :key="image.id">
      <TempCanvas :image="image"></TempCanvas>
    </div>
    <canvas ref='myCanvas' :width="widthCanvas" :height="heightCanvas" tabindex='0'></canvas>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {editorStore} from "~/store/editorStore";
import {storeToRefs} from "pinia";
import TempCanvas from "~/components/editor/editor-place/TempCanvas";

const editor = editorStore();
const {changePositionNewImage, clearTempImages} = editor;
const {
  imageUpload,
  hasActiveEraser,
  currentWidthEraser,
  isSelectElement,
  tempImages,
  isActiveMoveNewImages
} = storeToRefs(editor);

let editorPlace = ref(null);
let myCanvas = ref(null);

let widthCanvas = ref();
let heightCanvas = ref();

let ctx;
let images = ref();
let widthEraser = ref();
let selectNewImageId = ref(null);
let firstPositionX = ref(null);
let firstPositionY = ref(null);

onMounted(() => {
  ctx = myCanvas.value.getContext('2d');
  widthCanvas.value = window.innerWidth - 350;
  heightCanvas.value = window.innerHeight - 70;
  widthEraser.value = currentWidthEraser.value;
})

watch(hasActiveEraser, (newData) => {
  if (newData) {
    myCanvas.value.addEventListener('mousedown', mouseDown);
  } else {
    myCanvas.value.removeEventListener('mousedown', mouseDown);
  }
})

watch(currentWidthEraser, (newData) => {
  widthEraser.value = newData;
})

watch(isSelectElement, (newData) => {
  if (newData) {
    myCanvas.value.addEventListener('mousedown', mouseDown);
  } else {
    myCanvas.value.removeEventListener('mousedown', mouseDown);
  }
})

watch(isActiveMoveNewImages, (newData) => {
  if (newData) {
    editorPlace.value.addEventListener('mousedown', mouseDown)
  } else {

  }
})

function fileUpload() {
  tempImages.value.forEach(image => {
    let bg = new Image();
    bg.src = image.url
    bg.onload = () => {
      ctx.drawImage(bg, image.positionX, image.positionY - 70, bg.naturalWidth / 2, bg.naturalHeight / 2);
    }
  })
  clearTempImages();
}

function mouseDown(event) {
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);

  if (hasActiveEraser.value) {
    fileUpload();
    clearBackground();
  } else if (isSelectElement.value) {
    moveElement();
  } else if (isActiveMoveNewImages.value) {
    selectNewImageId.value = event.target.parentNode.__vnode.key;
    firstPositionX.value = event.clientX;
    firstPositionY.value = event.clientY;
  }
}

function mouseMove(event) {
  // ctx.arc(event.clientX, event.clientY - 70, 50, 0, 2 * Math.PI, false);
  if (hasActiveEraser.value) {
    clearBackground();
  } else if (isSelectElement.value) {
    moveElement();
  } else if (isActiveMoveNewImages.value) {
    changePositionNewImage(
        selectNewImageId.value,
        event.clientY - firstPositionY.value,
        event.clientX - firstPositionX.value
    )
    firstPositionX.value = event.clientX;
    firstPositionY.value = event.clientY;
  }
}


function mouseUp(event) {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
  firstPositionY.value = null;
  firstPositionX.value = null;
}

function clearBackground() {
  ctx.clearRect(event.clientX, event.clientY - 70, widthEraser.value, widthEraser.value);
}

function moveElement() {
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
    position: absolute;
  }
}
</style>
