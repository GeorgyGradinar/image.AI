<template>
  <v-expansion-panel>
    <v-expansion-panel-title @click="openDialog" readonly>
      <svg class="icon-model edit-icon" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px"
           viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
        <path class="st0" d="M9.9,19.8c-2.6-0.1-4.7,2.2-4.7,4.8l0,1c0,1.6-0.9,2.9-2.3,3.4l0,0h2.3l4.4,0c2.6,0,4.8-2.1,4.8-4.7
	C14.3,21.8,12.4,19.9,9.9,19.8z"/>
        <path class="st0" d="M11.2,20L26.3,6.5c0.7-0.6,1.7-0.6,2.3,0l0,0c0.6,0.6,0.6,1.6,0,2.2L14.4,23.8"/>
</svg>
      Модели: {{ currentModel }}
    </v-expansion-panel-title>
  </v-expansion-panel>
  <ModelsDialog v-if="isOpenDialog" @close="getNewData"></ModelsDialog>
</template>

<script setup>
import ModelsDialog from "~/components/dialogs/ModelsDialog";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import {onMounted, watch} from "vue";

const store = personStore();
const {filters} = storeToRefs(store);
const {changeFilters} = store;

let isOpenDialog = ref(false);
let currentModel = ref('');

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
.mdi-chevron-down::before {
  content: "";
}

.icon-model {
  fill: none;
  stroke: var(--light-blue);
}

</style>
