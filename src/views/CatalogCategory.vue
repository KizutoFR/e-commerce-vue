<template>
  <span v-if="loading">loading</span>
  <div v-else class="p-8 flex flex-col gap-8">
    <a href="/catalog" class="underline text-[#2c00d5]">Retour</a>
    <h1 class="text-3xl font-bold">Catalog - "{{ selectedCategory }}"</h1>
    <div class="flex flex-col justify-start items-end gap-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7"
      >
        <Product
          v-for="product in filteredProducts"
          :key="product.id"
          :data="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import Product from '@/components/Product.vue'
import { useProductsStore } from '@/stores/products.js'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    Product
  },
  setup() {
    const { products, loading } = storeToRefs(useProductsStore())
    const { fetchProducts } = useProductsStore()
    const route = useRoute()

    const state = reactive({
      selectedCategory: route.params.category,
      filteredProducts: computed(() => {
        return products.value.filter((product) => {
          const isMatchingCategory =
            !state.selectedCategory ||
            product.category === state.selectedCategory
          return isMatchingCategory
        })
      })
    })

    onMounted(async () => {
      await fetchProducts()
    })

    return {
      ...toRefs(state),
      products,
      loading
    }
  }
}
</script>
