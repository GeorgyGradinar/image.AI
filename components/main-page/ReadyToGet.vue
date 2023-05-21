<template>
  <div class="wrapper">
    <section>
      <h2>Готовы начать?</h2>
      <p>Изучите наши инструменты или создайте учетную запись.</p>
      <button class="create-project">Начать проект
        <v-icon end icon="mdi-arrow-right"></v-icon>
      </button>
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
      width: 270px;
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
