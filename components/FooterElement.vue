<template>
  <footer>
    <div class="wrapper-footer">
      <div class="logo">
        <h3>Logo</h3>
        <div class="social">
          <img src="~/assets/images/footer/instagram.svg" alt="">
          <img src="~/assets/images/footer/twitter.svg" alt="">
          <img src="~/assets/images/footer/vk.svg" alt="">
        </div>
      </div>

      <section class="item">
        <h3>Продукт</h3>
        <button>Арт генератор</button>
        <button>AI редактор</button>
        <button>Сеть управления</button>
        <button>ФотоМечты</button>
        <button>Цены</button>
      </section>

      <section class="item">
        <h3>Виды</h3>
        <button>Аналоговая Диффузия</button>
        <button>Аниме Диффузия</button>
        <button>Дисней Диффузия</button>
        <button>Гибли Диффузия</button>
        <button>Inkpunk Диффузия</button>
        <button>ван Гог Диффузия</button>
      </section>

      <section class="item">
        <h3>Ресурсы</h3>
        <button>Политика конфиденциальности</button>
        <button>Условия использования</button>
        <button>Ограничения</button>
        <button>Партнерская программа</button>
      </section>

      <section class="item">
        <h3>О нас</h3>
        <button>Инфо</button>
        <button>FAQ</button>
        <button>Email</button>
      </section>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped lang="scss">

footer {
  width: 100%;
  background-color: #232426;
  display: flex;
  justify-content: center;
  z-index: 3;

  .wrapper-footer {
    width: 1200px;
    padding: 64px 0;
    display: flex;
    justify-content: space-between;

    .logo {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 15px;
      color: #f9f6e0;
      font-weight: 400;
    }

    .social {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .social img {
      cursor: pointer;
    }

    .item {
      width: 100%;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      h3 {
        color: #f9f6e0;
        font-size: 14px;
        font-weight: 500;
      }

      button {
        display: flex;
        font-size: 15px;
        color: #807a7a;
        font-weight: 600;
        text-align: start;
        background-color: #232426;
        border: none;
      }

      button:hover {
        color: #f9f6e0;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  footer {
    .wrapper-footer {
      flex-direction: column;
      gap: 35px;

      .logo {
        gap: 10px;
      }

      .item,
      .logo {
        padding: 0 25px;
      }
    }
  }
}

</style>
