<template>
  <section class="main-page">
    <section class="first-block">
      <div class="wrapper-description">
        <h1>Создавайте потрясающие произведения искусства с помощью искусственного интеллекта.</h1>
        <span>Получить img.AI — это набор волшебных инструментов искусственного интеллекта. Создавайте исходные изображения в масштабе, изменяйте фотографии, расширяйте изображения за их первоначальные границы или создавайте собственные модели AI.</span>
        <v-btn class="create-project">Начать проект
          <v-icon end icon="mdi-arrow-right"></v-icon>
        </v-btn>
      </div>
    </section>

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

    <section class="description-block">
      <div class="wrapper-description-block">
        <article>
          <span>Редактор AI Наращивание</span>
          <h1>Расширяйте картинки за их пределы</h1>
          <p>Ускорьте процесс создания художественных работ благодаря искусственному интеллекту. С помощью нашего
            расширенного редактора вы можете генерировать недостающие части любой фотографии или создавать потрясающие
            большие произведения искусства на холсте бесконечного размера. Здесь буквально нет ограничений.</p>
        </article>

        <div class="pre-show">
        </div>
      </div>

      <div class="wrapper-description-block">
        <article>
          <span>Редактор AI Раскрашивание</span>
          <h1>Редактировать изображения только с текстом</h1>
          <p>Легко изменяйте мелкие детали или изменяйте целые визуальные характеристики любого изображения. Используйте
            рисование, чтобы удалить ненужные объекты с изображений или изменить любые другие элементы. Просто
            сотрите часть изображения и скажите AI, что рендерить в пустом пространстве.</p>
        </article>

        <div class="pre-show">
        </div>
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

        <div class="pre-show">
        </div>
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

        <div class="pre-show">
        </div>
      </div>
    </section>

  </section>
</template>

<script setup>

</script>

<style scoped>

.first-block {
  background: rgb(33, 21, 77);
  background: linear-gradient(90deg, rgba(33, 21, 77, 1) 42%, rgba(37, 17, 109, 1) 72%, rgba(42, 11, 156, 1) 100%);
}

.wrapper-description {
  height: 800px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  margin: 0 10%;
}

.wrapper-description h1 {
  color: var(--main-light-color);
  font-size: 40px;
  font-weight: 700;
  line-height: 140%;
}

.wrapper-description span {
  width: 75%;
  color: var(--main-light-color);
  font-size: 18px;
  line-height: 180%;
  opacity: .8;
  font-weight: 400;
}

.create-project {
  height: 60px;
  width: 300px;
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


/*second block*/

.features-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
  color: var(--main-light-color);
  background-color: #1f2023;
  padding: 50px 0;
}

.features-block h1 {
  font-size: 24px;
}

.wrapper-features {
  max-width: 1440px;
  display: flex;
  gap: 50px;
  padding: 0 25px;
}

.features {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-shadow: 5px -5px 9px #131315,
  -2px 2px 9px #2b2d31;
  background: rgb(31, 32, 35);
  background: linear-gradient(223deg, rgba(31, 32, 35, 1) 0%, rgba(34, 36, 39, 1) 71%, rgba(43, 45, 49, 1) 100%);
  border-radius: 50px;
  padding: 30px;
}

.features h2 {
  font-size: 20px;
  font-weight: 700;
  line-height: 120%;
}

.features p {
  color: #f7f8f899;
  line-height: 160%;
  font-size: 15px;
  font-weight: 700;
}


/*description block*/

.description-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1f2023;
  padding: 50px 0;
}

.wrapper-description-block {
  display: flex;
  justify-content: space-between;
  width: 1440px;
  padding: 25px;
  color: var(--main-light-color);
}

.wrapper-description-block article {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper-description-block article span {
  color: #38e2ff;
  font-size: 14px;
}

.wrapper-description-block article h1 {
  font-size: 35px;
  line-height: 120%;
}

.wrapper-description-block article p {
  color: #f7f8f899;
  font-size: 17px;
  line-height: 160%;
  padding-top: 12px;
}

.pre-show {
  width: 650px;
  height: 450px;
  background-color: red;
  border-radius: 30px;
}
</style>
