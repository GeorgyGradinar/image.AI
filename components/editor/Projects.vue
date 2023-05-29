<template>
  <section class="wrapper-projects">
    <div class="add-project" @click="createNewProject">
      <div class="wrapper-image">
        <img src="~/assets/images/editor/plus-project.svg" alt="">
      </div>
      <div class="wrapper-text">
        <p class="create-text">Создайте новый проект</p>
        <p class="description">Отредактируйте изображение</p>
      </div>
    </div>

    <div class="project" v-for="project of projects" :key="project.id">
      <div class="pre-show-project" @click="routeTo(project.id)">
      </div>
      <div class="description-project" @click.self="routeTo(project.id)">
        <div class="wrapper-text" @click="routeTo(project.id)">
          <h3 class="name-project">{{ project.name }}</h3>
          <p class="last-update">Последнее обновление: {{ project.date }}</p>
        </div>
        <div class="wrapper-trash" @click="deletedProject(project.id)">
          <img src="~/assets/images/editor/trash.svg" alt="trash">
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
const {addNewProject, deleteProject} = project;

function routeTo(id) {
  router.push({path: `/editor/project${id}`});
}

function createNewProject() {
  const date = new Date();
  const newProject = {
    id: `-${Math.floor(Math.random() * 10000)}`,
    name: 'Untitled',
    date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
  addNewProject(newProject);
  routeTo(newProject.id);
}

function deletedProject(id) {
  deleteProject(id);
}

</script>

<style scoped lang="scss">

.wrapper-projects {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: calc(3vw - 25px);
  padding: 30px 0;


  .add-project,
  .project {
    width: 23vw;
    height: 17vw;
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
      min-width: 30px;
      min-height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20%;
      background-color: var(--light-blue);
      transition: all 0.2s;

      img {
        width: 25px;
      }
    }

    .wrapper-text {
      .create-text {
        font-size: 14px;
        color: var(--main-light-color);
      }

      .description {
        font-size: 13px;
        color: rgba(255, 255, 225, 0.4);
      }

      .name-project {
        font-size: 20px;
        transition: all 0.2s;
      }

      .last-update {
        font-size: 13px;
        color: rgba(255, 255, 225, 0.4);
        transition: all 0.2s;
      }
    }

    &:hover {
      border: 2px dashed var(--light-blue);

      .wrapper-text {
        color: var(--light-blue);

        .last-update {
          color: var(--light-blue);
        }
      }
    }
  }

  .add-project {
    padding: 20px;
  }

  .project {
    flex-direction: column;
    border: 1px solid rgba(255, 255, 225, 0.3);
    overflow: hidden;
    gap: 0;
    transition: all 0.2s;

    .pre-show-project {
      width: 100%;
      height: 100%;
      min-height: 60%;
      background-color: var(--main-backgground-color);
      background-image: url("assets/images/editor/background-dot.svg");
      background-repeat: repeat;
      border-bottom: 1px solid rgba(255, 255, 225, 0.2);

      img {
        width: 100%;
      }
    }

    .description-project {
      width: 100%;
      min-height: 30%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2b2b2b;
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
        border: 1px solid rgba(0, 0, 0, 0);

        img {
          width: 20px;
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    &:hover {
      border: 1px solid var(--light-blue);
      box-shadow: 0 0 10px rgba(54, 226, 255, 0.5);

      .description-project {
        .wrapper-trash {
          opacity: 1;
        }
      }
    }
  }
}

@media screen and (min-width: 1925px) {
  .wrapper-projects {
    .add-project,
    .project {
      width: 18vw;
      height: 15vw;
    }

    .add-project {
      border: 3px dashed rgba(255, 255, 225, 0.3);

      &:hover{
        border: 3px dashed var(--light-blue);
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .wrapper-projects {
    .project {
      .description-project {
        .wrapper-trash {
          opacity: 1;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .wrapper-projects {
    gap: calc(5vw - 25px);

    .add-project,
    .project {
      width: 30vw;
      height: 24vw;
    }
  }
}

@media screen and (max-width: 800px) {
  .wrapper-projects {
    .add-project,
    .project {
      width: 45vw;
      height: 30vw;
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-projects {
    gap: 3vw;

    .add-project,
    .project {
      width: 90vw;
      height: 40vw;
    }
  }
}
</style>
