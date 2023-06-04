<template>
  <section class="main-buttons" id="v-step-1" @click.prevent="emit('setNext')">
    <div class="wrapper-coast">
      <p class="coast-generation">Стоимость генерации: {{ coastGeneration }} {{ textForCredit }}</p>
    </div>
    <button v-if="!loadingMore" class="create-project" @click="generate">
      Сгенерировать {{ counterImage }}
      <v-icon end icon="mdi-arrow-right"></v-icon>
    </button>
    <button v-else class="create-project no-hover">
      <div class="wrapper-button-loader">
        <span>Генерация...</span>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </button>
  </section>

  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarDone"
      @close="isOpenSnackBarDone = false">
  </DoneSnackBar>
  <RejectSnackBar
      :openSnackBar="isOpenSnackBarReject"
      :text-snack-bar="textSnackBarReject"
      @close="isOpenSnackBarReject = false">
  </RejectSnackBar>

  <RegistrationDialog
      v-if="isOpenRegistrationDialog" @closeRegistrationBlock="isOpenRegistrationDialog = false">
  </RegistrationDialog>
  <BuyMoreCredits
      v-if="isOpenBuyMoreCredits" @close="buyMoreCredits">
  </BuyMoreCredits>
</template>

<script setup>
import {defineEmits, ref, toRefs, watch} from "vue";
import {storeToRefs} from "pinia";
import {imagesStore} from "~/store/imagesStore";
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import generatorImages from "~/mixins/generatorImages";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import RejectSnackBar from "~/components/sneckbars/RejectSnackBar";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import BuyMoreCredits from "~/components/dialogs/BuyMoreCredits";

const emit = defineEmits(['setNext']);
const props = defineProps({});
const {generateImage} = requests();
const {name} = toRefs(props);
const store = personStore();
const {person, filters} = storeToRefs(store);
const generationImage = imagesStore();
const {generatedImages} = storeToRefs(generationImage);
const {generateImages} = generatorImages();

let coastGeneration = ref('');
let counterImage = ref('');
let textForCredit = ref('');
let loadingMore = ref(false);

let isOpenSnackBarDone = ref(false);
let textSnackBarDone = ref('');
let isOpenSnackBarReject = ref(false);
let textSnackBarReject = ref('');

let isOpenRegistrationDialog = ref(false);
let isOpenBuyMoreCredits = ref(false);

watch(filters, (newData) => {
  if (newData.parameters.countImages === 1) {
    counterImage.value = `${newData.parameters.countImages} изображение`;
  } else if (newData.parameters.countImages > 1 && newData.parameters.countImages < 5) {
    counterImage.value = `${newData.parameters.countImages} изображения`;
  } else {
    counterImage.value = `${filters._value.parameters.countImages} изображений`;
  }

  coastGeneration.value = newData.parameters.countImages * 2;

  if (coastGeneration.value < 5) {
    textForCredit.value = 'кредита';
  } else {
    textForCredit.value = 'кредитов';
  }
})

function generate() {

  if (person._value.id) {
    if (coastGeneration.value < person._value.credits) {
      // generateImage(filters._value);
      generateImages();

      const blockImages = document.getElementById('images')?.offsetTop;
      window.scrollTo({
        top: blockImages,
        behavior: "smooth",
      })
      loadingMore.value = true;
      // setTimeout(() => {
      //   loadingMore.value = false;
      //   openSnackBarDone("Изображение сгенерировано")
      // }, 2000)
    } else {
      openSnackBarReject("Недостаточно средств");
      isOpenBuyMoreCredits.value = true;
    }
  } else {
    isOpenRegistrationDialog.value = true;
  }
}

function openSnackBarDone(text) {
  textSnackBarDone.value = text;
  isOpenSnackBarDone.value = true;
}

function openSnackBarReject(text) {
  textSnackBarReject.value = text;
  isOpenSnackBarReject.value = true;
}

function buyMoreCredits(hasBuy) {
  isOpenBuyMoreCredits.value = false;
  if (hasBuy) {
    openSnackBarDone("Кредиты пополнены");
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

.wrapper-button-loader {
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

    .wrapper-coast {

    }

    .create-project {

    }
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
