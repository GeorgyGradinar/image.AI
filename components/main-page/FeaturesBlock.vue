<template>
  <section class="features-block">
    <h2>Набор инструментов для создания изображений</h2>
    <div class="wrapper-features">
      <div class="features" v-for="feature in features" :key="feature.id">
        <v-icon end color="#38e2ff" >{{ feature.icon }}</v-icon>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: "mdi-lightning-bolt",
    title: "Скорость",
    text: "Генерируйте до 10 изображений за секунду"
  },
  {
    icon: "mdi-memory",
    title: "20+ AI моделей",
    text: "От стабильной диффузии до пользовательских стилей."
  },
  {
    icon: "mdi-cloud-outline",
    title: "Не требует загрузки",
    text: "Инструменты AI прямо в вашем браузере"
  },
  {
    icon: "mdi-infinity",
    title: "Работа с любым видом изображения",
    text: "Арт, фото, дизайнерские решения и т.д."
  },
]
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
  padding: 100px 0 50px;

  h1 {
    font-size: 24px;
  }

  .wrapper-features {
    width: 100%;
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    flex-wrap: wrap;

    .features {
      width: 22%;
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
      gap: 30px;

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
