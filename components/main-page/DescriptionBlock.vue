<template>
  <section class="description-block">
    <div class="wrapper-description-block" v-for="description in descriptions" :key="description.id">
      <section>
        <span>{{ description.part }}</span>
        <h2>{{ description.title }}</h2>
        <p>{{ description.description }}</p>
      </section>
      <img class="pre-show" :src="useAsset(description.url)"  alt="">
    </div>
  </section>
</template>

<script setup>
const descriptions = [
  {
    part: "Генерация изображений",
    title: "Создавайте любые изображения с помощью нейросети",
    description: "С помощью НейроХолста вы можете нарисовать любые изображения. Вы можете сами настроить высоту и ширину" +
        " вашего рисунка. Также можете разрешить быть нейросети более вольной в рисовании или попросить максимальное соответствие вашему " +
        "описанию. Хотите что-то исключить из изображения? Не проблема - можете написать об этом и нейросеть нарисует как надо!",
    url: "main-image1.webp"
  },
  {
    part: "Галерея картинок",
    title: "Сгенерированные изображения хранятся в одном месте",
    description: "Все ваши изображения, которые были нарисованы нейросетью, хранятся в одном месте. Вы не потеряете свои картины и " +
        "сможете заново использовать удачно подобранные описания и параметры. Идеально подойдёт тем, кто любит эксперементировать.",
    url: "main-image2.webp"
  },
  {
    part: "Бесплатно",
    title: "Начните генерировать картинки с помощью нейросети бесплатно",
    description: "Для того, чтобы начать рисовать с помощью нейросети не нужно платить. Просто зарегистрируйтесь и сможете" +
        " создать до 50 изображений бесплатно и оценить качество нейросети НейроХолст.",
    url: "main-image3.webp"
  }
];

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  return assets['/assets/main-page/' + path]
}
</script>

<style scoped lang="scss">

.description-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1f2023;
  padding: 50px 0;

  .wrapper-description-block {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;
    padding: 80px 25px;
    color: var(--main-light-color);

    section {
      width: 47%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        color: #38e2ff;
        font-size: 14px;
      }

      h2 {
        font-size: 35px;
        line-height: 120%;
      }

      p {
        color: #f7f8f899;
        font-size: 17px;
        line-height: 160%;
        padding-top: 12px;
      }
    }

    .pre-show {
      width: 47%;
      border-radius: 30px;
      object-fit: cover;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
    }
  }
}

@media screen and (max-width: 800px) {
  .description-block {
    .wrapper-description-block {
      flex-direction: column;
      gap: 50px;
      padding: 50px 25px;

      section {
        width: 100%;
      }

      .pre-show {
        width: 100%;
      }

      &:nth-child(even) {
        flex-direction: column;
      }
    }
  }
}
</style>
