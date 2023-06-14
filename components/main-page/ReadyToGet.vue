<template>
  <div class="wrapper">
    <section>
      <h2>Готовы начать?</h2>
      <p>Попробуйте нейросеть НейроХолст прямо сейчас!</p>
      <NuxtLink to="text-to-image" class="create-project">Нарисовать бесплатно
        <v-icon end icon="mdi-arrow-right"></v-icon>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #1f2023;
  padding: 100px 0;

  section {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 0 50px;
    padding: 50px 0;
    border-radius: 50px;
    color: var(--main-light-color);

    h2 {
      font-size: 35px;
      line-height: 50%
    }

    p {
      font-size: 13px;
      text-align: center;
    }

    .create-project {
      height: 60px;
      width: 300px;

      &:link {
        text-decoration: none;
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .wrapper {
    section {
      h2 {
        font-size: 25px;
      }

      p {
        font-size: 13px;
      }
    }
  }
}
</style>
