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
            <q-input
              label="Old password"
              outlined
              :type="formState.isViewOldPassword ? 'text' : 'password'"
              class="q-mb-md"
              v-bind="field"
              :model-value="value"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    formState.isViewOldPassword
                      ? 'visibility'
                      : 'visibility_off'
                  "
                  class="cursor-pointer"
                  @click="
                    formState.isViewOldPassword = !formState.isViewOldPassword
                  "
                />
              </template>
            </q-input>
          </Field>

          <Field name="newPassword" v-slot="{ value, errorMessage, field }">
            <q-input
              label="New password"
              outlined
              :type="formState.isViewNewPassword ? 'text' : 'password'"
              class="q-mb-md"
              v-bind="field"
              :model-value="value"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    formState.isViewNewPassword
                      ? 'visibility'
                      : 'visibility_off'
                  "
                  class="cursor-pointer"
                  @click="
                    formState.isViewNewPassword = !formState.isViewNewPassword
                  "
                />
              </template>
            </q-input>
          </Field>

          <Field name="repeatPassword" v-slot="{ value, errorMessage, field }">
            <q-input
              label="Repeat password"
              outlined
              :type="formState.isViewRepeatPassword ? 'text' : 'password'"
              v-bind="field"
              :model-value="value"
              :error-message="errorMessage"
              :error="!!errorMessage"
            >
              <template v-slot:append>
                <q-icon
                  :name="
                    formState.isViewRepeatPassword
                      ? 'visibility'
                      : 'visibility_off'
                  "
                  class="cursor-pointer"
                  @click="
                    formState.isViewRepeatPassword =
                      !formState.isViewRepeatPassword
                  "
                />
              </template>
            </q-input>
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
import { useUserStore } from "@/stores/user";
import type { PasswordFormState } from "../entities";

const userStore = useUserStore();

export default defineComponent({
  props: {
    loading: Boolean,
  },
  emits: {},
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
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
          isViewOldPassword: yup.boolean(),
          isViewNewPassword: yup.boolean(),
          isViewRepeatPassword: yup.boolean(),
        })
      ),
      formState: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
        isViewOldPassword: false,
        isViewNewPassword: false,
        isViewRepeatPassword: false,
      },
    };
  },
  methods: {
    async onFormSubmit(values: PasswordFormState) {
      await userStore.changePassword(values.oldPassword, values.newPassword);
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
