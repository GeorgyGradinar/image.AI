<template>
  <v-dialog class="dialog price" v-model="isOpen" persistent>
    <v-card class="card">
      <div class="wrapper-close">
        <p class="warning">У вас недостаточно красок, выберите пакет</p>
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt=""
             @click.prevent="$emit('close')">
      </div>
      <div class="wrapper-prices">
        <section class="item" v-for="price of pricing" :key="price.id">
          <div class="sale">
            <span v-if="price.sale">{{ price.sale }}</span>
          </div>
          <div class="wrapper-detail">
            <h2>{{ price.name }}</h2>
            <span class="price">₽ {{ price.price }}</span>
            <div class="detail">
              <span class="count-images">{{ price.countImage }} изображений</span>
              <span class="count-credits">{{ price.countCredits }} красок</span>
            </div>
          </div>
          <div class="wrapper-button">
            <button class="buy" @click="buy(price.countCredits)">Выбрать пакет</button>
          </div>
        </section>
      </div>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, onMounted, ref} from "vue";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";

const store = personStore();
const {changeCredits} = store;
const {person} = storeToRefs(store);
const emit = defineEmits(['close']);

let pricing = ref([

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
]);
let isOpen = ref(true);

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (Array.from(event.target.classList).includes('v-overlay__scrim' || 'v-overlay__content')) {
      emit('close');
    }
  })
})

function buy(credits) {
  changeCredits(person._value.credits + credits);
  emit('close', true);
}
</script>

<style lang="scss">

.dialog.price {
  .v-overlay__content {
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
    max-width: 1000px;
    max-height: calc(100vh - 100px);
    height: calc(100vh - 200px);

    .card {
      width: 100%;
      background-color: rgba(43, 43, 43, 0.8);
      padding: 20px 30px 0 30px;

      .wrapper-close {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 10px 0;
        margin: 0 0 10px 0;
        border-bottom: 1px solid rgba(255, 255, 225, 0.4);

        .warning {
          display: flex;
          justify-content: center;
          color: var(--light-pink);
          font-weight: bolder;
        }

        img {
          width: 25px;
          height: 25px;
          cursor: pointer;
          opacity: 0.6;
        }
      }

      .wrapper-prices {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        overflow: hidden;

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
  }
}

@media screen and (max-width: 1300px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 850px;

      .card {

        .wrapper-prices {
          overflow-y: auto;

          .item {
            max-width: 250px;

            &:first-child:before,
            &:nth-child(2):before,
            &:nth-child(4):before,
            &:nth-child(5):before, {

            }

            &:nth-child(1):after,
            &:nth-child(2):after,
            &:nth-child(3):after, {
              left: calc(50% - 90px);
              width: 180px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 660px;
      height: calc(100vh - 100px);

      .card {

        .wrapper-prices {
          overflow-y: auto;

          .item {

            &:nth-child(2):before,
            &:nth-child(4):before {
              display: none;
            }

            &:first-child:before,
            &:nth-child(3):before,
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
            &:nth-child(3):after,
            &:nth-child(4):after {
              content: '';
              position: absolute;
              bottom: 0;
              left: calc(50% - 125px);
              width: 250px;
              border-bottom: 1px solid var(--main-light-color);
              opacity: 0.4;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 350px;

      .card {
        padding: 20px 15px 10px 15px;

        .wrapper-close {
          .warning {
            font-size: 15px;
          }
        }

        .wrapper-prices {
          .item {
            max-width: 100%;

            &:first-child:before,
            &:nth-child(3):before,
            &:nth-child(5):before, {
              display: none;
            }


            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: calc(50% - 125px);
              width: 250px;
              border-bottom: 1px solid var(--main-light-color);
              opacity: 0.4;
            }

            .wrapper-detail {
              padding: 10px 15px 0;
            }
          }
        }
      }
    }
  }
}

</style>
