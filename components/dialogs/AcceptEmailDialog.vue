<template>
  <v-dialog class="dialog" v-model="dialog" width="600" persistent>
    <v-card class="card">
      <div v-if="!hasLoader && !hasShowAcceptMessage && !hasShowRejectMessage">
        <button class="close-button" @click.prevent="$emit('closeDialog')">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="">
        </button>

        <span class="title">Подтверждение почты</span>
        <form>
          <v-text-field
              v-model="verificationCode.code"
              label="Код подтверждения"
              :error-messages="mapErrors(v$.code.$errors)"
          ></v-text-field>
          <div class="card-buttons">
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
        <img src="~/assets/images/accept.svg" alt="">
      </div>

      <div class="accept" v-if="hasShowRejectMessage">
        <img src="~/assets/images/reject.svg" alt="">
      </div>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import validation from "~/mixins/validation";
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

      form .card-buttons {
        justify-content: flex-end;
      }
    }
  }
}
</style>
