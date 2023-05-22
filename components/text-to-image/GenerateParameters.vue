<template>
  <section class="filters">
    <div class="wrapper-filters" :class="{'remove-guide': loginIn}">
      <v-expansion-panels flat multiple variant="accordion">
        <DescriptionBlock @click.prevent="setNext"></DescriptionBlock>
        <UploadImages></UploadImages>
        <ResolutionBlock></ResolutionBlock>
        <GenerationParameters></GenerationParameters>
        <Settings></Settings>
      </v-expansion-panels>
    </div>
    <VTour :steps="tourSteps" autoStart highlight ref="tour" v-if="!person.id">
      <template #actions="{}">
        <div class="vjt-actions">
        </div>
      </template>
    </VTour>
    <section class="main-buttons" id="v-step-1" @click.prevent="setNext">
      <div class="wrapper-coast">
        <p class="coast-generation">Стоимость генерации: {{ coastGeneration }} {{ textForCredit }}</p>
      </div>
      <button v-if="!loadingMore" class="create-project" @click="generate">
        {{ textMainButton }} {{ counterImage }}
        <v-icon end icon="mdi-arrow-right"></v-icon>
      </button>
      <button v-else class="create-project no-hover">
        <div class="wrapper-loader">
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
    <RejectSnackBar :openSnackBar="isOpenSnackBarReject"
                    :text-snack-bar="textSnackBarReject"
                    @close="isOpenSnackBarReject = false">
    </RejectSnackBar>
  </section>

  <RegistrationDialog v-if="isOpenRegistrationDialog" @closeRegistrationBlock="isOpenRegistrationDialog = false">
  </RegistrationDialog>
  <BuyMoreCredits v-if="isOpenBuyMoreCredits" @close="buyMoreCredits">
  </BuyMoreCredits>
</template>

<script setup>
import ResolutionBlock from "~/components/text-to-image/parameters/ResolutionBlock";
import GenerationParameters from "~/components/text-to-image/parameters/GenerationParameters";
import Settings from "~/components/text-to-image/parameters/SettingsBlock"
import DescriptionBlock from "~/components/text-to-image/parameters/DescriptionBlock";
import UploadImages from "~/components/text-to-image/parameters/UploadImages";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import {personStore} from "~/store/personStore";
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";
import requests from "~/mixins/requests";
import BuyMoreCredits from "~/components/dialogs/BuyMoreCredits";
import RejectSnackBar from "~/components/sneckbars/RejectSnackBar";

const {generateImage} = requests();
const store = personStore();
const {person, filters} = storeToRefs(store);
const tour = ref(null);
const wasGuideShowed = ref();

let isOpenSnackBarDone = ref(false);
let textSnackBarDone = ref('');
let isOpenSnackBarReject = ref(false);
let textSnackBarReject = ref('');
let counterImage = ref('');
let isOpenRegistrationDialog = ref(false);
let isOpenBuyMoreCredits = ref(false);
let textMainButton = ref('Сгенерировать');
let loadingMore = ref(false);
let coastGeneration = ref('');
let loginIn = ref(false);
let textForCredit = ref('');

setTimeout(() => {
  wasGuideShowed.value = process.client && localStorage.getItem('vjt-tour');
})

let tourSteps = ref();


if (process.client && window.innerWidth <= 650) {
  tourSteps.value = [
    {
      target: '#v-step-0',
      content: 'Начните с составления описания для генерации необходимых изображений',
      placement: 'top'
    },
    {
      target: '#v-step-1',
      content: 'Далее для генерации изображения нажмите на кнопку',
      placement: 'top',
    }
  ]
} else {
  tourSteps.value = [
    {
      target: '#v-step-0',
      content: 'Начните с составления описания для генерации необходимых изображений',
      placement: 'right'
    },
    {
      target: '#v-step-1',
      content: 'Далее для генерации изображения нажмите на кнопку',
      placement: 'right',
    }
  ]
}


function setNext() {
  if (!person._value.id && !wasGuideShowed.value) {
    tour.value.nextStep();
  }
}

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

watch(person, (newDataPerson) => {
  if (newDataPerson.id) {
    loginIn.value = true;
    wasGuideShowed.value = process.client && localStorage.getItem('vjt-tour');
  } else {
    loginIn.value = false;
    if (window.innerWidth <= 650) {
      tourSteps.value = [
        {
          target: '#v-step-0',
          content: 'Начните с составления описания для генерации необходимых изображений',
          placement: 'top'
        },
        {
          target: '#v-step-1',
          content: 'Далее для генерации изображения нажмите на кнопку',
          placement: 'top',
        }
      ]
    } else {
      tourSteps.value = [
        {
          target: '#v-step-0',
          content: 'Начните с составления описания для генерации необходимых изображений',
          placement: 'right'
        },
        {
          target: '#v-step-1',
          content: 'Далее для генерации изображения нажмите на кнопку',
          placement: 'right',
        }
      ]
    }
  }
})

function generate() {

  if (person._value.id) {
    if (coastGeneration.value < person._value.credits) {
      generateImage(filters._value);

      const blockImages = document.getElementById('images')?.offsetTop;
      window.scrollTo({
        top: blockImages,
        behavior: "smooth",
      })
      loadingMore.value = true;
      setTimeout(() => {
        loadingMore.value = false;
        openSnackBarDone("Изображение сгенерировано")
      }, 2000)
    } else {
      openSnackBarReject("Недостаточно средств");
      isOpenBuyMoreCredits.value = true;
    }
  } else {
    isOpenRegistrationDialog.value = true;
  }
}

function buyMoreCredits(hasBuy) {
  isOpenBuyMoreCredits.value = false;
  if (hasBuy) {
    openSnackBarDone("Кредиты пополнены");
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

</script>

<style lang="scss">
#vjt-tooltip {
  background-color: #37a3b5;
  border-radius: 10px;
  margin-left: 20px !important;
  padding: 15px;
  font-weight: 700;
  color: var(--main-light-color);
  z-index: 1;
}

#vjt-arrow::before {
  content: '';
  width: 15px;
  height: 15px;
  top: -3px;
  background-color: #37a3b5;
  transform: rotate(45deg);
}

#vjt-arrow::after {
  display: none;
}

.vjt-highlight {
  outline-offset: 5px;
  outline: var(--light-blue) dashed 2px;
}

.remove-guide {
  .vjt-highlight {
    outline: none;
  }
}

.filters {
  width: 350px;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2b2b2be5;
  border-radius: 0 30px 30px 0;
  padding: 30px 0 0 0;
  margin-top: 70px;

  .wrapper-filters {
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
      width: 2px;
      height: 1000px;
    }

    &::-webkit-scrollbar-track {
      background: #404040E5;
    }
  }

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
      border-radius: 0 0 30px 0;
      height: 65%;

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
}

.wrapper-loader {
  display: flex;
  align-items: center;
  gap: 30px;

  svg {
    width: 40px;
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
  .filters {

    .wrapper-filters {

    }

    .main-buttons {
      min-height: 90px;

      .wrapper-coast {

      }

      .create-project {

      }
    }
  }
}

@media screen and (max-width: 700px) {
  #vjt-tooltip {
    margin-left: 5px !important;
    padding: 12px;
  }
}

@media screen and (max-width: 650px) {

  #vjt-tooltip {
    margin-left: 0 !important;
    margin: 10px 0 !important;
    padding: 12px;
  }

  .filters {
    width: 100%;
    border-radius: 0;
    height: auto;

    .wrapper-filters {

    }

    .main-buttons {
      border-radius: 0;
      align-items: center;

      .create-project {
        border-radius: 0;
        gap: 20px;

        .coast-generation {
          //padding: 0 10px;
        }
      }
    }
  }
}
</style>
