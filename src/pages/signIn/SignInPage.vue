<template>
  <div class="container">
    <div class="form-container q-pa-lg">
      <SignInForm :loading="userStore.loading" @form-submit="onLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import SignInForm from "./components/SignInForm.vue";
import type { SignInFormState } from "./entities";

const userStore = useUserStore();
const router = useRouter();

async function onLogin(values: SignInFormState) {
  await userStore.login(values.username, values.password);
  router.replace({
    name: "home",
  });
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: $surface;
  width: 100%;

  @include media-xs {
    max-width: 420px;
    background-color: unset;
  }
}

.form-container {
  background-color: $white;
  min-height: 100px;
  width: 100%;
  box-shadow: none;
  @include media-xs {
    box-shadow: $shadow-4;
    border-radius: $generic-border-radius;
  }
}
</style>
