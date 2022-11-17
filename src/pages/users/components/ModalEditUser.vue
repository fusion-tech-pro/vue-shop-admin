<script lang="ts">
export default {
  props: {
    readonly: Boolean,
    show: Boolean,
    rowModal: {
      type: Object,
      default() {
        return { name: "", email: "" };
      },
    },
  },
  emits: ["close", "addUser"],

  beforeUpdate() {
    this.name = this.$props.rowModal.name;
    this.email = this.$props.rowModal.email;
  },

  data() {
    return {
      name: this.$props.rowModal.name,
      email: this.$props.rowModal.email,
      selected: "",
      prefix: "",
    };
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
  },
};
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <label
              >Name:
              <q-input
                autofocus
                v-model="name"
                :rules="[(val: String) => !!val || 'Field is required']"
            /></label>
          </div>

          <div class="modal-footer">
            <label
              >Email:
              <q-input
                :readonly="readonly"
                v-model="email"
                :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
            /></label>
          </div>
          <div>
            <button class="modal-default-button" @click="$emit('close')">
              Cancel
            </button>
            <button class="modal-default-button" @click="update">OK</button>
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
