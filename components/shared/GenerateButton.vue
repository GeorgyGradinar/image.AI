<template>
  <section class="main-buttons" id="v-step-1" @click.prevent="emit('setNext')">
    <div class="wrapper-coast">
      <p class="coast-generation">Стоимость генерации: {{ coastGeneration }} {{ textForCredit }}</p>
    </div>
    <button v-if="!isGeneration" class="create-project" @click="generate">
      Сгенерировать {{ counterImage }}
      <v-icon end icon="mdi-arrow-right"></v-icon>
    </button>
    <button v-else class="create-project no-hover button-loader">
      <span>Генерация...</span>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </button>
  </section>
</template>

<script setup>
import {defineEmits, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import {imagesStore} from "~/store/imageStore"
import {modelsStore} from "~/store/models"
import generatorImages from "~/mixins/generatorImages";
import requestsEditor from "~/mixins/requestsEditor";
import {useRouter} from "nuxt/app";

const emit = defineEmits(['setNext']);
const store = personStore();
const {person, filters} = storeToRefs(store);
const imageStore = imagesStore();
const {isGeneration, sizeParameters} = storeToRefs(imageStore);
const {toggleGeneration, addNewImages} = imageStore;
const models = modelsStore();
const {toggleRegistrationDialog, toggleBuyMoreCredits, toggleSnackBarReject} = models;
const {generateImages} = generatorImages();
const {generateImage} = requestsEditor();

const router = useRouter();

let coastGeneration = ref(1);
let counterImage = ref(1);
let textForCredit = ref('');

watch(filters, (newData) => {
  if (newData.parameters.countImages === 1) {
    counterImage.value = `${newData.parameters.countImages} изображение`;
  } else if (newData.parameters.countImages > 1 && newData.parameters.countImages < 5) {
    counterImage.value = `${newData.parameters.countImages} изображения`;
  } else {
    counterImage.value = `${filters._value.parameters.countImages} изображений`;
  }

  let coast = newData.parameters.countImages * sizeParameters.value.costFactor * (newData.parameters.step / 25) * ((newData.size.width + newData.size.height) / 1536);
  coastGeneration.value = coast < 0.2 ? 0.2 : coast.toFixed(1);

  if (coastGeneration.value === 1) {
    textForCredit.value = 'краска';
  } else if (coastGeneration.value < 5) {
    textForCredit.value = 'краски';
  } else {
    textForCredit.value = 'красок';
  }
})

function generate() {
  if (router.currentRoute.value.path.includes('editor')) {
    generateImage();
  } else {
    if (person._value.id) {
      if (coastGeneration.value < person._value.credits) {
        let randomId = Math.floor(Math.random() * 10000);
        for (let x = 0; x < filters.value.parameters.countImages; x++) {
          const loading = {id: randomId};
          let loadImages = [...imageStore.images];
          loadImages.unshift(loading);
          addNewImages(loadImages)
        }
        toggleGeneration(true);
        generateImages(randomId);

        window.scrollTo({
          top: document.getElementById('images')?.offsetTop,
          behavior: "smooth",
        })
      } else {
        toggleSnackBarReject({isOpen: true, text: "Недостаточно средств"});
        toggleBuyMoreCredits(true);
      }
    } else {
      toggleRegistrationDialog(true);
    }
  }
}

</script>

<style scoped lang="scss">

.main-buttons {
  min-height: 80px;
  border-top: 1px solid rgba(255, 255, 225, 0.4);
  position: relative;
  overflow: hidden;

  .wrapper-coast {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 35%;
    color: rgba(255, 255, 225, 0.7);
    font-size: 10px;
  }

  .create-project {
    border-radius: 0 0 0 0;
    max-height: 65%;

    &:hover {
      box-shadow: 0 0 15px rgba(54, 226, 255, 0.7);
    }

  }

  .no-hover {
    cursor: wait;

    &:hover {
      box-shadow: unset;
    }
  }
}

.create-project.button-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  svg {
    width: 6%;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--main-light-color);
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

@media screen and (min-width: 1925px) {
  .main-buttons {
    min-height: 90px;
  }
}

@media screen and (max-width: 650px) {
  .main-buttons {
    border-radius: 0;
    align-items: center;

    .create-project {
      border-radius: 0;
      gap: 20px;
    }
  }
}
</style>
