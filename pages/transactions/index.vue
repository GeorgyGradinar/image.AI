<template>
  <div class="wrapper-history">
    <div class="header-history">
      <h1>История транзакций</h1>
      <div class="wrapper-button">
        <div class="wrapper-search">
          <v-select
              v-model="currentDate"
              label="Дата"
              class="drop-down"
              :items="['От новых к старым', 'От старых к новым']"
              persistent-hint
              hide-details
          ></v-select>
          <v-select
              v-model="currentType"
              class="drop-down"
              :items="['Все', 'Генерация', 'Реферальные', 'Депозит']"
              label="Тип"
              persistent-hint
              :class="'rounded-lg'"
              hide-details
          ></v-select>
        </div>
        <!--        <button class="secondary clear-filters"-->
        <!--                @click="clearFilters"-->
        <!--                v-if="isShowClearButton">-->
        <!--          Очистить фильтры-->
        <!--        </button>-->
      </div>
    </div>
    <section class="history">
      <div class="wrapper-transactions">
        <v-table class="transactions">
          <thead>
          <tr>
            <th class="text-left">
              <v-select
                  v-model="currentDate"
                  label="Дата"
                  class="drop-down"
                  :items="['От новых к старым', 'От старых к новым']"
                  persistent-hint
                  :class="'rounded-lg'"
                  hide-details
              ></v-select>
            </th>
            <th class="input-price">
              <p>Стоимость</p>
              <!--              <v-text-field-->
              <!--                  v-model.trim.lazy="price"-->
              <!--                  density="compact"-->
              <!--                  label="Стоимость"-->
              <!--                  type="number"-->
              <!--                  append-inner-icon="mdi-magnify"-->
              <!--                  hide-details-->
              <!--                  @keypress="restrictChars"-->
              <!--              ></v-text-field>-->
            </th>
            <th class="text-left">
              <v-select
                  v-model="currentType"
                  class="drop-down"
                  :items="['Все', 'Генерация', 'Реферальные', 'Депозит']"
                  label="Тип"
                  persistent-hint
                  :class="'rounded-lg'"
                  hide-details
              ></v-select>
            </th>
          </tr>
          </thead>

          <tbody v-if="allTransactions.length">
          <tr v-for="item in allTransactions" :key="item.id">
            <td>{{ date(item.created_at) }}</td>
            <td>{{ sum(item.credits_old, item.credits_new) }}</td>
            <td>{{ getType(item.action) }}</td>
          </tr>
          </tbody>
        </v-table>

        <div class="wrapper-message" v-if="!allTransactions.length">
          <p>На данный момент история пуста</p>
        </div>

        <div class="mobile-transactions" v-for="item in allTransactions" :key="item.id">
          <div class="top-block">
            <p>Успешно</p>
          </div>
          <div class="bottom-block">
            <div class="mobile-sum">
              <p>Кол-во</p>
              <p class="sum">{{ sum(item.credits_old, item.credits_new) }}</p>
            </div>
            <p class="mobile-type">{{ getType(item.action) }}</p>
            <div class="mobile-date">
              <p>Дата</p>
              <p class="date">{{ date(item.created_at) }}</p>
            </div>
          </div>
        </div>

        <v-pagination
            class="pagination"
            v-if="allPages > 1"
            v-model="currentPage"
            :length="allPages"
            :total-visible="7"
            @update:modelValue="changePage()"
        ></v-pagination>

      </div>
    </section>
  </div>
</template>

<script setup>
import transactions from "~/mixins/transactions";
import seo from "~/mixins/seo";
import {transactionStore} from "~/store/transactionStore";
import {computed, onMounted, ref, watch} from "vue";
import {metaTransactions, meta, link, scripts} from "~/seoConfig";
import {storeToRefs} from "pinia";

definePageMeta({
  middleware: "auth"
})

const {setProperty} = seo();
setProperty(metaTransactions.title, [...meta, ...metaTransactions.meta], link, scripts);

const {getPersonTransaction, sortDataTransactions} = transactions();
const transactionsStore = transactionStore();
const {clearTransactionStore, changePages} = transactionsStore;
const {allTransactions, pages, allPages} = storeToRefs(transactionsStore);

let currentPage = ref(1);

let currentDate = ref('От новых к старым');
let currentType = ref(null);

let dateForRequest = ref('');
let priceForRequest = ref(null);
let typeForRequest = ref('');

let debounceTimeout = ref(null);

let isShowClearButton = computed(() => {
  if (currentDate.value === 'От новых к старым' && currentType.value !== null) {
    return true;
  } else {
    return false;
  }
})

onMounted(() => {
  clearTransactionStore();
  getPersonTransaction();
})

watch(pages, (newData) => {
  currentPage.value = newData;
})

watch(currentDate, () => {
  dateForRequest.value = currentDate.value === 'От новых к старым' ? 'desc' : 'asc';
  prepareRequest();
})

watch(currentType, () => {
  if (currentType.value === 'Генерация') {
    typeForRequest.value = 'make_request';
  } else if (currentType.value === 'Реферальные') {
    typeForRequest.value = 'referral_credits';
  } else if (currentType.value === 'Депозит') {
    typeForRequest.value = 'start_credits';
  } else if (currentType.value === 'Все') {
    typeForRequest.value = null;
  }
  prepareRequest();
})

function changePage() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

  changePages(currentPage.value);
    getPersonTransaction();
}

let timeOut;
function prepareRequest() {
  if (timeOut) {
    clearTimeout(timeOut);
  }
  timeOut = setTimeout(() => {

    if (typeForRequest.value === null && dateForRequest.value === 'desc') {
      clearTransactionStore();
      getPersonTransaction();

    } else {
      sortDataTransactions(dateForRequest.value, priceForRequest.value, typeForRequest.value);
    }
  }, 100)
}

function date(data) {
  let currentDate = new Date(data);
  let day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
  let month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  let hour = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
  let minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
  return `${day}.${month}.${currentDate.getFullYear()} ${hour}:${minutes}`;
}

function sum(beforeSum, currentSum) {
  return (currentSum - beforeSum).toFixed(1);
}

function getType(type) {
  if (type === 'start_credits' || type === 'refill' || type === 'referral_credits') {
    return 'Депозит';
  } else if (type === 'make_request') {
    return 'Генерация';
  }
}

function clearFilters() {
  currentDate.value = 'От новых к старым';
  currentType.value = null;
}

function restrictChars($event) {
  if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
    return true
  } else {
    $event.preventDefault();
  }
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
    height: 46px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    h1 {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .wrapper-button {
      display: flex;

      .wrapper-search {
        width: 100vw;
        display: none;
        justify-content: flex-end;
        gap: 10px;

        .v-input__control {
          width: 90%;
          margin-bottom: 20px;
        }
      }
    }
  }

  .history {
    display: flex;

    .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
    .v-table--density-default > .v-table__wrapper > table > thead > tr > th {
      border-bottom: 1px solid var(--border-light-color);
    }

    .wrapper-transactions {
      width: 100%;

      .transactions {
        padding: 0 10%;
        color: var(--main-light-color);
        background-color: var(--main-backgground-color);

        .input-price {
          color: var(--main-light-color);

          .v-input__control {
            .v-field {
              width: 220px;
              max-width: 220px;
              min-width: 200px;
              border-bottom: 1px solid var(--main-light-color);
            }
          }
        }

        .text-left {
          .v-input__control {
            display: flex;

            .v-field--variant-solo, .v-field--variant-solo-filled {
              width: 220px;
              max-width: 220px;
              min-width: 200px;
            }

            .v-field {
              border-radius: 0;
              border-bottom: 1px solid var(--main-light-color);
            }
          }

          .v-select .v-field.v-field {
            display: flex;
            align-items: center;
            height: 40px;
            width: 220px;
            max-width: 220px;
            min-width: 120px;
            padding-inline-end: 5px;
            color: var(--main-light-color);

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

      .wrapper-message {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 60px;
      }

      .pagination {
        margin: 30px 0;
      }
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

  .v-list-item-title {
    font-size: 13px;
  }
}

@media screen and (max-width: 800px) {
  .wrapper-history {
    .history {

      .wrapper-transactions {
        display: block;

        .transactions {
          padding: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-history {
    .header-history {
      height: 200px;

      flex-direction: column;

      .wrapper-button {
        flex-direction: column;

        .wrapper-search {
          display: block;
        }
      }
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

@media screen and (max-width: 600px) {
  .wrapper-history {

    .header-history {
      flex-direction: column;

      .wrapper-search {
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 0 0 0;
      }
    }

    .history {
      flex-direction: column;
    }
  }
}
</style>
