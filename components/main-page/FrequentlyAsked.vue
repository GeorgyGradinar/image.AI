<template>
  <div class="wrapper-frequently">
    <section class="frequently-asked">
      <h2>Часто задаваемые вопросы</h2>

      <v-expansion-panels flat multiple variant="accordion">

        <v-expansion-panel class="frequently first" v-for="ask of asks" :key="ask.id">
          <v-expansion-panel-title>
            {{ ask.title }}
            <template v-slot:actions="{ expanded }">
              <v-icon :color="'#38e2ff'" :icon="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            {{ ask.text }}
          </v-expansion-panel-text>
        </v-expansion-panel>

      </v-expansion-panels>
    </section>
  </div>
</template>

<script setup>

// eslint-disable-next-line no-undef
const props = defineProps({
  frequentlyAsks: Array,
});

// eslint-disable-next-line vue/no-setup-props-destructure
let asks = props.frequentlyAsks
</script>

<style lang="scss">

.wrapper-frequently {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #1f2023;
  padding: 30px 0;

  .frequently-asked {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-expansion-panel-title {
      line-height: 1.5;
    }

    .v-expansion-panel__shadow {
      display: none;
    }

    h2 {
      color: var(--main-light-color);
      margin-bottom: 20px;
    }

    .frequently {
      padding: 10px 0;
      background-color: #1f2023!important;
      color: var(--main-light-color)!important;
      border-bottom: 1px solid rgba(249, 246, 224, 0.1);

    }

    .first {
      border-top: 1px solid rgba(249, 246, 224, 0.1);
    }
  }
}

@media screen and (max-width: 400px) {
  .wrapper-frequently {
    .frequently-asked {
      h2 {
        font-size: 20px;
      }
    }
  }
}

@media screen and (min-width: 1925px) {
  .wrapper-frequently {
    .frequently-asked {
      max-width: 1000px;

      .v-expansion-panel-title {
        font-size: 20px;
      }

      .v-expansion-panel-text {
        font-size: 18px;
      }

      h2 {
        font-size: 34px;
      }
    }
  }
}
</style>
