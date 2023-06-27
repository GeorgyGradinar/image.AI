<template>
  <canvas ref='myCanvas' :width="widthCanvas" :height="heightCanvas" tabindex='0'
          :style="{top: currentWidth, left: currentHeight}"
  ></canvas>
</template>

<script setup>
import {computed, onMounted, ref, toRefs} from "vue";

const props = defineProps({
  image: Object,
});

const {image} = toRefs(props);

let widthCanvas = ref();
let heightCanvas = ref();
let myCanvas = ref(null);
let ctx;
let bg;

let currentWidth = computed(() => {
  return image.value.positionY ? `${image.value.positionY}px` : 0;
})
let currentHeight = computed(() => {
  return image.value.positionX ? `${image.value.positionX}px` : 0;
})

onMounted(() => {
  ctx = myCanvas.value.getContext('2d');
  bg = new Image();
  widthCanvas.value = props.image.width / 2;
  heightCanvas.value = props.image.height / 2;
  bg.src = props.image.url
  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, bg.naturalWidth / 2, bg.naturalHeight / 2);
  }
})

</script>

<style scoped lang="scss">
canvas {
  position: absolute;
  cursor: pointer;
  z-index: 1;
  border: 1px solid green !important;
}
</style>
