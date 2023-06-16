<template>
  <section>
    <div class="wrapper-done">
      <img src="~/assets/images/snack-bars/done.svg" alt="done">
    </div>
    <p>Готово</p>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
section {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--main-light-color);

  .wrapper-done {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #047604FC;
    border-radius: 50%;
    padding: 20px;

    img {
      width: 30px;
      height: 30px;
    }
  }

  p {
    font-size: 30px;
  }
}
</style>
