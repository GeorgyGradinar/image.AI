<template>
  <div class="wrapper-settings" id="settings">
    <section class="settings">
      <div class="title">
        <h1>Настройки</h1>
        <span>Здесь вы можете управлять данными своей учетной записи.</span>
      </div>

      <div class="billing">
        <h3>Выставление счетов</h3>
        <span>В настоящее время вы используете бесплатный план. Это означает, что вы ежемесячно получаете 100
          кредитов на изображения бесплатно. Прямо сейчас у вас есть 95 кредитов, которые вы можете использовать
          до 28 мая 23:37, в этот день ваши кредиты будут сброшены до 100. Перейдите на платный план здесь, чтобы
          получать больше кредитов ежемесячно.
        </span>
        <p>У вас также есть 0 дополнительных кредитов (срок действия которых не истекает). Купить больше здесь.</p>
      </div>

      <div class="account">
        <h3>Аккаунт</h3>
        <form>
          <v-text-field
              v-model="user.name"
              label="Имя"
              :error-messages="mapErrors(v$.name.$errors)"
              @input="v$.name.$touch"
              @blur="v$.name.$touch"
          ></v-text-field>
          <v-text-field
              readonly
              v-model="user.email"
              label="Почта"
          ></v-text-field>


          <div class="wrapper-account-button">
            <button class="cancel" @click.prevent="reset">Отменить</button>
            <button class="create-account no-hover" @click.prevent="updateUser">Обновить данные</button>
          </div>
        </form>
      </div>

      <div class="change-password">
        <h3>Сменить пароль</h3>
        <v-text-field
            v-model="user.password"
            label="Пароль"
            :error-messages="mapErrors(v$.password.$errors)"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hint="Не менее 8 символов"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>

        <v-text-field
            v-model="user.password"
            label="Пароль"
            :error-messages="mapErrors(v$.password.$errors)"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            hint="Не менее 8 символов"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            @input="v$.password.$touch"
            @blur="v$.password.$touch"
        ></v-text-field>
      </div>

      <div class="delete-account">
        <h3>Удалить свой аккаунт</h3>
        <span>Удалив свою учетную запись, вы не сможете создавать новые изображения,
          ваши подписки будут отменены, а все данные, связанные с вашей учетной записью,
          будут безвозвратно утеряны. Это действие необратимо!
        </span>
        <div class="button-delete-account">
          <button @click="deletePerson">Удалить аккаунт...</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import userSettings from "~/mixins/userSettings";
import validation from "~/mixins/validation";
import seo from "~/mixins/seo";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import {minLength, required, sameAs} from "@vuelidate/validators";

definePageMeta({
  middleware: "auth"
})


const {} = requests();
const {deleteAccount, updatePassword, updateUserData} = userSettings();
const {setProperty} = seo();
const {mapErrors} = validation();
const store = personStore();
const {person} = storeToRefs(store)



const user = ref({
  name: '',
  email: '',
  password: '',
  confirmation: ''
})

const emailRef = computed(() => user.value.password);
const rules = {
  name: {required},
  password: {required, minLength: minLength(8)},
  passwordConfirmation: {required, sameAs: sameAs(emailRef)}
};

const v$ = useVuelidate(rules, user);

let showPassword = ref(false);

setProperty('Аккаунт-настройки');

onMounted(() => {
  user.value.name = person.value.name
  user.value.email = person.value.email
});

function reset() {
}

function deletePerson() {
  deleteAccount();
}

function updateUser() {
}
</script>

<style scoped lang="scss">

.wrapper-settings {
  display: flex;
  justify-content: center;
  background-color: var(--main-backgground-color);

  .settings {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 640px;
    min-height: calc(100vh - 70px);
    margin-top: 70px;
    color: var(--main-light-color);

    .title,
    .billing,
    .account,
    .change-password,
    .delete-account {
      padding: 50px 0;
      border-bottom: 1px solid rgba(255, 255, 225, 0.4);

      h1,
      h3 {
        margin-bottom: 5px;
      }

      span {
        color: hsla(180, 7%, 97%, .6);
        font-size: 13px;
        line-height: 24px;
      }
    }

    .billing {
      p {
        color: hsla(180, 7%, 97%, .6);
        font-size: 13px;
        line-height: 24px;
        margin-top: 15px;
      }
    }

    .account {
      h3 {
        margin-bottom: 15px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .wrapper-account-button {
          display: flex;
          justify-content: flex-end;
          gap: 20px;

          button {
            max-width: 250px;
            font-size: 13px;
          }
        }
      }
    }

    .delete-account {
      border-bottom: none;

      .button-delete-account {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;

        button {
          background-color: #eb5757;
          border-radius: 30px;
          padding: 10px;
          font-size: 13px;
          transition: all 0.3s;

          &:hover {
            background-color: #E17676FF;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .wrapper-settings {
    .settings {
      padding: 0 20px
    }
  }
}

@media screen and (max-width: 900px) {
  .create-account {
    margin-top: 0;
  }
}
</style>
