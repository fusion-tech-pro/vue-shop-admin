<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="app-header q-pa-md">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Shop Admin
        </q-toolbar-title>
        <q-btn
          dense
          flat
          round
          dropdown-icon="none"
          class="app-header__avatar-button"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <q-menu :offset="[0, 10]">
            <UserMenu />
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <DrawerMenu :opened="drawerOpened" @change="onDrawerChange" />

    <q-page-container>
      <div class="q-pa-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DrawerMenu from "./components/DrawerMenu.vue";
import UserMenu from "./components/UserMenu.vue";

const drawerOpened = ref(false);

function toggleLeftDrawer() {
  drawerOpened.value = !drawerOpened.value;
}

function onDrawerChange(opened: boolean) {
  drawerOpened.value = opened;
}
</script>

<style lang="scss">
.app-header {
  min-height: 40px;

  .app-header__avatar-button i {
    display: none;
  }
}
</style>
