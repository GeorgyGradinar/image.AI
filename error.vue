<template>
  <NuxtLayout>
    <section class="pages">
      <Header></Header>
      <main>
        <img src="~/assets/images/not-found.svg" alt="not found image"/>
        <h1>Страница не найдена</h1>
        <p>Похоже, мы не можем найти нужную вам страницу</p>
        <NuxtLink to="/" class="secondary">Вернуться на главную</NuxtLink>
      </main>
      <Footer></Footer>
    </section>
  </NuxtLayout>
  <Models></Models>
</template>

<script setup>
import Footer from "~/components/FooterElement";
import Header from "~/components/header/HeaderElement";
import Models from "~/components/Models";
</script>

<style lang="scss" scoped>

.pages {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #150d46;
}

main {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 100px 40px 40px;
  position: relative;
  text-align: center;

  a {
    text-decoration: none;
  }

  h1 {
    background: linear-gradient(to right, var(--light-pink), var(--light-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 60px;
  }

  p {
    font-size: 20px;
    color: var(--main-light-color);
    opacity: 0.7;
  }

  img {
    width: 20vw;
    opacity: 0.1;
  }
}

@media screen and (max-width: 500px) {
  main {
    h1 {
      font-size: 40px;
    }

    p {
      font-size: 18px;
    }

    img {
      width: 30vw;
    }
  }
}
</style>
