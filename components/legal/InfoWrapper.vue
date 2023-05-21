<template>
  <div class="wrapper-block">
    <h1>{{ props.title }}</h1>
    <span>{{ props.update }}</span>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  update: String
});
</script>

<style scoped lang="scss">
.wrapper-block {
  width: 100%;
  min-width: 100px;
  padding: 20px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    color: var(--main-light-color);
  }

  span {
    font-size: 15px;
    color: rgba(255, 255, 225, 0.4);
  }
}
</style>
