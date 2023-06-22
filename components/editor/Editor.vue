<template>
  <div class="editor">
    <canvas ref='myCanvas' id="myCanvas" :width="widthCanvas" :height="heightCanvas" tabindex='0'

    ></canvas>
  </div>
</template>

<script setup>
import {onMounted, watch} from "vue";
import {editorStore} from "~/store/editorStore";
import {storeToRefs} from "pinia";

const editor = editorStore();
const {} = editor;
const {imageUpload, hasActiveEraser, currentWidthEraser, isSelectElement} = storeToRefs(editor);

let widthCanvas = ref();
let heightCanvas = ref();

let myCanvas = ref(null);
let ctx;
let images = ref();
let widthEraser = ref();

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

watch(imageUpload, (newData) => {
  fileUpload(newData)
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

function fileUpload(image) {
  let bg = new Image();
  bg.src = image.url
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, bg.naturalWidth / 2, bg.naturalHeight / 2);
  }
}

function mouseDown(event) {
  myCanvas.value.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
  console.log(hasActiveEraser.value)
  if (hasActiveEraser.value) {
    clearBackground();
  } else if (isSelectElement.value) {
    moveElement();
  }
}

function mouseMove(event) {
  // ctx.arc(event.clientX, event.clientY - 70, 50, 0, 2 * Math.PI, false);
  if (hasActiveEraser.value) {
    clearBackground();
  } else if (isSelectElement.value) {
    moveElement();
  }
}

function mouseUp(event) {
  myCanvas.value.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
}

function clearBackground() {
  ctx.clearRect(event.clientX, event.clientY - 70, widthEraser.value, widthEraser.value);
}

function moveElement() {
}


</script>

<style scoped lang="scss">
.editor {
  min-width: calc(100vw - 356px);
  height: 100vh;
  padding-top: 61px;
  background-image: url("assets/images/editor/background-dot.svg");
  background-repeat: repeat;

  canvas {
  }
}
</style>
