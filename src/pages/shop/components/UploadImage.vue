<template>
  <p>{{ label }}</p>
  <div class="row full-width justify-center q-mb-md">
    <q-avatar size="150px">
      <label>
        <q-img height="150px" width="150px" :src="src" />
        <input
          type="file"
          accept=".jpg,.png"
          @change="onFileChange"
          :style="{ display: 'none' }"
        />
      </label>
    </q-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      required: true,
      type: String,
    },
    imageSrc: {
      required: true,
      type: String,
    },
  },
  data(props) {
    return {
      src: props.imageSrc ?? "",
      newSrc: null as File | null,
    };
  },
  watch: {
    newSrc: {
      handler(newVal: File | null) {
        if (newVal) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (typeof e.target?.result !== "string") {
              return;
            }
            this.src = e.target?.result;
            this.$emit("getImage", this.src);
          };
          reader.readAsDataURL(newVal);
        }
      },
      deep: true,
    },
  },
  emits: {
    getImage: (value: String) => {
      return value;
    },
  },
  methods: {
    onFileChange(evt: Event) {
      const elem = evt.target as HTMLInputElement;
      if (!elem.files) return;
      this.newSrc = elem.files[0];
    },
  },
});
</script>
