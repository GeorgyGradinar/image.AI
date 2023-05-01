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
  padding: 50px 0;

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
    box-shadow: 5px -5px 9px #131315,
    -2px 2px 9px #2b2d31;
    background: rgb(31, 32, 35);
    background: linear-gradient(223deg, rgba(31, 32, 35, 1) 0%, rgba(34, 36, 39, 1) 71%, rgba(43, 45, 49, 1) 100%);

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
      border: 1px solid black;
      border-radius: 30px;
      padding: 10px 20px;
      font-weight: 700;
      color: var(--main-light-color);
      background: rgb(74, 211, 251);
      background: linear-gradient(125deg, rgba(74, 211, 251, 1) 0%, rgba(148, 165, 251, 1) 9%, rgba(247, 105, 250, 1) 56%, rgba(255, 100, 250, 1) 100%);
      transition: all 0.3s;
    }
  }
}
</style>
