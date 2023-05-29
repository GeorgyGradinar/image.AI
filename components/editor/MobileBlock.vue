<template>
  <section>
    <h1>Переключитесь на десктоп</h1>
    <h3>В данный момент страница доступна только на десктопе</h3>

    <div class="wrapper-button">
      <NuxtLink class="secondary" to="/editor">
        <v-icon icon="mdi-arrow-left"></v-icon>
        Назад
      </NuxtLink>
      <NuxtLink class="create-account" to="/">Использовать другие инструменты</NuxtLink>
    </div>

    <div class="main-image">
      <img src="~assets/images/main-page/img-9jjtCkXWwKjZe9wElBEly2.jpeg" alt="">
      <img src="~assets/images/main-page/img-aHbNRGbgmNutEKIOHdTQ2t.jpeg" alt="">
      <img src="~assets/images/main-page/img-GgOSvUjkqVGiJoacFvZNsG.jpeg" alt="">
      <img src="~assets/images/main-page/img-jYjnraZM46IaWERJsWQEw5.jpeg" alt="">
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
section {
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  color: var(--main-light-color);
  z-index: 10000;

  h1,
  h3 {
    padding: 0 5px;
    text-align: center;
  }

  h1 {
    margin-top: 20px;
  }

  h3 {
    color: rgba(255, 255, 225, 0.4);
  }

  .wrapper-button {
    display: flex;
    gap: 20px;

    .secondary:link,
    .create-account:link {
      text-decoration: none;
    }
  }

  .main-image {
    width: 70vh;
    max-width: 90vw;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 50%;
    }
  }
}

@media screen and (max-width: 500px) {
  section {
    .wrapper-button {
      font-size: 10px;
    }
  }
}
</style>
