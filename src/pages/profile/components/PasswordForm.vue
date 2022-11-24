<template>
  <div class="q-pt-lg row">
    <div class="col-xs-12 col-sm-4 q-pb-lg form-info">
      <h4 class="text-subtitle1 q-my-none text-weight-bold">Password</h4>
      <p class="q-mb-none">Change your password from here</p>
    </div>

    <Form
      class="col-xs-12 col-sm-8"
      @submit="(values) => onFormSubmit(values as PasswordFormState)"
      :validation-schema="schema"
      :initial-values="formState"
    >
      <div class="bg-white shadow-1 rounded-borders">
        <div class="q-pa-lg label-file-loader">
          <Field name="oldPassword" v-slot="{ value, errorMessage, field }">
            <PasswordInput
              label="Old password"
              outlined
              class="q-mb-md"
              v-bind="field"
              :value="value"
              :errorMessage="errorMessage"
            ></PasswordInput>
          </Field>

          <Field name="newPassword" v-slot="{ value, errorMessage, field }">
            <PasswordInput
              label="New password"
              outlined
              class="q-mb-md"
              v-bind="field"
              :value="value"
              :errorMessage="errorMessage"
            ></PasswordInput>
          </Field>

          <Field name="repeatPassword" v-slot="{ value, errorMessage, field }">
            <PasswordInput
              label="Repeat password"
              outlined
              v-bind="field"
              :value="value"
              :errorMessage="errorMessage"
            ></PasswordInput>
          </Field>
        </div>
      </div>
      <div class="col-12 q-pt-lg row justify-end">
        <q-btn color="primary" type="submit" :loading="loading"
          >Change password</q-btn
        >
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import { Notify } from "quasar";
import { useUserStore } from "@/stores/user";
import type { PasswordFormState } from "../entities";
import PasswordInput from "@/components/PasswordInput/PasswordInput.vue";

const userStore = useUserStore();

export default defineComponent({
  props: {
    loading: Boolean,
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    PasswordInput,
  },
  data() {
    return {
      schema: markRaw(
        yup.object({
          oldPassword: yup.string().required("Enter your password"),
          newPassword: yup.string().required("Enter new password"),
          repeatPassword: yup
            .string()
            .when("newPassword", {
              is: (val: string) => !!(val && val.length > 0),
              then: yup
                .string()
                .oneOf(
                  [yup.ref("newPassword")],
                  "Both password need to be the same"
                ),
            })
            .required("Repeat new password without errors"),
        })
      ),
      formState: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
    };
  },
  methods: {
    async onFormSubmit(values: PasswordFormState) {
      try {
        await userStore.changePassword(values.oldPassword, values.newPassword);
        Notify.create({
          type: "positive",
          position: "top-right",
          message: "Password successfully updated",
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
    },
  },
});
</script>

<style scoped lang="scss">
.form-info {
  color: $gray-600;
  @include media-sm {
    padding-top: 24px;
    padding-right: 16px;
  }
}
</style>
