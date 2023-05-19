<template>

  <v-expansion-panel>
    <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
      <svg class="edit-icon" id="Editable-line" viewBox="0 0 32 32" xml:space="preserve"
           xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="#36E2FF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
        <path
            d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  "
            fill="none" id="XMLID_242_" stroke="#36E2FF" stroke-linecap="round" stroke-linejoin="round"
            stroke-miterlimit="10" stroke-width="2"/>
      </svg>
      Настройки
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="wrapper-settings">

        <section class="sempler">
          <span>Sempler</span>
          <v-select
              v-model="select"
              :items="items"
              variant="outlined"
              return-object
              persistent-hint
          ></v-select>
        </section>

        <section class="block__check-box">
          <label class="switch">
            <input type="checkbox" @click="skipProcessing = !skipProcessing">
            <span class="slider"></span>
          </label>
          <span>Пропустить предварительную обработку</span>
        </section>

        <section class="block__check-box">
          <label class="switch">
            <input type="checkbox" @click="changeFace = !changeFace">
            <span class="slider"></span>
          </label>
          <span>Исправление лиц</span>
        </section>

        <span class="message">Вы всегда можете масштабировать и улучшить лица после создания изображений</span>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import {ref} from "vue";

let items = ['Euler Ancestral', 'Euler', 'LMS', 'DPM-Solver++', 'PLMS', 'DDIM', 'DPM Karras', 'DPM Karras Ancestral'];
let select = ref('Euler Ancestra');
let skipProcessing = ref(false);
let changeFace = ref(false);

</script>

<style lang="scss">

.wrapper-settings {
  .sempler {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;

    span {
      font-size: 12px;
    }

    .v-field__append-inner {
      padding-top: 0;
      height: 20px;
    }

    .v-select .v-field.v-field {
      display: flex;
      align-items: center;
      height: 30px;
    }

    .v-text-field .v-input__details {
      display: none;
    }

    .v-field__input {
      display: flex;
      align-items: center;
      padding: 10px;
    }

    .v-field {
      font-size: 13px;
    }

    .v-select__selection {
      text-align: center;
    }
  }

  .block__check-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .switch {
      --secondary-container: #313033;
      --primary: var(--light-blue);
      position: relative;
      min-width: 40px;
      min-height: 20px;
      margin-right: 10px;
    }

    input {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider::before {
        background-color: var(--primary);
      }

      &:checked + .slider {
        background-color: var(--secondary-container);
      }

      &:focus + .slider {
        box-shadow: 0 0 1px var(--secondary-container);
      }

      &:checked + .slider:before {
        transform: translateX(20px);
      }
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #313033;
      transition: .2s;
      border-radius: 30px;

      &:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        border-radius: 20px;
        background-color: #aeaaae;
        transition: .4s;
      }
    }

    span {
      font-size: 11px;
    }
  }

  .message {
    font-size: 11px;
  }
}

.v-menu > .v-overlay__content > .v-list {
  padding: 10px;

}

.v-list-item-title {
  font-size: 13px;
}

.v-list-item--density-default.v-list-item--one-line {
  min-height: 35px;
}

.v-menu > .v-overlay__content > .v-list {
  background-color: #404040E5;
  backdrop-filter: blur(5px);
  color: var(--main-light-color);

}

</style>
