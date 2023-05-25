<template>
  <div class="wrapper-editor">
    <HeaderEditor></HeaderEditor>

  </div>
</template>

<script setup>
import HeaderEditor from "~/components/editor/HeaderEditor"
import {useRouter} from "nuxt/app";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {projectStore} from "~/store/projects";
import {personStore} from "~/store/personStore";

const router = useRouter();
const project = projectStore();
const {projects} = storeToRefs(project);
const store = personStore();
const {person} = storeToRefs(store);

let selectedProject = ref({});

onMounted(() => {
  if (person._value.id && projects.value.length) {
    const id = router.currentRoute.value.params.id;
    selectedProject.value = projects._value.find(project => project.id === id);
  } else {
    router.push({path: '/'})
  }
})

</script>

<style scoped lang="scss">
.wrapper-editor {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-backgground-color);

}
</style>
