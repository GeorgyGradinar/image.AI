<template>
  <div class="wrapper-shared-image">
    <ImageDetailsBlock v-if="image" :image="image" :route="route.query.id"></ImageDetailsBlock>
    <div v-if="notFind" class="not-find">
      <p>Изображение не найдено</p>
      <NuxtLink to="/" class="secondary">Перейти на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useRoute, useRouter} from "nuxt/app";
import requests from "~/mixins/requests";
import ImageDetailsBlock from "~/components/shared/dialogs/ImageDetailsBlock";

const route = useRoute();
const router = useRouter();
const {getSharedImage} = requests();
let image = ref(null);
let notFind = ref(false);

onMounted(() => {
  if (route.query.id) {
    getImage(route.query.id)
  } else {
    router.push({path: '/'})
  }
})

async function getImage(id){
  await getSharedImage(id)
      .then(response =>{
        image.value = response.image;
      })
}

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

  .not-find {
    p {
      margin: 30px 0;
    }

    .secondary:link {
      text-decoration: none;
    }
  }
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
