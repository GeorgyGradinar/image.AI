<template>
  <div class="wrapper-gallery">
    <div class="wrapper-search">
      <v-select
          v-model="topical"
          :items="['Новые', 'Старые']"
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
      <div class="wrapper-images">
        <ImageElement v-for="image in images" :key="image.id"
                      :image="image" @delete="deleteImage">
        </ImageElement>
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

const store = personStore();
const {getImages} = requests();
const {person, imagesData} = storeToRefs(store);
import {onMounted, ref, watch} from "vue";

let images = ref([]);
let textSnackBarForGeneration = ref('');
let isOpenSnackBarDone = ref(false);
let currentPage = ref('generated');
let search = ref('');
let topical = ref('Новые');

function closeSnackBars() {
  isOpenSnackBarDone.value = false;
}

onMounted(() => {
  if (person._value.id && !imagesData._value.images.length) {
    setTimeout(() => {
      getImages();
    }, 2000)
  }

  setTimeout(() => {
    images.value = imagesData._value.images;
  })
})

watch(imagesData, (newDataImages) => {
  images.value = newDataImages.images;
})

function changeFilters(setting) {
  currentPage.value = setting;
  if (currentPage.value === 'generated') {
    images.value = imagesData._value.images;
  } else if (currentPage.value === 'edit') {
    images.value = [];
  } else if (currentPage.value === 'improve') {
    images.value = [];
  } else if (currentPage.value === 'like') {
    images.value = imagesData._value.images.filter(image => image.like);
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
    //border-bottom: 1px solid rgba(255, 255, 225, 0.4);
    border-top: 1px solid rgba(255, 255, 225, 0.4);

    .v-input {
      flex: unset;
    }

    .v-input__control,
    .v-input--density-compact {
      display: flex;
      justify-content: flex-end;
      width: 400px;
      color: var(--main-light-color);

      .v-field--variant-solo, .v-field--variant-solo-filled {
        background: var(--main-backgground-color);
        color: var(--main-light-color);
      }

      .v-field {
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 225, 0.4);
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
      max-width: 200px;

      .v-field__overlay {
        display: none;
      }


      .v-field__append-inner {
        padding-top: 0;
        height: 20px;
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
  }
}

.mdi-magnify::before {
  content: "\F0349";
  color: var(--light-blue);
}

.v-menu > .v-overlay__content > .v-list {
  background-color: var(--main-backgground-color);
  backdrop-filter: blur(5px);
  color: var(--main-light-color);
  border-radius: 10px;
}
</style>
