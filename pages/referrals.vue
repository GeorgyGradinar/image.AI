<template>
  <div class="wrapper-referrals">
    <section class="referrals">
      <h1>Приглашай друзей и зарабатывай краски</h1>
      <p>Каждый зарегистрировавшийся по ваше ссылке становится вашим рефералом.</p>

      <h3>Получай 20% красок с каждой покупки твоего реферала</h3>
      <p>Каждый раз, когда твой реферал покупает краски, на твой баланс будет добавляться 20% от красок, которые он купил.</p>
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
import {ref} from "vue";
import seo from "~/mixins/seo";

definePageMeta({
  middleware: "auth"
})

const referral = ref(null);
const {setProperty} = seo();
setProperty('Пригласить друзей | НейроХолст', 'На этой странице вы можете получить свою реферальную ссылку');

let isOpenSnackBarDone = ref(false);
let textSnackBarForGeneration = ref('');
let referralLink = ref('https://image-ai-git-master-heorhiig.vercel.app/?ref=1521');


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
  background-color: var(--main-backgground-color);
  padding : 150px 0 50px 0;

  .referrals {
    width: 100%;
    max-width: 710px;
    color: var(--main-light-color);

    h1 {
      font-size: 30px;
      margin: 0 0 15px 0;
    }

    h3 {
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
    padding : 100px 20px 20px 20px;
  }
}
</style>
