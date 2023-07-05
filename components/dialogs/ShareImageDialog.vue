<template>
  <v-dialog class="dialog share" v-model="isOpen">
    <v-card class="card-share">
      <div class="image-share">
        <button @click.prevent="$emit('close')">
          <img src="~/assets/images/text-to-image/block-images/image-details/close.svg" alt="close icon">
        </button>
        <img :src="imageSrc" alt="share image">
      </div>
      <div class="block-share-info">
        <h3>Поделитесь изображением в своих социальных сетях</h3>

        <div class="wrapper-share-social">
          <div class="wrapper-vk" @click="vk">
            <img src="~/assets/images/vk.svg" alt="vk icon">
          </div>
          <div v-if="hasShowInstagram" @click="share" class="wrapper-instagram">
            <img src="~/assets/images/instagram.svg" alt="instagram icon">
          </div>
          <div class="wrapper-class-mates">
            <a :href="`https://connect.ok.ru/offer?url=${props.imageSharedUrl.url}&imageUrl=${props.imageSharedUrl.url}`"
               target="_blank">
              <img class="class-mates" src="~/assets/images/class-mates.svg" alt="class-mates icon">
            </a>
          </div>
          <div class="wrapper-telegram">
            <a :href="`https://t.me/share/url?url=${props.imageSharedUrl.url }&text=${imageLink}`" target="_blank">
              <img src="~/assets/images/telegram.svg" alt="class-mates icon">
            </a>
          </div>

          <div class="wrapper-whats-app">
            <a :href="`whatsapp://send?text=${imageLink}`" data-action="share/whatsapp/share" target="_blank">
              <img src="~/assets/images/whats-app.svg" alt="class-mates icon">
            </a>
          </div>

        </div>
        <div class="wrapper-input">
          <input v-model="imageLink" ref="referral" readonly>
          <button class="button-copy" @click="copyLink(imageLink)">
            <img src="~/assets/images/copy.svg" alt="copy">
            Скопировать
          </button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {defineEmits, defineProps, onMounted, ref} from "vue";
import {modelsStore} from "~/store/models";

const props = defineProps({
  imageSrc: Object,
  imageSharedUrl: String
});
const referral = ref(null);
const emit = defineEmits(['close']);
const models = modelsStore();
const {toggleSnackBarDone} = models;

let isOpen = ref(true);
let imageLink = ref(`https://neuro-holst.ru/image/shared?id=${props.imageSharedUrl.share_id}`);
let hasShowInstagram = ref(true);

onMounted(() => {
  window.addEventListener('resize', getCurrentWidth)
  if (window.innerWidth > 1300) {
    hasShowInstagram.value = false;
  }
})

function getCurrentWidth(event) {
  hasShowInstagram.value = event.target.innerWidth < 1300;
}

function copyLink() {
  toggleSnackBarDone({isOpen: true, text: "Ссылка скопирована"})
  referral.value.select();
  document.execCommand("copy");
}

function share() {
  navigator.share({
    url: imageLink.value
  })
}

function vk() {
  let url = 'http://vk.com/share.php?';
  url += 'url=' + encodeURIComponent(imageLink.value);
  url += '&image=' + encodeURIComponent(props.imageSharedUrl.url || props.imageSharedUrl.share_id);
  url += '&noparse=true';
  window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
}

</script>

<style lang="scss">

.dialog.share {
  .v-overlay__content {
    width: 100%;
    max-width: 40vw;

    .card-share {
      width: 100%;
      color: var(--main-light-color);
      background-color: rgba(0, 0, 0, 0);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: unset;

      .image-share {
        position: relative;
        display: flex;
        height: 15vw;
        justify-content: center;
        background-color: rgba(31, 32, 35, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding-bottom: 30px;
        border-radius: 20px 20px 0 0;

        button {
          position: absolute;
          right: 10px;
          top: 85px;

          img {
            opacity: 0.6;
            width: 30px;
            height: 30px;
          }
        }

        img {
          transform: translateY(-80px);
          height: 15vw;
          object-fit: contain;
          border-radius: 10px;
        }
      }

      .block-share-info {
        display: flex;
        flex-direction: column;
        background-color: var(--main-backgground-color);
        border-radius: 0 0 20px 20px;
        gap: 50px;
        padding: 20px 20px 30px;

        h3 {
          text-align: center;
          font-size: 20px;
        }

        .wrapper-share-social {
          display: flex;
          justify-content: space-around;

          .wrapper-vk,
          .wrapper-instagram,
          .wrapper-class-mates,
          .wrapper-telegram,
          .wrapper-whats-app {
            display: flex;
            justify-content: center;
            width: 75px;
            height: 75px;
            border-radius: 50%;
            transition: all 0.2s;
            cursor: pointer;

            img {
              width: 30px;
            }

            .class-mates {
              width: 35px;
            }

            a {
              display: flex;

              img {
                width: 30px;
              }
            }
          }

          .wrapper-vk {
            background-color: rgba(25, 118, 210, 0.1);

            &:hover {
              background-color: rgba(25, 118, 210, 0.3);
            }
          }

          .wrapper-instagram {
            background-color: rgba(166, 42, 163, 0.1);

            &:hover {
              background-color: rgba(166, 42, 163, 0.3);
            }
          }

          .wrapper-class-mates {
            background-color: rgba(255, 152, 0, 0.1);

            &:hover {
              background-color: rgba(255, 152, 0, 0.3);
            }
          }

          .wrapper-telegram {
            background-color: rgba(64, 179, 224, 0.2);

            &:hover {
              background-color: rgba(64, 179, 224, 0.5);
            }
          }

          .wrapper-whats-app {
            background-color: rgba(37, 211, 102, 0.2);

            &:hover {
              background-color: rgba(37, 211, 102, 0.5);
            }
          }
        }

        .wrapper-input {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          padding: 10px 20px;
          gap: 20px;

          input {
            flex: 1;
            min-width: 250px;
            border: 1px solid #36E2FF;
            padding: 7px 10px;
            border-radius: 10px;
            color: #36E2FF;
            outline: none;
          }

          .button-copy {
            display: flex;
            align-items: center;
            height: 40px;
            gap: 10px;
            color: var(--main-backgground-color);
            background-color: var(--light-blue);
            padding: 10px;
            border-radius: 10px;
            font-weight: bold;

            img {
              width: 20px;
            }

            &:hover {
              box-shadow: 0 0 10px rgba(54, 226, 255, 0.5);
            }
          }
        }
      }
    }
  }

  .v-text-field .v-input__details {
    display: none;
  }
}

@media screen and (max-width: 1100px) {
  .dialog.share {
    .v-overlay__content {
      .card-share {

        .image-share {
          height: 15vw;

          img {
            transform: translateY(-60px);
            height: 20vw;
          }
        }

        .block-share-info {
          gap: 10px;
          padding: 20px;

          .wrapper-share-social {
            .wrapper-vk,
            .wrapper-instagram,
            .wrapper-class-mates,
            .wrapper-telegram,
            .wrapper-whats-app {
              width: 50px;
              height: 50px;

              img {
                width: 25px;
              }
            }
          }
        }

        .wrapper-input {
          input {
            font-size: 12px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .dialog.share {
    .v-overlay__content {
      max-width: 90vw;

      .card-share {
        .image-share {
          height: 30vw;

          button {
            position: absolute;
            right: 5px;
            top: 65px;

            img {
              opacity: 0.6;
              width: 30px;
              height: 30px;
            }
          }

          img {
            transform: translateY(-50px);
            height: 35vw;
          }
        }

        .block-share-info {
          h3 {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
