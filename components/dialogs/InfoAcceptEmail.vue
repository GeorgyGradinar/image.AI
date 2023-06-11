<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="400" persistent>
      <v-card class="card">
        <p>Подтвердите почту {{ store.person.email }}</p>
        <div class="wrapper-button">
          <button class="secondary prepareLogout" @click="logoutFromAccount">Выход</button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import {defineEmits, onMounted} from "vue";

const {prepareLogout, initStore} = requests();
const store = personStore();
const emit = defineEmits(['closeLoginDialog']);

let dialog = ref(true);
// onMounted(() => {
//   initStore()
// })

function logoutFromAccount() {
  prepareLogout();
  emit('closeLoginDialog');
}

</script>
<style scoped lang="scss">
p {
  text-align: center;
  font-size: 20px;
}

.wrapper-button{
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  .prepareLogout {
  }
}


</style>
