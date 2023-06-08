<template>
  <div class="wrapper-block-pricing">
    <div class="artifact"></div>
    <div class="artifact"></div>
    <h1>Пакеты</h1>
    <p>Используйте НейроХолст бесплатно со 100 красками в месяц. Создавайте больше. Платите меньше.</p>
    <div class="pricing">
      <Rates></Rates>
    </div>
  </div>
  <section class="wrapper-frequently">
    <frequently-asked :frequently-asks="frequentlyAsks"></frequently-asked>
  </section>
</template>

<script setup>
import FrequentlyAsked from "~/components/main-page/FrequentlyAsked";
import Rates from "~/components/pricing/Rates";

let frequentlyAsks = [
  {
    title: 'Как работают титры изображений?',
    text: 'It\'s simple. One credit is counted every time you generate a new image. For example, by default, our tools generate four pictures which require four credits.\n' +
        '\n' +
        'Apart from generating images, you may also use your credits to enhance, upscale images, or create custom models with DreamBooth.'
  },
  {
    title: 'Могу ли я использовать созданные изображения для коммерческих проектов?',
    text: 'Да, вы можете использовать сгенерированные изображения в коммерческих целях. Однако имейте в виду, что лицензия CreativeML Open RAIL-M распространяется на созданные изображения.'
  },
  {
    title: 'Могу ли я создавать контент NSFW?',
    text: 'Вы можете создать все, что захотите! Но имейте в виду, что мы отслеживаем сгенерированный контент. Использование, нарушающее любые применимые национальные, федеральные, государственные, местные или международные законы или правила, будет запрещено и сообщено'
  },
  {
    title: 'Могу ли я изменить свой план позже?',
    text: 'Да, вы можете повысить или понизить версию в любое время. Если вы решите перейти на более высокий уровень, вы будете платить пропорциональную сумму за оставшуюся часть месяца.'
  },
  {
    title: 'Что, если я решу отменить?',
    text: 'Если вы больше не хотите использовать getimg.ai, вы можете отменить подписку в любое время. После отмены вы по-прежнему сможете использовать свои краски до конца текущего платежного цикла.'
  },
];
</script>

<style scoped lang="scss">
.wrapper-block-pricing {
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  padding: 100px 20px;

  .artifact {
    width: 200px;
    height: 200px;
    position: absolute;
    background-color: var(--light-pink);
    border-radius: 30px;
    transform: rotate(20deg);
    animation: move 25s linear 0s infinite forwards;
    z-index: 0;

    &:nth-child(2) {
      top: 120%;
      right: 50%;
      transform: rotate(0deg);
      animation: moveInverse 25s linear 3s infinite forwards;

      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        top: 70%;
        left: 30%;
        animation: moveInverse 5s linear 0s infinite forwards;
      }
    }

    &::after {
      content: '';
      width: 100px;
      height: 100px;
      background-color: var(--light-blue);
      top: 70%;
      left: 60%;
      position: absolute;
      border-radius: 30px;
      animation: move 5s linear 0s infinite forwards;
    }

    @keyframes move {
      0%, 100% {
        top: -10%;
        left: -20%;
        transform: rotate(0deg);
      }

      50% {
        top: 110%;
        left: 50%;
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes moveInverse {
      0%, 100% {
        bottom: -20%;
        right: 50%;
        transform: rotate(0deg);
      }

      50% {
        top: 20%;
        right: -15%;
        transform: rotate(180deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  h1 {
    font-size: 34px;
    color: var(--main-light-color);
  }

  p {
    max-width: 700px;
    color: var(--main-light-color);
    text-align: center;
    opacity: 0.7;
    font-size: 20px;
  }

  .pricing {
    width: 100%;
    max-width: 1440px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--main-light-color);
    align-items: center;
    margin-top: 60px;
    padding: 0 10px;
    gap: 60px;
  }
}

.wrapper-frequently {
  display: flex;
  align-items: center;
  width: 100vw;
  min-height: 700px;
  z-index: 1;
}

@media screen and (min-width: 1925px) {
  .wrapper-block-pricing {

    p {
      max-width: 1100px;
      font-size: 26px;
    }

    .pricing {
      max-width: 1600px;
      margin-top: 80px;
    }
  }
}

@media screen and (max-width: 1300px) {
  .wrapper-block-pricing {
    position: relative;
  }
}

@media screen and (max-width: 1000px) {
  .wrapper-block-pricing {
    .artifact {
      display: none;
    }

    h1 {
      font-size: 26px;
      z-index: 2;
    }

    p {
      font-size: 16px;
    }
  }
}
</style>
