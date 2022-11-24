<template>
  <div class="shop-page__wrapper">
    <div class="shop-page__info-wrapper">
      <q-avatar size="150px" class="shop-page__shop-avatar">
        <q-img height="150px" width="150px" :src="shop?.logo" />
      </q-avatar>
      <p class="shop-page__shop-name">{{ shop?.name }}</p>
      <p class="shop-page__shop-description">{{ shop?.description }}</p>
      <div class="shop-page__shop-address-wrapper">
        <q-icon name="ion-pin" class="shop-page__address-icon" color="grey" />
        <p class="shop-page__shop-address">{{ shop?.street }},</p>
        <p class="shop-page__shop-address">{{ shop?.city }},</p>
        <p class="shop-page__shop-address">{{ shop?.state }},</p>
        <p class="shop-page__shop-address">{{ shop?.zipCode }},</p>
        <p class="shop-page__shop-address">{{ shop?.country }},</p>
      </div>
      <div class="shop-page__shop-address-wrapper">
        <q-icon name="ion-call" class="shop-page__address-icon" color="grey" />
        <p class="shop-page__shop-address">{{ shop?.telephoneNumber }}</p>
      </div>
      <q-btn
        color="grey-3"
        text-color="black"
        label="Visit Shop"
        class="shop-page__visit-button"
      />
    </div>
    <div class="shop-page__image-wrapper">
      <q-img :src="shop?.coverImage" />
      <q-btn
        icon="edit"
        color="blue-8"
        text-color="white"
        label="Edit Shop"
        class="shop-page__edit-button"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useShopsStore } from "@/stores/shops";
import type { Shop } from "@/core/models/Shop";

export default defineComponent({
  setup() {
    const shopsStore = useShopsStore();
    return { shopsStore };
  },
  data() {
    return {
      shop: Object as PropType<Shop>,
    };
  },
  beforeMount() {
    // TODO fix type
    this.shop = this.shopsStore?.getShopById(Number(this.$route.params.id));
  },
});
</script>

<style scoped lang="scss">
.shop-page__wrapper {
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}
.shop-page__info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  border: 1px solid #ececec;
  border-radius: 5px;
  background: white;
}

.shop-page__shop-avatar {
  margin-bottom: 20px;
}
.shop-page__shop-name {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.shop-page__shop-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
  margin-bottom: 20px;
  text-align: center;
}

.shop-page__shop-address-wrapper {
  display: grid;
  width: 100%;
  grid-template-columns: max-content repeat(2, 1fr);
  grid-template-rows: min-content auto;
  align-items: center;
  column-gap: 8px;
  margin-bottom: 20px;
}

.shop-page__icon {
  grid-column: 1;
}

.shop-page__shop-address {
  grid-column: 2;
  margin: 0;
  color: rgb(107, 114, 128);
  text-overflow: ellipsis;
}

.shop-page__visit-button {
  width: 100%;
  padding: 12px;
}

.shop-page__image-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  border: 1px solid #ececec;
  border-radius: 5px;
  position: relative;
  display: flex;
}

.shop-page__edit-button {
  width: fit-content;
  height: 20px;
  grid-row: 1;
  justify-self: end;
  margin: 10px 10px 0 0;
  position: absolute;
  right: 5px;
}
</style>
