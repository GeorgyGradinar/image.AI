<template>
    <div class="wrapper__text-to-image">
      <GenerateParameters></GenerateParameters>
      <GenerationImages></GenerationImages>
    </div>
</template>
<script setup>
import GenerateParameters from "~/components/text-to-image/GenerateParameters";
import GenerationImages from "~/components/text-to-image/GenerationImages";
import seo from "~/mixins/seo";
import {metaGenerateImage, meta, link, scripts} from "~/seoConfig";

const {setProperty} = seo();
setProperty(metaGenerateImage.title, [...meta, ...metaGenerateImage.meta], link, scripts);

</script>

<style scoped lang="scss">
.wrapper__text-to-image {
  display: flex;
  align-items: flex-start;
  height: 100vh;
  background-color: #1f2023;
  overflow: hidden;
  position: relative;
}

@media screen and (max-width: 650px) {
  .wrapper__text-to-image {
    flex-direction: column;
    overflow: auto;
    overflow-y: unset;
    scrollbar-gutter: stable;
    height: unset;
    min-height: 100vh;
  }
}
</style>
