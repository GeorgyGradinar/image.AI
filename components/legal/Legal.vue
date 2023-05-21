<template>
  <div class="wrapper-page">
    <section>
      <NavigationBlock></NavigationBlock>
      <slot></slot>
    </section>
  </div>
</template>

<script setup>

import NavigationBlock from "./NavigationBlock";
</script>

<style scoped lang="scss">
.wrapper-page {
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--main-backgground-color);
  padding-top: 70px;

  section {
    width: 100%;
    max-width: 1440px;
    display: flex;
    justify-content: center;
    padding: 20px 0 ;
  }
}

@media screen and (max-width: 600px) {
  .wrapper-page {

    section {
      flex-direction: column;
    }
  }
}

</style>
