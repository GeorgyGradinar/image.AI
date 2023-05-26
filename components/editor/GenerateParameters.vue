<template>
  <section class="filters">
    <div class="wrapper-settings-block">
      <h1 class="filters-header">Настройки для генерации</h1>
      <div class="wrapper-filters" >
        <v-expansion-panels flat multiple variant="accordion">
          <Models></Models>
          <DescriptionBlock></DescriptionBlock>
          <GenerationParameters></GenerationParameters>
        </v-expansion-panels>
      </div>
    </div>
    <GenerateButton></GenerateButton>
  </section>
</template>

<script setup>
import Models from "~/components/text-to-image/parameters/Models";
import DescriptionBlock from "~/components/text-to-image/parameters/DescriptionBlock";
import GenerationParameters from "~/components/text-to-image/parameters/GenerationParameters";
import GenerateButton from "~/components/shared/GenerateButton";

</script>

<style scoped lang="scss">
.filters {
  border-radius: 30px 0 0 30px;

  .wrapper-settings-block {
  }
}
</style>
