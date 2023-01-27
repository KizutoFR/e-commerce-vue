<template>
  <div class="p-8 flex flex-col gap-8">
    <h1 class="text-3xl font-bold">Catalog</h1>
    <ProductsList :products="products">
      <template #categories>
        <div class="flex flex-row gap-4">
          <span
            v-for="(category, index) in categories"
            :key="index"
            class="bg-[#dad5f0] p-1 px-1.5 rounded border text-[#2c00d5] uppercase text-xs font-bold hover:underline"
            ><a :href="`/${category}`">{{ category }}</a></span
          >
        </div>
      </template>
    </ProductsList>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import ProductsList from '@/components/ProductsList.vue'

export default {
  components: {
    ProductsList
  },
  setup() {
    const { products, categories } = storeToRefs(useProductsStore())

    return {
      categories,
      products
    }
  }
}
</script>
