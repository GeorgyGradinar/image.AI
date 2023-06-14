<template>
  <section>
    <LogoBlock></LogoBlock>
    <FeaturesBlock></FeaturesBlock>
    <DescriptionBlock></DescriptionBlock>
    <FrequentlyAsked :frequently-asks="frequentlyAsked"></FrequentlyAsked>
    <ReadyToGet></ReadyToGet>
  </section>
</template>

<script setup>
import LogoBlock from "~/components/main-page/LogoBlock";
import FeaturesBlock from "~/components/main-page/FeaturesBlock";
import DescriptionBlock from "~/components/main-page/DescriptionBlock";
import FrequentlyAsked from "~/components/main-page/FrequentlyAsked";
import ReadyToGet from "~/components/main-page/ReadyToGet";
import {metaMainPage, meta, link, scripts} from "~/seoConfig"
import seo from "~/mixins/seo";

const {setProperty} = seo();
setProperty(metaMainPage.title, [...meta, ...metaMainPage.meta], link, scripts);

const frequentlyAsked = [
  {
    title: 'Какие языки понимает НейроХолст и может ли генерировать на русском?',
    text: 'НейроХолст прекрасно понимает русский язык, но также он работает и с английским. Можете попробовать писать запрос на любом из этих языков.'
  },
  {
    title: 'Можно ли бесплатно сгенерировать изображения?',
    text: 'Да, вы можете генерировать бесплатно. При регистрации вам будет предоставлено 25 красок, на которые можно сгенерировать около 50 изображений.'
  },
  {
    title: 'С помощью НейроХолста можно генерировать только квадратные изображения?',
    text: 'Нет, вы можете генерировать изображения с разным соотношением сторон и настраивать размер картинки под свои задачи.'
  },
  {
    title: 'Насколько хорошие изображения получаются?',
    text: 'Чтобы получить лучшее качество советуем писать очень подробные запросы. Описывайте подробно объект, его окружение,' +
        ' желаемый стиль. Не забывайте заполнить раздел “Что исключить?”. Если всё сделать правильно, то можно получить изображения' +
        ' очень хорошего качества. В любом случае вы можете попробовать бесплатно!'
  },
]

</script>

<style scoped lang="scss">
</style>
