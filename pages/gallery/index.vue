<template>
  <div class="wrapper-gallery">
    <div class="wrapper-search">
      <v-select
          class="drop-down"
          v-model="topical"
          :items="['Сначала новые', 'Сначала старые']"
          variant="outlined"
          return-object
          persistent-hint
          :class="'rounded-lg'"
      ></v-select>
      <v-text-field
          v-model="search"
          density="compact"
          variant="solo"
          label="Поиск"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
      ></v-text-field>
    </div>
    <div class="main-block">
      <NavigationBlock @changeFilters="changeFilters"></NavigationBlock>
      <div class="wrapper-images" v-if="images?.length && !isActiveLoader">
        <ImageElement v-for="image in images" :key="image.id"
                      :image="image" @delete="deleteImage">
        </ImageElement>
      </div>
      <div class="wrapper-loader" v-show="isActiveLoader">
        <div class="loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      </div>
      <div class="wrapper-text" v-if="!images?.length && !isActiveLoader">
        <p> {{ textForAlert }} </p>
      </div>
    </div>
  </div>
  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarForGeneration"
      @close="closeSnackBars">
  </DoneSnackBar>
</template>

<script setup>
import ImageElement from "~/components/gallery/ImageElement";
import NavigationBlock from "../../components/gallery/NavigationBlock";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";
import requests from "~/mixins/requests";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "nuxt/app";

const store = personStore();
const {getImages} = requests();
const {person, imagesData} = storeToRefs(store);
const router = useRouter();

let images = ref(null);
let textSnackBarForGeneration = ref('');
let isOpenSnackBarDone = ref(false);
let currentPage = ref('generated');
let search = ref('');
let topical = ref('Сначала новые');
let isActiveLoader = ref(true);
let textForAlert = ref('');
let debounceTimeout = ref(null);

onMounted(() => {
  if (person._value.id && !imagesData._value.images.length) {
    setTimeout(() => {
      getImages();
      turnOffLoader();
    }, 2000)
  } else if (!person._value.id) {
    router.push('/');
    turnOffLoader();
  } else {
    turnOffLoader();
  }

  setTimeout(() => {
    images.value = imagesData._value.images;
  })
})

watch(person, (newDataPerson) => {
  if (newDataPerson.id && !images.value?.length) {
    getImages();
  } else if (!newDataPerson.id) {
    router.push('/');
  }
})

watch(imagesData, (newDataImages) => {
  images.value = newDataImages.images;
})

watch(search, (newData) => {
  if (images.value) {
    debounceSearch(newData)
  }
})

function debounceSearch(data) {
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

function turnOffLoader() {
  isActiveLoader.value = false;
}

function closeSnackBars() {
  isOpenSnackBarDone.value = false;
}

function changeFilters(setting) {

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

  currentPage.value = setting;
  if (currentPage.value === 'generated') {
    images.value = imagesData._value.images;
    textForAlert.value = 'У вас нет сгенерированных изображений';
  } else if (currentPage.value === 'edit') {
    images.value = [];
    textForAlert.value = 'У вас нет отредактированных изображений';
  } else if (currentPage.value === 'improve') {
    images.value = [];
    textForAlert.value = 'У вас нет улучшеных изображений';
  } else if (currentPage.value === 'like') {
    images.value = imagesData._value.images.filter(image => image.like);
    textForAlert.value = 'У вас нет избранных изображений';
  }
}

function deleteImage() {
  textSnackBarForGeneration.value = "Изображение удалено";
  isOpenSnackBarDone.value = true;
}
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
      min-width: 200px;
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

    .wrapper-images {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 5px;
      padding: 0 30px 30px 30px;
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
          top: 0%;
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
