<template>
  <div class="photo-grid">
    <div class="photo-wrapper" v-if="image.img">
      <img class="main-image" :src="useAsset(image.img)"
           alt="image example" @click.prevent="openImageDetails(image)">
      <div class="wrapper-reuse" @click="reuseFilterParameters">
        <img src="~/assets/images/text-to-image/block-images/refresh.svg" alt="cover">
        <v-tooltip activator="parent" location="bottom">Переиспользовать параметры</v-tooltip>
      </div>
      <div class="wrapper-add-image" @click="reuseImage">
        <img src="~/assets/images/text-to-image/block-images/add-image.svg" alt="">
        <v-tooltip activator="parent" location="bottom">Переиспользовать изображение</v-tooltip>
      </div>
      <div class="wrapper-arrows">
        <img src="~/assets/images/text-to-image/block-images/duble-arrows.svg" alt="">
        <v-tooltip activator="parent" location="bottom">Повысить разрешение</v-tooltip>
      </div>
      <div class="wrapper-smile">
        <img src="~/assets/images/text-to-image/block-images/smile.svg" alt="smile">
        <v-tooltip activator="parent" location="bottom">Изменение лица</v-tooltip>
      </div>
      <div class="wrapper-bin" @click="deleteImg(image.id)">
        <svg viewBox="0 0 24 24" fill="none">
          <path
              d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <v-tooltip activator="parent" location="bottom">Удалить</v-tooltip>
      </div>
      <div class="wrapper-like" @click="toggleLike(image.id)">
        <svg class="like" :class="{'like-active': image.like}"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <v-tooltip activator="parent" location="bottom">Добавить в избранное</v-tooltip>
      </div>
    </div>

    <div v-if="!image.img" class="loader-block">
      <div class="wrapper-text">
        <p class="seconds">
          <span v-if="minute">{{ minute }}.</span>
          <span>{{ second }}.</span>
          <span>{{ ms }}s</span>
        </p>
        <p class="text-generation">Генерация...</p>
      </div>
      <div class="spinner">
        <div class="spinner1"></div>
      </div>
    </div>
  </div>

  <ImageDetails v-if="imageDetailsDialog"
                :image-src="currentImage"
                @close="closeDetailImage">
  </ImageDetails>
  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarForGeneration"
      @close="closeSnackBars">
  </DoneSnackBar>
</template>

<script setup>
import ImageDetails from "~/components/dialogs/ImageDetails";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import {personStore} from "~/store/personStore";
import {defineEmits, onMounted, ref, toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  image: {},
});

const {image} = toRefs(props);
const store = personStore();
const {toggleFavorite, deleteImage, reuseParameters, changeFilters} = store;
const emit = defineEmits(['delete']);
let imageDetailsDialog = ref(false);
let currentImage = ref('');
let isOpenSnackBarDone = ref(false);
let textSnackBarForGeneration = ref('');


function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/images/main-page/' + path]
}

function toggleLike(id) {
  toggleFavorite(id);
  if (image._object.image.like) {
    textSnackBarForGeneration.value = "Добавлено в избранные";
    isOpenSnackBarDone.value = true;
  } else {
    textSnackBarForGeneration.value = "Удалено из избранного";
    isOpenSnackBarDone.value = true;
  }

}

function deleteImg(id) {
  emit('delete');
  deleteImage(id);
}

function openImageDetails(image) {
  imageDetailsDialog.value = true;
  currentImage.value = image;
}

function closeSnackBars() {
  isOpenSnackBarDone.value = false;
}

function reuseFilterParameters() {
  let changeFilters = {
    description: image._object.image.filters.description,
    exception: image._object.image.filters.exception,
    size: {
      width: image._object.image.filters.size.width,
      height: image._object.image.filters.size.height
    },
    parameters: {
      countImages: image._object.image.filters.parameters.countImages,
      step: image._object.image.filters.parameters.step,
      navigation: image._object.image.filters.parameters.navigation,
      seed: image._object.image.filters.parameters.seed
    },
  }
  reuseParameters(changeFilters);
  openSnackBar("Параметры установлены");
}

function reuseImage() {
  changeFilters('image', {name: 'fsd', url: require(`@/assets/main-page/${image._object.image.img}`)});
  openSnackBar("Изображение установлено");
}

function closeDetailImage(text) {
  imageDetailsDialog.value = false;
  if (text) {
    openSnackBar(text);
  }
}

function openSnackBar(text) {
  textSnackBarForGeneration.value = text;
  isOpenSnackBarDone.value = true;
}

//timer
let timer = 0;
let timerInterval;
let ms = ref(0);
let second = ref(0);
let minute = ref(0);

onMounted(() => {
  startTimer();
})


function startTimer() {
  stopTimer();
  timerInterval = setInterval(function () {
    timer += 1 / 60;
    ms.value = Math.floor((timer - Math.floor(timer)) * 10);
    second.value = Math.floor(timer) - Math.floor(timer / 60) * 60;
    minute.value = Math.floor(timer / 60);
  }, 1000 / 60);
}

function stopTimer() {
  clearInterval(timerInterval);
}

</script>

<style scoped lang="scss">

.photo-grid {
  position: relative;
  display: flex;
  width: calc(13% + 20px);
  height: 300px;

  .photo-wrapper {
    width: 100%;
    cursor: pointer;
  }

  .main-image,
  .loader-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
  }

  .wrapper-like,
  .wrapper-bin,
  .wrapper-reuse,
  .wrapper-smile,
  .wrapper-add-image,
  .wrapper-arrows {
    position: absolute;
    display: flex;
    opacity: 0;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(31, 32, 35, 0.6);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    cursor: pointer;

    &:hover {
      background-color: rgba(31, 32, 35, 0.7);
    }
  }

  .wrapper-reuse {
    top: 20px;
    left: 20px;
  }

  .wrapper-add-image {
    top: 20px;
    left: 60px;
  }

  .wrapper-arrows {
    top: 20px;
    right: 60px;
    transform: rotate(-90deg);
  }

  .wrapper-smile {
    top: 20px;
    right: 20px;
  }

  .wrapper-bin {
    bottom: 20px;
    left: 20px;

    svg {
      width: 14px;

      path {
        stroke: #FD4D4DFF;
      }
    }
  }

  .wrapper-like {
    bottom: 20px;
    right: 20px;

    .like {
      width: 14px;
      stroke: var(--light-blue);
      fill: none;
    }

    .like-active {
      stroke: #FD4D4DFF;
      fill: #FD4D4DFF;
    }
  }

  &:hover {
    .wrapper-like,
    .wrapper-bin,
    .wrapper-reuse,
    .wrapper-smile,
    .wrapper-add-image,
    .wrapper-arrows {
      opacity: 1;
    }
  }

  .loader-block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2b2be5;

    .wrapper-text {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1000;
      gap: 5px;
    }

    .seconds,
    .text-generation {
      color: var(--main-light-color);
      font-size: 10px;

      span {
      }
    }

    .text-generation {
      top: 50%;
      animation: pulse 1.3s ease-in-out infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.06);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.8;
      }


    }

    .spinner {
      background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
      width: 120px;
      height: 120px;
      animation: spinning82341 0.7s linear infinite;
      text-align: center;
      border-radius: 60px;
      box-shadow: 0px -5px 20px 5px rgb(186, 66, 255), 0px 5px 20px -5px rgb(0, 225, 255);

      .spinner1 {
        background-color: rgb(36, 36, 36);
        width: 120px;
        height: 120px;
        border-radius: 60px;
      }
    }

    @keyframes spinning82341 {
      to {
        transform: rotate(360deg);
      }
    }
  }
}

@media screen and (max-width: 2250px) {
  .photo-grid {
    width: calc(15% + 25px);
  }
}

@media screen and (max-width: 2130px) {
  .photo-grid {
    width: calc(17% - 12px);
  }
}

@media screen and (max-width: 1920px) {
  .photo-grid {
    width: calc(17% - 10px);
    height: 300px;
  }
}

@media screen and (max-width: 1700px) {
  .photo-grid {
    width: calc(20% - 5px);
    height: 300px;
  }
}

@media screen and (max-width: 1500px) {
  .photo-grid {
    width: calc(25% - 4px);
  }
}

@media screen and (max-width: 1300px) {
  .photo-grid {
    width: calc(33% - 4px);

    & {
      .wrapper-like,
      .wrapper-bin,
      .wrapper-reuse,
      .wrapper-smile,
      .wrapper-add-image,
      .wrapper-arrows {
        opacity: 1;
      }
    }
  }

}

@media screen and (max-width: 1100px) {
  .photo-grid {
    width: calc(50% - 4px);
  }
}

@media screen and (max-width: 900px) {
  .photo-grid {
    width: calc(100% - 4px);
  }
}

</style>
