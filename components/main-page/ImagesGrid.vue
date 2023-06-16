<template>
  <div class="photo-grid">
<!--    <div class="grid-column" v-for="column in images" :key="column.id">-->
<!--      <img v-for="image in column" :key="image.id"-->
<!--           :src="image[image]" alt="image example">-->
<!--    </div>-->
    <div class="grid-column" >
      <img src="~/assets/images/main-page/first.webp" alt="image example">
      <img src="~/assets/images/main-page/image.webp" alt="image example">
      <img src="~/assets/images/main-page/image(43).webp" alt="image example">
      <img src="~/assets/images/main-page/image(23).webp" alt="image example">
      <img src="~/assets/images/main-page/image(1).webp" alt="image example">
      <img src="~/assets/images/main-page/image(47).webp" alt="image example">
      <img src="~/assets/images/main-page/image(15).webp" alt="image example">
      <img src="~/assets/images/main-page/image(29).webp" alt="image example">
      <img src="~/assets/images/main-page/image(2).webp" alt="image example">
      <img src="~/assets/images/main-page/image(35).webp" alt="image example">
      <img src="~/assets/images/main-page/image(30).webp" alt="image example">
      <img src="~/assets/images/main-page/image(9).webp" alt="image example">
      <img src="~/assets/images/main-page/image(38).webp" alt="image example">
    </div>
    <div class="grid-column">
      <img src="~/assets/images/main-page/image(3).webp" alt="image example">
      <img src="~/assets/images/main-page/image(39).webp" alt="image example">
      <img src="~/assets/images/main-page/image(11).webp" alt="image example">
      <img src="~/assets/images/main-page/image(31).webp" alt="image example">
      <img src="~/assets/images/main-page/image(4).webp" alt="image example">
      <img src="~/assets/images/main-page/image(22).webp" alt="image example">
      <img src="~/assets/images/main-page/image(34).webp" alt="image example">
      <img src="~/assets/images/main-page/image(10).webp" alt="image example">
      <img src="~/assets/images/main-page/image(16).webp" alt="image example">
      <img src="~/assets/images/main-page/image(42).webp" alt="image example">
      <img src="~/assets/images/main-page/image(7).webp" alt="image example">
      <img src="~/assets/images/main-page/image(46).webp" alt="image example">
      <img src="~/assets/images/main-page/image(24).webp" alt="image example">
    </div>
    <div class="grid-column">
      <img src="~/assets/images/main-page/image(50).webp" alt="image example">
      <img src="~/assets/images/main-page/image(17).webp" alt="image example">
      <img src="~/assets/images/main-page/image(5).webp" alt="image example">
      <img src="~/assets/images/main-page/image(36).webp" alt="image example">
      <img src="~/assets/images/main-page/image(6).webp" alt="image example">
      <img src="~/assets/images/main-page/image(32).webp" alt="image example">
      <img src="~/assets/images/main-page/image(25).webp" alt="image example">
      <img src="~/assets/images/main-page/image(8).webp" alt="image example">
      <img src="~/assets/images/main-page/image(44).webp" alt="image example">
      <img src="~/assets/images/main-page/image(18).webp" alt="image example">
      <img src="~/assets/images/main-page/image(41).webp" alt="image example">
      <img src="~/assets/images/main-page/image(14).webp" alt="image example">
      <img src="~/assets/images/main-page/image(26).webp" alt="image example">
    </div>
    <div class="grid-column">
      <img src="~/assets/images/main-page/image(48).webp" alt="image example">
      <img src="~/assets/images/main-page/image(27).webp" alt="image example">
      <img src="~/assets/images/main-page/image(40).webp" alt="image example">
      <img src="~/assets/images/main-page/image(12).webp" alt="image example">
      <img src="~/assets/images/main-page/image(33).webp" alt="image example">
      <img src="~/assets/images/main-page/image(19).webp" alt="image example">
      <img src="~/assets/images/main-page/image(49).webp" alt="image example">
      <img src="~/assets/images/main-page/image(20).webp" alt="image example">
      <img src="~/assets/images/main-page/image(37).webp" alt="image example">
      <img src="~/assets/images/main-page/image(13).webp" alt="image example">
      <img src="~/assets/images/main-page/image(45).webp" alt="image example">
      <img src="~/assets/images/main-page/image(21).webp" alt="image example">
      <img src="~/assets/images/main-page/image(28).webp" alt="image example">
    </div>
  </div>
</template>

<script setup>
const images = [
  [
    'img-i77g0LU68dD7As1cNlm7gR.jpeg',
    'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg',
    'img-56NIBOvrjSaKS45vxomR6n.jpeg',
    'img-5lxSExuwWStJCuwd4OjIn6.jpeg',
    'img-YkfgHICXA8YFGEzbWC36kS.jpeg',
    'img-WIBwVTR1rF74J3tVc8C2dE.jpeg',
    'img-q9tOtcskhqYjxvpFdvE5c2.jpeg',
    'img-kWY1RGIowDFHObYWrqKEuX.jpeg',
    'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
    'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
    'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
    'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
    'img-i77g0LU68dD7As1cNlm7gR.jpeg',
  ],
  [
    'img-9jjtCkXWwKjZe9wElBEly2.jpeg',
    'img-Azk6WKhpgaMAoMweR2HkUy.jpeg',
    'img-DjVseuFs8N2CikjWGgXM0T.jpeg',
    'img-hoT72XlOTiNoUcWPamhr9v.jpeg',
    'img-jYjnraZM46IaWERJsWQEw5.jpeg',
    'img-nCU8xt4kkugIc6gMvDqWVF.jpeg',
    'img-pflMQRap58h9aCuMEEekHf.jpeg',
    'img-WcykmlaekkgasgzP70JQTD.jpeg',
    'img-Xcw19IKMv7yPiqDyASeju1.jpeg',
    'img-i77g0LU68dD7As1cNlm7gR.jpeg',
    'img-aHbNRGbgmNutEKIOHdTQ2t.jpeg',
    'img-56NIBOvrjSaKS45vxomR6n.jpeg',
    'img-5lxSExuwWStJCuwd4OjIn6.jpeg',
  ],
  [
    'img-D6bW4s9IlEg71b6mtMz6pn.jpeg',
    'img-iZLVCR0qAlWXNVmAPGlKrT.jpeg',
    'img-KrV9CmArl69eDiCteWECiq.jpeg',
    'img-M30VWmdBvEYfVrdNmp5RFW.jpeg',
    'img-MX8g0VKpK3LZUEulhywQE7.jpeg',
    'img-mz3jpmlQzO8enprS6Z5IUk.jpeg',
    'img-RpLjpqFAgmJCIqPTuH004k.jpeg',
    'img-uiSqi31mkxo5PabcADdlXX.jpeg',
    'img-XfKva6OJ994qNrzifh58vo.jpeg',
    'img-5lxSExuwWStJCuwd4OjIn6.jpeg',
    'img-YkfgHICXA8YFGEzbWC36kS.jpeg',
    'img-WIBwVTR1rF74J3tVc8C2dE.jpeg',
    'img-q9tOtcskhqYjxvpFdvE5c2.jpeg'
  ],
  [
    'img-9Sdzb5s1Fgx92yjH8emmS9.jpeg',
    'img-aD3ZVFuZOQykjCugaqYZLa.jpeg',
    'img-afDC6nRaihw1IidGRKib8J.jpeg',
    'img-GgOSvUjkqVGiJoacFvZNsG.jpeg',
    'img-gMNOEgET3EwFuQuPUCpw4G.jpeg',
    'img-RgNQfTcfAo4fhUlgdkV2pC.jpeg',
    'img-TdRuGZy3YmIBXvPmqU6lpz.jpeg',
    'img-UWssaEWdUjqK1DXwJywwKe.jpeg',
    'img-D6bW4s9IlEg71b6mtMz6pn.jpeg',
    'img-iZLVCR0qAlWXNVmAPGlKrT.jpeg',
    'img-KrV9CmArl69eDiCteWECiq.jpeg',
    'img-M30VWmdBvEYfVrdNmp5RFW.jpeg',
    'img-MX8g0VKpK3LZUEulhywQE7.jpeg'
  ]
];
</script>

<style scoped lang="scss">
.photo-grid {
  display: flex;
  gap: 15px;

  .grid-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 25%;
    animation: autoscroll 100s linear 0s infinite forwards;

    &:nth-child(even) {
      animation: autoscrollReverse 100s linear 0s infinite forwards;
    }

    img {
      width: 100%;
      border-radius: 20px;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(54, 226, 255, 0.7);
      }
    }
  }

  @mixin transformY($value) {
    -moz-transform: translateY($value);
    -webkit-transform: translateY($value);
    transform: translateY($value);
  }

  @keyframes autoscroll {
    0%, 100% {
      @include transformY(-10%);
    }

    50% {
      @include transformY(-80%);
    }
  }

  @keyframes autoscrollReverse {
    0%, 100% {
      @include transformY(-80%);
    }

    50% {
      @include transformY(-10%);
    }
  }

  @keyframes autoscrollSmallScreen {
    0%, 100% {
      @include transformY(-10%);
    }

    50% {
      @include transformY(-60%);
    }
  }

  @keyframes autoscrollReverseSmallScreen {
    0%, 100% {
      @include transformY(-60%);
    }

    50% {
      @include transformY(-10%);
    }
  }
}

@media screen and (max-width: 1200px) {
  .photo-grid .grid-column {
    width: 33%;
    animation: autoscrollSmallScreen 100s linear 0s infinite forwards;

    &:nth-child(even) {
      animation: autoscrollReverseSmallScreen 100s linear 0s infinite forwards;
    }

    &:last-child {
      display: none;
    }
  }
}

@media screen and (max-width: 900px) {
  .photo-grid .grid-column {
    width: 50%;

    &:nth-child(3) {
      display: none;
    }
  }
}

@media screen and (max-width: 800px) {
  .photo-grid {
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      display: block;
      height: 200px;
      width: 100%;
      top: 0;
      left: 0;
      background: red;
      z-index: 2;
      background: linear-gradient(180deg, rgba(33, 21, 77, 1) 0%, rgba(33, 21, 77, 0.65) 60%, rgba(33, 21, 77, 0) 100%);
    }

    .grid-column {
      width: 33%;
      animation: autoscrollSmallScreen 50s linear 0s infinite forwards;

      &:nth-child(even) {
        animation: autoscrollReverseSmallScreen 50s linear 0s infinite forwards;
      }

      &:nth-child(3) {
        display: flex;
      }
    }
  }
}
</style>
