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
          красок на изображения бесплатно. Прямо сейчас у вас есть 95 красок, которые вы можете использовать
          до 28 мая 23:37, в этот день ваши краски будут сброшены до 100. Перейдите на платный план здесь, чтобы
          получать больше красок ежемесячно.
        </span>
        <p>У вас также есть 0 дополнительных красок (срок действия которых не истекает). Купить больше здесь.</p>
      </div>

      <div class="account">
        <h3>Аккаунт</h3>
        <form>
          <v-text-field
              v-model="user.name"
              label="Имя"
              :error-messages="mapErrors(vUser$.name.$errors)"
              @input="vUser$.name.$touch"
              @blur="vUser$.name.$touch"
          ></v-text-field>
          <v-text-field
              v-model="user.email"
              label="Почта"
              :error-messages="mapErrors(vUser$.email.$errors)"
              @input="vUser$.email.$touch"
              @blur="vUser$.email.$touch"
          ></v-text-field>

          <div class="wrapper-account-button">
            <button class="cancel" @click.prevent="reset">Отменить</button>
            <button class="secondary no-hover" @click.prevent="updateUser">Обновить данные</button>
          </div>
        </form>
      </div>

      <div class="change-password">
        <h3>Сменить пароль</h3>
        <v-text-field
            v-model="user.oldPassword"
            label="Старый пароль"
            :error-messages="mapErrors(vPass$.oldPassword.$errors)"
            :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showOldPassword ? 'text' : 'password'"
            @click:append-inner="showOldPassword = !showOldPassword"
            @input="vPass$.oldPassword.$touch"
            @blur="vPass$.oldPassword.$touch"
        ></v-text-field>

        <v-text-field
            v-model="user.newPassword"
            label="Новый пароль"
            :error-messages="mapErrors(vPass$.newPassword.$errors)"
            :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            @click:append-inner="showNewPassword = !showNewPassword"
            @input="vPass$.newPassword.$touch"
            @blur="vPass$.newPassword.$touch"
        ></v-text-field>

        <v-text-field
            v-model="user.confirmation"
            label="Повторите новый пароль"
            :error-messages="mapErrors(vPass$.confirmation.$errors)"
            :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            @click:append-inner="showNewPassword = !showNewPassword"
            @input="vPass$.confirmation.$touch"
            @blur="vPass$.confirmation.$touch"
        ></v-text-field>

        <div class="wrapper-account-button">
          <button class="secondary no-hover" @click.prevent="updateUserPassword">Обновить пароль</button>
        </div>
      </div>

      <div class="delete-account">
        <h3>Удалить свой аккаунт</h3>
        <span>Удалив свою учетную запись, вы не сможете создавать новые изображения,
          ваши подписки будут отменены, а все данные, связанные с вашей учетной записью,
          будут безвозвратно утеряны. Это действие необратимо!
        </span>
        <div class="button-delete-account">
          <button @click="openAcceptDialog">Удалить аккаунт...</button>
        </div>
      </div>
    </section>
  </div>

  <AcceptDialog v-if="isOpenAcceptDialog" @closeAcceptDialog="getAccept"></AcceptDialog>

  <DoneSnackBar
      :openSnackBar="isOpenSnackBarDone"
      :text-snack-bar="textSnackBarDone"
      @close="isOpenSnackBarDone = false">
  </DoneSnackBar>
  <RejectSnackBar
      :openSnackBar="isOpenSnackBarReject"
      :text-snack-bar="textSnackBarReject"
      @close="isOpenSnackBarReject = false">
  </RejectSnackBar>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {personStore} from "~/store/personStore";
import requests from "~/mixins/requests";
import userSettings from "~/mixins/userSettings";
import validation from "~/mixins/validation";
import seo from "~/mixins/seo";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import {minLength, required, email, sameAs} from "@vuelidate/validators";
import DoneSnackBar from "~/components/sneckbars/DoneSnackBar";
import RejectSnackBar from "~/components/sneckbars/RejectSnackBar";
import apiMapper from "~/mixins/apiMapper";
import AcceptDialog from "../../components/dialogs/AcceptDialog";
import {navigateTo} from "nuxt/app";

definePageMeta({
  middleware: "auth"
})

const {getPersonInfo} = requests();
const {deleteAccount, updatePassword, updateUserData} = userSettings();
const {setProperty} = seo();
const {mapErrors} = validation();
const store = personStore();
const {person} = storeToRefs(store)
const {changePerson} = store;
const {personMapper} = apiMapper();

const user = ref({
  name: '',
  email: '',
})

const rulesUser = {
  name: {required},
  email:{email}
};
const vUser$ = useVuelidate(rulesUser, user);

const password = ref({
  oldPassword: '',
  newPassword: '',
  confirmation: ''
})

const newPassRef = computed(() => user.value.newPassword);
const rulesPass = {
  oldPassword: {required, minLength: minLength(6)},
  newPassword: {required, minLength: minLength(6)},
  confirmation: {required, sameAs: sameAs(newPassRef)}
};
const vPass$ = useVuelidate(rulesPass, password);

let showOldPassword = ref(false);
let showNewPassword = ref(false);

let isOpenAcceptDialog = ref(false);
let isOpenSnackBarDone = ref(false);
let textSnackBarDone = ref('');
let isOpenSnackBarReject = ref(false);
let textSnackBarReject = ref('');

setProperty('Аккаунт-настройки');

onMounted(() => {
  getPersonInfo();
  user.value.name = person.value.name;
  user.value.email = person.value.email;
});

watch(person, (newData) => {
  user.value.name = newData.name;
})

function reset() {

}

async function updateUser() {
  if (!vUser$.value.$error) {
    await updateUserData(user.value.name, user.value.email)
        .then(response => {
          if (response.status === "success") {
            changePerson(personMapper(response.user, person.value.token));
            openSnackBarDone(response.message);
          }
        })
        .catch(error => {
          if (error.status === "error") {
            console.log(error)
          } else if (error.status === 401) {
            changePerson({});
            navigateTo('/');
          }

        })
  }
}

async function updateUserPassword() {
  vPass$.value.$validate();

  if (!vPass$.value.$error) {
    await updatePassword(user.value.newPassword, user.value.confirmation, user.value.oldPassword,)
        .then(response => {
          if (response.status === "success") {
            openSnackBarDone(response.message);
            user.value = {
              oldPassword: '',
              newPassword: '',
              confirmation: ''
            }
            vPass$.value.$reset();
          }
        })
        .catch(error => {
          if (error.status === 400) {
            openSnackBarReject(error.data.message)
          } else if (error.status === 401) {
            console.log(error.status);
            changePerson({});
            navigateTo('/');
          } else if (error.status === "error") {
            console.log(error.status);
          }
        })
  } else {
    openSnackBarReject('Данные заполнены не корректно')
  }
}

function openSnackBarDone(message) {
  textSnackBarDone.value = message;
  isOpenSnackBarDone.value = true;
}

function openSnackBarReject(message) {
  textSnackBarReject.value = message;
  isOpenSnackBarReject.value = true;
}

function openAcceptDialog() {
  isOpenAcceptDialog.value = true;
}

function getAccept(isAccept) {
  isOpenAcceptDialog.value = false;
  deletePerson(isAccept);
}

function deletePerson(isAccept) {
  if (isAccept) {
    deleteAccount();
  }
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

    .change-password {
      .wrapper-account-button {
        display: flex;
        justify-content: flex-end;

        button {
          max-width: 250px;
          font-size: 13px;
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
