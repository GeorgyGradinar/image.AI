<template>
  <section class="description-block">
    <div class="wrapper-description-block" v-for="description in descriptions" :key="description.id">
      <section>
        <span>{{ description.part }}</span>
        <h2>{{ description.title }}</h2>
        <p>{{ description.description}}</p>
      </section>
      <video class="pre-show" :src="useAsset(description.url)" autoplay loop playsinline muted></video>
    </div>
  </section>
</template>

<script setup>
const descriptions = [
  {
    part:"Редактор AI Наращивание",
    title:"Расширяйте картинки за их пределы",
    description:"Ускорьте процесс создания художественных работ благодаря искусственному интеллекту. С помощью нашего\n" +
        "          расширенного редактора вы можете генерировать недостающие части любой фотографии или создавать потрясающие\n" +
        "          большие произведения искусства на холсте бесконечного размера. Здесь буквально нет ограничений.",
    url:"ai-generator-2.mp4"
  },
  {
    part:"Редактор AI Раскрашивание",
    title:"Редактировать изображения только с текстом",
    description:"Легко изменяйте мелкие детали или изменяйте целые визуальные характеристики любого изображения. Используйте\n" +
        "          рисование, чтобы удалить ненужные объекты с изображений или изменить любые другие элементы. Просто\n" +
        "          сотрите часть изображения и скажите AI, что рендерить в пустом пространстве.",
    url:"outpainting-simple-photo.mp4"
  },
  {
    part:"Изображение по описанию",
    title:"Создавайте оригинальные изображения.",
    description:"Дайте волю своему воображению и создайте любой тип изображения или искусства. Используйте свое творчество,\n" +
        "          чтобы смешивать разные художественные стили, или просто опишите, что вы хотите увидеть, и наблюдайте, как AI\n" +
        "          воплощает ваши идеи в жизнь. Используйте одну из более чем 20 моделей, обученных сообществом, чтобы придать\n" +
        "          уникальный стиль своим творениям, или обучайте собственную модель на основе собственного рисунка.",
    url:"inpainting.mp4"
  },
  {
    part:"ФотоМечты",
    title:"Создайте свою собственную модель AI",
    description:"Получите персонализированную модель AI. Это так же просто, как загрузить 10 фотографий. Если вы хотите\n" +
        "          создавать аватары с искусственным интеллектом для себя или своей команды, вам нужно отображать красивые\n" +
        "          изображения вашего продукта в различных сценариях, или вы просто хотите иметь свою собственную модель\n" +
        "          искусственного интеллекта для генерации идей в своем стиле. Мы вас прикрыли. Каждая модель размещена и\n" +
        "          доступна для использования в считанные секунды.",
    url:"dreambooth-2.mp4"
  },
];

function useAsset(path) {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  // @ts-expect-error: wrong type info
  return assets['/assets/main-videos/' + path]
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
      border-radius: 50px;
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
