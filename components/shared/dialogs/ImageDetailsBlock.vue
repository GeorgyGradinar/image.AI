<template>
  <section class="main-content" persistent>
    <div class="image-wrapper">
      <img class="background-image" alt="generated image"
           :src="useAsset(image.img)">
      <img class="main-image" alt="generated image"
           :src="useAsset(image.img)">
    </div>
    <div class="image-details">
      <p class="details-item">
        <span class="title">Описание:</span>
        <span class="content">{{ image.filters.description }}</span>
      </p>

      <p class="details-item with-divider">
        <span class="title" v-if="image.filters.exception">Исключение:</span>
        <span class="content"> {{ image.filters.exception }}</span>
      </p>

      <div class="options with-divider">
        <div class="refresh" @click="reuseFilterParameters">
          <img src="~/assets/images/text-to-image/block-images/image-details/refresh.svg" alt="">
          <p>Переиспользовать параметры</p>
        </div>
        <NuxtLink to="/editor" class="edit">
          <img src="~/assets/images/text-to-image/block-images/image-details/edit.svg" alt="">
          <p>Открыть в редакторе</p>
        </NuxtLink>
        <a class="download" :href="useAsset(image.img)" download>
          <img src="~/assets/images/text-to-image/block-images/image-details/download.svg" alt="">
          <p>Скачать</p>
        </a>
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
          <span class="content">{{ image.filters.size.width }} х {{ image.filters.size.height }}</span>
        </p>
        <p class="details-item">
          <span class="title">Шкала навигации:</span>
          <span class="content">{{ image.filters.parameters.navigation }}</span>
        </p>
        <p class="details-item">
          <span class="title">Seed:</span>
          <span class="content">{{ image.filters.parameters.seed }}</span>
        </p>
        <p class="details-item">
          <span class="title">Шаги:</span>
          <span class="content">{{ image.filters.parameters.step }}</span>
        </p>
        <p class="details-item">
          <span class="title">Семплер:</span>
          <span class="content">DPM-Solver++</span>
        </p>
        <p class="details-item">
          <span class="title">Создано:</span>
          <span class="content">{{ image.date }}</span>
        </p>
      </div>
    </div>
  </section>

  <ShareImageDialog v-if="isOpenShareDialog" :image-src="useAsset(image.img)" :imageSharedUrl="image.img"
                    @close="toggleShowShareDialog"></ShareImageDialog>
</template>

<script setup>
import ShareImageDialog from "~/components/dialogs/ShareImageDialog";
import {defineEmits, defineProps, onMounted, ref, toRefs} from "vue";
import {personStore} from "~/store/personStore";
import {useRouter} from "nuxt/app";

const store = personStore();
const {reuseParameters, changeFilters} = store;
const emit = defineEmits(['reuse']);
const props = defineProps({
  image: {},
  route: String
});
const {image, route} = toRefs(props);
const router = useRouter();

let isOpenShareDialog = ref(false);

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (Array.from(event.target.parentElement.classList).includes('share')) {
      isOpenShareDialog.value = false;
    } else if (Array.from(event.target.parentElement.classList).includes('image')) {
      emit('reuse');
    }
  })
})

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/images/main-page/' + path]
}

function checkRoute() {
  if (route.value) {
    router.push({path: '/text-to-image'})
  }
}

function reuseFilterParameters() {

  let changeFilters = {
    description: image._object.image.filters.description,
    exception: image._object.image.filters.exception,
    size: {
      width: image._object.image.filters.size.width,
      height: image._object.image.filters.size.height
    },
    parameters: {
      countImages: image._object.image.filters.parameters.countImages,
      step: image._object.image.filters.parameters.step,
      navigation: image._object.image.filters.parameters.navigation,
      seed: image._object.image.filters.parameters.seed
    },
  }
  reuseParameters(changeFilters);
  checkRoute()
  emit('reuse', "Параметры установлены");
}

function reuseImageParameter() {
  changeFilters('image', {name: 'fsd', url: useAsset(image._object.image.img)});
  checkRoute()
  emit('reuse', "Изображение установлено");
}

function toggleShowShareDialog() {
  isOpenShareDialog.value = !isOpenShareDialog.value;
}

</script>

<style scoped lang="scss">
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
    }

    .main-image {
      position: absolute;
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

      .edit {
        color: var(--main-light-color);

        &:link {
          text-decoration: none;
        }
      }

      .download {
        color: var(--main-light-color);

        &:link {
          text-decoration: none;
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

@media screen and (max-width: 2000px) {
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

@media screen and (max-width: 1400px) {

  .main-content {
    flex-direction: column;
    padding: 15px;
    gap: 20px;
    overflow: auto;

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

</style>
