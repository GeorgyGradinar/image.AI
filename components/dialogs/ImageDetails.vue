<template>
  <v-dialog class="dialog image" v-model="isOpen" persistent>
    <v-card class="card">
      <div class="header">
        <button @click.prevent="$emit('close')">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
        </button>
      </div>
      <ImageDetailsBlock :image="imageSrc" @reuse="reuseParameter"></ImageDetailsBlock>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits} from "vue";
import ImageDetailsBlock from "../shared/dialogs/ImageDetailsBlock";

const emit = defineEmits(['close']);
const props = defineProps({
  imageSrc: {},
});

let isOpen = ref(true);

function reuseParameter(message) {
  emit('close', message);
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
    }
  }
}
</style>
