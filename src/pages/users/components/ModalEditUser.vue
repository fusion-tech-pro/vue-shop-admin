<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { imageDefault } from "../assetsData/usersData";

export default defineComponent({
  props: {
    readonly: Boolean,
    show: Boolean,
    rowModal: {
      type: Object as PropType<{ avatar: string; name: string; email: string }>,
      default() {
        return { avatar: imageDefault, name: "", email: "" };
      },
    },
  },
  emits: ["close", "addUser"],

  data() {
    return {
      avatar: this.$props.rowModal.avatar,
      name: this.$props.rowModal.name,
      email: this.$props.rowModal.email,
      someValueAvatar: null as File | null,
      src: this.$props.rowModal.avatar,
    };
  },

  watch: {
    show(value) {
      if (!value) {
        return;
      }
      this.name = this.$props.rowModal.name;
      this.email = this.$props.rowModal.email;
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
    update() {
      if (this.hasValidInput()) {
        this.$emit("addUser", this.name, this.email);
        this.$emit("close");
      }
    },
    hasValidInput() {
      return this.name.trim() && this.isValidEmail() !== "Invalid email";
    },
    isValidEmail() {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(this.email) || "Invalid email";
    },
    onFileChage(ev: Event) {
      const elem = ev.target as HTMLInputElement;
      if (!elem.files) return;
      console.log("this.someValueAvata", elem.files[0]);

      this.someValueAvatar = elem.files[0];
    },
  },
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

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

          <div class="modal-body">
            <label
              >Name:
              <q-input
                autofocus
                dense
                v-model="name"
                :rules="[(val: String) => !!val || 'Field is required']"
            /></label>
          </div>

          <div class="modal-footer">
            <label
              >Email:
              <q-input
                :readonly="readonly"
                dense
                v-model="email"
                :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
            /></label>
          </div>
          <div class="row full-width justify-center">
            <q-btn
              class="modal-default-button"
              color="negative"
              @click="$emit('close')"
            >
              Cancel
            </q-btn>
            <q-btn class="modal-default-button" color="primary" @click="update"
              >OK</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

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
  width: 300px;
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
