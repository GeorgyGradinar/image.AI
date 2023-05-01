<template>
  <div class="photo-grid">
    <div class="grid-column" v-for="column in images" :key="column.id">
      <img v-for="image in column" :key="image.id"
           :src="require(`@/assets/main-page/${image || 'img-YkfgHICXA8YFGEzbWC36kS.jpeg'}`)" alt="image example">
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
    'img-kWY1RGIowDFHObYWrqKEuX.jpeg'
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
    'img-Xcw19IKMv7yPiqDyASeju1.jpeg'
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
    'img-XfKva6OJ994qNrzifh58vo.jpeg'
  ],
  [
    'img-9Sdzb5s1Fgx92yjH8emmS9.jpeg',
    'img-aD3ZVFuZOQykjCugaqYZLa.jpeg',
    'img-afDC6nRaihw1IidGRKib8J.jpeg',
    'img-GgOSvUjkqVGiJoacFvZNsG.jpeg',
    'img-gMNOEgET3EwFuQuPUCpw4G.jpeg',
    'img-RgNQfTcfAo4fhUlgdkV2pC.jpeg',
    'img-TdRuGZy3YmIBXvPmqU6lpz.jpeg',
    'img-UWssaEWdUjqK1DXwJywwKe.jpeg'
  ]
]
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

    &:nth-child(even) {
      margin-top: 50px;
    }

    img {
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>
