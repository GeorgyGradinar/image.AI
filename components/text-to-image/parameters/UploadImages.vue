<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
        <svg class="edit-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <title/>
          <g id="Image">
            <path
                d="M25,2H7A5,5,0,0,0,2,7V25a5,5,0,0,0,5,5H25a5,5,0,0,0,5-5V7A5,5,0,0,0,25,2ZM7,4H25a3,3,0,0,1,3,3v5.59l-1.88-1.88a3,3,0,0,0-4.24,0l-7.95,8-3-2.42a3,3,0,0,0-3.8,0L4,18.86V7A3,3,0,0,1,7,4ZM25,28H7a3,3,0,0,1-3-3V21.47l4.38-3.66a1,1,0,0,1,1.27,0l3.73,3a1,1,0,0,0,1.33-.07l8.58-8.59a1,1,0,0,1,1.42,0L28,15.41V25A3,3,0,0,1,25,28Z"/>
            <path d="M10,13a3,3,0,1,0-3-3A3,3,0,0,0,10,13Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,10,9Z"/>
          </g>
        </svg>
        Изображения
      </v-expansion-panel-title>
      <v-expansion-panel-text class="expansion-panel-wrapper">
        <div class="wrapper-image">
          <section class="image">
            <label v-if="!images" class="upload">
              <input type="file" @change="fileUpload($event, 'target')">
              <img class="label-download" src="~/assets/images/text-to-image/settings/download-file-icon.svg" alt="">
              <span>Загрузите изображение для создания вариаций</span>
            </label>
            <label v-if="images" class="pre-show">
              <img class="trash" src="~/assets/images/text-to-image/trash.svg" alt="" @click="deleteImg">
              <img class="pre-show-img" :src="images.url" alt="">
            </label>
          </section>

          <v-checkbox
              v-model="outputResolution"
              label="Соответствия выходному разрешению"
              color="#36E2FF"
              hide-details
          ></v-checkbox>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import {ref, watch} from "vue";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";

const store = personStore();
const {filters} = storeToRefs(store)
const {changeFilters} = store;
let images = ref();
let outputResolution = ref(false);
let panel = ref([1]);

function fileUpload(event) {
  const url = URL.createObjectURL(event.target.files[0]);
  images.value = {name: null, url, file: event.target.files[0]}
}

function deleteImg() {
  changeFilters('image', null)
}

watch(filters, (newData) => {
  images.value = newData.image;
  if (newData.image){
    panel.value = [0]
  }
})

watch(images, (newData) => {
  if (newData) {
    changeFilters('image', newData)
  }
})
</script>

<style lang="scss">

.wrapper-image {
  position: relative;
  width: 100%;

  .image {
    border: 2px dashed var(--light-blue);
    margin: 20px 40px;

    .upload,
    .pre-show {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      input {
        position: absolute;
        top: 0;
        opacity: 0;
        width: 75%;
        height: 200px;
        cursor: pointer;
      }

      .label-download {
        width: 24px;
        opacity: 0.3;
      }

      span {
        text-align: center;
        font-size: 12px;
        color: #36E2FF;
      }
    }

    .pre-show {

      .trash {
        position: absolute;
        top: 10px;
        right: 50px;
        cursor: pointer;
      }

      .pre-show-img {
        width: 150px;
        height: 150px;
        object-fit: cover;
      }
    }
  }

  .v-selection-control--inline .v-label {
    font-size: 12px;
  }
}
</style>
