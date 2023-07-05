<template>
  <v-dialog class="dialog price" v-model="isOpen" persistent>
    <v-card class="card">
      <div class="wrapper-close">
        <p class="warning">У вас недостаточно красок, выберите пакет</p>
        <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close icon"
             @click.prevent="$emit('close')">
      </div>
      <div class="wrapper-prices">
        <Rates></Rates>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, onMounted, ref} from "vue";
import Rates from "~/components/pricing/Rates";

const emit = defineEmits(['close']);

let isOpen = ref(true);

onMounted(() => {
  document.addEventListener('click', closeDialogClickOnAbroad)
})

function closeDialogClickOnAbroad(event) {
  if (Array.from(event.target.parentElement.classList).includes( 'add-email-dialog')) {
  }else if (Array.from(event.target.classList).includes('v-overlay__scrim' || 'v-overlay__content' )){
    closeBlock();
  }
}

function closeBlock() {
  removeEventListener('click', closeDialogClickOnAbroad);
  emit('close');
}
</script>

<style lang="scss">

.dialog.price {
  .v-overlay__content {
    display: flex;
    align-items: center;
    margin: 0;
    width: 100%;
    max-width: 1000px;
    max-height: calc(100vh - 100px);

    .card {
      width: 100%;
      background-color: rgba(43, 43, 43, 0.8);
      padding: 20px 30px 30px 30px;

      .wrapper-close {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 10px 0;
        margin: 0 0 20px 0;
        border-bottom: 1px solid rgba(255, 255, 225, 0.4);

        .warning {
          display: flex;
          justify-content: center;
          color: var(--light-pink);
          font-weight: bolder;
        }

        img {
          width: 25px;
          height: 25px;
          cursor: pointer;
          opacity: 0.6;
        }
      }

      .wrapper-prices {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: auto;
        gap: 60px;
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 850px;

      .card {

        .wrapper-prices {
          overflow-y: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 660px;
      height: calc(100vh - 100px);

      .card {

        .wrapper-prices {
          overflow-y: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .dialog.price {
    .v-overlay__content {
      max-width: 350px;

      .card {
        padding: 20px 15px 10px 15px;

        .wrapper-close {
          .warning {
            font-size: 15px;
          }
        }

        .wrapper-prices {
        }
      }
    }
  }
}
</style>
