<template>
  <div>
    <h1>Нейросеть, которая рисует по словам онлайн</h1>
    <div class="animation-wrapper">
      <div class="list">
        <span class="gradient animate animate-1">Картинки</span>
        <span class="gradient animate animate-2">Логотипы</span>
        <span class="gradient animate animate-3">Аватары</span>
        <span class="gradient animate animate-4">Изображения</span>
        <span class="gradient animate animate-5">Аниме</span>
        <span class="gradient animate animate-6">Персонажей</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroTitle"
}
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
  animation: autoscroll 10s linear 0s infinite forwards;

  span {
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
  5%, 25% {
    @include transformY(0);
  }
  30%, 55% {
    @include transformY(-56px);
  }
  60%, 95% {
    @include transformY(-112px);
  }
  to {
    @include transformY(-100%);
  }
}

@keyframes autoscrollSmallScreen {
  from {
    @include transformY(35px);
  }
  5%, 25% {
    @include transformY(0);
  }
  30%, 55% {
    @include transformY(-40px);
  }
  60%, 95% {
    @include transformY(-80px);
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
    animation: autoscrollSmallScreen 10s linear 0s infinite forwards;
  }

  .animation-wrapper {
    height: 40px;
  }
}
</style>
