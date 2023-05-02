<template>
  <section class="first-block">
    <div class="block-wrapper">
      <div class="wrapper-description">
        <h1>Создавайте потрясающие <span class="gradient">произведения искусства</span> с помощью <span
            class="gradient">AI</span>.</h1>
        <span>Получить img.AI — это набор волшебных инструментов искусственного интеллекта. Создавайте исходные изображения в масштабе, изменяйте фотографии, расширяйте изображения за их первоначальные границы или создавайте собственные модели AI.</span>
        <v-btn class="create-project">Начать проект
          <v-icon end icon="mdi-arrow-right"></v-icon>
        </v-btn>
      </div>
      <ImagesGrid></ImagesGrid>
    </div>
  </section>
</template>

<script setup>
import ImagesGrid from "./ImagesGrid";
</script>

<style scoped lang="scss">

.first-block {
  background: rgb(33, 21, 77);
  background: linear-gradient(115deg, rgba(33, 21, 77, 1) 0%, rgba(33, 21, 77, 1) 49%, rgba(35, 0, 170, 1) 100%);
  display: flex;
  justify-content: center;
  padding: 120px 40px 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .block-wrapper {
    width: 100%;
    max-width: 1440px;
    display: flex;
  }

  .gradient {
    background: linear-gradient(to right, var(--light-pink), var(--light-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .wrapper-description {
    height: 800px;
    width: 50%;
    min-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
    margin-right: 50px;

    h1,
    h1 .gradient {
      color: var(--main-light-color);
      font-size: 40px;
      font-weight: 700;
      line-height: 140%;
    }

    span {
      width: 75%;
      color: var(--main-light-color);
      font-size: 18px;
      line-height: 180%;
      opacity: .8;
      font-weight: 400;
    }

    .create-project {
      height: 60px;
      width: 100%;
      max-width: 300px;
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

@media screen and (max-width: 1200px) {
  .first-block {
    padding: 100px 30px 0;

    .wrapper-description {
      min-width: 500px;
      margin-right: 30px;

      span {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .first-block {
    height: 1500px;

    .wrapper-description {
      min-width: 100%;
      margin-right: 30px;

      h1,
      h1 .gradient {
        font-size: 28px;
      }

      span {
        font-size: 15px;
      }
    }

    .block-wrapper {
      flex-direction: column;
      gap: 50px;
    }
  }
}
</style>
