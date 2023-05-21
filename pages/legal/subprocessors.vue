<template>
  <Legal>
    <InfoWrapper :title="'Подпроцессоры getimg.ai'" :update="'Последнее обновление: 23 сентября 2022г.'">
      <article class="info">
        <p>Мы используем сторонние подпроцессоры, такие как поставщики облачных вычислений и программное обеспечение
          поддержки клиентов, для запуска getimg.ai (услуги).
        </p>
        <p>Ниже приведен список подпроцессоров персональных данных, которые мы используем.</p>

        <ul>
          <li><a href="">Полоса. </a> Подписки и обработка платежей.</li>
          <li><a href="">Веб-сервисы Амазон. </a>Поставщик облачных услуг.</li>
          <li><a href="">Облачная платформа Google. </a>Поставщик облачных услуг.</li>
          <li><a href="">Правдоподобная аналитика. </a>Аналитика сайта и приложений.</li>
          <li><a href="">Постборов. </a> Аналитика сайта и приложений.</li>
          <li><a href="">Часовой. </a> Программное обеспечение для сообщения об ошибках.</li>
        </ul>
      </article>
    </InfoWrapper>
  </Legal>
</template>

<script setup>
import Legal from "~/components/legal/Legal";
import InfoWrapper from "~/components/legal/InfoWrapper";
import seo from "~/mixins/seo";

const {setProperty} = seo();
setProperty('Подпроцессоры | getImages', '');
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

      a{
        color: var(--main-light-color);
      }
    }
  }
}
</style>
