<template>
  <div class="editor" ref="editorPlace">
    <div class="pre-show-generate-images" ref="frameControls" v-show="generateImages.length">
      <img :src="useAsset(generateImages[currentIndexGeneratedImages -1 ])" alt="generated images">

      <div class="nav-block-images">
        <button @click="getPrevGeneratedImageIndex()">{{ "<" }}</button>
        <p>{{ currentIndexGeneratedImages }}/{{ generateImages.length }}</p>
        <button @click="getNextGeneratedImageIndex()">></button>
        <button class="cancel" @click="cleanGeneratedImages">Отменить</button>
        <button class="accept"
                @click="addGeneratedImageToCanvas(useAsset(generateImages[currentIndexGeneratedImages -1 ]))">
          Подтвердить
        </button>
      </div>
    </div>
    <div class="generation-loader" v-if="isActiveGenerationLoader">
      <MainGenerationLoader></MainGenerationLoader>
    </div>
    <canvas id="canvas" :width="widthCanvas" :height="heightCanvas"></canvas>
  </div>
</template>

<script setup>
import MainGenerationLoader from "~/components/editor/MainGenerationLoader"
import {editorStore} from "~/store/editorStore";
import requestsEditor from "~/mixins/requestsEditor";
import mixinEditor from "~/mixins/editor/editorMixin"
import {storeToRefs} from "pinia";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {fabric} from "fabric"
import {HEIGHT_HEADER, WIDTH_BLOCK_FILTERS} from "~/configuration/configEditor";

const {
  getDrawCursor,
  setParameterToCanvas,
  loadJsonProject,
  setParametersToFrame,
  showFrame,
  hideFrame,
  addImageToCanvas,
  autoSaveCanvas,
  getCanvasJSON,
  changeZoom,
  handleClickDown,
  handleClickUp,
  downloadImage,
  handleHasSelectionAllElements,
  handleMouseWheel,
  setCurrentWidthEraser
} = mixinEditor();

const editor = editorStore();
const {changeCurrentZoom, cleanGeneratedImages} = editor;
const {
  uploadedImage,
  hasActiveEraser,
  currentWidthEraser,
  isSelectedAllElement,
  currentZoom,
  download,
  setCenter,
  generateImages,
  isActiveGenerationLoader,
  callUndo,
  callRedo,
  history,
  images
} = storeToRefs(editor);
const {getCanvasData} = requestsEditor();

let canvas = null;
let frame = ref();
let frameRelLoader = ref();
let frameControls = ref();
// let images = ref([]);

let widthCanvas = ref(window.innerWidth - WIDTH_BLOCK_FILTERS);
let heightCanvas = ref(window.innerHeight);

let currentIndexGeneratedImages = ref(1);

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  });
  return assets['/assets/images/main-page/' + path];
}

const widthEraser = computed(() => Math.round(currentWidthEraser.value * currentZoom.value));

onMounted(() => {
  canvas = new fabric.Canvas('canvas', {
    freeDrawingCursor: `url(${getDrawCursor()}) ${currentWidthEraser.value / 2} ${currentWidthEraser.value / 2}, crosshair`,
  });
  frame.value = new fabric.Object(canvas);
  setParameterToCanvas(canvas);
  saveByHotKey();
  loadProject();
  autoSaveCanvas(canvas);
})

watch(uploadedImage, () => {
  addImageToCanvas(canvas);
})

watch(setCenter, () => {
  focusFrame();
  updateMove(); // check for delete
})

watch(isSelectedAllElement, (isSelected) => {
  handleHasSelectionAllElements(isSelected, canvas);
});

watch(hasActiveEraser, (newData) => {
  canvas.isDrawingMode = newData;
  if (newData) {
    hideFrame(canvas, frame.value);
  } else {
    showFrame(canvas, frame.value);
  }
});

watch(currentWidthEraser, (newData) => {
  setCurrentWidthEraser(canvas, widthEraser.value);
  canvas.freeDrawingBrush.width = newData;
});

watch(currentZoom, (newData) => {
  changeZoom(newData, canvas);
  setCurrentWidthEraser(canvas, widthEraser.value);
});

watch(download, () => {
  downloadImage(canvas, frame.value);
})

watch(generateImages, (newData) => {
  if (newData) {
    updateMove();
  }
})

watch(callUndo, () => {
  undo();
})

watch(callRedo, () => {
  redo();
})

function undo() {
  if (history.value.undo.length === 0) return;

  history.value.undo.pop();
  const last = history.value.undo.pop();
  if (last) {
    if (history.value.redo.length === 100) {
      history.value.redo.shift();
    }
    history.value.redo.push(getCanvasJSON(canvas));

    canvas?.discardActiveObject();
    canvas?.loadFromJSON(JSON.parse(last), () => {
      loadJsonProject(canvas, JSON.parse(last));

      updateMove();
      canvas?.renderAll();
      addFrame();
    })
  }
}

function redo() {
  if (history.value.redo.length === 0) return;

  const last = JSON.parse(history.value.redo.pop());

  if (last) {
    history.value.undo.push(getCanvasJSON(canvas));

    canvas?.discardActiveObject();
    canvas?.loadFromJSON(last, () => {
      loadJsonProject(canvas, last);
      updateMove();
      canvas?.renderAll();
      addFrame();
    })
  }
}

function loadProject() {
  let saved = getCanvasData();
  if (!saved) {
    addListeners();
    addFrame();
    return;
  }

  const content = JSON.parse(saved);
  if (content?.objects?.length) {
    canvas.loadFromJSON(content, () => {
      loadJsonProject(canvas, content);
      addFrame();
      updateMove();
      addListeners()
    });
  }
}

function getNextGeneratedImageIndex() {
  if (currentIndexGeneratedImages.value < generateImages.value.length) {
    currentIndexGeneratedImages.value++;
  } else if (currentIndexGeneratedImages.value === generateImages.value.length) {
    currentIndexGeneratedImages.value = 1;
  }
}

function getPrevGeneratedImageIndex() {
  if (currentIndexGeneratedImages.value > 1) {
    currentIndexGeneratedImages.value--;
  } else if (currentIndexGeneratedImages.value === 1) {
    currentIndexGeneratedImages.value = generateImages.value.length;
  }
}

function addFrame() {
  frame.value = setParametersToFrame(canvas);
  updateCanvas();
}

function updateCanvas() {
  canvas.calcOffset();
  canvas.add(frame.value);
  canvas.setActiveObject(frame.value);

  frame.value.on("moving", updateMove);

  const multiply = fabric.util.multiplyTransformMatrices;
  const invert = fabric.util.invertTransform;
  frameRelLoader.value = multiply(invert(frame.value?.calcTransformMatrix()), frame.value.calcTransformMatrix());
  updateMove();
}

function updateMove() {
  const multiply = fabric.util.multiplyTransformMatrices;
  const frameMatrix = frame.value.calcTransformMatrix();
  const newTransformLoader = multiply(
      frameMatrix,
      frameRelLoader.value
  );
  if (!generateImages.value.length) return;
  const optLoader = fabric.util.qrDecompose(newTransformLoader);

  // handle generate image control
  const fc = frameControls.value;
  if (!fc) return;
  const vpt = canvas.viewportTransform;
  const width = frame.value.width * vpt[0] * optLoader.scaleX;
  const height = frame.value.height * vpt[3] * optLoader.scaleY;

  fc.style.top = optLoader.translateY * vpt[3] + vpt[5] - (height / 2) + HEIGHT_HEADER + 'px';
  fc.style.left = optLoader.translateX * vpt[0] + vpt[4] - (width / 2) + 'px';
  fc.style.width = `${width}px`;
  fc.style.height = `${height}px`;
  canvas.renderAll();
}

function focusFrame() {
  let oneHundredPercent = 1;
  changeCurrentZoom(oneHundredPercent);
  canvas.setZoom(oneHundredPercent); // reset zoom so pan actions work as expected
  const viewportWidth = canvas.width / oneHundredPercent;
  const viewportHeight = canvas.height / oneHundredPercent;
  const x = (frame.value.left - viewportWidth / 2);  // x is the location where the top left of the viewport should be
  const y = (frame.value.top - viewportHeight / 2);  // y idem
  canvas.absolutePan({x: x, y: y});
  canvas.setZoom(oneHundredPercent);
  updateMove();
  canvas.renderAll();
}

function addGeneratedImageToCanvas(generateImage) {
  addImageToCanvas(canvas, generateImage, frame.value);
  currentIndexGeneratedImages.value = 1;
}

function addListeners() {
  document.addEventListener('mousedown', clickDownMouse);

  canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
      let e = opt.e;
      let viewportTransform = this.viewportTransform;
      viewportTransform[4] += e.clientX - this.lastPosX;
      viewportTransform[5] += e.clientY - this.lastPosY;
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
      updateMove();
    }
  });

  canvas.on("mouse:wheel", function (event) {
    handleMouseWheel(event, canvas);
    updateMove();
  })

  document.addEventListener('mouseup', clickUpMouse);
}

function clickDownMouse(event) {
  canvas.defaultCursor = `url(${useAsset('grabbing.svg')})10 10, grabbing`;
  canvas.renderAll();
  handleClickDown(event, canvas);
}

function clickUpMouse(event) {
  canvas.defaultCursor = `url(${useAsset('hand.svg')})10 10, grabbing`
  canvas.renderAll();
  handleClickUp(event, canvas);
  autoSaveCanvas(canvas);
}

function saveByHotKey() {
  document.addEventListener('keydown', handleKeyDownEvent);
}

function handleKeyDownEvent(event) {
  if (event.ctrlKey && event.key.toLowerCase() === 's') {
    event.preventDefault();
    autoSaveCanvas(canvas);
  } else if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
    autoSaveCanvas(canvas);
    redo();
  } else if (event.ctrlKey && event.key.toLowerCase() === 'z') {
    autoSaveCanvas(canvas);
    undo();
  }
}

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDownEvent);
  document.removeEventListener('mousedown', clickDownMouse);
  document.removeEventListener('mouseup', clickUpMouse);
  autoSaveCanvas(canvas);
})
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
    display: flex;
    justify-content: center;
    z-index: 10;

    img {
      width: 100%;
      height: 100%;
    }

    .nav-block-images {
      position: absolute;
      display: flex;
      justify-content: space-between;
      width: 380px;
      height: 30px;
      align-items: center;
      background-color: var(--light-blue);
      bottom: -40px;
      border-radius: 10px;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: 0.3s;

        &:hover {
          background-color: #00839AFF;
        }

        &:first-child:hover {
          border-radius: 10px 0 0 10px;
        }

        &:last-child:hover {
          border-radius: 0 10px 10px 0;
        }
      }

      p {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .cancel,
      .accept {
        padding: 0 10px;
      }
    }
  }

  .generation-loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(36, 36, 36, 0.5);
    z-index: 1000;
  }
}
</style>
