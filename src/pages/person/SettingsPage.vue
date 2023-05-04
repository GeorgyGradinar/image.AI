<template>
  <div class="wrapper-settings">
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
              v-model="person.name"
              label="Имя"
              :error-messages="v$.name.$errors.map(e => 'Обязательное поле')"
              @input="v$.name.$touch"
              @blur="v$.name.$touch"
          ></v-text-field>
          <v-text-field
              readonly
              v-model="person.email"
              label="Почта"
          ></v-text-field>
          <v-text-field
              v-model="person.password"
              label="Пароль"
              :error-messages="v$.password.$errors.map(e => 'Некорректный код')"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              hint="Не менее 8 символов"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
          ></v-text-field>

          <div class="wrapper-account-button">
            <button>Отменить</button>
            <button class="create-account no-hover">Обновить данные</button>
          </div>
        </form>
      </div>
    </section>

  </div>
</template>

<script setup>


import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core/dist/index.mjs";
import {required} from "@vuelidate/validators";

let showPassword = ref(false);

const person = ref({
  name: '',
  email: '',
  password: '',
})

const rules = {
  name: {required},
  password: {},
};
const v$ = useVuelidate(rules, person);
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
    .account{
      padding: 50px 0;
      border-bottom: 1px solid rgba(255, 255, 225, 0.4);

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

    }
  }
}
</style>
