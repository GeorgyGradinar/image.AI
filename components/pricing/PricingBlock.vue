<template>
  <div class="wrapper-block-pricing">
    <div class="artifact"></div>
    <div class="artifact"></div>
    <h1>Пакеты</h1>
    <p>Используйте getimg.ai бесплатно со 100 кредитами в месяц. Создавайте больше. Платите меньше.</p>
    <div class="pricing">
      <section class="item" v-for="price of pricing" :key="price.id">
        <div class="sale">
          <span v-if="price.sale">{{ price.sale }}</span>
        </div>
        <div class="wrapper-detail">
          <h2>{{ price.name }}</h2>
          <span class="price">₽ {{ price.price }}</span>
          <div class="detail">
            <!--            <span class="count-images">{{ price.countImage }} изображений</span>-->
            <span class="count-credits">{{ price.countCredits }} кредитов</span>
          </div>
        </div>
        <div class="wrapper-button">
          <button class="buy" @click="buy(price.id)">Выбрать пакет</button>
        </div>
      </section>
    </div>
  </div>
  <section class="wrapper-frequently">
    <frequently-asked :frequently-asks="frequentlyAsks"></frequently-asked>
  </section>
  <RegistrationDialog v-if="isOpenRegistrationDialog"
                      @closeRegistrationBlock="isOpenRegistrationDialog = false">
  </RegistrationDialog>

</template>

<script setup>
import FrequentlyAsked from "~/components/main-page/FrequentlyAsked";
import RegistrationDialog from "~/components/dialogs/RegistrationDialog";
import {personStore} from "~/store/personStore";
import billing from '~/mixins/billing'
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";

const store = personStore();
const {changeCredits} = store;
const {person} = storeToRefs(store);
const {getRates, buyRate} = billing();

onMounted(() => {
  getAllRates();
})

let isOpenRegistrationDialog = ref(false);
let pricing = ref();
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
    text: 'Если вы больше не хотите использовать getimg.ai, вы можете отменить подписку в любое время. После отмены вы по-прежнему сможете использовать свои кредиты до конца текущего платежного цикла.'
  },
];


async function getAllRates() {
  await getRates()
      .then(response => {
        pricing.value = response.packages.map(price => {
          let percent = Math.round(( price.price / price.credits) * 100 / 2);
          percent = percent === 100 ? null : percent;
          return {
            id: price.id,
            sale: percent ? `выгода ${percent} %` : null,
            name: price.name,
            price: price.price,
            countCredits: price.credits
          }
        })

      })
}

function buy(id) {
  buyRate(id);
}

function isLogin() {
  if (person._value.id) {
    pricing.value = [
      {
        sale: 'Выгода 10%',
        name: 'Base',
        price: 50,
        countImage: 200,
        countCredits: 50,
      },
      {
        sale: 'Выгода 25%',
        name: 'Middle',
        price: 100,
        countImage: 500,
        countCredits: 100,
      },
      {
        sale: 'Выгода 50%',
        name: 'Upper',
        price: 200,
        countImage: 700,
        countCredits: 200,
      },
      {
        sale: 'Выгода 70%',
        name: 'Big',
        price: 300,
        countImage: 1000,
        countCredits: 300,
      },
      {
        sale: 'Выгода 80%',
        name: 'Large',
        price: 300,
        countImage: 1000,
        countCredits: 300,
      },
      {
        sale: 'Выгода 100%',
        name: 'Pro',
        price: 1000,
        countImage: 800,
        countCredits: 1000,
      },
    ];
  } else {
    pricing.value = [
      {
        sale: '',
        name: 'Free',
        price: 0,
        countImage: 100,
        countCredits: 25,
      },
      {
        sale: 'Выгода 10%',
        name: 'Base',
        price: 50,
        countImage: 200,
        countCredits: 50,
      },
      {
        sale: 'Выгода 25%',
        name: 'Middle',
        price: 100,
        countImage: 500,
        countCredits: 100,
      },
      {
        sale: 'Выгода 50%',
        name: 'Upper',
        price: 200,
        countImage: 700,
        countCredits: 200,
      },
      {
        sale: 'Выгода 70%',
        name: 'Big',
        price: 300,
        countImage: 1000,
        countCredits: 300,
      },
      {
        sale: 'Выгода 80%',
        name: 'Large',
        price: 300,
        countImage: 1000,
        countCredits: 300,
      },
    ];
  }
}

// function buy(credits) {
//   if (person._value.id) {
//     changeCredits(person._value.credits + credits)
//   } else {
//     isOpenRegistrationDialog.value = true;
//   }
// }
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
    max-width: 930px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--main-light-color);
    align-items: center;
    margin-top: 60px;
    padding: 0 10px;
    background-color: rgba(200, 180, 255, 0.3);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(54, 226, 255, 0.2);
    border: 1px solid rgba(200, 180, 255, 0.3);

    .item {
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      &:first-child:before,
      &:nth-child(2):before,
      &:nth-child(4):before,
      &:nth-child(5):before, {
        content: '';
        position: absolute;
        right: 0;
        top: 15%;
        height: 70%;
        border-right: 1px solid var(--main-light-color);
        opacity: 0.4;
      }

      &:nth-child(1):after,
      &:nth-child(2):after,
      &:nth-child(3):after, {
        content: '';
        position: absolute;
        bottom: 0;
        left: calc(50% - 125px);
        width: 250px;
        border-bottom: 1px solid var(--main-light-color);
        opacity: 0.4;
      }

      .sale {
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 15px;

        span {
          font-size: 13px;
          font-weight: 700;
          padding: 4px 20px;
          background-color: var(--light-pink);
          border-radius: 12px;
          color: var(--main-light-color);
        }
      }

      .wrapper-detail {
        padding: 20px 35px 0;

        h2 {
          font-size: 20px;
        }

        .price {
          text-align: start;
          opacity: 1;
          color: var(--light-blue);
          font-size: 36px;
          margin-right: 5px;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 10px 0;
          margin: 10px 0 20px;

        }
      }

      .wrapper-button {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        font-size: 24px;

        .buy {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 15px;
          border-radius: 30px;
          border: 1px solid var(--light-blue);
          color: var(--light-blue);
          transition: all 0.2s;
          font-size: 13px;

          &:hover {
            box-shadow: 0 0 10px rgba(54, 226, 255, 0.5);
          }
        }
      }
    }
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
      max-width: 1200px;
      margin-top: 80px;

      .item {
        max-width: 390px;

        .sale {
          height: 60px;

          span {
            font-size: 16px;
          }
        }

        .wrapper-detail {
          padding: 30px 60px 0;

          h2 {
            font-size: 30px;
          }

          .price {
            font-size: 46px;
            margin-right: 5px;
          }


          .detail {

          }
        }

        .wrapper-button {
          margin-bottom: 25px;
          font-size: 20px;
        }
      }
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

    .pricing {
      gap: 40px;
      margin-top: 40px;
      flex-wrap: wrap;
      justify-content: center;
      background: none;
      border: none;
      box-shadow: none;
      backdrop-filter: none;

      .item {
        background-color: rgba(200, 180, 255, 0.3);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(54, 226, 255, 0.2);
        border: 1px solid rgba(200, 180, 255, 0.3);

        &:first-child:before,
        &:nth-child(2):before,
        &:nth-child(4):before,
        &:nth-child(5):before, {
          display: none;
        }

        &:nth-child(1):after,
        &:nth-child(2):after,
        &:nth-child(3):after, {
          display: none;
        }
      }
    }
  }
}
</style>
