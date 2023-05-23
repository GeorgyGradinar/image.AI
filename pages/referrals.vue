<template>
  <div class="wrapper-referrals">
    <section class="referrals">
      <h1>Пригласить друзей. Зарабатывайте бесплатные изображения.</h1>
      <p>Получите больше кредитов, поделившись getimg.ai с друзьями.</p>

      <h3>Дай 100 кредитов, получи 100 кредитов.</h3>
      <p>Каждый, кого вы пригласите, получит 100 кредитов на изображение. Как только они создадут у нас учетную запись,
        вы тоже получите 100 кредитов. Кредиты, заработанные через рефералов, не имеют срока действия, и нет ограничений
        на сумму, которую вы можете заработать.</p>
      <p>Скопируйте свою личную реферальную ссылку и поделитесь ею с друзьями и подписчиками.</p>

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
import {ref} from "vue";
import seo from "~/mixins/seo";

const {setProperty} = seo();
setProperty('Пригласить друзей | getImage');

let isOpenSnackBarDone = ref(false);
let textSnackBarForGeneration = ref('');
let referralLink = ref('https://image-ai-git-master-heorhiig.vercel.app/?ref=1521');
const referral = ref(null);

function copyLink(text) {
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
  background-color: var(--main-backgground-color);
  padding : 150px 0 50px 0;

  .referrals {
    width: 100%;
    max-width: 640px;
    color: var(--main-light-color);

    h1 {
      font-size: 30px;
    }

    h3 {
      margin: 0 0 10px 0;
    }

    p {
      display: block;
      color: rgba(255, 255, 225, 0.6);
      margin: 0 0 20px 0;
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
    padding : 100px 20px 20px 20px;
  }
}
</style>
