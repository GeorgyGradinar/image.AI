<template>
  <div class="wrapper-referrals">
    <section class="referrals">
      <h1>Приглашай друзей и зарабатывай краски</h1>
      <p>Каждый зарегистрировавшийся по ваше ссылке становится вашим рефералом.</p>

      <h2>Получай 20% красок с каждой покупки твоего реферала</h2>
      <p>Каждый раз, когда твой реферал покупает краски, на твой баланс будет добавляться 20% от красок, которые он
        купил.</p>
      <p>Скопируйте свою реферальную ссылку и поделитесь ей с друзьями и подписчиками!</p>

      <div class="wrapper-input">
        <v-text-field
            readonly
            v-model="referralLink"
            label="Реферальная ссылка"
            ref="referral"
        ></v-text-field>
        <button class="button-copy" @click="copyLink(referralLink)">
          <img src="~/assets/images/copy.svg" alt="copy">
          Скопировать
        </button>
      </div>
    </section>
  </div>

  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarForGeneration"
      @close="isOpenSnackBarDone = false">
  </DoneSnackBar>
</template>

<script setup>
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import {onMounted, ref, watch} from "vue";
import seo from "~/mixins/seo";
import {metaReferral, meta, link, scripts} from "~/seoConfig";
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";
import {navigateTo} from "nuxt/app";

const store = personStore();
const {person} = storeToRefs(store);
const referral = ref(null);
const {setProperty} = seo();
setProperty(metaReferral.title, [...meta, ...metaReferral.meta], link, scripts);

let isOpenSnackBarDone = ref(false);
let textSnackBarForGeneration = ref('');
let referralLink = ref('');

onMounted(() => {
  if (!person.value.id) {
    navigateTo('/');
  } else {
    referralLink.value = `https://neuro-holst.ru?ref=${person.value.id}`
  }
})

watch(person, (newData) => {
  if (newData.id) {
    referralLink.value = `https://neuro-holst.ru?ref=${newData.id}`
  }
})

function copyLink() {
  textSnackBarForGeneration.value = "Ссылка скопирована";
  isOpenSnackBarDone.value = true;
  referral.value.select();
  document.execCommand("copy");
}
</script>

<style lang="scss">

.wrapper-referrals {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  padding: 150px 0 50px 0;
  background: rgb(33, 21, 77);
  background: linear-gradient(115deg, rgba(33, 21, 77, 1) 0%, rgba(33, 21, 77, 1) 49%, rgba(35, 0, 170, 1) 100%);


  .referrals {
    width: 100%;
    max-width: 710px;
    color: var(--main-light-color);

    h1 {
      font-size: 30px;
      margin: 0 0 15px 0;
    }

    h2 {
      margin: 0 0 15px 0;
    }

    p {
      display: block;
      color: rgba(255, 255, 225, 0.6);
      margin: 0 0 25px 0;
      font-size: 15px;

      &:first-of-type {
        margin: 0 0 30px 0;
      }
    }

    .wrapper-input {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .v-input--density-default {
        width: 100%;
      }

      .v-text-field .v-field--active input {
        &::selection {
          background-color: var(--main-backgground-color);
        }
      }

      .button-copy {
        display: flex;
        align-items: center;
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

@media screen and (max-width: 700px) {
  .wrapper-referrals {
    padding: 100px 20px 20px 20px;

    .referrals {
      h1 {
        font-size: 25px;
      }

      h2 {
        font-size: 20px;
      }

      p {
        font-size: 13px;

        &:first-of-type {
          margin: 0 0 30px 0;
        }
      }
    }
  }
}
</style>
