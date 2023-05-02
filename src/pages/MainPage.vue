<template>
  <section class="main-page">
    <section class="first-block">
      <div class="block-wrapper">
        <div class="wrapper-description">
          <h1>Создавайте потрясающие <span class="gradient">произведения искусства</span> с помощью <span class="gradient">AI</span>.</h1>
          <span>Получить img.AI — это набор волшебных инструментов искусственного интеллекта. Создавайте исходные изображения в масштабе, изменяйте фотографии, расширяйте изображения за их первоначальные границы или создавайте собственные модели AI.</span>
          <v-btn class="create-project">Начать проект
            <v-icon end icon="mdi-arrow-right"></v-icon>
          </v-btn>
        </div>
        <ImagesGrid></ImagesGrid>
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

        <video class="pre-show" src="https://getimg.ai/videos/ai-generator-2.mp4" autoplay loop playsinline muted></video>
      </div>

      <div class="wrapper-description-block">
        <article>
          <span>Редактор AI Раскрашивание</span>
          <h1>Редактировать изображения только с текстом</h1>
          <p>Легко изменяйте мелкие детали или изменяйте целые визуальные характеристики любого изображения. Используйте
            рисование, чтобы удалить ненужные объекты с изображений или изменить любые другие элементы. Просто
            сотрите часть изображения и скажите AI, что рендерить в пустом пространстве.</p>
        </article>

        <video class="pre-show" src="https://getimg.ai/guides/outpainting-simple-photo.mp4" autoplay loop playsinline muted></video>
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
    <FrequentlyAsked></FrequentlyAsked>
    <ReadyToGet></ReadyToGet>
  </section>
</template>

<script setup>
import FrequentlyAsked from "@/components/main-page/FrequentlyAsked";
import ReadyToGet from "@/components/main-page/ReadyToGet";
import ImagesGrid from "@/components/main-page/ImagesGrid";

</script>

<style scoped lang="scss">

.gradient {
  background: linear-gradient(to right, var(--light-pink), var(--light-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.first-block {
  background: rgb(33,21,77);
  background: linear-gradient(115deg, rgba(33,21,77,1) 0%, rgba(33,21,77,1) 49%, rgba(35,0,170,1) 100%);
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
}

.wrapper-description {
  height: 800px;
  width: 50%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  margin-right: 50px;
}

.wrapper-description h1,
.wrapper-description h1 .gradient {
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
  border-radius: 30px;
  padding: 10px 20px;
  font-weight: 700;
  color: var(--main-light-color);
  background: linear-gradient(to left, var(--light-blue), var(--light-pink));
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
  padding: 100px 0;
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
  box-shadow: 5px -5px 9px #1b1b1d,
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
  max-width: 1440px;
  padding: 80px 25px;
  color: var(--main-light-color);
}

.wrapper-description-block article {
  width: 45%;
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
  width: 45%;
  border-radius: 50px;
}

.wrapper-description-block:nth-child(even) {
  flex-direction: row-reverse;
}
</style>
