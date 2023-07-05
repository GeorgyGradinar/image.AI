<template>
  <v-dialog class="dialog accept-dialog" v-model="dialog" width="400" persistent>
    <v-card class="card">
      <button class="close-button" @click.prevent="closeDialog(false)">
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close">
      </button>
      <div class="wrapper-text">
        <p>После удаления вы не сможете восстановить данный аккаунт</p>
        <p>Вы уверены, что хотите удалить аккаунт?</p>
      </div>
      <section class="wrapper-button">
        <button class="reject" @click="closeDialog(false)">Нет</button>
        <button class="secondary accept" @click="closeDialog(true)">Да</button>
      </section>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";

const emit = defineEmits(['closeAcceptDialog']);

let dialog = ref(true);

onMounted(() => {
  document.addEventListener('click', closeDialogClickOnAbroad)
});

function closeDialogClickOnAbroad(event) {
  if (Array.from(event.target.classList).includes('v-overlay__scrim')) {
    closeDialog();
  }
}

function closeDialog(isAccept) {
  document.removeEventListener('click', closeDialogClickOnAbroad);
  emit('closeAcceptDialog', isAccept);
}

</script>

<style lang="scss">

.v-dialog.accept-dialog {
  .v-overlay__content {
    .v-card {
      padding: 30px;

      .close-button {
        right: 10px;
        top: 10px;
      }

      .wrapper-text {
        padding: 20px;

        p {
          text-align: center;
        }

        p:first-child {
          margin-bottom: 20px;
          font-size: 15px;

        }

        p:last-child {
          font-size: 12px;
          color: rgba(255, 255, 225, 0.5);
        }
      }

      .wrapper-button {
        display: flex;
        justify-content: space-around;

        .reject,
        .accept {
          padding: 5px;
          width: 40%;
          transition: all 0.2s;
        }

        .reject {
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}


</style>
