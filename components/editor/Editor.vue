<template>
  <div class="editor" ref="editorPlace">
    <div v-for="image in tempImages" :key="image.id">
      <TempCanvas :image="image"></TempCanvas>
    </div>
    <button @click="download">tclknmcnsklc</button>
    <canvas ref='mainCanvas'
            :width="widthCanvas"
            :height="heightCanvas"
            tabindex='0'
            :style="{top: currentY, left: currentX}">
    </canvas>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {editorStore} from "~/store/editorStore";
import {storeToRefs} from "pinia";
import TempCanvas from "~/components/editor/editor-place/TempCanvas";

const editor = editorStore();
const {changePositionNewImage, clearTempImages} = editor;
const {
  imageUpload,
  hasActiveEraser,
  currentWidthEraser,
  isSelectedAllElement,
  tempImages
} = storeToRefs(editor);

let editorPlace = ref(null);
let mainCanvas = ref(null);

let widthCanvas = ref();
let heightCanvas = ref();

let ctx;
let images = ref();
let widthEraser = ref();
let selectNewImageId = ref(null);
let firstPositionX = ref(null);
let firstPositionY = ref(null);

let currentWidthMainCanvas = ref(0);
let currentHeightMainCanvas = ref(0);

let currentY = computed(() => {
  return currentHeightMainCanvas.value ? `${currentHeightMainCanvas.value}px` : 0;
})
let currentX = computed(() => {
  return currentWidthMainCanvas.value ? `${currentWidthMainCanvas.value}px` : 0;
})

onMounted(() => {
  ctx = mainCanvas.value.getContext('2d');
  widthCanvas.value = window.innerWidth - 350;
  heightCanvas.value = window.innerHeight - 70;
  widthEraser.value = currentWidthEraser.value;
})

watch(hasActiveEraser, (newData) => {
  if (newData) {
    editorPlace.value.addEventListener('mousedown', mouseDown);
  }
})

watch(currentWidthEraser, (newData) => {
  widthEraser.value = newData;
})

watch(isSelectedAllElement, (newData) => {

  if (newData) {
    editorPlace.value.addEventListener('mousedown', mouseDown);
  }
})

function fileUpload() {
  let promises
  tempImages.value.forEach(image => {
    promises = checkSizeMainCanvas(image);
    console.log('parent')
    Promise.all(promises)
        .then(() => {
          debugger
          let bg = new Image();
          bg.src = image.url
          bg.onload = () => {
            ctx.drawImage(bg, image.positionX - currentWidthMainCanvas.value, image.positionY - currentHeightMainCanvas.value, bg.naturalWidth / 2, bg.naturalHeight / 2);
          }
        })
  })
  clearTempImages();
}

function checkSizeMainCanvas(image) {
  const allPromises = []

  let currentXCoordinateImage = (image.positionX - currentWidthMainCanvas.value) + (image.width / 2);
  let currentYCoordinateImage = (image.positionY - currentHeightMainCanvas.value) + (image.height / 2);
  if (currentXCoordinateImage > widthCanvas.value && currentYCoordinateImage > heightCanvas.value) {
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();
    // debugger
    widthCanvas.value = widthCanvas.value + (currentXCoordinateImage - widthCanvas.value);
    heightCanvas.value = heightCanvas.value + (currentYCoordinateImage - heightCanvas.value);

    imageObject.src = url
    console.log('all')
    let promiseWidthPlus = new Promise(resolve => {
      imageObject.onload = function () {

        ctx.drawImage(imageObject, 0, 0, w, h)
        resolve(true)
      }
    })
    allPromises.push(promiseWidthPlus);
  } else if (currentXCoordinateImage > widthCanvas.value) {
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();
    debugger
    widthCanvas.value = widthCanvas.value + (currentXCoordinateImage - widthCanvas.value);
    imageObject.src = url
    console.log('width')
    let promiseWidthPlus = new Promise(resolve => {
      imageObject.onload = function () {

        ctx.drawImage(imageObject, 0, 0, w, h)
        resolve(true)
      }
    })
    allPromises.push(promiseWidthPlus);
  } else if (currentYCoordinateImage > heightCanvas.value) {
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();
    debugger
    heightCanvas.value = heightCanvas.value + (currentYCoordinateImage - heightCanvas.value);
    imageObject.src = url
    console.log('height')
    let promiseHeightPlus = new Promise(resolve => {
      imageObject.onload = function () {

        ctx.drawImage(imageObject, 0, 0, w, h)
        resolve(true);
      }
    })
    allPromises.push(promiseHeightPlus);
  }

  let findDifferenceWidth
  if (currentWidthMainCanvas.value >= 0) {
    findDifferenceWidth = image.positionX - currentWidthMainCanvas.value;
  } else {
    findDifferenceWidth = image.positionX < 0 ? currentWidthMainCanvas.value - image.positionX : currentWidthMainCanvas.value + image.positionX;
  }

  let findDifferentHeight;
  if (currentHeightMainCanvas.value >= 0) {
    findDifferentHeight = image.positionY - currentHeightMainCanvas.value;
  } else {
    findDifferentHeight = image.positionY < 0 ? currentHeightMainCanvas.value - image.positionY : currentHeightMainCanvas.value + image.positionY;
  }

  if (findDifferenceWidth < 0 && findDifferentHeight < 0) {
    currentWidthMainCanvas.value = currentWidthMainCanvas.value + findDifferenceWidth;
    currentHeightMainCanvas.value = currentHeightMainCanvas.value + findDifferentHeight;
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();


    imageObject.src = url
    console.log('all minus')
    let promiseWidthMinus = new Promise(resolve => {
      imageObject.onload = function () {
        widthCanvas.value = widthCanvas.value - findDifferenceWidth;
        heightCanvas.value = heightCanvas.value - findDifferentHeight;

        ctx.drawImage(imageObject, Math.abs(findDifferenceWidth), 0, w, h)
        resolve(true);
      }
    })
    allPromises.push(promiseWidthMinus);
  } else if (findDifferenceWidth < 0) {
    currentWidthMainCanvas.value = currentWidthMainCanvas.value + findDifferenceWidth;
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();


    imageObject.src = url
    console.log('width minus')
    let promiseWidthMinus = new Promise(resolve => {
      imageObject.onload = function () {
        widthCanvas.value = widthCanvas.value - findDifferenceWidth;
        ctx.drawImage(imageObject, Math.abs(findDifferenceWidth), 0, w, h)
        resolve(true);
      }
    })
    allPromises.push(promiseWidthMinus);
  } else if (findDifferentHeight < 0) {
    currentHeightMainCanvas.value = currentHeightMainCanvas.value + findDifferentHeight;
    let w = widthCanvas.value;
    let h = heightCanvas.value;
    let url = mainCanvas.value.toDataURL("image/jpg");
    let imageObject = new Image();


    imageObject.src = url;
    console.log('height minus')
    let promiseHeightMinus = new Promise(resolve => {
      imageObject.onload = function () {
        heightCanvas.value = heightCanvas.value - findDifferentHeight;
        ctx.drawImage(imageObject, 0, Math.abs(findDifferentHeight), w, h)
        resolve(true);
      }
    })
    allPromises.push(promiseHeightMinus);
  }


  return allPromises
}

function download() {
  let link = document.createElement('a');
  link.href = mainCanvas.value.toDataURL("image/jpg");
  link.download = "my-image.png";
  link.click();
  link.remove();
}

// function test() {
//   let bg = new Image();
//   bg.src = mainCanvas.value.toDataURL("image/jpg")
//   bg.onload = () => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width)
//     ctx.drawImage(bg, 1, 1);
//   }
// }

function mouseDown() {
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
  console.log('click')
  if (hasActiveEraser.value) {
    if (tempImages.value) {
      fileUpload();
    }
    clearBackground();
  } else if (isSelectedAllElement.value) {
    if (!event.target.parentNode.__vnode.key) {
      firstPositionX.value = event.clientX - currentWidthMainCanvas.value;
      firstPositionY.value = event.clientY - currentHeightMainCanvas.value;
    } else {
      selectNewImageId.value = event.target.parentNode.__vnode.key;
      firstPositionX.value = event.clientX;
      firstPositionY.value = event.clientY;
    }
  }
}

function mouseMove(event) {
  // ctx.arc(event.clientX, event.clientY - 70, 50, 0, 2 * Math.PI, false);
  if (hasActiveEraser.value) {
    clearBackground();
  } else if (isSelectedAllElement.value) {

    if (!event.target.parentNode.__vnode.key) {
      moveElement();
    } else {
      changePositionNewImage(
          selectNewImageId.value,
          event.clientY - firstPositionY.value,
          event.clientX - firstPositionX.value
      )
      firstPositionX.value = event.clientX;
      firstPositionY.value = event.clientY;
    }
  }
}

function mouseUp(event) {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
  firstPositionY.value = null;
  firstPositionX.value = null;
}

function clearBackground() {
  ctx.clearRect(event.clientX - currentWidthMainCanvas.value, event.clientY - currentHeightMainCanvas.value, widthEraser.value, widthEraser.value);
}

function moveElement() {
  currentWidthMainCanvas.value = event.clientX - firstPositionX.value;
  currentHeightMainCanvas.value = event.clientY - firstPositionY.value;
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

  .pre-show-generate-images {
    position: absolute;
    background-color: red;
  }

  canvas {
    position: absolute;
    border: 1px solid red;
  }
}
</style>
