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

    <div class="shop-page__shop-image-wrapper">
      <q-img :src="shop?.coverImage" :fit="'contain'" />
      <q-btn
        icon="edit"
        color="blue-8"
        text-color="white"
        label="Edit Shop"
        class="shop-page__edit-button"
      />
    </div>

    <div class="shop-page__shop-statistic-wrapper">
      <div class="shop-page__statistic-block">
        <p class="shop-page__statistic-title">Products</p>
        <div class="shop-page__statistic-item">
          <q-icon name="ion-cube" class="shop-page__statistic-icon" size="sm" />
          <div class="shop-page__statistic-text-wrapper">
            <span class="shop-page__statistic-count">{{
              shop?.totalProducts
            }}</span>
          </div>
          <p class="shop-page__statistic-type">Total Products</p>
        </div>
        <div class="shop-page__statistic-item">
          <q-icon
            name="ion-appstore"
            class="shop-page__statistic-icon"
            size="sm"
          />
          <div class="shop-page__statistic-text-wrapper">
            <span class="shop-page__statistic-count">{{
              shop?.totalOrders
            }}</span>
            <p class="shop-page__statistic-type">Total Orders</p>
          </div>
        </div>
      </div>
      <div class="shop-page__statistic-block">
        <p class="shop-page__statistic-title">Revenue</p>
        <div class="shop-page__statistic-item">
          <q-icon
            name="currency_exchange"
            class="shop-page__statistic-icon"
            size="sm"
          />
          <div class="shop-page__statistic-text-wrapper">
            <p class="shop-page__statistic-type">Gross Sales</p>
          </div>
        </div>
        <div class="shop-page__statistic-item">
          <q-icon
            name="attach_money"
            class="shop-page__statistic-icon"
            size="sm"
          />
          <div class="shop-page__statistic-text-wrapper">
            <p class="shop-page__statistic-type">Current Balance</p>
          </div>
        </div>
      </div>
      <div class="shop-page__statistic-block">
        <p class="shop-page__statistic-title">Others</p>
        <div class="shop-page__statistic-item">
          <q-icon name="percent" class="shop-page__statistic-icon" size="sm" />
          <div class="shop-page__statistic-text-wrapper">
            <span class="shop-page__statistic-count">0 %</span>
            <p class="shop-page__statistic-type">Admin Commission Rate</p>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-page__extra-wrapper">
      <div class="shop-page__shop-registration">
        <p class="shop-page__registration-title">Registered Since</p>
        <p class="shop-page__reg-date">{{ shop?.dateOfRegistration }}</p>
      </div>
      <div class="shop-page__payment-wrapper">
        <p class="shop-page__payment-title">Payment Information</p>
        <p class="shop-page__payment-row">Name:</p>
        <p class="shop-page__payment-row">Email</p>
        <p class="shop-page__payment-row">Bank:</p>
        <p class="shop-page__payment-row">Account No:</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useShopsStore } from "@/stores/shops";
import type { Shop } from "@/core/models/Shop";
// TODO make reusable statistic item and try to pass background color prop
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
  row-gap: 20px;

  @include media-lg {
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr repeat(2, 1fr);
    gap: 20px;
  }
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

  @include media-lg {
    grid-row: 1;
  }
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

.shop-page__shop-image-wrapper {
  width: 100%;
  background: white;
  border: 1px solid #ececec;
  border-radius: 5px;
  position: relative;
  display: flex;
  order: -1;
  height: 400px;

  @include media-lg {
    grid-column: 2 / 4;
    height: 100%;
    order: none;
  }
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

.shop-page__shop-statistic-wrapper {
  display: grid;
  background: white;
  border: 1px solid #ececec;
  border-radius: 5px;
  row-gap: 10px;
  column-gap: 20px;
  padding: 16px;
  order: 1;

  @include media-lg {
    grid-column: 1 / 3;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: max-content 1fr;
    grid-row: 2;
  }
}

.shop-page__statistic-title {
  grid-row: 1;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 10px;
}
.shop-page__statistic-item {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-row: 2;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  padding: 12px 16px;
  border: 1px solid #ececec;
}
.shop-page__statistic-icon {
  background: #fc9ec6;
  padding: 12px;
  border: 0 solid;
  border-radius: 50%;
  color: white;
  grid-row: 1 / -1;
}

.shop-page__statistic-count {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}

.shop-page__statistic-type {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
  margin: 0;
  grid-column: 2;
}

.shop-page__extra-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  background: white;
  border-radius: 5px;
}

.shop-page__shop-registration {
  border-bottom: 1px solid #ececec;
  padding: 24px;
}
.shop-page__registration-title {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
  margin-bottom: 8px;
}

.shop-page__reg-date {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.shop-page__payment-wrapper {
  display: grid;
  padding: 24px;
}

.shop-page__payment-title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.shop-page__payment-row {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107, 114, 128);
  margin-bottom: 8px;
}
</style>
