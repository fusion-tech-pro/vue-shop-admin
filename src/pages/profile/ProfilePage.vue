<template>
  <div>
    <div class="text-h6 text-weight-bolder q-py-lg">Profile Settings</div>
    <q-separator class="hr-dashed" />

    <Form
      @submit="(values) => onChangeMainInfo(values as MainInfoFormState)"
      :validation-schema="schema"
      :initial-values="formState"
    >
      <AvatarForm
        :avatar="formState.avatar"
        @removeAvatar="removeAvatar"
        @changeAvatar="changeAvatar"
      ></AvatarForm>
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
  userName: userStore.user?.username || "",
  email: userStore.user?.email || "",
  userBio: userStore.user?.userbio || "",
  contactNumber: userStore.user?.contactnumber || "",
};

async function onChangeMainInfo(values: MainInfoFormState) {
  await userStore.changeMainInfo(
    values.avatar,
    values.userName,
    values.email,
    values.userBio,
    values.contactNumber
  );
}

function removeAvatar() {
  formState.avatar = "";
}

function changeAvatar(value: string) {
  formState.avatar = value;
}
</script>

<style scoped lang="scss">
.hr-dashed {
  height: 0;
  border: none;
  border-top: 1px dashed $background;
}
</style>
