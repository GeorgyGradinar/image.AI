<template>
  <div class="editor" ref="editorPlace">
    <div class="pre-show-generate-images" ref="frameControls" v-show="generateImages.length">
      <img :src="useAsset(generateImages[currentIndexGeneratedImages -1 ])" alt="generated images">

      <div class="nav-block-images">
        <button @click="decreaseIndex()">{{ "<" }}</button>
        <p>{{ currentIndexGeneratedImages }}/{{ generateImages.length }}</p>
        <button @click="increaseIndex()">></button>
        <button class="cancel" @click="cleanGeneratedImages">Отмена</button>
        <button class="accept"
                @click="addGeneratedImageToCanvas(useAsset(generateImages[currentIndexGeneratedImages -1 ]))">
          Подтверждение
        </button>
      </div>
    </div>
    <div class="generation-loader" v-if="isActiveGenerationLoader">
      <MainGenerationLoader></MainGenerationLoader>
    </div>
    <canvas id="canvasTest" :width="widthCanvas" :height="heightCanvas"></canvas>
  </div>
</template>

<script setup>
import {editorStore} from "~/store/editorStore";
import requestsEditor from "~/mixins/requestsEditor";
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import {fabric} from "fabric"
import MainGenerationLoader from "~/components/editor/editor-place/MainGenerationLoader"

const editor = editorStore();
const {clearTempImages, changeCurrentZoom, callFunctionDownload, cleanGeneratedImages} = editor;
const {
  tempImages,
  hasActiveEraser,
  currentWidthEraser,
  isSelectedAllElement,
  currentZoom,
  download,
  setCenter,
  generateImages,
  isActiveGenerationLoader
} = storeToRefs(editor);
const {saveCanvas, getCanvasData} = requestsEditor();

let canvas = null;
let frame = ref();
let frameLoader = ref();
let frameRelLoader = ref();
let frameControls = ref();
let frameText = ref();
let preShow = ref(null);
let isShowGeneratedImages = ref(true);

let images = ref([]);
let selectableImages = ref([]);

let widthCanvas = ref(window.innerWidth - 350);
let heightCanvas = ref(window.innerHeight);

let currentIndexGeneratedImages = ref(1);

let generatedImageTop;
let generatedImageLeft;
let generatedImageWidth;
let generatedImageHeight;

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  return assets['/assets/images/main-page/' + path]
}

onMounted(() => {
  canvas = new fabric.Canvas('canvasTest');
  frame.value = new fabric.Object(canvas)
  canvas.freeDrawingBrush.color = "#1f2023";
  canvas.freeDrawingBrush.width = 5;
  canvas.on("path:created", handlePathCreated);

  fabric.Group.prototype._controlsVisibility = {
    ml: false,
    mt: false,
    mr: false,
    mb: false,
    mtr: false
  };


  saveByHotKey();
  loadProject();
})

watch(tempImages, () => {
  addImageToCanvas();
})

watch(setCenter, () => {
  focusFrame();
  updateMove();
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
  if (newData) {
    hideFrame();
  } else {
    showFrame();
    autoSaveCanvas();
  }
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

watch(generateImages, (newData) => {
  if (newData) {
    updateMove();
  } else {
  }
})


function loadProject() {
  let saved = getCanvasData();
  if (!saved) {
    changeViewPort();
    mouseWheel();
    addFrame();
    return
  }

  const content = JSON.parse(saved);

  // if (content && content.__state) {
  //   if (content.__state.mode) setMode(content.__state.mode)
  //   if (content.__state.model) setModel(content.__state.model)
  //   if (content.__state.editModel) setEditModel(content.__state.editModel)
  //   setState(content.__state);
  //   delete content.__state
  // }
  if (content?.objects?.length) {
    canvas.loadFromJSON(content, () => {
      console.dir(canvas);
      canvas.renderAll();
      const objects = canvas?.getObjects();
      // const fr = objects.find(o => o._type === 'frame');
      // const fl = objects.find(o => o._type === 'frame_loader');
      //
      // // init frame
      // if (fr && canvas.contains(fr)) canvas.remove(fr)
      // if (fl && canvas.contains(fl)) canvas.remove(fl)
      // addFrame()
      // if (fr) {
      //   frame.value.left = fr.left
      //   frame.value.top = fr.top
      // }
      const im = objects.filter(o => o.type === 'image');
      if (im) images.value = im

      let left;
      let right;
      let top;
      let bottom;

      for (const image of images.value) {
        let il = image.left - image.getScaledWidth() / 2
        if (left === undefined || il < left) {
          left = il
        }
        let ir = il + image.getScaledWidth()
        if (right === undefined || ir > right) {
          right = ir;
        }
        let it = image.top - image.getScaledHeight() / 2
        if (top === undefined || it < top) {
          top = it
        }
        let ib = it + image.getScaledHeight()
        if (bottom === undefined || ib > bottom) {
          bottom = ib
        }

        // load images from html element
        const imgHtml = document.createElement('img');
        imgHtml.src = image.get('src');
        imgHtml.crossOrigin = "anonymous"
        imgHtml.onload = function () {
          image.setElement(imgHtml);
        }

        // zoom to fit image
        const zoomW = canvas.width / (right - left)
        const zoomH = canvas.height / (bottom - top)
        console.log(zoomW)
        console.log(zoomH)
        changeCurrentZoom(Math.min(zoomW, zoomH) * 0.6)
        canvas.renderAll()
      }
      console.log('open add frame')
      addFrame();
      updateMove()
      changeViewPort();
      mouseWheel();
    })
  }
}

function increaseIndex() {

  if (currentIndexGeneratedImages.value < generateImages.value.length) {
    currentIndexGeneratedImages.value++;
  } else if (currentIndexGeneratedImages.value === generateImages.value.length) {
    currentIndexGeneratedImages.value = 1;
  }
}

function decreaseIndex() {
  if (currentIndexGeneratedImages.value > 1) {
    currentIndexGeneratedImages.value--;
  } else if (currentIndexGeneratedImages.value === 1) {
    currentIndexGeneratedImages.value = generateImages.value.length;
  }
}

function addFrame() {
  // if (!canvas.objects) return
  if (!frame.value) return
  console.log('test')
  frame.value = new fabric.Rect({
    _type: 'frame',
    stroke: "rgb(54, 226, 255)",
    fill: 'rgba(54, 226, 255, 0)',
    width: 512,
    height: 512,
    cornerStyle: 'rect',
    cornerStrokeColor: "rgba(54, 226, 255, 1)",
    transparentCorners: false,
    cornerColor: "rgba(54, 226, 255, 1)",
    cornerSize: 9,
    selectionBackgroundColor: 'rgba(54, 226, 255, 0.1)',
    hasRotatingPoint: false,
    borderColor: "rgba(54, 226, 255, 0.8)",
    hoverCursor: 'grab',
    moveCursor: 'grabbing',
    left: canvas.width / 2,
    top: canvas.height / 2,
    selectable: true,
    erasable: false,
    strokeWidth: 1,
    guides: {},
    originX: 'center',
    originY: 'center',
    lockScalingFlip: true,
    lockRotation: true,
    minScaleLimit: 0.5,
    strokeUniform: true,
  });

  frame.value.setControlsVisibility({
    mtr: false
  })

  frame.value.set('visible', true)

  if (frameLoader.value) {
    canvas.remove(frameLoader.value)
  }

  frameLoader.value = new fabric.Rect({
    _type: 'frame_loader',
    left: frame.value.left - frame.value.width / 2,
    top: frame.value.top + frame.value.height / 2 - 4,
    height: 4,
    width: 4,
    stroke: "rgba(255, 255, 255, 1)",
    strokeWidth: 0,
    fill: "rgba(255, 255, 255, 1)",
    selectable: false,
    eresable: false,
    cursor: 'default',
    hoverCursor: 'default',
    visible: false,
    strokeUniform: true
  });

  canvas.calcOffset()
  canvas.add(frame.value, frameLoader.value);
  canvas.sendToBack(frameLoader.value)
  canvas.setActiveObject(frame.value);

  frame.value.on("moving", updateMove)
  // frame.value.on("scaling", handleFrameScale)


  let multiply = fabric.util.multiplyTransformMatrices;
  let invert = fabric.util.invertTransform;
  frameRelLoader.value = multiply(invert(frame.value?.calcTransformMatrix()), frameLoader.value.calcTransformMatrix());

  updateMove()
  // handleFrameScale()
  updateFrameModel()
}

function updateFrameModel() {
  // update model
  // if (!canvas.objects) return
  if (!frame.value) return
  const vpt = canvas.viewportTransform;
  const isFrameVisible = frame.value.visible
  let countAlpha = 0;
  let total = 0
  const ctx = canvas.getContext();
  ctx.fillStyle = 'rgba(255, 255, 255, 0)'
  if (isFrameVisible) hideFrame()
  const w = frame.value.getScaledWidth()
  const h = frame.value.getScaledHeight()
  const pixels = ctx.getImageData(
      ((frame.value.left - w / 2) * vpt[0] + vpt[4]) * (window.devicePixelRatio || 1.0),
      ((frame.value.top - h / 2) * vpt[3] + vpt[5]) * (window.devicePixelRatio || 1.0),
      (w * vpt[0]) * (window.devicePixelRatio || 1.0),
      (h * vpt[3]) * (window.devicePixelRatio || 1.0)
  ).data;
  if (isFrameVisible) showFrame()
  for (let x = 0; x < pixels.length; x++) {
    if ((x + 1) % 4 === 0) {
      total += 1;
      if (pixels[x] === 0) {
        countAlpha += 1;
      }
    }
  }

  // if (countAlpha === total) {
  //   setMode('generate')
  // } else if (countAlpha === 0) {
  //   // do not change the mode
  // } else {
  //   setMode('outpaint')
  // }
}

function changeFrameVisibility(visible) {
  // if (!canvas.objects) return
  if (!canvas.width || !canvas.height) return
  if (frame.value && frameLoader.value) {
    canvas.setActiveObject(frame.value)
    frameLoader.value.bringToFront()
    frame.value.bringToFront()
    frame.value.set('visible', visible)

    if (!visible) {
      canvas.discardActiveObject()
    }
    canvas.renderAll()
  }
}

function showFrame() {
  changeFrameVisibility(true)
}

function hideFrame() {
  changeFrameVisibility(false)
}

function updateMove() {
  // if (!frame.value) return
  // if (!canvas || !frame.value) return

  frame.value.left = Math.round(frame.value.left)
  frame.value.top = Math.round(frame.value.top)

  const multiply = fabric.util.multiplyTransformMatrices;

  const frameMatrix = frame.value.calcTransformMatrix();
  const newTransformLoader = multiply(
      frameMatrix,
      frameRelLoader.value
  );
  const optLoader = fabric.util.qrDecompose(newTransformLoader);
  frameLoader.value.set({
    flipX: false,
    flipY: false,
  });
  frameLoader.value.setPositionByOrigin(
      {x: optLoader.translateX - 1, y: optLoader.translateY - 2},
      'left',
      'top'
  );

  frameLoader.value.set(optLoader);
  frameLoader.value.setCoords();

  // handle generation controls
  // const gc = frameControls.value;
  // if (!gc) return
  // const vpt = canvas.viewportTransform
  // const w = frame.value.width * vpt[0] * optLoader.scaleX;
  // // gc.style.width = (w < 30 ? 300 : w) + 'px'
  // console.log(vpt[3])
  // console.log(vpt[5])
  // console.log(optLoader)
  // console.log(w)
  // gc.style.top = optLoader.translateY * vpt[3] + vpt[5] - w + 70 + 'px';
  // gc.style.left = optLoader.translateX * vpt[0] + vpt[4] - (w < 300 ? (300 - w) / 2 : 0) + 'px'


  // handle generate image control
  const gc = frameControls.value;
  if (!gc) return
  const vpt = canvas.viewportTransform
  const w = frame.value.width * vpt[0] * optLoader.scaleX;
  const h = frame.value.height * vpt[3] * optLoader.scaleY;
  // gc.style.width = (w < 30 ? 300 : w) + 'px'

  gc.style.top = optLoader.translateY * vpt[3] + vpt[5] - h + 70 + 2 + 'px';
  gc.style.left = optLoader.translateX * vpt[0] + vpt[4] - (w - w) - 2 + 'px'
  gc.style.width = `${w}px`
  gc.style.height = `${h}px`

  generatedImageTop = optLoader.translateY * vpt[3] + vpt[5] - h + 70;
  generatedImageLeft = optLoader.translateX * vpt[0] + vpt[4] - (w - w);
  generatedImageWidth = w;
  generatedImageHeight = h;

  // handle generation controls
  const gc2 = frameText.value
  if (!gc2) return
  gc2.style.width = (w < 30 ? 300 : w) + 'px'
  gc2.style.top = optLoader.translateY * vpt[3] - h + 45 + vpt[5] + 'px'
  gc2.style.left = optLoader.translateX * vpt[0] + 9 + vpt[4] + 6 + 'px'

  // update eraser cursor size based on zoom
  // const cursorSize = Math.round(canvas.freeDrawingBrush.width * canvas.getZoom());
  // canvas.set({
  //   freeDrawingCursor: `url(${getBrushCursor(cursorSize)}) ${cursorSize / 2} ${cursorSize / 2}, crosshair`,
  // })

  frame.value.lastGoodTop = frame.value.top;
  frame.value.lastGoodLeft = frame.value.left;
  canvas.renderAll()
}

function focusFrame() {
  // if (!canvas.objects) return
  // addFrame();

  // const zoomW = canvas.width / frame.value.getScaledHeight()
  // const zoomH = canvas.height / frame.value.getScaledHeight()
  // const zoom = Math.min(zoomW, zoomH) * 0.6;
  changeCurrentZoom(1)
  canvas.setZoom(1)  // reset zoom so pan actions work as expected
  const vpw = canvas.width / 1
  const vph = canvas.height / 1
  const x = (frame.value.left - vpw / 2)  // x is the location where the top left of the viewport should be
  const y = (frame.value.top - vph / 2)  // y idem
  canvas.absolutePan({x: x, y: y})
  canvas.setZoom(1)
  updateMove()
  canvas.renderAll()
}

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
    autoSaveCanvas();
    canvas.renderAll();
  });

  clearTempImages();

}

function addGeneratedImageToCanvas(generateImage) {
  const multiply = fabric.util.multiplyTransformMatrices;
  const frameMatrix = frame.value.calcTransformMatrix();
  const newTransformLoader = multiply(
      frameMatrix,
      frameRelLoader.value
  );
  const vpt = canvas.viewportTransform
  const optLoader = fabric.util.qrDecompose(newTransformLoader);
  const w = frame.value.getScaledWidth();
  const h = frame.value.getScaledHeight()
  fabric.Image.fromURL(generateImage, image => {
    image.scaleToWidth(w);
    image.scaleToHeight(h);

    image.set({
      selectable: false,
      hoverCursor: 'default',
      moveCursor: 'default'
    })
    images.value.push(image);
    canvas.add(image);
    autoSaveCanvas();
    canvas.renderAll();
  }, {
    top: frame.value.top - (h / 2),
    left: frame.value.left - (w / 2),
  });

  frame.value.bringToFront();
  cleanGeneratedImages();
}

function handlePathCreated(opt) {

  if (!canvas._objects.length) return
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
      updateMove()
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
      canvas.zoomToPoint({
        x: opt.e.offsetX,
        y: opt.e.offsetY
      }, z);
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
    updateMove();
  })
}

function imageDownload() {
  hideFrame();
  const fileName = `НейроХолст.png`;
  const link = document.createElement("a");
  link.href = getDataUrl();
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showFrame();
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

function saveByHotKey() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      autoSaveCanvas();
    }
  });
}

function autoSaveCanvas() {
  let currentDataCanvas = getCanvasJSON();
  let snapShotURL = getDataUrl(true);

  if (!currentDataCanvas) {
    return
  }
  console.log('save')
  saveCanvas(currentDataCanvas);
}

function getCanvasJSON() {
  let json = canvas?.toJSON([
    'lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling',
    "hasRotatingPoint", "erasable", "hoverCursor", "_controlsVisibility", "hoverCursor", "moveCursor",
    "scaleX", "scaleY", "selectable", "evented", "borderColor", "cornerColor", "cornerSize", "cornerStrokeColor", "cornerStyle",
    "b", "stroke", "fill", "opacity", "selectionBackgroundColor", "strokeWidth", "transparentCorners", "visible", "_type",
    "_task_id", "_img_id", "lockScalingFlip", "minScaleLimit", "strokeUniform"
  ])
  console.log(json)
  // filter lines for more optimal size
  json.objects = json.objects.filter(o => o.type !== 'line');
  json.objects = json.objects.filter(o => o._type !== 'frame');
  json.objects = json.objects.filter(o => o._type !== 'frame_loader');

  // return JSON.stringify(json)
  if (json.objects.length) {
    console.log(json)
    return JSON.stringify(json);
  } else {
    return null;
  }
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

  canvas {
  }
}
</style>