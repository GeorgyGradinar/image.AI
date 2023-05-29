<template>
  <section class="filters">
    <div class="wrapper-settings-block">
  <!--      <h1 class="filters-header">Настройки для генерации</h1>-->
      <div class="header-parameters">
        <button @click="toggleParameters(false)" :class="{'selected': !isOpenEdit}">Сгенерировать</button>
        <button @click="toggleParameters(true)" :class="{'selected': isOpenEdit}">Редактировать</button>
      </div>
      <div class="wrapper-filters">
        <v-expansion-panels flat multiple variant="accordion">
          <Models :hasShowOption="isOpenEdit"></Models>
          <DescriptionBlock :hasShowSearch="isOpenEdit"></DescriptionBlock>
          <GenerationParameters></GenerationParameters>
          <Advanced></Advanced>
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
import Advanced from "../shared/parameters-filter/Advanced";

let isOpenEdit = ref(false);

function toggleParameters(event) {
  isOpenEdit.value = event;
}

</script>

<style scoped lang="scss">
.filters {
  border-radius: 30px 0 0 30px;

  .wrapper-settings-block {

    .header-parameters {
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 225, 0.1);

      button {
        display: flex;
        align-items: center;
        color: var(--main-light-color);
        font-weight: 600;
        font-size: 14px;
        position: relative;
        transition: all 0.2s;

        &:not(.no-hover)::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -10px;
          left: 0;
          background: linear-gradient(to left, var(--light-blue), var(--light-pink));
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
          border-radius: 50%;
        }

        &:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        &:active{
          transform: scalex(0.95);
        }
      }

      .selected {
        &:not(.no-hover)::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(1);
          height: 2px;
          bottom: -10px;
          left: 0;
          background: linear-gradient(to left, var(--light-blue), var(--light-pink));
          transform-origin: bottom left;
          transition: transform 0.25s ease-out;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
