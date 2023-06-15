<template>
  <Legal>
    <InfoWrapper :title="'Условия возврата'" :update="'Последнее обновление: 14 июнь 2023г.'">
      <article class="info">
        <h3>Если по каким-либо причинам Вы решили отказаться от приобретенной услуги, то можете сделать это в
          соответствии с Законом РФ «О защите прав потребителей» от 07.02.1992 № 2300-1.
        </h3>

        <p>Почта для заявок на возврат: neuro-holst@neuro-holst.ru</p>
        <p>Срок рассмотрения заявки до 7 дней.</p>
        <p>Для более оперативного контакта по возврату - можете написать в службу поддержки.</p>
      </article>
    </InfoWrapper>
  </Legal>
</template>

<script setup>
import Legal from "~/components/legal/Legal";
import InfoWrapper from "~/components/legal/InfoWrapper";
import seo from "~/mixins/seo";
import {metaRestrictions, meta, link, scripts} from "~/seoConfig"

const {setProperty} = seo();
setProperty(metaRestrictions.title, [...meta, ...metaRestrictions.meta], link, scripts);

</script>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: rgba(255, 255, 225, 0.7);
  padding-top: 30px;
  font-size: 14px;

  h2 {
    color: var(--main-light-color)
  }

  ul {
    margin-left: 30px;

    li {
      margin-bottom: 20px;
    }
  }
}
</style>
