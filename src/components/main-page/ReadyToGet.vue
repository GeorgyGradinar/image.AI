<template>
  <div class="wrapper">
    <section>
      <h1>Готовы начать?</h1>
      <p>Изучите наши инструменты или создайте учетную запись.</p>
      <v-btn class="create-project">Начать проект
        <v-icon end icon="mdi-arrow-right"></v-icon>
      </v-btn>
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

    h1 {
      font-size: 35px;
      line-height: 50%
    }

    p {
      font-size: 13px;
    }

    .create-project {
      height: 60px;
      width: 270px;
      display: flex;
      justify-content: center;
      border-radius: 30px;
      padding: 10px 20px;
      font-weight: 700;
      color: var(--main-light-color);
      background: linear-gradient(to left, var(--light-blue), var(--light-pink));
      transition: all 0.3s;
    }
  }
}
</style>
