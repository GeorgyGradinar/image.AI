<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="400" persistent>
      <v-card class="card">
        <p>Подтвердите почту {{ store.person.email }}</p>
        <div class="wrapper-button">
          <button class="secondary logout" @click="logoutFromAccount">Выход</button>
          <button class="secondary logout" @click="emit('closeLoginDialog')">Закрыть</button>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";

const {logout} = requests();
const store = personStore();
const emit = defineEmits(['closeLoginDialog']);

let dialog = ref(true);

function logoutFromAccount() {
  logout();
  emit('closeLoginDialog');
}

</script>
<style scoped lang="scss">
p {
  text-align: center;
  font-size: 25px;
}

.wrapper-button{
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  .logout {
  }
}


</style>
