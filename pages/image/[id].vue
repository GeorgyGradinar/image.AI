<template>
  <div class="wrapper-shared-image">
    <ImageDetailsBlock v-if="image" :image="image" :route="route.params.id"></ImageDetailsBlock>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useRoute} from "nuxt/app";
import requests from "~/mixins/requests";
import ImageDetailsBlock from "~/components/shared/dialogs/ImageDetailsBlock";

const {getImageShared} = requests();
const route = useRoute();

let image = ref();

onMounted(() => {
  image.value = getImageShared(route.params.id);
})

</script>

<style lang="scss">

.wrapper-shared-image {
  display: flex;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 100px 10vw 5vh;
  color: var(--main-light-color);
  background-color: rgba(43, 43, 43, 1);
}

@media screen and (max-width: 1400px) {
  .wrapper-shared-image {
    padding: 100px 0 5vh 0;

    .main-content {
      overflow: hidden;
      min-height: 100vh;
    }
  }
}

</style>
