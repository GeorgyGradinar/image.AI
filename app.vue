<template>
  <div>
    <NuxtLayout>
      <section class="pages">
        <Header v-if="isHeaderVisible"></Header>
        <main>
          <NuxtPage></NuxtPage>
        </main>
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
let isHeaderVisible = ref(true);

const title = ref('My App')
const description = ref('My App Description')
useHead({
  title,
  meta: [{
    name: 'description',
    content: 'upgrade-insecure-requests',
    'http-equiv': "Content-Security-Policy"
  }]
})

onMounted(() => {
  checkRoute(route);
})

watch(route, (to) => {
  checkRoute(to);
})

function checkRoute(to) {
  const urlsForHeader = ['editor/project'];
  const urlsForFooter = ['text-to-image', 'editor/project'];
  isFooterVisible.value = !urlsForFooter.some((url) => to.path.includes(url));
  isHeaderVisible.value = !urlsForHeader.some((url) => to.path.includes(url))
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
