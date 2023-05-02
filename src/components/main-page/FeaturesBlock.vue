<template>
  <section class="features-block">
    <h1>Набор инструментов для создания изображений</h1>

    <div class="wrapper-features">
      <div class="features">
        <v-icon end color="#38e2ff" icon="mdi-lightning-bolt"></v-icon>
        <h2>Скорость</h2>
        <p>Генерируйте до 10 изображений за секунду</p>
      </div>

      <div class="features">
        <v-icon end color="#38e2ff" icon="mdi-memory"></v-icon>
        <h2>20+ AI моделей</h2>
        <p>От стабильной диффузии до пользовательских стилей.</p>
      </div>

      <div class="features">
        <v-icon end color="#38e2ff" icon="mdi-cloud-outline"></v-icon>
        <h2>Не требует загрузки</h2>
        <p>Инструменты AI прямо в вашем браузере</p>
      </div>

      <div class="features">
        <v-icon end color="#38e2ff" icon="mdi-infinity"></v-icon>
        <h2>Работа с любым видом изображения</h2>
        <p>Арт, фото, дизайнерские решения и т.д.</p>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
.features-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  color: var(--main-light-color);
  background-color: #1f2023;
  padding: 100px 0;

  h1 {
    font-size: 24px;
  }

  .wrapper-features {
    width: 100%;
    max-width: 1440px;
    display: flex;
    gap: 50px;
    padding: 0 25px;
    flex-wrap: wrap;

    .features {
      width: 20%;
      display: flex;
      flex-direction: column;
      gap: 25px;
      box-shadow: 5px -5px 9px #1b1b1d,
      -2px 2px 9px #2b2d31;
      background: rgb(31, 32, 35);
      background: linear-gradient(223deg, rgba(31, 32, 35, 1) 0%, rgba(34, 36, 39, 1) 71%, rgba(43, 45, 49, 1) 100%);
      border-radius: 50px;
      padding: 30px;

      h2 {
        font-size: 20px;
        font-weight: 700;
        line-height: 120%;
      }

      p {
        color: #f7f8f899;
        line-height: 160%;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .features-block {

    .wrapper-features {
      padding: 0 40px;

      .features {
        width: 100%;
        gap: 12px;
        padding: 25px;
        border-radius: 30px;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .features-block {
    gap: 40px;
    padding: 50px 0;

    h1 {
      width: 90%;
      font-size: 18px;
      text-align: center;
    }

    .wrapper-features {

      .features {

        h2 {
          font-size: 17px;
        }

        p {
          font-size: 12px;

        }
      }
    }
  }
}


</style>
