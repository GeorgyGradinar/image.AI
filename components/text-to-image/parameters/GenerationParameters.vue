<template>
  <v-expansion-panel>
    <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
      <svg class="edit-icon" viewBox="0 0 21 20">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Dribbble-Light-Preview" transform="translate(-59.000000, -720.000000)" fill="#36E2FF">
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                  d="M21.9,574 L21.9,560 L19.8,560 L19.8,574 L17.7,574 L17.7,576 L19.8,576 L19.8,580 L21.9,580 L21.9,576 L24,576 L24,574 L21.9,574 Z M14.55,560 L12.45,560 L12.45,569 L10.35,569 L10.35,571 L12.45,571 L12.45,580 L14.55,580 L14.55,571 L16.65,571 L16.65,569 L14.55,569 L14.55,560 Z M7.2,574 L9.3,574 L9.3,576 L7.2,576 L7.2,580 L5.1,580 L5.1,576 L3,576 L3,574 L5.1,574 L5.1,560 L7.2,560 L7.2,574 Z"
                  id="option_bar_settings-[#1400]"></path>
            </g>
          </g>
        </g>
      </svg>
      Параметры
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-app>
        <div class="wrapper-block">
          <section class="number-images">
            <span> Количество изображений: <strong>{{ parameters.countImages }}</strong></span>
            <v-slider
                v-model="parameters.countImages"
                color="#36E2FF"
                :min="1"
                :max="10"
                :step="1"
                :thumb-size="15"
            ></v-slider>
          </section>

          <section class="wrapper-steps-and-guidance">
            <div class="steps">
              <span>Шаг: <strong>{{ parameters.step }}</strong></span>
              <v-slider
                  v-model="parameters.step"
                  color="#36E2FF"
                  :min="1"
                  :max="10"
                  :step="1"
                  :thumb-size="15"
              ></v-slider>
            </div>

            <div class="guidance">
              <span>Шкала навигации: <strong>{{ parameters.navigation }}</strong></span>
              <v-slider
                  v-model="parameters.navigation"
                  color="#36E2FF"
                  :min="1"
                  :max="10"
                  :step="1"
                  :thumb-size="15"
              ></v-slider>
            </div>
          </section>

          <div class="seed">
            <p>Зерно</p>
            <input v-model.lazy="parameters.seed" type="number" @keypress="restrictChars" placeholder="Зернистость"
                   :class="{'is-data-input': parameters.seed}">
          </div>
        </div>
      </v-app>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>

import {ref, watch} from "vue"
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";

const store = personStore();
const {filters} = storeToRefs(store);
const {changeFilters} = store;
const parameters = ref({
  countImages: null,
  step: null,
  navigation: null,
  seed: null
})

watch(filters, (newData) => {
  parameters.value.countImages = newData.parameters.countImages;
  parameters.value.step = newData.parameters.step;
  parameters.value.navigation = newData.parameters.navigation;
  parameters.value.seed = newData.parameters.seed;
})

watch(parameters.value, (newData) => {
  changeFilters('parameters',
      {
        countImages: newData.countImages,
        step: newData.step,
        navigation: newData.navigation,
        seed: newData.seed
      }
  );
})

function restrictChars($event) {
  if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
    return true
  } else {
    $event.preventDefault();
  }
}
</script>

<style lang="scss">

.wrapper-block {
  color: var(--main-light-color);
  display: flex;
  flex-direction: column;
  gap: 5px;

  .number-images {
    span {
      font-size: 11px;
    }
  }

  .v-input__details {
    display: none;
  }

  .wrapper-steps-and-guidance {
    display: flex;
    justify-content: space-between;

    .steps {
      width: 100%;

      span {
        white-space: nowrap;
        font-size: 11px;
      }
    }

    .guidance {
      width: 100%;

      span {
        white-space: nowrap;
        font-size: 11px;
      }
    }
  }

  .seed {
    p {
      font-size: 12px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      border: 1px solid rgba(248, 248, 221, 0.4);
      color: var(--main-light-color);
      padding: 5px 10px;
      font-size: 15px;
      transition: all 0.2s;
    }

    input:focus {
      outline: 0;
      border: 1px solid var(--light-blue);
      box-shadow: 0 0 5px rgba(54, 226, 255, 0.5);
    }

    .is-data-input {
      border: 1px solid var(--light-blue);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
