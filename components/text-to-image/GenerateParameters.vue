<template>
  <section class="filters">
    <div class="wrapper-settings-block">
      <h1 class="filters-header">Настройки для генерации</h1>
      <div class="wrapper-filters" :class="{'remove-guide': loginIn}">
        <v-expansion-panels flat multiple variant="accordion">
          <Models></Models>
          <client-only>
            <DescriptionBlock @click.prevent="setNext"></DescriptionBlock>
          </client-only>
          <UploadImages></UploadImages>
          <ResolutionBlock></ResolutionBlock>
          <GenerationParameters></GenerationParameters>
          <Settings></Settings>
        </v-expansion-panels>
      </div>
    </div>

    <client-only>
      <VTour :steps="tourSteps" autoStart highlight ref="tour" v-if="!person.id">
        <template #actions="{}">
          <div class="vjt-actions">
          </div>
        </template>
      </VTour>
    </client-only>

    <client-only>
      <GenerateButton @setNext="setNext"></GenerateButton>
    </client-only>
  </section>
</template>

<script setup>
import {ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import ResolutionBlock from "~/components/text-to-image/parameters/ResolutionBlock";
import GenerationParameters from "~/components/text-to-image/parameters/GenerationParameters";
import Settings from "~/components/text-to-image/parameters/SettingsBlock"
import DescriptionBlock from "~/components/text-to-image/parameters/DescriptionBlock";
import UploadImages from "~/components/text-to-image/parameters/UploadImages";
import Models from "~/components/text-to-image/parameters/Models";
import GenerateButton from "~/components/shared/GenerateButton";

const store = personStore();
const {person} = storeToRefs(store);
const tour = ref(null);
const wasGuideShowed = ref();

let loginIn = ref(false);
let tourSteps = ref();

setTimeout(() => {
  wasGuideShowed.value = process.client && localStorage.getItem('vjt-tour');
})

if (process.client && window.innerWidth <= 650) {
  setParametersTour(true);
} else {
  setParametersTour(true);
}

function setNext() {
  if (!person._value.id && !wasGuideShowed.value) {
    tour.value.nextStep();
  }
}

watch(person, (newDataPerson) => {
  if (newDataPerson.id) {
    loginIn.value = true;
    wasGuideShowed.value = process.client && localStorage.getItem('vjt-tour');
  } else {
    loginIn.value = false;
    if (window.innerWidth <= 650) {
      setParametersTour(true);
    } else {
      setParametersTour(false);
    }
  }
})


function setParametersTour(condition){
  if (condition) {
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
  border-radius:0 30px 30px 0;

  .wrapper-settings-block {
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
}
</style>
