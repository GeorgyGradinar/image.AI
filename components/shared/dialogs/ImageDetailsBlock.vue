<template>
  <section class="main-content" persistent>
    <div class="image-wrapper">
      <img class="background-image" alt="generated image"
           :src="image.url || image.share_url">
      <img class="main-image" alt="generated image"
           :src="image.url || image.share_url">
    </div>
    <div class="image-details">
      <p class="details-item">
        <span class="title">Описание:</span>
        <span class="content">{{ image.params?.prompt }}</span>
      </p>

      <p class="details-item with-divider">
        <span class="title" v-if="image?.params?.negative_prompt">Исключения:</span>
        <span class="content"> {{
            image?.params?.negative_prompt !== 'null' ? image?.params?.negative_prompt : ''
          }}</span>
      </p>

      <div class="options with-divider">
        <div class="refresh" @click="reuseFilterParameters">
          <img src="~/assets/images/text-to-image/block-images/image-details/refresh.svg" alt="refresh">
          <p>Переиспользовать параметры</p>
        </div>
        <!--        <NuxtLink to="/editor" class="edit">-->
        <!--          <img src="~/assets/images/text-to-image/block-images/image-details/edit.svg" alt="">-->
        <!--          <p>Открыть в редакторе</p>-->
        <!--        </NuxtLink>-->
        <a class="download" :href="image.url"
           @click.prevent="downloadImage(image.url || image.share_url, image.params?.prompt)">
          <img src="~/assets/images/text-to-image/block-images/image-details/download.svg" alt="download">
          <p>Скачать</p>
        </a>
        <!--        <div class="reuse" @click="reuseImageParameter">-->
        <!--          <img src="~/assets/images/text-to-image/block-images/image-details/image.svg" alt="">-->
        <!--          <p>Использовать изображение</p>-->
        <!--        </div>-->
        <!--        <div class="improve-quality">-->
        <!--          <img src="~/assets/images/text-to-image/block-images/duble-arrows.svg" alt="">-->
        <!--          <p>Повысить разрешение</p>-->
        <!--        </div>-->
        <div class="share-button" @click="toggleShowShareDialog">
          <img src="~/assets/images/text-to-image/block-images/image-details/share.svg" alt="share">
          <strong>Поделиться</strong>
        </div>
      </div>

      <div class="short-details">
        <p class="details-item">
          <span class="title">Размер:</span>
          <span class="content">{{ image.params?.width }} х {{ image.params?.height }}</span>
        </p>
        <p class="details-item">
          <span class="title">Степень соответствия:</span>
          <span class="content">{{ image.params?.similarity ? image.params?.similarity : 1 }}</span>
        </p>
        <!--        <p class="details-item">-->
        <!--          <span class="title">Сид:</span>-->
        <!--          <span class="content">{{ image.params.seeds }}</span>-->
        <!--        </p>-->
        <p class="details-item">
          <span class="title">Шагов прорисовки:</span>
          <span class="content">{{ image.params?.steps }}</span>
        </p>
        <!--        <p class="details-item">-->
        <!--          <span class="title">Семплер:</span>-->
        <!--          <span class="content">DPM-Solver++</span>-->
        <!--        </p>-->
        <p class="details-item">
          <span class="title">Создано:</span>
          <span class="content">{{ getDate(image.created_at) }}</span>
        </p>
      </div>
    </div>
  </section>

  <ShareImageDialog v-if="isOpenShareDialog" :image-src="image.url || image.share_url" :imageSharedUrl="image"
                    @close="toggleShowShareDialog">
  </ShareImageDialog>
</template>

<script setup>
import ShareImageDialog from "~/components/dialogs/ShareImageDialog";
import {defineEmits, defineProps, onMounted, onUnmounted, ref, toRefs} from "vue";
import {personStore} from "~/store/personStore";
import shareFunctions from "~/mixins/shareFunctions";
import {useRouter} from "nuxt/app";

const store = personStore();
const {reuseParameters, changeFilters} = store;
const {reuseImageParameters} = shareFunctions();
const emit = defineEmits(['reuse']);
const props = defineProps({
  image: Object,
  route: Object
});
const {image, route} = toRefs(props);
const router = useRouter();

let isOpenShareDialog = ref(false);

onMounted(() => {
  document.addEventListener('click', checkClickOutSide);
})

function checkClickOutSide(event) {
  console.log('test click')
  if (Array.from(event.target.parentElement.classList).includes('share')) {
    isOpenShareDialog.value = false;
  } else if (Array.from(event.target.parentElement.classList).includes('image')) {
    closeDialog();
  }
}

async function downloadImage(imageSrc, imageName) {
  const response = await fetch(imageSrc);
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);
  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  anchorElement.download = imageName || 'image';

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}

function checkRoute() {
  if (route.value) {
    router.push({path: '/text-to-image'});
  }
}

function reuseFilterParameters() {
  reuseImageParameters(image.value);
  closeDialog();
  router.push({path: '/text-to-image'});
}

function getDate(time) {
  let currentDate = new Date(time);
  let day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
  let month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  return `${day}.${month}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function toggleShowShareDialog() {
  isOpenShareDialog.value = !isOpenShareDialog.value;
}

function closeDialog() {
  emit('close');
  document.removeEventListener('click', checkClickOutSide);
}

onUnmounted(() => {
  document.removeEventListener('click', checkClickOutSide);
})
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
    min-width: 350px;

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
        //width: calc(50% - 5px);
        width: 100%;
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
