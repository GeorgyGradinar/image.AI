<template>
  <div class="wrapper-editor">
    <HeaderEditor></HeaderEditor>
    <div class="wrapper-main-block-edit">
      <GenerateParameters></GenerateParameters>
      <ImageEditor></ImageEditor>
    </div>
  </div>
  <div class="mobile-block">
    <MobileBlock></MobileBlock>
  </div>
</template>

<script setup>
import HeaderEditor from "~/components/editor/HeaderEditor"
import GenerateParameters from "~/components/editor/GenerateParameters";
import MobileBlock from "~/components/editor/MobileBlock";
import ImageEditor from "~/components/editor/ImageEditor";

definePageMeta({
  middleware: "auth"
})

</script>

<style scoped lang="scss">
.wrapper-editor {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-backgground-color);
  overflow: hidden;

  .wrapper-main-block-edit {
    display: flex;
  }
}

.mobile-block {
  display: none;
  width: 100vw;
  min-height: 100vh;
  background-color: var(--main-backgground-color);
}

@media screen and (max-width: 1250px) {
  .wrapper-editor {
    display: none;
  }

  .mobile-block {
    display: flex;
  }
}
</style>
