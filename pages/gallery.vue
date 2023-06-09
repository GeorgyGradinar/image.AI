<template>
  <div class="wrapper-gallery">
    <div class="wrapper-search">
      <v-select
          class="drop-down"
          v-model="topical"
          :items="['Сначала новые', 'Сначала старые']"
          variant="outlined"
          persistent-hint
          label="Поиск"
          :class="'rounded-lg'"
          @update:modelValue="changeFilters()"
      ></v-select>
      <!--      <v-text-field-->
      <!--          v-model.trim="search"-->
      <!--          density="compact"-->
      <!--          variant="solo"-->
      <!--          label="Поиск"-->
      <!--          append-inner-icon="mdi-magnify"-->
      <!--          single-line-->
      <!--          hide-details-->
      <!--      ></v-text-field>-->
    </div>
    <div class="main-block">
      <NavigationBlock @changeFilters="changeFilters"></NavigationBlock>
      <div class="wrapper-images" v-if="images?.length">
        <ImageElement v-for="image in images" :key="image.id" :image="image"></ImageElement>
      </div>
      <div class="wrapper-loader" v-show="isShowMainLoader">
        <div class="loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      </div>

      <span class="info-message" v-if="!images?.length && !isShowMainLoader">
            {{ textForAlert }}
      </span>

    </div>
    <div class="wrapper-button-more-images">
      <button class="secondary wrapper-loader" v-if="images.length && isShowButtonMoreImages && inProgressMoreImages">
        <span>Загрузка...</span>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </button>
      <button class="secondary" v-if="images.length && isShowButtonMoreImages && !inProgressMoreImages"
              @click.prevent="getGallery">
        <span>Загрузить больше</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import ImageElement from "~/components/gallery/ImageElement";
import NavigationBlock from "~/components/gallery/NavigationBlock";
import {personStore} from "~/store/personStore";
import {imagesStore} from "~/store/imageStore";
import requests from "~/mixins/requests";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {navigateTo, useRouter} from "nuxt/app";
import {modelsStore} from "~/store/models";
import seo from "~/mixins/seo";
import {metaGallery, meta, link, scripts} from "~/seoConfig";

// definePageMeta({
//   middleware: "auth"
// })

const {setProperty} = seo();
setProperty(metaGallery.title, [...meta, ...metaGallery.meta], link, scripts);

const {getPersonGallery, getSortImages} = requests();
const store = personStore();
const {getImages} = requests();
const {person} = storeToRefs(store);
const imageStore = imagesStore();
const {
  images,
  isShowMainLoader,
  inProgressMoreImages,
  isShowButtonMoreImages,
  getImagePages,
  totalImages
} = storeToRefs(imageStore);
const {toggleShowButtonMoreImages, clearImageStore} = imageStore;
const router = useRouter();
const models = modelsStore();
const {isOpenAcceptDialog} = storeToRefs(models);

let imagesData = ref([]);
let currentPage = ref('generated');
let search = ref('');
let topical = ref('Сначала новые');
let debounceTimeout = ref(null);
let textForAlert = ref('У вас пока нет сгенерированных изображений');

let imagesBlock
onMounted(() => {
  if (!person._value.id){
    navigateTo('/');
  }

  clearImageStore();
  if (person._value.id && !isOpenAcceptDialog.value) {
    if (!images.value.length) {
      getGallery()
    } else {
      imagesData.value = images.value;
    }
  }
})

watch(person, (newDataPerson) => {
  if (newDataPerson.id && !images.value.length && !models.isOpenAcceptDialog) {
    getGallery()
  }
})

watch(search, (newData) => {
  if (images.value) {
    debounceSearch(newData)
  }
})

watch(totalImages, (newData) => {
  if (newData > images.value.length) {
    toggleShowButtonMoreImages(true);
  } else {
    toggleShowButtonMoreImages(false);
  }
})

let timeout;
function getGallery() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    getPersonGallery();
  }, 500);
}

function debounceSearch() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    searchImage(search.value)
  }, 500);
}

function searchImage(data) {
  let filtered;
  if (data) {
    filtered = images?.value.filter(image => {
      if (image.filters.description.includes(data) || image.filters.exception.includes(data)) {
        return image;
      }
    })
  } else {
    filtered = imagesData._value.images;
  }

  images.value = filtered;
  textForAlert.value = !images?.value.length ? "Изображение не найдено" : textForAlert.value;
}

function changeFilters(setting) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
  let sortParameter = topical.value === 'Сначала новые' ? 'desc' : 'asc';
  currentPage.value = setting ? setting : currentPage.value;
  if (currentPage.value === 'generated') {
    getSortImages(sortParameter);
    textForAlert.value = 'У вас нет сгенерированных изображений';
  } else if (currentPage.value === 'like') {
    getSortImages(sortParameter, 1);
    textForAlert.value = 'У вас нет избранных изображений';
  }
}

onUnmounted(() => {
  removeEventListener('scroll', imagesBlock);
  clearTimeout(timeout);
  clearImageStore();
})
</script>

<style lang="scss">
.wrapper-gallery {
  height: 100%;
  min-height: 100vh;
  padding: 70px 0 10px;
  background-color: var(--main-backgground-color);

  .wrapper-search {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px 30px;

    .v-input {
      flex: unset;
    }

    .v-input__control {
      display: flex;
      justify-content: flex-end;

      .v-field--variant-solo, .v-field--variant-solo-filled {
        width: 400px;
        background: var(--main-backgground-color);
        color: var(--light-blue);
      }

      .v-field {
        border-radius: 10px;
        border: 1px solid var(--light-blue);
      }
    }

    .v-field--variant-outlined .v-field__outline {
      display: none;
    }

    .v-select .v-field.v-field {
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      min-width: 240px;
      padding-inline-end: 5px;
      color: var(--light-blue);

      .v-field__overlay {
        display: none;
      }

      .v-field__append-inner {
        padding-top: 0;
      }

      .v-field__input {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
  }

  .main-block {
    height: 100%;
    min-height: calc(100vh - 140px);
    display: flex;
    overflow: hidden;

    .info-message {
      width: 100%;
      color: var(--main-light-color);
      font-size: 20px;
      text-align: center;
      opacity: 0.4;
      padding-top: 100px;
    }

    .wrapper-images {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 5px;
      padding: 0 30px 30px 30px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 100%;

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

    .wrapper-text {
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 100%;
      color: var(--main-light-color);
      padding-top: 100px;

      p {
        text-align: center;
      }
    }
  }

  .wrapper-button-more-images {
    display: flex;
    justify-content: center;
    width: calc(100vw - 300px);
    margin: 0 0 20px 300px;

    .secondary {
      height: 100%;
      min-width: 200px;
      max-height: 40px;
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
  }
}

.mdi-magnify::before {
  content: "\F0349";
  color: var(--light-blue);
}

.v-menu > .v-overlay__content > .v-list {
  background-color: var(--main-backgground-color);
  backdrop-filter: blur(5px);
  color: var(--light-blue) !important;
  border-radius: 10px;

  .v-list-item-title {
    font-size: 13px;
  }
}

@media screen and (max-width: 650px) {
  .wrapper-gallery {
    .main-block {
      .wrapper-images {
        padding: 0 20px 30px 0;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;

    .wrapper-search {
      width: 90%;
      height: unset;

      justify-content: center;
      gap: 0;
      flex-direction: column;
    }

    .main-block {
      width: 100%;
      flex-direction: column;

      .wrapper-images {
        padding: 0 20px 30px 20px;
      }

      .wrapper-loader {
        min-height: 200px;
      }
    }
  }
}

</style>
