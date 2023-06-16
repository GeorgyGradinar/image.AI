<template>
  <div class="wrapper-navigation">
    <nav>
      <button :class="{'active-left':isSelected === 'refill'}" @click="toggleSelected('refill')">
        <svg class="refill" id="Icons" viewBox="0 0 32 32">
          <ellipse class="st0" cx="11" cy="6" rx="6" ry="3"/>
          <path class="st0" d="M5,6v4c0,1.7,2.7,3,6,3s6-1.3,6-3V6"/>
          <path class="st0" d="M5,10v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4"/>
          <path class="st0" d="M5,14v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4"/>
          <path class="st0" d="M5,18v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4"/>
          <path class="st0" d="M5,22v4c0,1.7,2.7,3,6,3s6-1.3,6-3v-4"/>
          <path class="st0" d="M17,22.2c1.1,0.5,2.5,0.8,4,0.8c3.3,0,6-1.3,6-3v-4"/>
          <path class="st0" d="M17,13.8c1.1-0.5,2.5-0.8,4-0.8c3.3,0,6,1.3,6,3s-2.7,3-6,3c-1.5,0-2.9-0.3-4-0.8"/>
          <path class="st0" d="M17,26.2c1.1,0.5,2.5,0.8,4,0.8c3.3,0,6-1.3,6-3v-4"/>
        </svg>
        Пополнение
      </button>
      <button :class="{'active-right':isSelected === 'spend'}" @click="toggleSelected('spend')">
        <svg class="spend" id="Layer_1" viewBox="0 0 100.353 100.352">
          <g>
            <path d="M41.76,45.383c-7.691,0-13.949,6.258-13.949,13.949s6.257,13.948,13.949,13.948s13.949-6.257,13.949-13.948
		S49.451,45.383,41.76,45.383z M41.76,70.281c-6.037,0-10.949-4.911-10.949-10.948s4.912-10.949,10.949-10.949
		c6.038,0,10.949,4.912,10.949,10.949S47.797,70.281,41.76,70.281z"/>
            <path d="M12.399,45.384c-0.829,0-1.5,0.671-1.5,1.5v24.896c0,0.828,0.671,1.5,1.5,1.5s1.5-0.672,1.5-1.5V46.884
		C13.899,46.055,13.228,45.384,12.399,45.384z"/>
            <path d="M70.648,45.384c-0.828,0-1.5,0.671-1.5,1.5v24.896c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5V46.884
		C72.148,46.055,71.477,45.384,70.648,45.384z"/>
            <path d="M95.287,19.142H21.869c-0.829,0-1.5,0.671-1.5,1.5v7.419h-6.72c-0.829,0-1.5,0.671-1.5,1.5v8.248H4.714
		c-0.829,0-1.5,0.671-1.5,1.5v40.047c0,0.828,0.671,1.5,1.5,1.5h73.419c0.828,0,1.5-0.672,1.5-1.5v-8.248h7.436
		c0.828,0,1.5-0.672,1.5-1.5v-7.419h6.719c0.828,0,1.5-0.672,1.5-1.5V20.642C96.787,19.813,96.115,19.142,95.287,19.142z
		 M6.214,77.856V40.809h70.419v28.789c0,0.003-0.001,0.006-0.001,0.01s0.001,0.006,0.001,0.01v8.238H6.214z M85.568,68.108h-5.936
		V39.309c0-0.829-0.672-1.5-1.5-1.5H15.149v-6.748h70.419V68.108z M93.787,59.189h-5.219V29.561c0-0.829-0.672-1.5-1.5-1.5H23.369
		v-5.919h70.418V59.189z"/>
          </g>
        </svg>
        Списание
      </button>
    </nav>
  </div>
</template>

<script setup>
import {defineEmits, ref} from "vue";

const emit = defineEmits(['changeFilters']);
let isSelected = ref('spend');

function toggleSelected(selected) {
  isSelected.value = selected;
  emit('changeFilters', selected);
}
</script>

<style scoped lang="scss">
.wrapper-navigation {
  width: 100%;
  max-width: 200px;
  margin: 10px 20px 0 0;

  nav {
    position: fixed;
    width: 100%;
    max-width: 200px;

    button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--main-light-color);
      padding: 10px 10px 10px 20px;
      border-radius: 0 15px 15px 0;

      svg {
        padding: 4px;
        width: 24px;
        stroke: var(--light-blue);
        fill: none;
      }

      img {
        width: 24px;
        transform: rotate(-90deg);
      }

      .edit {
        padding: 4px;
      }

      .refill {
        width: 24px;

        .st0 {
          fill: none;
          stroke: var(--light-blue);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
        }
      }

      .spend {
        fill: var(--light-blue);
        stroke: none;
      }
    }

    .active-left {
      position: relative;
      background-color: rgba(255, 255, 225, 0.1);

      &:before {
        content: '';
        width: 20px;
        height: 40px;
        background-color: var(--light-blue);
        position: absolute;
        top: calc(50% - 20px);
        left: -15px;
        border-radius: 5px;
      }
    }

    .active-right {
      position: relative;
      background-color: rgba(255, 255, 225, 0.1);

      &:before {
        content: '';
        width: 20px;
        height: 40px;
        background-color: var(--light-blue);
        position: absolute;
        top: calc(50% - 20px);
        left: -15px;
        border-radius: 5px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-navigation {
    max-width: 100%;

    nav {
      position: relative;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      max-width: 100%;
      justify-content: space-between;

      button {
        width: 48%;
        font-size: 10px;
      }

      .active-right {
        position: relative;
        border-radius: 10px 0 0 10px;

        &:before {
          content: '';
          top: calc(50% - 20px);
          right: -14px;
          left: unset;
        }
      }

    }
  }
}

</style>
