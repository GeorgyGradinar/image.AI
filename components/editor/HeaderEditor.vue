<template>
  <header class="header-editor">
    <div class="wrapper-logo-tools">
      <NuxtLink to="/editor" class="logo">Лого</NuxtLink>
      <div class="tools">
        <button class="cursor" @click="selection('cursor')" :class="{'selected': selectedTool === 'cursor'}">
          <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 297 297" xml:space="preserve">
<g>
	<path d="M128.835,297c-4.015,0-7.646-2.395-9.227-6.092L1.295,13.976C-0.317,10.202,0.531,5.827,3.436,2.93
		c2.907-2.898,7.285-3.734,11.052-2.112l275.956,118.729c3.715,1.599,6.107,5.271,6.068,9.314c-0.04,4.044-2.504,7.67-6.248,9.194
		L182.059,182.13l-43.921,108.598c-1.52,3.758-5.15,6.233-9.203,6.273C128.901,297,128.868,297,128.835,297z M29.609,29.17
		l98.974,231.661l36.462-90.156c1.017-2.513,3.006-4.508,5.517-5.53L260.5,128.51L29.609,29.17z"/>
</g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
</svg>
        </button>
        <button class="hand" @click="selection('gap')" :class="{'selected': selectedTool === 'gap'}">
          <svg id="Icons" x="0px" y="0px"
               viewBox="0 0 32 32" xml:space="preserve">
            <path class="st2" d="M15,17V7c0-1.1-0.9-2-2-2h0c-1.1,0-2,0.9-2,2v13l-3-5.2c-0.6-1-1.8-1.3-2.8-0.6l0,0c-0.7,0.5-1.1,1.4-0.7,2.3
	l0,0c1.6,4.3,4,8.4,7,11.9"/>
            <path class="st2" d="M15,17V5c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v12"/>
            <path class="st2" d="M19,17V7c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v10"/>
            <path class="st2" d="M23,17V9c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v8v0c0,4-0.8,7.9-2.4,11.5"/>
</svg>
        </button>
        <button class="focus">
          <svg id="Icons" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
            <circle class="st0" cx="16" cy="16" r="4"/>
            <path class="st0" d="M3,11V6c0-1.1,0.9-2,2-2h5"/>
            <path class="st0" d="M10,28H5c-1.1,0-2-0.9-2-2v-5"/>
            <path class="st0" d="M29,21v5c0,1.1-0.9,2-2,2h-5"/>
            <path class="st0" d="M22,4h5c1.1,0,2,0.9,2,2v5"/>
</svg>
        </button>
        <label class="upload">
          <input type="file">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g id="Image">
              <path
                  d="M25,2H7A5,5,0,0,0,2,7V25a5,5,0,0,0,5,5H25a5,5,0,0,0,5-5V7A5,5,0,0,0,25,2ZM7,4H25a3,3,0,0,1,3,3v5.59l-1.88-1.88a3,3,0,0,0-4.24,0l-7.95,8-3-2.42a3,3,0,0,0-3.8,0L4,18.86V7A3,3,0,0,1,7,4ZM25,28H7a3,3,0,0,1-3-3V21.47l4.38-3.66a1,1,0,0,1,1.27,0l3.73,3a1,1,0,0,0,1.33-.07l8.58-8.59a1,1,0,0,1,1.42,0L28,15.41V25A3,3,0,0,1,25,28Z"/>
              <path d="M10,13a3,3,0,1,0-3-3A3,3,0,0,0,10,13Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,10,9Z"/>
            </g>
          </svg>
        </label>
        <button class="eraser" @click="selection('eraser')" :class="{'selected': selectedTool === 'eraser'}">
          <svg id="Icons" x="0px" y="0px" viewBox="0 0 32 32" xml:space="preserve">
            <line class="st0" x1="5" y1="29" x2="27" y2="29"/>
            <line class="st0" x1="12" y1="10" x2="22" y2="20"/>
            <path class="st0" d="M9.9,25H17l10.1-10.1c1.6-1.6,1.6-4.1,0-5.7l-4.3-4.3c-1.6-1.6-4.1-1.6-5.7,0L6.3,15.7c-1.6,1.6-1.6,4.1,0,5.7
	L9.9,25z"/>
</svg>
        </button>
        <v-app>
          <div class="slider" v-if="selectedTool === 'eraser'" :class="{'show-slider': selectedTool === 'eraser'}">
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
        <img src="~assets/images/editor/plus-editor.svg" alt="plus">
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


import {onMounted, watch} from "vue";
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
  border-bottom: 1px solid rgba(255, 255, 225, 0.1);
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

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          box-shadow: var(--hover-box-shadow);
          border: 1px solid var(--light-blue);
        }

        &:active {
          background-color: #2b2b2be5;
        }
      }

      .cursor {
        svg {
          g {
            path {
              fill: var(--main-light-color);
            }
          }
        }

        &:active {
          svg {
            g {
              path {
                fill: var(--light-blue);
              }
            }
          }
        }
      }

      .cursor.selected {
        svg {
          g {
            path {
              fill: var(--light-blue);
            }
          }
        }
      }

      .hand {
        svg {
          .st2 {
            fill: none;
            stroke: var(--main-light-color);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        }

        &:active {
          svg {
            .st2 {
              stroke: var(--light-blue);
            }
          }
        }
      }

      .hand.selected {
        svg {
          .st2 {
            stroke: var(--light-blue);
          }
        }
      }

      .focus {
        svg {
          .st0 {
            fill: none;
            stroke: var(--main-light-color);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        }

        &:active {
          svg {
            .st0 {
              stroke: var(--light-blue);
            }
          }
        }
      }

      .upload {
        position: relative;
        padding: 10px;
        cursor: pointer;

        input {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          opacity: 0;
        }

        svg {
          fill: var(--main-light-color);
        }
      }

      .eraser {
        svg {
          .st0 {
            fill: none;
            stroke: var(--main-light-color);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 10;
          }
        }

        &:active {
          svg {
            .st0 {
              stroke: var(--light-blue);
            }
          }
        }
      }

      .eraser.selected {
        svg {
          .st0 {
            stroke: var(--light-blue);
          }
        }
      }

      .selected {
        background-color: #2b2b2be5;
        border: 1px solid var(--light-blue);
      }

      .v-application .v-application__wrap {
        min-height: 50px;
        background-color: var(--main-backgground-color);

        .slider {
          position: absolute;
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

        .v-slider.v-input--horizontal .v-slider-track__fill {
          height: 4px;
        }
      }
    }
  }

  .editor-header-title {
    display: flex;

    p {
      display: flex;
    }

    .name {
      min-width: 100px;
      color: var(--main-light-color);
    }

    input {
      width: 100px;
      min-width: 100px;
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
      color: var(--main-backgground-color);
      font-weight: bold;
      transition: all 0.2s;

      img {
        width: 20px;
      }

      &:hover {
        box-shadow: var(--hover-box-shadow);
      }
    }

    .editor-button-plus,
    .editor-button-minus {
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid rgba(255, 255, 225, 0.2);
      border-radius: 10px;
      transition: all 0.2s;

      img {
        width: 15px;
        height: 15px;
      }

      &:hover {
        box-shadow: var(--hover-box-shadow);
        border: 1px solid var(--light-blue);
      }

      &:active {
        background-color: #2b2b2be5;
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
