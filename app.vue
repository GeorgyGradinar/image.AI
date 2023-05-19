<template>
  <div>
    <NuxtLayout>
      <section class="pages">
        <Header></Header>
        <main>
          <NuxtPage></NuxtPage>
        </main>
        <!--    <Footer v-if="isFooterVisible"></Footer>-->
        <Footer v-if="isFooterVisible"></Footer>
      </section>
    </NuxtLayout>
  </div>
</template>

<script setup>
import Footer from "~/components/FooterElement";
import Header from "~/components/header/HeaderElement";
import {useRoute} from "nuxt/app";
import {onMounted, ref, watch} from "vue";

const route = useRoute();
let isFooterVisible = ref(true);

onMounted(() => {
  checkRoute(route);
})


watch(route, (to) => {
  checkRoute(to);
})

function checkRoute(to) {
  const urls = ['TextToImage'];
  isFooterVisible.value = !urls.some((url) => to.path.includes(url));
}

</script>

<style lang="scss">

.pages {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #150d46;
}

main {
  min-height: 100vh;
}
</style>
