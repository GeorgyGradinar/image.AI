<template>
  <v-dialog class="dialog" v-model="dialog" width="600" persistent>
    <v-card class="card">
      <div v-if="!hasLoader && !hasShowAcceptMessage && !hasShowRejectMessage">
        <span class="title">Подтверждение почты</span>
        <form>
          <v-text-field
              v-model="verificationCode.code"
              label="Код подтверждения"
              :error-messages="mapErrors(v$.code.$errors)"
          ></v-text-field>
          <div class="card-buttons">
            <button @click.prevent="$emit('closeDialog')">Закрыть</button>
            <button class="create-account no-hover" @click.prevent="checkVerificationCode">Подтвердить</button>
          </div>
        </form>
      </div>

      <section class="loader" v-if="hasLoader">
        <div class="slider" style="--i:0">
        </div>
        <div class="slider" style="--i:1">
        </div>
        <div class="slider" style="--i:2">
        </div>
        <div class="slider" style="--i:3">
        </div>
        <div class="slider" style="--i:4">
        </div>
      </section>

      <div class="accept" v-if="hasShowAcceptMessage">
        <img src="../../assets/accept.svg" alt="">
      </div>

      <div class="accept" v-if="hasShowRejectMessage">
        <img src="../../assets/reject.svg" alt="">
      </div>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import validation from "@/mixins/validation";
const { mapErrors } = validation();

let dialog = ref(true);
const verificationCode = ref({
  code: ''
});
const rules = {
  code: {required}
};
const v$ = useVuelidate(rules, verificationCode);
let hasLoader = ref(false);
let hasShowAcceptMessage = ref(false);
let hasShowRejectMessage = ref(false);
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeDialog'])

function checkVerificationCode() {``
  v$.value.$validate();
  if (!v$.value.$error) {
    hasLoader.value = true;
    setTimeout(() => {
      showMessage(verificationCode.value.code)
    }, 2000)
  }
}

function showMessage(typeMessage){
  hasLoader.value = false;
  if (typeMessage === '111'){
    hasShowAcceptMessage.value = true;
    setTimeout(()=>{
      hasShowAcceptMessage.value = false;
      emit('closeDialog');
    },1000)
  }else {
    hasShowRejectMessage.value = true;
    setTimeout(()=>{
      hasShowRejectMessage.value = false;
    },1000)
  }


}
</script>

<style scoped lang="scss">
.dialog {
  .v-overlay__content {
    .card {
      display: flex;
      justify-content: center;
      min-height: 260px;
      border-radius: 50px;
      padding: 50px;
      background-color: rgba(33, 21, 77, 0.7);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--main-light-color);

      .title {
        display: block;
        font-size: 20px;
        margin-bottom: 10px;
      }

      form {

        .card-buttons {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px 0 0;
        }
      }
    }
  }
}

//hasLoader

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.slider {
  overflow: hidden;
  background-color: white;
  margin: 0 15px;
  height: 80px;
  width: 20px;
  border-radius: 30px;
  box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 30px #fff,
  inset -5px -5px 10px rgba(0, 0, 255, 0.1),
  inset 5px 5px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.slider::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3), 0 420px 0 400px #2697f3,
  inset 0 0 0 rgba(0, 0, 0, 0.1);
  animation: animate_2 2.5s ease-in-out infinite;
  animation-delay: calc(-0.5s * var(--i));
}

@keyframes animate_2 {
  0% {
    transform: translateY(250px);
    filter: hue-rotate(0deg);
  }

  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(250px);
    filter: hue-rotate(180deg);
  }
}

.accept {
  width: 100%;
  display: flex;
  justify-content: center;

  img {
    width: 150px;
  }
}
</style>
