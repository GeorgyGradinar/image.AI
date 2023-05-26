<template>
  <div class="wrapper-editor">
    <HeaderEditor></HeaderEditor>
    <div class="wrapper-main-block-edit">
      <Editor></Editor>
      <GenerateParameters></GenerateParameters>
    </div>
  </div>
</template>

<script setup>
import HeaderEditor from "~/components/editor/HeaderEditor"
import GenerateParameters from "~/components/editor/GenerateParameters";
import Editor from "~/components/editor/Editor";

</script>

<style scoped lang="scss">
.wrapper-editor {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-backgground-color);

  .wrapper-main-block-edit {
    display: flex;
  }
}
</style>
