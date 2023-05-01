<template>
  <div class="wrapper-frequently">
    <section class="frequently-asked">
      <h2>Часто задаваемые вопросы</h2>
      <v-expansion-panels>
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
            title="Item"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </section>
  </div>
</template>

<script>
export default {
  name: "FrequentlyAsked"
}
</script>

<style scoped lang="scss">

.wrapper-frequently {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  .frequently-asked {
    max-width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)

  }
}

</style>
