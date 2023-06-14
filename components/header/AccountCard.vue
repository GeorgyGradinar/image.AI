<template>
  <div class="person" :class="{'opened': hasOpenDetail}" v-if="person.name" @click="hasOpenDetail = !hasOpenDetail">
    <div class="info-person">
      <span :title="person.name">{{ person.name }}</span>
      <span>краски: {{ person.credits }}</span>
    </div>
    <div class="wrapper-name-person">
      <span class="name-person">{{ person.name[firstLater] }}</span>
    </div>

    <section class="details-person" :class="{'hidden-drop-down': !hasOpenDetail}">

      <p @click="routeTo('/gallery')"><img src="~/assets/images/details-person/gallery.svg" alt="gallery">Моя галерея
      </p>
      <p @click="routeTo('/person/settings')"><img src="~/assets/images/details-person/settings.svg" alt="settings">Настройки
      </p>
      <p @click="routeTo('/transactions')"><img src="~/assets/images/details-person/history.svg" alt="history">История
        транзакций
      </p>
      <p @click.prevent="logout"><img class="rotate" src="~/assets/images/details-person/logOut.svg" alt="log out">Выйти
      </p>
      <p @click="routeTo('/referrals')"><img src="~/assets/images/details-person/invite.svg" alt="invite">Пригласить
        другей</p>
    </section>
  </div>
</template>

<script setup>
import {personStore} from "~/store/personStore";
import {storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import requests from "~/mixins/requests";
import {useRouter} from "nuxt/app";

const router = useRouter();
const {logout, } = requests();
const emit = defineEmits(['closeMainDialog']);
const store = personStore();
const {person} = storeToRefs(store);
const firstLater = 0;

let hasOpenDetail = ref(false);

const props = defineProps({
  hasCloseDrawer: Boolean,
});

onMounted(() => {
  getPerson();
})

watch(hasOpenDetail, (newValue) => {
  if (newValue) {
    emit('closeMainDialog');
  }
});

watch(props, (newValue) => {
  if (!newValue.hasCloseDrawer) {
    hasOpenDetail.value = false;
  }
});

let timeout;
function getPerson(){
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log('getPerson')
  }, 500);
}

function routeTo(route) {
  router.push({path: route});
  clearTimeout(timeout);
}
</script>

<style scoped lang="scss">
.person {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  background-color: rgba(33, 21, 77, 0.4);
  padding: 0 0 0 15px;
  border-radius: 50px;
  border: 2px solid var(--light-blue);
  cursor: pointer;
  transition: all 0.3s;

  &.opened,
  &.opened .wrapper-name-person,
  &.opened {
    border-radius: 50px 50px 10px 50px;
  }

  .info-person {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--light-blue);

    span {
      white-space: nowrap;
    }

    span:first-child {
      font-size: 13px;
      width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:last-child {
      font-size: 10px;
    }
  }

  .wrapper-name-person {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-left: 2px solid var(--light-blue);
    box-shadow: 0 0 15px rgba(54, 226, 255, 0.5);
    color: var(--light-blue);
    padding: 12px;
    border-radius: 50%;

    .name-person {
      display: flex;
      justify-content: center;
      width: 20px;
      height: 20px;
    }
  }
}

.details-person {
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  padding: 15px;
  border-radius: 30px 5px 30px 30px;
  display: flex;
  flex-direction: column;
  color: var(--main-light-color);
  background-color: rgba(64, 64, 64, 0.9);
  z-index: -10;
  transition: right 0.5s;


  & p {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    line-height: 12px;
    cursor: pointer;
    padding: 10px 5px 10px 10px;
    border-radius: 10px;

    &:hover {
      background-color: var(--main-backgground-color);
    }
  }

  .rotate {
    transform: rotate(180deg);
  }
}

.hidden-drop-down {
  right: -400px;
}

@media screen and (max-width: 500px) {
  .person {
    &.opened,
    &.opened .wrapper-name-person,
    &.opened {
      border-radius: 50px;
    }
  }

  .details-person {
    border-radius: 30px;

    &:not(.hidden-drop-down) {
      right: -30px;
    }
  }
}
</style>
