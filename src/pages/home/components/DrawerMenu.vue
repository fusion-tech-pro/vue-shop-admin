<template>
  <q-drawer
    :model-value="props.opened"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    class="bg-grey-3 q-pt-sm"
    @update:model-value="onDrawerChange"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menu" :key="index">
          <router-link :to="`/${menuItem.link}`" class="drawer-item">
            <q-item clickable v-ripple :active="menuItem.link === route.name">
              <q-item-section avatar>
                <q-icon :name="`ion-${menuItem.icon}`" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </router-link>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { useRoute } from "vue-router";
import { menu } from "../data/menu";

type Props = {
  opened: boolean;
};
type Emits = {
  (e: "change", opened: boolean): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const route = useRoute();

const miniState = ref(true);

function onDrawerChange(opened: boolean) {
  emit("change", opened);
}
</script>

<style scoped>
.drawer-item {
  color: inherit;
  text-decoration: none;
}
</style>
