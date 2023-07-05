<template>
  <div class="page-projects">
    <h1>Мои проекты:</h1>
    <Projects></Projects>
  </div>
</template>

<script setup>
import Projects from "~/components/editor/Projects";

</script>

<style scoped lang="scss">
.page-projects {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  padding: 100px 25px 0;
  background-color: var(--main-backgground-color);

  h1 {
    color: var(--main-light-color);
  }
}
</style>
