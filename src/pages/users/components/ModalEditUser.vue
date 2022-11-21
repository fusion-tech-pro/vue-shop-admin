<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header"></div>

          <div class="row full-width justify-center">
            <q-avatar size="150px">
              <label>
                <img style="height: 150px; max-width: 150px" :src="src" />
                <input
                  type="file"
                  accept=".jpg,.png"
                  @change="onFileChage"
                  :style="{ display: 'none' }"
                />
              </label>
            </q-avatar>
          </div>

          <FormInput
            @submit="onFormSubmit"
            @reset="resetForm"
            :validation-schema="schema"
            :initial-values="initialsValue"
            class="q-pa-md shadow-2"
            style="background-color: white"
          >
            <FieldInput
              name="firstName"
              v-slot="{ value, errorMessage, field }"
            >
              <q-input
                dense
                outlined
                label="Enter First Name"
                type="text"
                class="q-mb-sm"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
              />
            </FieldInput>

            <FieldInput name="lastName" v-slot="{ value, errorMessage, field }">
              <q-input
                dense
                outlined
                label="Enter Last Name"
                type="text"
                class="q-mb-sm"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
              />
            </FieldInput>

            <FieldInput name="phone" v-slot="{ value, errorMessage, field }">
              <q-input
                dense
                outlined
                label="Enter Phone"
                mask="(###) ### - ####"
                class="q-mb-sm"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
              />
            </FieldInput>

            <FieldInput name="email" v-slot="{ value, errorMessage, field }">
              <q-input
                dense
                outlined
                label="Enter Email"
                type="text"
                class="q-mb-sm"
                :model-value="value"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
              />
            </FieldInput>

            <FieldInput name="password" v-slot="{ value, errorMessage, field }">
              <q-input
                dense
                outlined
                label="Enter password"
                :model-value="value"
                v-bind="field"
                class="q-mb-sm"
                :error-message="errorMessage"
                :error="!!errorMessage"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  ></q-icon>
                </template>
              </q-input>
            </FieldInput>

            <FieldInput
              name="passwordConfirmation"
              v-slot="{ value, errorMessage, field }"
            >
              <q-input
                dense
                outlined
                label="Confirm password"
                :model-value="value"
                class="q-mb-sm"
                v-bind="field"
                :error-message="errorMessage"
                :error="!!errorMessage"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  ></q-icon>
                </template>
              </q-input>
            </FieldInput>

            <div
              style="justify-content: space-evenly; padding-top: 25px"
              class="row full-width justify-center"
            >
              <q-btn color="negative" type="reset" @click="$emit('close')">{{
                "Cancel"
              }}</q-btn>
              <q-btn color="primary" type="submit">{{ "Edit User" }}</q-btn>
            </div>
          </FormInput>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { imageDefault } from "../assetsData/usersData";
import * as yup from "yup";
import { Form as FormInput, Field as FieldInput } from "vee-validate";
import type { RowType } from "../types";
import { useUsersStore } from "../../../stores/usersStore";

export default defineComponent({
  components: {
    FormInput,
    FieldInput,
  },
  props: {
    changingUser: { required: true, type: Object as PropType<RowType> },

    readonly: Boolean,
    show: Boolean,
    rowModal: {
      required: true,
      type: Object as PropType<RowType>,
    },
  },
  emits: ["close", "addUser"],

  setup() {
    const store = useUsersStore();
    return {
      store,
    };
  },

  data() {
    return {
      isPwd: true,
      avatar: this.$props.rowModal.avatar,
      someValueAvatar: null as File | null,
      src: this.$props.rowModal.avatar,
      schema: yup.object({
        firstName: yup.string().required(),
        lastName: yup.string(),
        phone: yup.string(),
        email: yup.string().email().required(),
        password: yup
          .string()
          .required()
          .min(6, "Password should be of minimum 6 characters length"),
        passwordConfirmation: yup
          .string()
          .required()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      }),
    };
  },

  watch: {
    show(value) {
      if (!value) {
        return;
      }
      this.src = this.$props.rowModal.avatar
        ? this.$props.rowModal.avatar
        : imageDefault;
    },

    someValueAvatar: {
      handler(newVal: File | null) {
        if (newVal) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (typeof e.target?.result !== "string") {
              return;
            }
            this.src = e.target?.result;
          };

          reader.readAsDataURL(newVal);
        }
      },
      deep: true,
    },
  },

  methods: {
    onFormSubmit(values: RowType) {
      this.store.updateUser(values);
      this.$emit("close");
    },

    resetForm() {
      this.$router.push("/users");
    },

    onFileChage(ev: Event) {
      const elem = ev.target as HTMLInputElement;
      if (!elem.files) return;
      this.someValueAvatar = elem.files[0];
    },
  },

  computed: {
    initialsValue() {
      return {
        firstName: this.$props.changingUser?.firstName ?? "",
        lastName: this.$props.changingUser?.lastName ?? "",
        email: this.$props.changingUser?.email ?? "",
        phone: this.$props.changingUser?.phone ?? "",
        password: this.$props.changingUser?.password ?? "",
        passwordConfirmation: this.$props.changingUser?.password ?? "",
      };
    },
  },
});
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  margin: 0 0 20px 0;
}

.modal-default-button {
  float: center;
  margin-right: 10px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
