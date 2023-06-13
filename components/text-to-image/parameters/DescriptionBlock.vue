<template>
  <v-expansion-panels v-model="panels">
    <v-expansion-panel>
      <v-expansion-panel-title expand-icon="mdi-chevron-down" collapse-icon="mdi-chevron-up">
        <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <g id="Layer_77" data-name="Layer 77">
            <path
                d="M4.83,53.14h0l10.22-.27a2,2,0,0,0,1.36-.58L49.87,18.88a9.05,9.05,0,0,0,0-12.78h0a9.05,9.05,0,0,0-12.78,0L3.68,39.51a2,2,0,0,0-.58,1.36L2.83,51.09A2,2,0,0,0,4.83,53.14ZM39.92,8.93c4.82-4.57,11.69,2.31,7.12,7.12L44,19.12,36.85,12ZM7.07,41.78,34,14.83,41.14,22,14.2,48.9l-7.31.18Z"/>
            <path d="M60,56.54H4a2,2,0,0,0,0,4H60A2,2,0,0,0,60,56.54Z"/>
          </g>
        </svg>
        Описание
      </v-expansion-panel-title>
      <v-expansion-panel-text class="expansion-panel-wrapper">
        <div class="wrapper-description" id="v-step-0">
          <section class="find-description" v-if="isShowSearch">
            <p>Поиск</p>
            <input placeholder="Напримепр: волосы, элементы декора"
                   :class="{'is-data-input': exception}"
                   v-model.lazy="exception">
            <p>Элементы которые будут заменены</p>
          </section>
          <section class="description">
            <div>
              <p>Описание</p>
            </div>
            <textarea autofocus
                      placeholder="Опишите то, что хотели бы сгенерировать"
                      :class="{'is-data-input': description}"
                      v-model.lazy="description">
            </textarea>
            <button class="random-button" @click="random">
              <img class="random-img"
                   src="~/assets/images/text-to-image/settings/random.svg"
                   alt="">Рандом
            </button>
          </section>
          <section class="negative-description">
            <p>Исключения</p>
            <input placeholder="Что хотите исключить"
                   :class="{'is-data-input': exception}"
                   v-model.lazy="exception">
          </section>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";

const props = defineProps({
  hasShowSearch: Boolean
});
const {hasShowSearch} = toRefs(props);

const store = personStore();
const {filters} = storeToRefs(store);
const {changeFilters} = store;
const panels = ref([0]);

const subject = ['Автомобиль', 'Рыба', 'Дерево', 'Женщина', 'Стол', 'Виноград', 'Компьютер', 'Земля', 'Фонарь', 'Кот'];
const environment = ['в горах', 'возле моря', 'на природе', 'на дороге', 'на деревянном столе', 'возле парка', 'на пляже', 'солнечный день возле озера', 'в океане', 'на шоссе'];
const style = ['фото', 'кино', 'мультфильм', 'аниме', 'черное-белый', 'глубокий'];
const quality = ['ультра', 'градиент', 'фокусировка', 'интенсивность', ' различимость градаций', 'частотно-контрастные'];

let description = ref('');
let exception = ref();
let index;
let isShowSearch = ref(hasShowSearch._object ? hasShowSearch : false);

onMounted(() => {
  if (filters.value.description) {
    description.value = filters.value.description;
    exception.value = filters.value.exception;
  } else {
    random();
  }
})

function random() {
  let text = `${subject[Math.floor(Math.random() * 10)]} ${environment[Math.floor(Math.random() * 10)]} ${style[Math.floor(Math.random() * 5)]} ${quality[Math.floor(Math.random() * 5)]}`
  changeFilters('description', text);
}

watch(filters, (newData) => {
  description.value = newData.description;
  exception.value = newData.exception;
})

watch(description, (newData) => {
  changeFilters('description', newData);
})

watch(exception, (newData) => {
  changeFilters('exception', newData);
})

</script>

<style lang="scss">

.v-expansion-panel--active > .v-expansion-panel-title {
  min-height: 20px;
}

.wrapper-description {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    div {
      width: 100%;
      margin-bottom: 5px;
      font-size: 14px;
    }

    textarea {
      width: 100%;
      min-height: 150px;
      resize: none;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: auto;
      border: 1px solid rgba(248, 248, 221, 0.2);
      padding: 10px;
      color: var(--main-light-color);
      font-size: 15px;
      transition: all 0.2s;
      margin-bottom: 10px;
      background-color: #1f2023;
    }

    textarea:focus {
      outline: 0;
      border: 1px solid var(--light-blue);
      box-shadow: 0 0 5px rgba(54, 226, 255, 0.5);
    }

    .is-data-input {
      border: 1px solid var(--light-blue);
    }

    .random-button {
      display: flex;
      gap: 7px;
      padding: 5px 10px;
      border: 1px solid rgba(248, 248, 221, 0.2);
      font-size: 10px;
      transition: all 0.3s;

      .random-img {
        width: 15px;
      }
    }

    .random-button:hover {
      color: var(--light-blue);
      border: 1px solid var(--light-blue);
    }

    .random-button:focus {
      border: 1px solid var(--light-blue);
      box-shadow: 0 0 5px rgba(54, 226, 255, 0.7);
      color: var(--light-blue);
    }

    .random-button:active {
      border: 1px solid var(--light-blue);
      background-color: var(--light-blue);
    }

  }

  .negative-description,
  .find-description {

    p {
      font-size: 12px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      border: 1px solid rgba(248, 248, 221, 0.2);
      color: var(--main-light-color);
      padding: 10px;
      font-size: 12px;
      transition: all 0.2s;
      background-color: #1f2023;
      margin-bottom: 5px;
    }

    input:focus {
      outline: 0;
      border: 1px solid var(--light-blue);
      box-shadow: 0 0 5px rgba(54, 226, 255, 0.5);
    }

    .is-data-input {
      border: 1px solid var(--light-blue);
    }
  }
}
</style>
