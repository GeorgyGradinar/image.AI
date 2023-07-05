<template>
  <div>
    <h1>Нейросеть, которая рисует по словам онлайн</h1>
    <div class="animation-wrapper">
      <div class="list">
        <strong class="gradient animate animate-1">Картинки</strong>
        <strong class="gradient animate animate-2">Логотипы</strong>
        <strong class="gradient animate animate-3">Аватары</strong>
        <strong class="gradient animate animate-4">Изображения</strong>
        <strong class="gradient animate animate-5">Аниме</strong>
        <strong class="gradient animate animate-6">Персонажей</strong>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.gradient {
  background: linear-gradient(to right, var(--light-pink), var(--light-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1,
.gradient {
  color: var(--main-light-color);
  font-size: 40px;
  font-weight: 700;
  line-height: 140%;
}

.animation-wrapper {
  height: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  animation: autoscroll 15s linear 0s infinite forwards;

  strong {
    white-space: nowrap;
  }
}

@mixin transformY($value) {
  -moz-transform: translateY($value);
  -webkit-transform: translateY($value);
  transform: translateY($value);
}

@keyframes autoscroll {
  from {
    @include transformY(56px);
  }
  5%, 15% {
    @include transformY(0);
  }
  20%, 30% {
    @include transformY(-56px);
  }
  35%, 45% {
    @include transformY(-112px);
  }
  50%, 60% {
    @include transformY(-168px);
  }
  65%, 75% {
    @include transformY(-224px);
  }
  80%, 95% {
    @include transformY(-280px);
  }
  to {
    @include transformY(-100%);
  }
}

@keyframes autoscrollSmallScreen {
  from {
    @include transformY(35px);
  }
  5%, 15% {
    @include transformY(0);
  }
  20%, 30% {
    @include transformY(-40px);
  }
  35%, 45% {
    @include transformY(-80px);
  }
  50%, 60% {
    @include transformY(-120px);
  }
  65%, 75% {
    @include transformY(-160px);
  }
  80%, 95% {
    @include transformY(-195px);
  }
  to {
    @include transformY(-100%);
  }
}

@media screen and (max-width: 800px) {
  h1,
  .gradient {
    font-size: 28px;
  }

  .list {
    animation: autoscrollSmallScreen 15s linear 0s infinite forwards;
  }

  .animation-wrapper {
    height: 40px;
  }
}
</style>
