<template>
  <v-dialog class="dialog image" v-model="isOpen" persistent>
    <v-card class="card">
      <div class="header">
        <button @click.prevent="$emit('close')">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
        </button>
      </div>

      <section class="main-content">
        <div class="image-wrapper">
          <img class="background-image" alt="generated image"
               :src="useAsset(imageSrc.img)">
          <img class="main-image" alt="generated image"
               :src="useAsset(imageSrc.img)">
        </div>
        <div class="image-details">
          <p class="details-item">
            <span class="title">Описание:</span>
            <span class="content">{{ imageSrc.filters.description }}</span>
          </p>

          <p class="details-item with-divider">
            <span class="title" v-if="imageSrc.filters.exception">Исключение:</span>
            <span class="content"> {{ imageSrc.filters.exception }}</span>
          </p>

          <div class="options with-divider">
            <div class="refresh" @click="reuseFilterParameters">
              <img src="~/assets/images/text-to-image/block-images/image-details/refresh.svg" alt="">
              <p>Переиспользовать параметры</p>
            </div>
            <div class="edit">
              <img src="~/assets/images/text-to-image/block-images/image-details/edit.svg" alt="">
              <p>Открыть в редакторе</p>
            </div>
            <div class="download">
              <img src="~/assets/images/text-to-image/block-images/image-details/download.svg" alt="">
              <p>Скачать</p>
            </div>
            <div class="reuse" @click="reuseImageParameter">
              <img src="~/assets/images/text-to-image/block-images/image-details/image.svg" alt="">
              <p>Использовать изображение</p>
            </div>
            <div class="improve-quality">
              <img src="~/assets/images/text-to-image/block-images/duble-arrows.svg" alt="">
              <p>Повысить разрешение</p>
            </div>
            <div class="share-button" @click="toggleShowShareDialog">
              <img src="~/assets/images/text-to-image/block-images/image-details/share.svg" alt="">
              <strong>Поделиться</strong>
            </div>
          </div>

          <div class="short-details">
            <p class="details-item">
              <span class="title">Размер:</span>
              <span class="content">{{ imageSrc.filters.size.width }} х {{ imageSrc.filters.size.height }}</span>
            </p>
            <p class="details-item">
              <span class="title">Шкала навигации:</span>
              <span class="content">{{ imageSrc.filters.parameters.navigation }}</span>
            </p>
            <p class="details-item">
              <span class="title">Seed:</span>
              <span class="content">{{ imageSrc.filters.parameters.seed }}</span>
            </p>
            <p class="details-item">
              <span class="title">Шаги:</span>
              <span class="content">{{ imageSrc.filters.parameters.step }}</span>
            </p>
            <p class="details-item">
              <span class="title">Семплер:</span>
              <span class="content">DPM-Solver++</span>
            </p>
            <p class="details-item">
              <span class="title">Создано:</span>
              <span class="content">{{ imageSrc.date }}</span>
            </p>
          </div>
        </div>
      </section>
    </v-card>
  </v-dialog>

  <ShareImageDialog v-if="isOpenShareDialog" :image-src="useAsset(imageSrc.img)" @close="toggleShowShareDialog"></ShareImageDialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, toRefs, onMounted} from "vue";
import {personStore} from "~/store/personStore";
import ShareImageDialog from "~/components/dialogs/ShareImageDialog";

const emit = defineEmits(['close']);
const store = personStore();
const {reuseParameters, changeFilters} = store;
const props = defineProps({
  imageSrc: {},
});
const {imageSrc} = toRefs(props);

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (Array.from(event.target.parentElement.classList).includes('share')) {
      isOpenShareDialog.value = false;
    }else if (Array.from(event.target.parentElement.classList).includes('image')){
      emit('close');
    }
  })
})

let isOpen = ref(true);
let isOpenShareDialog = ref(false);

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/images/main-page/' + path]
}

function reuseFilterParameters() {
  let changeFilters = {
    description: imageSrc._object.imageSrc.filters.description,
    exception: imageSrc._object.imageSrc.filters.exception,
    size: {
      width: imageSrc._object.imageSrc.filters.size.width,
      height: imageSrc._object.imageSrc.filters.size.height
    },
    parameters: {
      countImages: imageSrc._object.imageSrc.filters.parameters.countImages,
      step: imageSrc._object.imageSrc.filters.parameters.step,
      navigation: imageSrc._object.imageSrc.filters.parameters.navigation,
      seed: imageSrc._object.imageSrc.filters.parameters.seed
    },
  }
  reuseParameters(changeFilters);
  emit('close', "Параметры установлены");
}

function reuseImageParameter() {
  changeFilters('image', {name: 'fsd', url: useAsset(imageSrc._object.imageSrc.img)});
  emit('close', "Изображение установлено");
}

function toggleShowShareDialog() {
  isOpenShareDialog.value = !isOpenShareDialog.value;
}

</script>

<style lang="scss">

.dialog.image {
  .v-overlay__content {
    margin: 50px 80px;
    width: 100%;
    max-width: 70vw;
    max-height: calc(100vh - 100px);
    height: calc(100vh - 100px);

    .card {
      border-radius: 20px;
      color: var(--main-light-color);
      background-color: rgba(43, 43, 43, 1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .header {
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px;
      width: 100%;
      border-bottom: 1px solid rgba(248, 248, 221, 0.4);

      button {
        img {
          opacity: 0.6;
        }
      }
    }

    .main-content {
      display: flex;
      padding: 20px;
      flex: 1;
      height: calc(100vh - 185px);
      gap: 30px;

      .image-wrapper {
        border-radius: 20px;
        width: 70%;
        height: 100%;
        overflow: hidden;
        position: relative;

        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(20px);
          opacity: 0.3;
          z-index: -1;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .with-divider {
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(248, 248, 221, 0.4);
      }

      .image-details {
        display: flex;
        flex-direction: column;
        width: 30%;

        .details-item {
          display: flex;
          flex-direction: column;
          font-size: 14px;
          margin-bottom: 10px;

          span {
            margin: 0;
          }

          .title {
            font-size: 15px;
            font-weight: 600;
          }

          .content {
            opacity: 0.6;
          }
        }

        .options {
          position: relative;
          padding-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;

          .refresh,
          .edit,
          .share-button,
          .reuse,
          .improve-quality,
          .download {
            width: calc(50% - 5px);
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid var(--light-blue);
            padding: 15px 10px;
            border-radius: 5px;
            cursor: pointer;

            p {
              font-size: 13px;
              opacity: 0.7;
            }

            &:hover {
              box-shadow: 0 0 10px rgba(54, 226, 255, 0.5);
            }
          }

          .share-button {
            background-color: var(--light-blue);
            color: var(--main-backgground-color);

            strong {
              font-weight: bold;
              font-size: 10px;
            }
          }

          .improve-quality {
            img {
              display: flex;
              width: 25px;
              transform: rotate(-90deg);
            }
          }
        }

        .short-details {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 20px;

          .details-item {
            width: calc(50% - 5px);
            flex-direction: row;
            font-size: 12px;
            margin-bottom: 0;
            gap: 5px;

            .title,
            .content {
              white-space: nowrap;
            }

            .title {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 2000px) {
  .dialog.image {
    .v-overlay__content {
      .main-content {
        .image-details {
          .options {
            .refresh,
            .edit,
            .share-button,
            .reuse,
            .improve-quality,
            .download {
              padding: 5px 10px;

              p {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .dialog.image {
    .v-overlay__content {
      margin: 30px 50px;
      max-width: 90%;
      max-height: calc(100vh - 60px);
      height: calc(100vh - 60px);

      .card {
        padding-bottom: 15px;
      }

      .main-content {
        flex-direction: column;
        padding: 15px;
        gap: 20px;
        height: 100vh;
        overflow-y: auto;

        .image-wrapper {
          width: 100%;
          height: 350px;
          min-height: 200px;
        }

        .image-details {
          width: 100%;

          .options {
            .refresh,
            .edit,
            .share-button,
            .reuse,
            .improve-quality,
            .download {
              width: unset;
            }
          }
        }
      }
    }
  }
}
</style>
