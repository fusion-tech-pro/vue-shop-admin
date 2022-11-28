<template>
  <div class="q-pa-none q-mb-sm row" style="justify-content: space-between">
    <div class="card-container" v-for="(item, index) in cards" :key="index">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal style="justify-content: space-between">
          <q-card-section class="q-pt-xs">
            <div class="text-h7 text-weight-bold q-mt-sm q-mb-xs">
              {{ item.title }}
            </div>
            <div :style="{ height: '20px' }" class="text-caption text-grey">
              {{ item.text }}
            </div>
          </q-card-section>

          <q-card-section class="col-2 flex flex-center">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-card-section>
        </q-card-section>

        <q-card-actions>
          <h5 class="text-weight-bold q-ma-md">{{ item.total }}</h5>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dataCards } from "../data";

export default defineComponent({
  data() {
    return {
      cards: dataCards,
    };
  },
});
</script>

<style scoped lang="scss">
.card-container {
  padding: 0px;
  margin-bottom: 15px;
  margin-left: 0px;
  width: 100%;
  @include media-sm {
    width: 48%;
  }
  @include media-lg {
    width: 23%;
  }
}
.my-card {
  padding: 10px 20px 10px 10px;
  border: 1px solid #ffffff;
  border-radius: 5px;
}
</style>
