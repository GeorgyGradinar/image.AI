<template>
  <section class="pages">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </section>
</template>

<script>

import Header from "@/components/HeaderElement";
import Footer from "@/components/FooterElement";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
@import "style/index.css";

.pages {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #150d46;
}
</style>
