<template>
  <div class="wrapper-navigation">
    <nav>
      <button :class="{'active-left':isSelected === 'generated'}" @click="toggleSelected('generated')">
        <img class="edit"
             src="~/assets/images/gallery/boxes.svg"
             alt="four boxes">
        Все
      </button>
<!--      <button :class="{'active-right':isSelected === 'edit'}" @click="toggleSelected('edit')">-->
<!--        <img class="edit"-->
<!--             src="~/assets/images/text-to-image/block-images/image-details/edit.svg"-->
<!--             alt="">-->
<!--        Отредактированные-->
<!--      </button>-->
<!--      <button :class="{'active-left':isSelected === 'improve'}" @click="toggleSelected('improve')">-->
<!--        <img-->
<!--            src="~/assets/images/text-to-image/block-images/duble-arrows.svg" alt="">-->
<!--        Повышенное качество-->
<!--      </button>-->
      <button :class="{'active-right':isSelected === 'like'}" @click="toggleSelected('like')">
        <svg class="like"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        Избранные
      </button>
    </nav>
  </div>

</template>

<script setup>
import {defineEmits, ref} from "vue";

const emit = defineEmits(['changeFilters']);
let isSelected = ref('generated');

function toggleSelected(selected) {
  isSelected.value = selected;
  emit('changeFilters', selected);

}



</script>

<style scoped lang="scss">
.wrapper-navigation {
  width: 100%;
  max-width: 300px;

  nav {
    position: fixed;
    width: 100%;
    max-width: 300px;

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
          right: -15px;
          left: unset;
        }
      }

    }
  }
}
</style>
