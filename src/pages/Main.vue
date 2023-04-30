<template>
  <section class="main-page">
    <section class="first-block">
      <div class="wrapper-description">
        <h1>Create amazing artworks with the power of AI.</h1>
        <span>Get img.ai is a suite of magical AI tools. Generate original images at scale, modify photos, expand pictures beyond their original borders, or create custom AI models.</span>
        <button>Start creating for free</button>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main"
}
</script>

<style scoped>

.main-page {
  height: 1000px;
}

.main-page {
  color: cornflowerblue;
  background: rgb(33, 21, 77);
  background: linear-gradient(90deg, rgba(33, 21, 77, 1) 42%, rgba(37, 17, 109, 1) 72%, rgba(42, 11, 156, 1) 100%);
}

.first-block {
  margin: 0 10%;
}

.wrapper-description {
  height: 400px;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.wrapper-description h1 {
  color: var(--main-light-color);
  font-size: 56px;
  font-weight: 600;
  line-height: 120%;
}

.wrapper-description span {
  color: var(--main-light-color);
  font-size: 18px;
  line-height: 160%;
  opacity: .8;
  font-weight: 400;
}

</style>
