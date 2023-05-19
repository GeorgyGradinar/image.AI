<template>
  <div class="images-section">
    <span class="info-message" v-if="!images?.length">У вас пока нет сгенерированных изображений, установите параметры и попробуйте создать свое первое изображение.</span>
    <div class="wrapper-images" id="images" v-if="images?.length">
      <ImageElement v-for="image in images" :key="image.id"
                    :image="image" @delete="deleteImage">
      </ImageElement>
    </div>

    <button class="secondary" v-if="imagesData.images.length" @click.prevent="getNextImages">
      <div v-if="loadingMore" class="wrapper-loader">
        <span>Загрузка...</span>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>

      <span v-else>Загрузить больше</span>
    </button>
  </div>
  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarForGeneration"
      @close="closeSnackBars">
  </DoneSnackBar>
</template>

<script setup>
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import ImageElement from "~/components/text-to-image/ImageElement";
import {onMounted, ref, watch} from "vue";
import requests from "~/mixins/requests";

const {getImages} = requests();
const store = personStore();
const {person, imagesData} = storeToRefs(store);
let isOpenSnackBarDone = ref(false);
let textSnackBarForGeneration = ref('');
let loadingMore = ref(false);
let images = ref();

onMounted(() => {
  images.value = imagesData._value.images;
})

if (person._value.id && !imagesData._value.images.length) {
  getImages();
}

watch(person, (newDataPerson) => {
  if (newDataPerson.id && !images.value?.length) {
    getImages();
  }
})

watch(imagesData, (newDataImages) => {
  images.value = newDataImages.images;
})

function getNextImages() {
  loadingMore.value = true;
  setTimeout(() => {
    loadingMore.value = false;
    getImages();
    textSnackBarForGeneration.value = "Изображения загружены";
    isOpenSnackBarDone.value = true;
  }, 2000);
}

function deleteImage() {
  textSnackBarForGeneration.value = "Изображение удалено";
  isOpenSnackBarDone.value = true;
}

function closeSnackBars() {
  isOpenSnackBarDone.value = false;
}
</script>

<style scoped lang="scss">

.info-message {
  max-width: 900px;
  color: var(--main-light-color);
  font-size: 20px;
  text-align: center;
  opacity: 0.4;
  padding-top: 100px;
}

.images-section {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: center;
  gap: 60px;
  width: calc(100vw - 356px);
  height: 100vh;
  scrollbar-gutter: stable;
  padding: 70px 0 30px 15px;
  overflow: auto;

  .secondary {
    height: 100%;
    min-width: 200px;
    max-height: 40px;
  }
}

.wrapper-images {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;
}

.wrapper-loader {
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 30px;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--light-blue);;
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
  }

  @keyframes rotate4 {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash4 {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dashoffset: -125px;
    }
  }
}


@media screen and (max-width: 650px) {
  .images-section {
    overflow: unset;
    height: auto;
    width: 100%;
    padding: 30px 10px;
  }

  .info-message {
    padding-top: 60px;
    font-size: 16px;
  }
}
</style>
