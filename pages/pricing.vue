<template>
  <div class="wrapper-pricing">
    <pricing-block></pricing-block>
  </div>
</template>

<script setup>
import PricingBlock from "~/components/pricing/PricingBlock";
import seo from "~/mixins/seo";
import {metaPricing, meta, link, scripts} from "~/seoConfig";

const {setProperty} = seo();
setProperty(metaPricing.title, [...meta, ...metaPricing.meta], link, scripts);

</script>

<style scoped>
.wrapper-pricing {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(115deg, #21154d 0%, #21154d 49%, #2300aa 100%);
  overflow: hidden;
}
</style>
