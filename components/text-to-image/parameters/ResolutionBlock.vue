<template>
  <v-expansion-panel>
    <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
      <svg class="edit-icon" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
           x="0px"
           y="0px" viewBox="0 0 122.879 100.426" xml:space="preserve"><g><path d="M23.417,50.189V23.298h27.528v9.584H33.001v17.307H23.417L23.417,50.189z M14.279,0h94.323 c3.914,0,7.48,1.609,10.076,4.201l0.01-0.01c2.586,2.586,4.191,6.158,4.191,10.088v71.87c0,3.906-1.605,7.473-4.191,10.066 l-0.029,0.031c-2.596,2.58-6.154,4.18-10.057,4.18H14.279c-3.931,0-7.502-1.605-10.088-4.191c-0.108-0.107-0.209-0.219-0.305-0.334 C1.479,93.336,0,89.9,0,86.148v-71.87c0-3.932,1.605-7.503,4.19-10.088C6.776,1.605,10.346,0,14.279,0L14.279,0z M108.602,9.743 H14.279c-1.242,0-2.375,0.512-3.2,1.336c-0.824,0.825-1.336,1.958-1.336,3.2v71.87c0,1.164,0.436,2.225,1.149,3.02l0.187,0.178 c0.825,0.826,1.958,1.338,3.199,1.338h94.323c1.254,0,2.385-0.506,3.197-1.318l0.02-0.02c0.813-0.813,1.318-1.945,1.318-3.197 v-71.87c0-1.241-0.512-2.375-1.338-3.199l0.01-0.009l-0.01-0.01C110.988,10.248,109.855,9.743,108.602,9.743L108.602,9.743z M99.463,50.237v26.892H71.934v-9.584h17.945V50.237H99.463L99.463,50.237z"/></g></svg>
      Разрешение {{ size.width }} x {{ size.height }}
    </v-expansion-panel-title>
    <v-expansion-panel-text class="expansion-panel-wrapper">
      <div class="wrapper-resolution">
        <section class="navigation">
          <button :class="{'active': hasOpenSimpleMenu}" @click="hasOpenSimpleMenu = true">Простой</button>
          <button :class="{'active': !hasOpenSimpleMenu}" @click="hasOpenSimpleMenu = false">Продвинутый</button>
        </section>
        <section class="simple" v-if="hasOpenSimpleMenu">
          <div class="form_radio_btn checked-radio">
            <input
                id="radio-1"
                type="radio"
                name="radio"
                value="1:1"
                @change="currentSize(1, 1)"
                :checked="size.width === size.height">
            <label class="rectangle__1-1" for="radio-1">1 : 1</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-2" type="radio" name="radio" value="4:5"
                   @change="currentSize(4,5)"
                   :checked="size.width === getMinSize('width') && size.height === getCurrentSize(4, 5)"
            >
            <label class="rectangle__4-5" for="radio-2">4 : 5</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-3" type="radio" name="radio" value="2:3"
                   @change="currentSize(2, 5)"
                   :checked="size.width === getMinSize('width') && size.height === getCurrentSize(2, 5)" >
            <label class="rectangle__2-3" for="radio-3">2 : 3</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-5" type="radio" name="radio" value="5:4" @change="currentSize(5, 4)"
                   :checked="size.height === getMinSize('height') && size.width === getCurrentSize(5, 4)">
            <label class="rectangle__5-4" for="radio-5">5 : 4</label>
          </div>

          <div class="form_radio_btn">
            <input id="radio-6" type="radio" name="radio" value="3:2" @change="currentSize(3, 2)"
                   :checked="size.height === getMinSize('height') && size.width === getCurrentSize(3, 2)">
            <label class="rectangle__3-2" for="radio-6">3 : 2</label>
          </div>

        </section>

        <div v-if="!hasOpenSimpleMenu">
          <v-app>
            <section class="advanced">
              <span>Ширина: {{ size.width }}</span>
              <v-slider
                  v-model="valueAdvanceParams.width"
                  :min="0"
                  :max="dataWidth.length-1"
                  :step="1"
                  color="#36E2FF"
                  :thumb-size="15"
                  @update:modelValue="updateAdvance($event, null)"
              >
              </v-slider>
            </section>

            <section class="advanced">
              <span>Высота: {{ size.height }}</span>
              <v-slider
                  v-model="valueAdvanceParams.height"
                  :min="0"
                  :max="dataHeight.length-1"
                  :step="1"
                  color="#36E2FF"
                  :thumb-size="15"
                  show-ticks
                  @update:modelValue="updateAdvance(null, $event)"
              >
              </v-slider>
            </section>
          </v-app>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";
import {imagesStore} from "~/store/imageStore";

const store = personStore();
const {filters} = storeToRefs(store);
const {changeFilters} = store;
const imageStore = imagesStore();
const {sizeParameters} = storeToRefs(imageStore);

const dataState = [512, 576, 640, 704, 768, 832, 896, 960, 1024];
let dataWidth = ref([]);
let dataHeight = ref([]);

let hasOpenSimpleMenu = ref(true);
let size = ref({
  width: 512,
  height: 512
})

let valueAdvanceParams = ref({
  width: 0,
  height: 0
})

function getMinSize(currentSize) {
  return currentSize === 'width' ? Math.min(...dataWidth.value) : Math.min(...dataHeight.value);
}

function getCurrentSize(width, height) {
  let currentWidth;
  let currentHeight;

  if (width === height || width < height) {
    currentHeight = Math.ceil(Math.min(...dataWidth.value) * height / width);
    currentHeight = currentHeight > Math.max(...dataWidth.value) ? Math.max(...dataWidth.value) : currentHeight;
    return currentHeight;
  } else {
    currentWidth = Math.ceil(Math.min(...dataHeight.value) * width / height);
    currentWidth = currentWidth > Math.max(...dataHeight.value) ? Math.max(...dataHeight.value) : currentWidth;
    return currentWidth
  }
}

function currentSize(width, height) {
  let currentWidth;
  let currentHeight;

  if (width === height || width < height) {
    currentWidth = Math.min(...dataWidth.value);
    currentHeight = Math.ceil(Math.min(...dataWidth.value) * height / width);
    currentHeight = currentHeight > Math.max(...dataWidth.value) ? Math.max(...dataWidth.value) : currentHeight;
  } else {
    currentHeight = Math.min(...dataHeight.value);
    currentWidth = Math.ceil(Math.min(...dataHeight.value) * width / height);
    currentWidth = currentWidth > Math.max(...dataHeight.value) ? Math.max(...dataHeight.value) : currentWidth;
  }

  valueAdvanceParams.value.width = dataWidth.value.findIndex(size => size === currentWidth)
  valueAdvanceParams.value.height = dataHeight.value.findIndex(size => size === currentHeight)

  size.value.width = currentWidth;
  size.value.height = currentHeight;
}

function updateAdvance(width, height) {
  if (width !== null) {
    size.value.width = dataWidth.value[width];
  } else if (height !== null) {
    size.value.height = dataHeight.value[height];
  }
}

watch(filters, (newData) => {
  size.value.width = newData.size.width > Math.min(...dataWidth.value) ? newData.size.width : Math.min(...dataWidth.value);
  size.value.height = newData.size.height > Math.min(...dataHeight.value) ? newData.size.height : Math.min(...dataHeight.value);

  valueAdvanceParams.value.width = dataWidth.value.findIndex(width => width === size.value.width)
  valueAdvanceParams.value.height = dataHeight.value.findIndex(height => height === size.value.height)
})

watch(sizeParameters, (newData) => {
  dataWidth.value = dataState.filter(size => {
    if (size >= newData.minWidth && size <= newData.maxWidth) {
      return size
    }
  })
  dataHeight.value = dataState.filter(size => {
    if (size >= newData.minWidth && size <= newData.maxWidth) {
      return size
    }
  })

  size.value.width = dataWidth.value[0];
  size.value.height = dataHeight.value[0];
})

watch(size.value, () => {
  changeFilters('size', {width: size.value.width, height: size.value.height});
})
</script>

<style lang="scss">

.wrapper-resolution {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .navigation {
    display: flex;
    gap: 20px;
    position: relative;
    margin: 10px 0;

    button {
      display: flex;
      align-items: center;
      color: var(--main-light-color);
      font-weight: 600;
      font-size: 13px;
      position: relative;

      &:not(.no-hover)::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 8px;
        left: 0;
        top: 20px;
        background: linear-gradient(to left, var(--light-blue), var(--light-pink));
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
        border-radius: 50%;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }

    .active {
      &:not(.no-hover)::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(1);
        height: 2px;
        bottom: 8px;
        left: 0;
        top: 20px;
        background: linear-gradient(to left, var(--light-blue), var(--light-pink));
        transform-origin: bottom left;
        transition: transform 0.25s ease-out;
        border-radius: 50%;
      }
    }
  }

  .simple {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .form_radio_btn {
      display: inline-block;

      input[type=radio] {
        display: none;
      }

      label {
        min-width: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px 0 8px;
        cursor: pointer;
        line-height: 26px;
        font-size: 10px;
        border: 1px solid rgba(255, 255, 225, 0.3);
        color: var(--main-light-color);
        border-radius: 5px;
        transition: all 0.2s;
        background-color: rgba(31, 32, 35, 0.4);
      }

      .rectangle__1-1:after,
      .rectangle__4-5:after,
      .rectangle__2-3:after,
      .rectangle__4-7:after,
      .rectangle__5-4:after,
      .rectangle__3-2:after,
      .rectangle__7-4:after {
        content: '';
        position: relative;
        left: 5px;
        background-color: rgba(255, 255, 225, 0.6);
      }

      .rectangle__1-1:after {
        width: 8px;
        height: 8px;
      }

      .rectangle__4-5:after {
        width: 8px;
        height: 10px;
      }

      .rectangle__2-3:after {
        width: 8px;
        height: 12px;
      }

      .rectangle__4-7:after {
        width: 8px;
        height: 14px;
      }

      .rectangle__5-4:after {
        width: 10px;
        height: 8px;
      }

      .rectangle__3-2:after {
        width: 12px;
        height: 8px;
      }

      .rectangle__7-4:after {
        width: 14px;
        height: 8px;
      }

      input[type=radio]:checked + label {
        border: 1px solid var(--light-blue);
        color: var(--light-blue);

        &:after {
          background-color: var(--light-blue);
        }
      }

      label:hover {
        border: 1px solid var(--light-blue);
        color: var(--light-blue);

        &:after {
          background-color: var(--light-blue);
        }
      }
    }
  }
}

.v-application {
  background-color: #2b2b2be5;

  .v-application__wrap {
    min-height: 50px;
  }
}
</style>
