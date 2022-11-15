<template>
  <q-list>
    <q-item clickable v-close-popup>
      <q-item-section>
        <q-item-label>Profile</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-close-popup @click="onLogout">
      <q-item-section>
        <q-item-label>Logout</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

async function onLogout() {
  await userStore.logout();
  router.replace({
    name: "sign-in",
  });
}
</script>

<style scoped></style>
