<template>
  <section class="item" v-for="price of pricing" :key="price.id">
    <div class="sale">
      <span v-if="price.sale">{{ price.sale }}</span>
    </div>
    <div class="wrapper-detail">
      <h3>{{ price.name }}</h3>
      <span class="price">₽ {{ price.price }}</span>
      <div class="detail">
        <span class="count-credits"><span class="painting">{{ price.countCredits }} красок</span> <span
            class="equal">≈</span> <span>{{ price.countImages }} изображений</span> </span>
      </div>
    </div>
    <div class="wrapper-button">
      <button class="buy" @click="buy(price.id)">Купить пакет</button>
    </div>
  </section>
</template>

<script setup>
import {modelsStore} from "~/store/models";
import {personStore} from "~/store/personStore";
import billing from '~/mixins/billing';
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";

const store = personStore();
const {person} = storeToRefs(store);
const models = modelsStore();
const {toggleAddEmailDialog, toggleRegistrationDialog} = models;
const {getRates, buyRate} = billing();

let pricing = ref();

onMounted(() => {
  getAllRates();
})

async function getAllRates() {
  await getRates()
      .then(response => {
        const cheapest = response.packages.sort((package1, package2) => package1.price / package1.credits + package2.price / package2.credits)[0];
        let deal = cheapest.price / cheapest.credits;
        pricing.value = response.packages.map(price => {
          let percent = Math.round((price.price / price.credits) * 100 / deal);
          percent = 100 - percent;
          percent = percent === 0 ? null : percent;
          return {
            id: price.id,
            sale: percent ? `выгода ${percent} %` : null,
            name: price.name,
            price: price.price,
            countCredits: price.credits,
            countImages: price.credits
          }
        })
      })
}

function buy(id) {
  if (person._value.id) {
    if (person._value.email) {
      buyRate(id);
    } else {
      toggleAddEmailDialog({isOpen: true, id: id});
    }
  } else {
    toggleRegistrationDialog(true);
  }
}
</script>

<style scoped lang="scss">
.item {
  background-color: rgba(200, 180, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(54, 226, 255, 0.2);
  border: 1px solid rgba(200, 180, 255, 0.3);
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

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

      .count-credits {
        white-space: nowrap;

        .painting {
          font-size: 17px;
          opacity: 1;
        }

        .equal {
          font-size: unset;
          opacity: 0.7;
        }

        span {
          font-size: 12px;
          opacity: 0.7;
        }
      }
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

@media screen and (min-width: 1925px) {
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

@media screen and (max-width: 1000px) {
  .pricing {
    margin-top: 40px;
  }
}
</style>
