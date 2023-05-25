<template>
  <section class="wrapper-projects">
    <div class="add-project">
      <div class="wrapper-image">
        <img src="~/assets/images/editor/plus.svg" alt="">
      </div>
      <div class="wrapper-text">
        <p class="create-text">Создайте новый проект</p>
        <p class="description">Отредактируйте изображение</p>
      </div>
    </div>

    <div class="project" v-for="project of projects" :key="project.id" @click="routeTo(project.id)">
      <div class="pre-show-project">

      </div>
      <div class="description-project">
        <div class="wrapper-text">
          <h3>{{ project.name }}</h3>
          <p>{{ project.data }}</p>
        </div>
        <div class="wrapper-trash">
          <img src="~/assets/images/text-to-image/trash.svg" alt="trash">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {projectStore} from "~/store/projects";
import {storeToRefs} from "pinia";
import {useRouter} from "nuxt/app";

const router = useRouter();
const project = projectStore();
const {projects} = storeToRefs(project);

function routeTo(id) {
  router.push({path:`/editor/project${id}`});
}

</script>

<style scoped lang="scss">

.wrapper-projects {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: calc(6vw - 10px);
  padding: 30px 0;

  .add-project,
  .project {
    width: 20vw;
    height: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background-color: rgba(43, 43, 43, 0.9);
    border-radius: 20px;
    cursor: pointer;
    border: 2px dashed rgba(255, 255, 225, 0.3);
    transition: all 0.2s;

    .wrapper-image {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20%;
      background-color: var(--light-blue);

      img {
        width: 25px;
      }
    }

    .wrapper-text {
      .create-text {
        font-size: 15px;
        color: var(--main-light-color);
      }

      .description {
        font-size: 13px;
        color: rgba(255, 255, 225, 0.4);
      }
    }

    &:hover {
      border: 2px dashed var(--light-blue);
    }
  }

  .project {
    flex-direction: column;
    border: 2px solid rgba(255, 255, 225, 0.3);
    overflow: hidden;
    gap: 0;
    transition: all 0.2s;

    .pre-show-project {
      width: 100%;
      height: 100%;
      min-height: 60%;
      background-color: var(--main-backgground-color);
      border-bottom: 1px solid rgba(255, 255, 225, 0.2);
    }

    .description-project {
      width: 100%;
      height: 100%;
      min-height: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(43, 43, 43, 0.9);
      color: var(--main-light-color);
      padding: 20px;

      .wrapper-trash {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 5px;
        background-color: var(--main-backgground-color);
        opacity: 0;
        transition: all 0.2s;

        img {
          width: 20px;
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    &:hover {
      border: 2px solid var(--light-blue);

      .description-project{
        .wrapper-trash {
          opacity: 1;
        }
      }
    }
  }
}
</style>
