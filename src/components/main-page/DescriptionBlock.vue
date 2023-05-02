<template>
  <section class="description-block">
    <div class="wrapper-description-block">
      <article>
        <span>Редактор AI Наращивание</span>
        <h1>Расширяйте картинки за их пределы</h1>
        <p>Ускорьте процесс создания художественных работ благодаря искусственному интеллекту. С помощью нашего
          расширенного редактора вы можете генерировать недостающие части любой фотографии или создавать потрясающие
          большие произведения искусства на холсте бесконечного размера. Здесь буквально нет ограничений.</p>
      </article>

      <video class="pre-show" src="https://getimg.ai/videos/ai-generator-2.mp4" autoplay loop playsinline
             muted></video>
    </div>

    <div class="wrapper-description-block">
      <article>
        <span>Редактор AI Раскрашивание</span>
        <h1>Редактировать изображения только с текстом</h1>
        <p>Легко изменяйте мелкие детали или изменяйте целые визуальные характеристики любого изображения. Используйте
          рисование, чтобы удалить ненужные объекты с изображений или изменить любые другие элементы. Просто
          сотрите часть изображения и скажите AI, что рендерить в пустом пространстве.</p>
      </article>

      <video class="pre-show" src="https://getimg.ai/guides/outpainting-simple-photo.mp4" autoplay loop playsinline
             muted></video>
    </div>

    <div class="wrapper-description-block">
      <article>
        <span>Изображение по описанию</span>
        <h1>Создавайте оригинальные изображения.</h1>
        <p>Дайте волю своему воображению и создайте любой тип изображения или искусства. Используйте свое творчество,
          чтобы смешивать разные художественные стили, или просто опишите, что вы хотите увидеть, и наблюдайте, как AI
          воплощает ваши идеи в жизнь. Используйте одну из более чем 20 моделей, обученных сообществом, чтобы придать
          уникальный стиль своим творениям, или обучайте собственную модель на основе собственного рисунка.</p>
      </article>

      <video class="pre-show" src="https://getimg.ai/videos/inpainting.mp4" autoplay loop playsinline muted></video>
    </div>

    <div class="wrapper-description-block">
      <article>
        <span>ФотоМечты</span>
        <h1>Создайте свою собственную модель AI</h1>
        <p>Получите персонализированную модель AI. Это так же просто, как загрузить 10 фотографий. Если вы хотите
          создавать аватары с искусственным интеллектом для себя или своей команды, вам нужно отображать красивые
          изображения вашего продукта в различных сценариях, или вы просто хотите иметь свою собственную модель
          искусственного интеллекта для генерации идей в своем стиле. Мы вас прикрыли. Каждая модель размещена и
          доступна для использования в считанные секунды.</p>
      </article>

      <video class="pre-show" src="https://getimg.ai/videos/dreambooth-2.mp4" autoplay loop playsinline muted></video>
    </div>
  </section>
</template>

<script setup>

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

    article {
      width: 47%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    article span {
      color: #38e2ff;
      font-size: 14px;
    }

    article h1 {
      font-size: 35px;
      line-height: 120%;
    }

    article p {
      color: #f7f8f899;
      font-size: 17px;
      line-height: 160%;
      padding-top: 12px;
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

      article {
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
