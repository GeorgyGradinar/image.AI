<template>
  <div class="wrapper-frequently">
    <section class="frequently-asked">
      <h2>Часто задаваемые вопросы</h2>

      <v-expansion-panels multiple>
        <v-expansion-panel class="frequently">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            Могу ли я использовать созданные изображения для коммерческих проектов?
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            Да, вы можете использовать сгенерированные изображения в коммерческих целях. Однако имейте в виду, что
            лицензия CreativeML Open RAIL-M распространяется на созданные изображения.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="frequently">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            Как создавать красивые изображения?
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            В большинстве случаев простых подсказок недостаточно для получения отличных результатов. Но писать хорошие
            подсказки можно научиться. Вы можете начать с чтения книги-подсказки OpenArt.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="frequently">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            Действительно ли getimg.ai бесплатен?
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            Да. Вы можете создавать 100 изображений бесплатно каждый месяц. Просто создайте учетную запись. Кроме
            того, вы можете заработать больше, привлекая друзей и подписчиков.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="frequently">
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            Могу ли я создавать контент NSFW?
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            Вы можете создать все, что захотите! Но имейте в виду, что мы отслеживаем сгенерированный контент.
            Использование, нарушающее любые применимые национальные, федеральные, государственные, местные или
            международные законы или правила, будет запрещено и сообщено!
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

.wrapper-frequently {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #1f2023;
  padding: 50px 0;

  .frequently-asked {
    width: 600px;
    display: flex;
    flex-direction: column;

    h2 {
      color: var(--main-light-color);
      margin-bottom: 20px;
    }

    .frequently {
      background-color: #1f2023;
      color: var(--main-light-color);
      border-bottom: 1px solid rgba(249, 246, 224, 0.6);
    }


    .mdi-chevron-down::before {
      color: red !important;
    }

  }
}

</style>
