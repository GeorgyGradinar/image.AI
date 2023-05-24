<template>
  <v-dialog class="dialog models" v-model="isOpen" persistent>
    <v-card class="card-models">
      <div class="header">

        <h1>Выберите модель</h1>

        <v-text-field
            v-model.trim="search"
            density="compact"
            variant="solo"
            label="Поиск"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
        ></v-text-field>

        <button @click.prevent="$emit('close', currentModel)">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
        </button>
      </div>

      <section class="main-block-models">
        <div class="wrapper-model"
             v-for="model of models" :key="model.id"
             :class="{'selected-model': currentModel === model.name}"
             @click="selectedModel(model.name)">
          <div class="wrapper-model-done">
            <img src="~/assets/images/snack-bars/done.svg" alt="done">
          </div>
          <img v-for="image of model.images" :src="useAsset(image)" alt="model">
          <div class="wrapper-model-description">
            <h3>{{ model.name }}</h3>
            <p>{{ model.description }}</p>
          </div>
        </div>
        <div class="not-found" v-if="textForAlert">
          {{ textForAlert }}
        </div>
      </section>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";

const emit = defineEmits(['close']);
const store = personStore();
const {filters} = storeToRefs(store);

let textForAlert = ref('');
let isOpen = ref(true);
let allModels = ref([
  {
    name: 'Диффузия v2.1',
    description: 'Последняя модель преобразования текста в изображение от StabilityAI',
    images: [
      'img-56NIBOvrjSaKS45vxomR6n.jpeg',
      'img-aD3ZVFuZOQykjCugaqYZLa.jpeg',
      'img-afDC6nRaihw1IidGRKib8J.jpeg',
      'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg'
    ]
  },
  {
    name: 'диффузия v1.5',
    description: 'Модель преобразования текста в изображение от StabilityAI',
    images: [
      'img-kWY1RGIowDFHObYWrqKEuX.jpeg',
      'img-M30VWmdBvEYfVrdNmp5RFW.jpeg',
      'img-MX8g0VKpK3LZUEulhywQE7.jpeg',
      'img-mz3jpmlQzO8enprS6Z5IUk.jpeg'
    ]
  },
  {
    name: 'Реалистичное',
    description: 'Создавайте фотореалистичных персонажей.',
    images: [
      'anime1.jpeg',
      'anime2.jpeg',
      'anime-boy-thumbnail.jpg',
      'Anime-Day-1200x834.jpg',
    ]
  },
  {
    name: 'Аниме Диффузия',
    description: 'Получите высококачественные изображения аниме.к ймисс',
    images: [
      'disney.png',
      'disney1.jpeg',
      'disney2.jpg',
      'disney3.jpg'
    ]
  },
  {
    name: 'Бесконечная мечта',
    description: 'Создавайте изображения для косплея, аниме и сказочное искусство.',
    images: [
      'dream2.jpeg',
      'dreams.jpeg',
      'dream3.jpg',
      'dream4.jpeg'
    ]
  },
  {
    name: 'Опенджорни',
    description: 'Стиль похож на изображения Midjourney.',
    images: [
      'openjournay.jpeg',
      'openjournay2.jpeg',
      'openjournay3.jpg',
      'openjournay4.jpeg'
    ]
  },
  {
    name: 'RPG',
    description: 'Создавайте портреты для ролевых игр.',
    images: [
      'rpg.jpg',
      'rpg2.jpeg',
      'rpg3.jpg',
      'rpg4.jpg'
    ]
  },
  {
    name: 'Gilbi',
    description: 'Создавайте портреты для ролевых игр.',
    images: [
      'gilbi.jpg',
      'gilbi2.jpg',
      'gilbi3.jpeg',
      'gilbi4.jpg'
    ]
  },
  {
    name: 'Диффуз2ия v2.1',
    description: 'Последняя модель преобразования текста в изображение от StabilityAI',
    images: [
      'img-56NIBOvrjSaKS45vxomR6n.jpeg',
      'img-aD3ZVFuZOQykjCugaqYZLa.jpeg',
      'img-afDC6nRaihw1IidGRKib8J.jpeg',
      'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg'
    ]
  },
  {
    name: 'диффузия v1.51',
    description: 'Модель преобразования текста в изображение от StabilityAI',
    images: [
      'img-kWY1RGIowDFHObYWrqKEuX.jpeg',
      'img-M30VWmdBvEYfVrdNmp5RFW.jpeg',
      'img-MX8g0VKpK3LZUEulhywQE7.jpeg',
      'img-mz3jpmlQzO8enprS6Z5IUk.jpeg'
    ]
  },
  {
    name: 'Реалистичное1',
    description: 'Создавайте фотореалистичных персонажей.',
    images: [
      'anime1.jpeg',
      'anime2.jpeg',
      'anime-boy-thumbnail.jpg',
      'Anime-Day-1200x834.jpg',
    ]
  },
  {
    name: 'Аниме Диффузия1',
    description: 'Получите высококачественные изображения аниме.к ймисс',
    images: [
      'disney.png',
      'disney1.jpeg',
      'disney2.jpg',
      'disney3.jpg'
    ]
  },
  {
    name: 'Бесконечная мечта1',
    description: 'Создавайте изображения для косплея, аниме и сказочное искусство.',
    images: [
      'dream2.jpeg',
      'dreams.jpeg',
      'dream3.jpg',
      'dream4.jpeg'
    ]
  },
  {
    name: 'Опенджорни1',
    description: 'Стиль похож на изображения Midjourney.',
    images: [
      'openjournay.jpeg',
      'openjournay2.jpeg',
      'openjournay3.jpg',
      'openjournay4.jpeg'
    ]
  },
  {
    name: 'RPG1',
    description: 'Создавайте портреты для ролевых игр.',
    images: [
      'rpg.jpg',
      'rpg2.jpeg',
      'rpg3.jpg',
      'rpg4.jpg'
    ]
  },
  {
    name: 'Gilbi1',
    description: 'Создавайте портреты для ролевых игр.',
    images: [
      'gilbi.jpg',
      'gilbi2.jpg',
      'gilbi3.jpeg',
      'gilbi4.jpg'
    ]
  },
]);
let models = ref([]);
let search = ref('');
let currentModel = ref('Диффузия v2.1');
let debounceTimeout = ref(null);

onMounted(() => {
  currentModel.value = filters._value.model;
  models.value = allModels.value;

  document.addEventListener('click', (event) => {
    if (Array.from(event.target.classList).includes('v-overlay__scrim')) {
      emit('close', currentModel.value);
    }
  })
})

watch(search, (newData) => {
  debounceSearch(newData)
})

function debounceSearch() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
  debounceTimeout = setTimeout(() => {
    searchImage(search.value)

  }, 500);
}

function searchImage(data) {
  let filtered;
  if (data) {
    filtered = allModels.value.filter(model => {
      if (model.name.includes(data) || model.description.includes(data)) {
        return model;
      }
    })
  } else {
    filtered = allModels.value;
  }

  models.value = filtered;
  textForAlert.value = filtered.length ? '' : 'Модель не найдена';

}

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/images/models/' + path]
}

function selectedModel(name) {
  currentModel.value = name;
}
</script>

<style lang="scss">
.dialog.models {
  .v-overlay__content {
    margin: 50px 80px;
    width: 100%;
    max-width: 90vw;

    .card-models {
      border-radius: 20px;
      color: var(--main-light-color);
      background-color: rgba(43, 43, 43, 1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 100%;

      .header {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
        width: 100%;
        border-bottom: 1px solid rgba(248, 248, 221, 0.4);

        h1 {
          display: flex;
          align-items: center;
          margin-right: 30px;
          font-size: 20px;
        }

        .v-input--density-compact {
          .v-input__control {
            width: 300px;
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
        }

        button {
          img {
            opacity: 0.6;
          }
        }
      }

      .main-block-models {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 1vw;
        width: 100%;
        max-height: calc(100vh - 155px);
        min-height: calc(100vh - 155px);
        padding: 20px 20px;
        overflow: auto;

        .wrapper-model {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          max-width: calc(17vw - 7px);
          max-height: calc(17vw - 7px);
          border-radius: 10px;
          overflow: hidden;
          object-fit: cover;
          border: 2px solid rgba(0, 0, 0, 0);
          cursor: pointer;

          img {
            display: flex;
            justify-content: center;
            align-items: center;
            object-fit: cover;
            width: 100%;
            height: 100%;
            max-width: 50%;
            max-height: 50%;
          }

          .wrapper-model-description {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: absolute;
            font-size: 13px;
            padding: 10px;
            color: var(--light-blue);
            background: rgb(0, 0, 0);
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.76234243697479) 0%, rgba(0, 0, 0, 0.45702030812324934) 23%, rgba(0, 0, 0, 0) 100%);

            p {
              height: 0;
              color: var(--main-light-color);
              transition: all 0.2s;
              overflow: hidden;
            }
          }

          .wrapper-model-done {
            display: flex;
            min-width: 25px;
            min-height: 25px;
            justify-content: center;
            align-items: center;
            position: absolute;
            border-radius: 50%;
            top: 5px;
            right: 5px;
            background-color: var(--main-light-color);
            padding: 2px;
            opacity: 0;
            transition: 0.2s;
          }

          &:hover {
            .wrapper-model-description {
              background: rgb(0, 0, 0);
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.8547794117647058) 0%, rgba(0, 0, 0, 0.7035189075630253) 23%, rgba(0, 0, 0, 0) 100%);

              p {
                height: 25%;
              }
            }
          }
        }

        .selected-model {
          border: 2px solid var(--light-blue);

          .wrapper-model-done {
            opacity: 1;
          }
        }

        .not-found {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 100px;
          opacity: 0.6;
        }
      }
    }
  }
}

@media screen and (min-width: 1925px) {
  .dialog.models {
    .v-overlay__content {
      .card-models {
        .main-block-models {
          .wrapper-model {
            .wrapper-model-description {
              h3 {
                font-size: 20px;
              }

              p {
                font-size: 15px;
              }
            }

            &:hover {
              .wrapper-model-description {
                p {
                  height: 15%;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .dialog.models {
    .v-overlay__content {
      .card-models {
        .main-block-models {
          .wrapper-model {
            max-width: calc(21vw - 4px);
            max-height: calc(21vw - 4px);

            .wrapper-model-description {
              background: rgb(0, 0, 0);
              background: linear-gradient(0deg, rgba(0, 0, 0, 0.8547794117647058) 0%, rgba(0, 0, 0, 0.7035189075630253) 23%, rgba(0, 0, 0, 0) 100%);

              p {
                height: 25%;
                font-size: 11px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .dialog.models {
    .v-overlay__content {
      .card-models {
        .main-block-models {
          .wrapper-model {
            max-width: calc(21vw - 5px);
            max-height: calc(21vw - 5px);

            .wrapper-model-description {

              p {
                height: unset;
                font-size: 11px;
              }
            }

            &:hover {
              .wrapper-model-description {

                p {
                  height: unset;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .dialog.models {
    .v-overlay__content {
      .card-models {
        .header {
          h1 {
            display: none;
          }
        }

        .main-block-models {
          .wrapper-model {
            max-width: calc(42vw - 7px);
            max-height: calc(42vw - 7px);

            .wrapper-model-description {
              p {
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .dialog.models {
    .v-overlay__content {
      .card-models {
        .header {
          h1 {
            display: none;
          }

          .v-input--density-compact {
            .v-input__control {
              width: 230px;
            }
          }
        }

        .main-block-models {
          .wrapper-model {
            max-width: calc(100vw - 7px);
            max-height: calc(70vw - 7px);
          }
        }
      }
    }
  }
}
</style>
