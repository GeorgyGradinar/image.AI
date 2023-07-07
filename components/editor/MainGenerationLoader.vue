<template>
  <div class="loader-block">
    <div class="wrapper-text">
      <p class="seconds">
        <span>{{ second }}.</span>
        <span>{{ ms }}s</span>
      </p>
      <p class="text-generation">Генерация...</p>
    </div>
    <div class="spinner">
      <div class="spinner1"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

let timer = 0;
let timerInterval;
let ms = ref(0);
let second = ref(0);

onMounted(() => {
  startTimer();
})

function startTimer() {
  stopTimer();
  timerInterval = setInterval(function () {
    timer += 1 / 60;
    ms.value = Math.floor((timer - Math.floor(timer)) * 10);
    second.value = Math.floor(timer);
  }, 1000 / 60);
}

function stopTimer() {
  clearInterval(timerInterval);
}
</script>

<style scoped lang="scss">
.loader-block {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper-text {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
    gap: 5px;
  }

  .seconds,
  .text-generation {
    color: var(--main-light-color);
    font-size: 10px;

    span {
    }
  }

  .text-generation {
    top: 50%;
    animation: pulse 1.3s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.06);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }


  }

  .spinner {
    background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
    width: 120px;
    height: 120px;
    animation: spinning82341 0.7s linear infinite;
    text-align: center;
    border-radius: 60px;
    box-shadow: 0px -5px 20px 5px rgb(186, 66, 255), 0px 5px 20px -5px rgb(0, 225, 255);

    .spinner1 {
      background-color: rgb(36, 36, 36);
      width: 120px;
      height: 120px;
      border-radius: 60px;
    }
  }

  @keyframes spinning82341 {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
