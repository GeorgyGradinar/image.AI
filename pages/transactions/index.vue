<template>
  <div class="wrapper-history">
    <div class="header-history">
      <h1>История покупок</h1>
      <div class="wrapper-search">
        <!--        <v-select-->
        <!--            class="drop-down"-->
        <!--            v-model="data"-->
        <!--            :items="[]"-->
        <!--            variant="outlined"-->
        <!--            return-object-->
        <!--            persistent-hint-->
        <!--            :class="'rounded-lg'"-->
        <!--        ></v-select>-->
        <v-select
            class="drop-down"
            v-model="status"
            :items="['Успешно', 'Отмена', 'Ожидание']"
            variant="outlined"
            return-object
            persistent-hint
            :class="'rounded-lg'"
        ></v-select>
        <v-text-field
            v-model.trim="search"
            density="compact"
            variant="solo"
            label="Поиск"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
        ></v-text-field>
      </div>
    </div>
    <section class="history">
      <v-table class="transactions">
        <thead>
        <tr>
          <th class="text-left">
            Вид
          </th>
          <th class="text-left">
            Дата
          </th>
          <th class="text-left">
            Сумма
          </th>
          <th class="text-left">
            Тип
          </th>
          <th class="text-left">
            Статус
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in testData" :key="item.id">
          <td>{{ typeTransaction(item.action) }}</td>
          <td>{{ date(item.created_at) }}</td>
          <td>{{ sum(item.credits_old, item.credits_new) }}</td>
          <td>{{ item.type }}</td>
          <td>Успешно {{ }}</td>
        </tr>
        </tbody>
      </v-table>
      <div class="mobile-transactions" v-for="item in testData" :key="item.id">
        <div class="top-block">
          <p>{{ typeTransaction(item.action) }}</p>
          <p>Успешно{{ }}</p>
        </div>
        <div class="bottom-block">
          <div class="mobile-sum">
            <p>Кол-во</p>
            <p class="sum">{{ sum(item.credits_old, item.credits_new) }}</p>
          </div>
          <p class="mobile-type">{{ item.type }}</p>
          <div class="mobile-date">
            <p>Дата</p>
            <p class="date">{{ date(item.created_at) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import requests from "~/mixins/requests";
import {onMounted} from "vue";
import seo from "~/mixins/seo";
import {metaTransactions, meta, link, scripts} from "~/seoConfig";

const {setProperty} = seo();
setProperty(metaTransactions.title, [...meta, ...metaTransactions.meta], link, scripts);

definePageMeta({
  middleware: "auth"
})

const {getPersonTransaction} = requests();
let data = ref('Дата');
let status = ref('Статус');
let search = ref('');

let testData = ref([
  {
    "id": 1,
    "action": "start_credits",
    "credits_old": 0,
    "credits_new": 25,
    "user_id": 2,
    "created_at": "2023-06-05T07:35:10.000000Z",
    "updated_at": "2023-06-05T07:35:10.000000Z",
    type: 'Депозит'
  },
  {
    "id": 2,
    "action": "generate_image",
    "credits_old": 25,
    "credits_new": 23,
    "user_id": 2,
    "created_at": "2023-06-05T07:35:10.000000Z",
    "updated_at": "2023-06-05T07:35:10.000000Z",
    type: 'Генерация'
  },
  {
    "id": 3,
    "action": "generate_image",
    "credits_old": 23,
    "credits_new": 20,
    "user_id": 2,
    "created_at": "2023-06-05T07:35:10.000000Z",
    "updated_at": "2023-06-05T07:35:10.000000Z",
    type: 'Генерация'
  },
  {
    "id": 4,
    "action": "generate_image",
    "credits_old": 20,
    "credits_new": 19,
    "user_id": 2,
    "created_at": "2023-10-11T07:35:10.000000Z",
    "updated_at": "2023-06-05T07:35:10.000000Z",
    type: 'Генерация'
  }
])

onMounted(() => {
  getTransaction();
})

async function getTransaction() {
  await getPersonTransaction()
      .then(response => {
        console.log(response)
      })
}

function typeTransaction(type) {
  if (type === 'start_credits') {
    return 'Начальный депозит'
  } else if (type === 'generate_image') {
    return 'Генерация картинок'
  }
}

function date(data) {
  let currentDate = new Date(data);
  let day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
  let month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  return `${day}.${month}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`
}

function sum(beforeSum, currentSum) {
  let bigger = beforeSum > currentSum ? beforeSum : currentSum;
  let less = beforeSum < currentSum ? beforeSum : currentSum;
  return bigger - less;
}

</script>

<style lang="scss">

.wrapper-history {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: var(--main-backgground-color);
  padding: 100px 0 0 0;
  color: var(--main-light-color);

  .header-history {
    width: 100%;
    display: flex;
    padding: 0 0 0 20px;

    h1 {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .wrapper-search {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 15px 30px;

      .v-input {
        flex: unset;
      }

      .v-input__control {
        display: flex;
        justify-content: flex-end;

        .v-field--variant-solo, .v-field--variant-solo-filled {
          width: 400px;
          max-width: 400px;
          min-width: 200px;
          background: var(--main-backgground-color);
          color: var(--light-blue);
        }

        .v-field {
          border-radius: 10px;
          border: 1px solid var(--light-blue);
        }
      }

      .v-field--variant-outlined .v-field__outline {
        display: none;
      }

      .v-select .v-field.v-field {
        display: flex;
        align-items: center;
        height: 40px;
        width: 200px;
        max-width: 200px;
        min-width: 120px;
        padding-inline-end: 5px;
        color: var(--light-blue);

        .v-field__overlay {
          display: none;
        }

        .v-field__append-inner {
          padding-top: 0;
        }

        .v-field__input {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
      }
    }
  }

  .history {
    height: 100%;
    max-height: 1200px;

    .v-table > .v-table__wrapper > table {
      background-color: var(--main-backgground-color);
      color: var(--main-light-color);
    }

    .v-table--density-default > .v-table__wrapper > table > thead > tr > th {
      color: var(--main-light-color);
    }

    .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
    .v-table--density-default > .v-table__wrapper > table > thead > tr > th {
      border-bottom: 1px solid var(--border-light-color);
    }

    .mobile-transactions {
      padding: 10px 20px;
      border-bottom: 1px solid var(--border-light-color);
      display: none;

      .top-block {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }

      .bottom-block {
        display: flex;
        justify-content: space-between;

        .mobile-sum {
          p {
            font-size: 13px;
            color: var(--border-light-color);
          }

          .sum {
            font-size: 15px;
            color: var(--main-light-color);
          }
        }

        .mobile-type {
          display: flex;
          align-items: center;
        }

        .mobile-date {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          p {
            font-size: 13px;
            color: var(--border-light-color);
          }

          .date {
            font-size: 15px;
            color: var(--main-light-color);
          }
        }
      }
    }
  }
}

.v-menu > .v-overlay__content > .v-list {
  background-color: var(--main-backgground-color);
  backdrop-filter: blur(5px);
  color: var(--light-blue) !important;
  border-radius: 10px;

  .v-list-item-title {
    font-size: 13px;
  }
}

@media screen and (max-width: 700px) {
  .wrapper-history {

    .header-history {
      flex-direction: column;
    }

    .history {
      .transactions {
        display: none;
      }

      .mobile-transactions {
        display: block;
      }
    }

  }

}

@media screen and (max-width: 550px) {
  .wrapper-history {

    .header-history {
      flex-direction: column;
      padding: 0 20px;

      .wrapper-search {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px 0;
      }
    }
  }
}
</style>
