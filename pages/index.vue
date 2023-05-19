<template>
  <section>
    <LogoBlock></LogoBlock>
    <FeaturesBlock></FeaturesBlock>
    <DescriptionBlock></DescriptionBlock>
    <FrequentlyAsked :frequently-asks="frequentlyAsked"></FrequentlyAsked>
<!--    <ReadyToGet></ReadyToGet>-->
  </section>
</template>

<script setup>
import LogoBlock from "~/components/main-page/LogoBlock";
import FeaturesBlock from "~/components/main-page/FeaturesBlock";
import DescriptionBlock from "~/components/main-page/DescriptionBlock";
import FrequentlyAsked from "~/components/main-page/FrequentlyAsked";
import ReadyToGet from "~/components/main-page/ReadyToGet";




const frequentlyAsked = [
  {
    title: 'Могу ли я использовать созданные изображения для коммерческих проектов?',
    text: 'Да, вы можете использовать сгенерированные изображения в коммерческих целях. Однако имейте в виду, что лицензия CreativeML Open RAIL-M распространяется на созданные изображения.'
  },
  {
    title: 'Как создавать красивые изображения?',
    text: 'В большинстве случаев простых подсказок недостаточно для получения отличных результатов. Но писать хорошие подсказки можно научиться. Вы можете начать с чтения книги-подсказки OpenArt.'
  },
  {
    title: 'Действительно ли getimg.ai бесплатен?',
    text: 'Да. Вы можете создавать 100 изображений бесплатно каждый месяц. Просто создайте учетную запись. Кроме того, вы можете заработать больше, привлекая друзей и подписчиков.'
  },
  {
    title: 'Могу ли я создавать контент NSFW?',
    text: ' Вы можете создать все, что захотите! Но имейте в виду, что мы отслеживаем сгенерированный контент.\n' +
        '            Использование, нарушающее любые применимые национальные, федеральные, государственные, местные или\n' +
        '            международные законы или правила, будет запрещено и сообщено!'
  },
]
</script>

<style scoped lang="scss">

</style>
