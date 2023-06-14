<template>
  <div class="wrapper-block-pricing">
    <div class="artifact"></div>
    <div class="artifact"></div>
    <h1>Цены НейроХолста</h1>
    <p>Платите только за то, что создаёте. Покупайте краски, которые тратятся при генерации. Никаких оплат за месяц,
      краски будут навсегда на вашем счету, пока вы их не потратите.</p>
    <p>Все новые пользователи получают 25 красок бесплатно!</p>
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
    title: 'Сгорают ли краски через какое-то время?',
    text: 'Нет, вы покупаете краски и они будут на вашем счету пока вы их сами не потратите.'
  },
  {
    title: 'Можно ли бесплатно попробовать?',
    text: 'Да, вы можете генерировать бесплатно. При регистрации вам будет предоставлено 25 красок, на которые можно сгенерировать около 50 изображений.'
  },
  {
    title: 'Сколько красок тратится при генерации изображений?',
    text: 'Зависит от параметров изображения, нейросети. Самое дешёвое изображение будет стоить примерно 0.2 краски.'
  },
  {
    title: 'Чем отличаются пакеты красок?',
    text: 'Чем более дорогой пакет покупаете, тем дешевле будет итоговая цена одной краски для вас. Начните с малого, если понравится, то рекомендуем брать пакеты побольше, чтобы сэкономить!'
  }
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
    max-width: 900px;
    color: var(--main-light-color);
    text-align: center;
    opacity: 0.8;
    font-size: 20px;

    &:last-of-type {
      color: var(--light-blue);
    }
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
