<template>
  <div>
    <div class="text-h6 text-weight-bolder q-py-lg">Profile Settings</div>
    <q-separator class="hr-dashed" />

    <Form
      @submit="(values) => onChangeMainInfo(values as MainInfoFormState)"
      :validation-schema="schema"
      :initial-values="formState"
    >
      <AvatarForm></AvatarForm>
      <q-separator class="hr-dashed" />

      <InfoForm :loading="userStore.loading"></InfoForm>
      <q-separator class="hr-dashed" />
    </Form>

    <PasswordForm :loading="userStore.loading"></PasswordForm>
  </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate";
import { markRaw } from "vue";
import * as yup from "yup";
import { Notify } from "quasar";
import AvatarForm from "./components/AvatarForm.vue";
import InfoForm from "./components/InfoForm.vue";
import PasswordForm from "./components/PasswordForm.vue";
import type { MainInfoFormState } from "./entities";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const phoneRegExp = /^[0-9]{7,19}$/;

const schema = markRaw(
  yup.object({
    avatar: yup.string(),
    userName: yup.string().required("Enter your name"),
    email: yup.string().email("Invalid email").required("Enter your email"),
    userBio: yup.string(),
    contactNumber: yup
      .string()
      .matches(phoneRegExp, "Contact number is not valid"),
  })
);
const formState: MainInfoFormState = {
  avatar: userStore.user?.avatar || "",
  userName: userStore.user?.userName || "",
  email: userStore.user?.email || "",
  userBio: userStore.user?.userBio || "",
  contactNumber: userStore.user?.contactNumber || "",
};

async function onChangeMainInfo(values: MainInfoFormState) {
  try {
    await userStore.changeMainInfo(values);
    Notify.create({
      type: "positive",
      position: "top-right",
      message: "Main information successfully updated",
    });
  } catch (error) {
    if (error instanceof Error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: error.message,
      });
    }
  }
}
</script>

<style scoped lang="scss">
.hr-dashed {
  height: 0;
  border: none;
  border-top: 1px dashed $background;
}
</style>
