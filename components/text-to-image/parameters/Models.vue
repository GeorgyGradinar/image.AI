<template>
  <v-expansion-panel v-if="!isShowOption">
    <v-tooltip activator="parent" location="right">Изменить</v-tooltip>
    <v-expansion-panel-title @click="openDialog" readonly expand-icon="mdi-cached">
      <svg class="icon-model edit-icon" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px"
           viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <path class="st0" d="M9.9,19.8c-2.6-0.1-4.7,2.2-4.7,4.8l0,1c0,1.6-0.9,2.9-2.3,3.4l0,0h2.3l4.4,0c2.6,0,4.8-2.1,4.8-4.7
	C14.3,21.8,12.4,19.9,9.9,19.8z"/>
        <path class="st0" d="M11.2,20L26.3,6.5c0.7-0.6,1.7-0.6,2.3,0l0,0c0.6,0.6,0.6,1.6,0,2.2L14.4,23.8"/>
</svg>
      Нейросеть: {{ currentModel }}
    </v-expansion-panel-title>

  </v-expansion-panel>

  <section class="filters-options" v-else>
    <span>Вид редактирования</span>
    <v-select
        v-model="select"
        :items="items"
        variant="outlined"
        return-object
        persistent-hint
    ></v-select>
  </section>

  <ModelsDialog v-if="isOpenDialog" @close="getNewData"></ModelsDialog>
</template>

<script setup>
import ModelsDialog from "~/components/dialogs/ModelsDialog";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import {defineProps, onMounted, toRefs, watch} from "vue";

const store = personStore();
const {filters} = storeToRefs(store);
const {changeFilters} = store;
const props = defineProps({
  hasShowOption: Boolean
});

const {hasShowOption} = toRefs(props);
const items = ['Pix2Pix', 'Найти и заменить', 'Изминение лица']

let select = ref(items[0]);
let isOpenDialog = ref(false);
let currentModel = ref('');
let isShowOption = ref(hasShowOption._object ? hasShowOption : true);

onMounted(() => {
  currentModel.value = filters.model;
})

watch(filters, (newData) => {
  currentModel.value = newData.model;
})

function openDialog() {
  isOpenDialog.value = true;
}

function getNewData(model) {
  if (model !== currentModel.value) {
    changeFilters('model', model);
  }
  isOpenDialog.value = false;
}
</script>

<style lang="scss">
.mdi-cached::before {
  content: "\F00E8";
  color: var(--light-blue);
}

.icon-model {
  fill: none;
  stroke: var(--light-blue);
}

.filters-options {
  width: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--main-light-color);

  span {
    font-size: 12px;
  }

  .v-field__append-inner {
    padding-top: 0;
    height: 20px;
  }

  .v-select .v-field.v-field {
    display: flex;
    align-items: center;
    height: 30px;
    border: 1px solid rgba(255, 255, 225, 0.3);
    color: var(--main-light-color);
  }

  .v-text-field .v-input__details {
    display: none;
  }

  .v-field__input {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .v-field {
    font-size: 13px;
  }

  .v-select__selection {
    text-align: center;
  }
}

</style>
