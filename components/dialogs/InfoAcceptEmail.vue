<template>
  <div class="wrapper">
    <v-dialog class="dialog" v-model="dialog" width="400" persistent>
      <v-card class="card">
        <p>Подтвердите почту {{ store.person.email }}</p>
        <div class="wrapper-button">
          <button class="secondary prepareLogout" @click="logoutFromAccount">Выход</button>
        </div>
        <p class="sendAfter" v-if="!isShowButtonSendMore">Отправить повторно через
          <span>00 : {{ seconds }}</span>
        </p>
        <a href="" v-else class="send-more" @click.prevent="sendToEmail">Отправить повторно</a>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import {defineEmits, onMounted, onUnmounted, ref} from "vue";
import shareFunctions from "../../mixins/shareFunctions";

const {initStore, sendMessageToEmail} = requests();
const {prepareLogout} = shareFunctions();
const store = personStore();
const emit = defineEmits(['closeLoginDialog']);

let dialog = ref(true);
let seconds = ref(60);
let isShowButtonSendMore = ref(false);

onMounted(() => {
  timer();
})

function logoutFromAccount() {
  prepareLogout();
  emit('closeLoginDialog');
  clearInterval(secondTimer);
}

let secondTimer
function timer() {
  secondTimer = setInterval(() => {
    seconds.value = seconds.value > 10 ? `${seconds.value - 1}` : `0${seconds.value - 1}`;
    checkSeconds();
  }, 1000);

  function checkSeconds() {
    if (+seconds.value === 0) {
      clearInterval(secondTimer);
      isShowButtonSendMore.value = true;
    }
  }
}

function sendToEmail() {
  seconds.value = 60;
  timer();
  isShowButtonSendMore.value = false;
  sendMessageToEmail();
}

onUnmounted(() => {
  clearInterval(secondTimer);
})

</script>
<style scoped lang="scss">
p {
  text-align: center;
  font-size: 20px;
}

.wrapper-button {
  display: flex;
  justify-content: space-around;
  margin: 30px 0 10px;

  .prepareLogout {
    width: 100%;
  }
}

.sendAfter {
  font-size: 12px;
  text-align: center;
}

.send-more {
  font-size: 12px;
  color: var(--light-blue);
  text-align: center;
}

</style>
