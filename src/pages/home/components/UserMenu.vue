<template>
  <q-list>
    <router-link to="/profile" class="drawer-item">
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Profile</q-item-label>
        </q-item-section>
      </q-item>
    </router-link>

    <router-link to="/logout" class="drawer-item">
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </router-link>
  </q-list>
</template>

<script setup lang="ts"></script>

<style scoped>
.drawer-item {
  color: inherit;
  text-decoration: none;
}
</style>
