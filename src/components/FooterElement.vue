<template>
  <footer>
    <div class="logo">
      <p>Logo</p>
      <div class="social">
        <img src="../../src/assets/footer/instagram.svg" alt="">
        <img src="../../src/assets/footer/twitter.svg" alt="">
        <img src="../../src/assets/footer/discord.svg" alt="">
      </div>
    </div>

    <section class="item">
      <h3>Product</h3>
      <button>Art Generator</button>
      <button>AI Editor</button>
      <button>ControlNet</button>
      <button>DreamBooth</button>
      <button>Pricing</button>
    </section>

    <section class="item">
      <h3>Models</h3>
      <button>Analog Diffusion</button>
      <button>Anime Diffusion</button>
      <button>Disney Diffusion</button>
      <button>Ghibli Diffusion</button>
      <button>Inkpunk Diffusion</button>
      <button>Van Gogh Diffusion</button>
    </section>

    <section class="item">
      <h3>Resources</h3>
      <button>Privacy Policy</button>
      <button>Terms of Service</button>
      <button>Restrictions</button>
      <button>Affiliate Program</button>
    </section>

    <section class="item">
      <h3>About</h3>
      <button>Guides</button>
      <button>FAQ</button>
      <button>Email</button>
    </section>
  </footer>
</template>

<script>
export default {
  name: "FooterElement"
}
</script>

<style scoped>

footer {
  width: 100%;
  padding: 60px 150px;
  background-color: #232426;
  display: flex;
  justify-content: space-between;
}

.logo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item h3 {
  color: #f9f6e0;
  font-weight: 400;
}

.item button {
  display: flex;
  font-size: 14px;
  color: #807a7a;
  font-weight: 600;
}

.item button:hover {
  color: #f9f6e0;
}

</style>
