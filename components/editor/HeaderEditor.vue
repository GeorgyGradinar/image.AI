<template>
  <header class="header-editor">
    <div class="wrapper-logo-tools">
      <NuxtLink to="/editor" class="logo">Лого</NuxtLink>
      <div class="tools">
        <button @click="selection('cursor')" :class="{'selected': selectedTool === 'cursor'}">
          <img src="~assets/images/editor/cursor.svg" alt="cursor">
        </button>
        <button @click="selection('gap')" :class="{'selected': selectedTool === 'gap'}">
          <img src="~assets/images/editor/hand.svg" alt="hand">
        </button>
        <button><img src="~assets/images/editor/focus.svg" alt="focus"></button>
        <label class="upload">
          <input type="file">
          <img class="label-download" src="~assets/images/editor/image.svg" alt="image">
        </label>
        <button @click="selection('eraser')" :class="{'selected': selectedTool === 'eraser'}">
          <img src="~assets/images/editor/eraser.svg" alt="eraser">
        </button>
        <v-app>
          <div class="slider" :class="{'show-slider': selectedTool === 'eraser'}">
            <v-slider
                v-model="sizeEraser"
                color="#36E2FF"
                :min="1"
                :max="10"
                :step="1"
                :thumb-size="15"
            ></v-slider>
          </div>
        </v-app>
      </div>
    </div>

    <div class="editor-header-title">
      <p>AI редактор/</p>
      <p class="name" v-if="!isShowEditName" @click="isOpenShowName(true)">{{ selectedProject.name }}</p>
      <input autofocus v-else v-model.lazy="selectedProject.name" checked @focusout="isOpenShowName(false)">
    </div>

    <div class="editor-parameters">
      <v-select
          class="drop-down parameters"
          v-model="selectedIncreaseParameters"
          :items="increaseParameters"
          variant="outlined"
          return-object
          persistent-hint
          :class="'rounded-lg'"
      ></v-select>
      <button class="download">
        <img src="~assets/images/editor/download.svg" alt="download">
        Скачать
      </button>
      <button class="editor-button-plus">
        <img src="~assets/images/editor/plus.svg" alt="plus">
      </button>
      <button class="editor-button-minus">
        <img src="~assets/images/editor/minus.svg" alt="minus">
      </button>
      <v-select
          class="drop-down"
          v-model="selectedIncreasePercent"
          :items="increasePercent"
          variant="outlined"
          return-object
          persistent-hint
          :class="'rounded-lg'"
      ></v-select>
    </div>

  </header>
</template>

<script setup>


import {onMounted, toRefs, watch} from "vue";
import {storeToRefs} from "pinia";
import {projectStore} from "~/store/projects";
import {personStore} from "~/store/personStore";
import {useRouter} from "nuxt/app";


const router = useRouter();
const project = projectStore();
const {projects} = storeToRefs(project);
const {updateParameters} = project;
const store = personStore();
const {person} = storeToRefs(store);

const increaseParameters = ['x1', 'x2', 'x3', 'x4', 'x8'];
const increasePercent = ['10%', '25%', '50%', '100%', '150%', '200%'];

let selectedProject = ref('');
let selectedTool = ref('');
let selectedIncreaseParameters = ref(increaseParameters[0]);
let selectedIncreasePercent = ref(increasePercent[0]);
let sizeEraser = ref(1);
let isShowEditName = ref(false);

onMounted(() => {
  if (person._value.id && projects.value.length) {
    const id = router.currentRoute.value.params.id;
    selectedProject.value = projects._value.find(project => project.id === id);
  } else {
    router.push({path: '/'})
  }
})

watch(selectedProject, (newData) => {
  updateParameters({name: selectedProject.name, id: selectedProject.id});
})

function isOpenShowName(event) {
  isShowEditName.value = event;
}

function selection(nameButton) {
  selectedTool.value = nameButton;
}

</script>

<style lang="scss">
.header-editor {
  width: 100vw;
  height: 70px;
  color: var(--main-light-color);
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 225, 0.2);
  background-color: var(--main-backgground-color);

  .wrapper-logo-tools {
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      margin-right: 20px;
    }

    .tools {
      display: flex;
      align-items: center;
      gap: 10px;

      button,
      .upload {
        display: flex;
        border: 1px solid rgba(255, 255, 225, 0.2);
        border-radius: 10px;
        padding: 10px;
        transition: all 0.2s;

        img {
          width: 20px;
          height: 20px;
        }

        &:active {
          background-color: #2b2b2be5;
          border: 1px solid var(--light-blue);
        }
      }

      .upload {
        position: relative;
        padding: 10px;

        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .label-download {
          width: 20px;
        }
      }

      .v-application .v-application__wrap {

        background-color: var(--main-backgground-color);

        .slider {
          opacity: 0;
          height: 50px;
          display: flex;
          background-color: var(--main-backgground-color);
          width: 100px;
          margin-left: 10px;

          .v-input__details {
            display: none;
          }

          .v-slider.v-input--horizontal {
            align-items: end;
          }
        }

        .show-slider {
          opacity: 1;
        }

        .v-slider.v-input--horizontal .v-slider-track__fill {
          height: 4px;
        }
      }

      .selected {
        background-color: #2b2b2be5;
        border: 1px solid var(--light-blue);
      }
    }
  }

  .editor-header-title {
    display: flex;

    p {
      display: flex;
    }

    .name {
      min-width: 200px;
      color: var(--main-light-color);
    }

    input {
      min-width: 200px;
      display: flex;
      color: var(--main-light-color);
      border-bottom: 1px solid rgba(255, 255, 225, 0.2);

      &:focus {
        outline: none;
      }
    }
  }

  .editor-parameters {
    height: 35px;
    display: flex;
    align-content: center;
    gap: 10px;

    .v-input {
      flex: unset;
    }

    .v-input__control {
      display: flex;
      justify-content: flex-end;


      .v-field--variant-solo, .v-field--variant-solo-filled {
        width: 400px;
        background: var(--main-backgground-color);
        color: var(--light-blue);
      }

      .v-field {
        border-radius: 10px;
        border: 1px solid var(--light-blue);
      }
    }

    .v-field--variant-outlined .v-field__outline {
      display: none;
    }

    .v-select .v-field.v-field {
      display: flex;
      align-items: center;
      height: 35px;
      width: 100%;
      min-width: 100px;
      padding-inline-end: 5px;
      color: var(--light-blue);

      .v-field__overlay {
        display: none;
      }

      .v-field__append-inner {
        padding-top: 0;
      }

      .v-field__input {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }

    .download {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: var(--light-blue);
      padding: 0 15px;
      border-radius: 10px;

      img {
        width: 20px;
      }
    }

    .editor-button-plus,
    .editor-button-minus {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid rgba(255, 255, 225, 0.2);
      border-radius: 10px;

      img {
        width: 15px;
        height: 15px;
      }
    }
  }
}

.v-menu > .v-overlay__content > .v-list {
  background-color: var(--main-backgground-color);
  backdrop-filter: blur(5px);
  color: var(--light-blue) !important;
  border-radius: 10px;

  .v-list-item-title {
    font-size: 13px;
  }
}

</style>
