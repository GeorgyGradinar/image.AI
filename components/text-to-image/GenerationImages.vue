<template>
  <div class="images-section">
    <span class="info-message" v-if="!images?.length && !isActiveLoader">У вас пока нет сгенерированных изображений, установите параметры и попробуйте создать свое первое изображение.</span>
    <div class="wrapper-images" id="images" v-show="images?.length">
      <ImageElement v-for="image in images" :key="image.id"
                    :image="image" @delete="deleteImage">
      </ImageElement>
    </div>
    <div class="wrapper-loader" v-if="isActiveLoader">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
    </div>

    <button class="secondary" v-if="images?.length" @click.prevent="getNextImages">
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
let images = ref(null);
let isActiveLoader = ref(true);

onMounted(() => {
  if (person._value.id) {
    if (!imagesData._value.images.length){
      setTimeout(() => {
        getImages();
        isActiveLoader.value = false;
      }, 2000)
    }else {
      setTimeout(() => {
        isActiveLoader.value = false;
        images.value = imagesData._value.images;
      })
    }
  }else {
    isActiveLoader.value = false;
  }
})


watch(person, (newDataPerson) => {
  if (newDataPerson.id && !images.value?.length) {
    getImages();
  }
})

watch(imagesData, (newDataImages) => {
  console.log('sdf')
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
  height: 100%;
  //min-height: calc(100vh - 70px);
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

//loader
.wrapper-loader {
  height: 100vh;

  .loader {
    width: 200px;
    height: 60px;
    position: relative;
    z-index: 1;
  }

  .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    left: 15%;
    transform-origin: 50%;
    animation: circle7124 .5s alternate infinite ease;
  }

  @keyframes circle7124 {
    0% {
      top: 60px;
      height: 5px;
      border-radius: 50px 50px 25px 25px;
      transform: scaleX(1.7);
    }

    40% {
      height: 20px;
      border-radius: 50%;
      transform: scaleX(1);
    }

    100% {
      top: 0;
    }
  }

  .circle:nth-child(2) {
    left: 45%;
    animation-delay: .2s;
  }

  .circle:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
  }

  .shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 62px;
    transform-origin: 50%;
    z-index: -1;
    left: 15%;
    filter: blur(1px);
    animation: shadow046 .5s alternate infinite ease;
  }

  @keyframes shadow046 {
    0% {
      transform: scaleX(1.5);
    }

    40% {
      transform: scaleX(1);
      opacity: .7;
    }

    100% {
      transform: scaleX(.2);
      opacity: .4;
    }
  }

  .shadow:nth-child(4) {
    left: 45%;
    animation-delay: .2s
  }

  .shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: .3s;
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
