<template>
  <v-snackbar class="done"
              v-model="snackbar"
              :timeout="timeout"
              :absolute="true"
  >
    <div class="wrapper-done">
      <div class="image-done">
        <img src="~/assets/images/snack-bars/done.svg" alt="">
      </div>
      <span>{{ textSnackBar }}</span>
    </div>
  </v-snackbar>
</template>

<script setup>
import {defineEmits, defineProps, ref, toRefs, watch} from "vue";

let props = defineProps({
  openSnackBar: Boolean,
  textSnackBar: String
});

const emit = defineEmits(['close']);
const {openSnackBar, textSnackBar} = toRefs(props);
let timeout = 2000;
let snackbar = ref(false)

watch(openSnackBar, (newData) => {
  snackbar.value = newData;
})

watch(snackbar, (newData) => {
  if (!newData) {
    emit('close');
  }
})

</script>

<style lang="scss">

.v-snackbar__wrapper {
  position: fixed;
  left: unset !important;
  transform: unset !important;
  bottom: 20px !important;
  right: 0;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  overflow: hidden;

  .v-snackbar__content {
    padding: unset;

    .wrapper-done {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px;
      font-size: 16px;
      background-color: rgba(3, 179, 138, 0.6);
    }
  }
}

.image-done {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
}

@media screen and (max-width: 1920px) {
  .v-snackbar__wrapper {
    .v-snackbar__content {
      font-size: 14px;
    }
  }
}
</style>
