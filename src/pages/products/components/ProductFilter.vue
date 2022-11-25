<template>
  <q-select
    outlined
    v-model="model"
    :options="optionsRef"
    @filter="filterFn"
    input-debounce="0"
    :label="label"
    bg-color="white"
    behavior="menu"
    options-selected-class="text-primary"
    dense
    clearable
    use-input
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    options: {
      required: true,
      type: Array<string>,
    },
    label: {
      required: false,
      type: String,
    },
    modelValue: {
      required: true,
      type: null,
    },
  },
  setup(props) {
    const optionsRef = ref(props.options);

    return {
      optionsRef,
      model: ref(props.modelValue),

      filterFn(val: string, update: Function) {
        if (val === "") {
          update(() => {
            optionsRef.value = props.options;
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          optionsRef.value = props.options.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    getValue() {
      this.$emit("getFilterValue", this.model);
    },
  },
  watch: {
    model() {
      this.getValue();
    },
  },
});
</script>
