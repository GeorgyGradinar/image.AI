<template>
  <header>
    <div class="logo" @click="routeTo('/')">Logo</div>
    <nav>
      <button @click="routeTo('/editor')">Editor</button>
      <button @click="routeTo('/text-to-image')">Text to Image</button>
      <button @click="routeTo('/dream-booth')">DreamBooth</button>
      <button @click="routeTo('/guides')">Guides</button>
      <button>
        <svg fill="#807a7a" width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
             xml:space="preserve">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC"
             stroke-width="0.048"/>
          <g id="SVGRepo_iconCarrier">
<path
    d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"/>
</g>
</svg>
      </button>
      <button @click="routeTo('/pricing')">Pricing</button>
      <button>Log in</button>
      <button class="createAccount">Create free account</button>
      <div class="person" v-if="shoeImg">
        <img src="" alt="">
        <p>G</p>
      </div>
      <div class="person without-img" v-if="!shoeImg">
        <p>G</p>
      </div>
    </nav>
  </header>
</template>

<script setup>
import router from "@/router";

let shoeImg = false;

function routeTo(path) {
  router.push({path: path})
}
</script>

<style scoped>

header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(33, 21, 77, 0.91);
  padding: 15px 30px 15px 20px;
  border-bottom: 1px solid #414141;
}

nav {
  display: flex;
  gap: 20px;
}

nav button {
  display: flex;
  align-items: center;
  color: var(--main-light-color);
  font-weight: 600;
  font-size: 14px;
}

.person {
  display: flex;
  align-items: center;
  justify-content: center;
}

.person p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}

.without-img {
  background-color: chocolate;
  padding: 10px;
  border-radius: 50%;
}

.createAccount {
  border-radius: 20px;
  padding: 5px 15px;
  background-color: var(--main-light-color);
  color: #1f294a;
  font-weight: 600;
  font-size: 15px;
}

nav button svg {
  fill: var(--main-light-color);
}

</style>
