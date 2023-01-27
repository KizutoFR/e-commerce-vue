<template>
  <div class="p-8 flex flex-col gap-8 items-start">
    <a href="/" class="underline bg-[#2c00d5] text-white rounded py-1 px-2"
      >Retour</a
    >
    <h1 class="text-3xl font-bold">Catalog - "{{ selectedCategory }}"</h1>
    <ProductsList :key="selectedCategory" :products="filteredProducts" />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import ProductsList from '@/components/ProductsList.vue'
import { useProductsStore } from '@/stores/products.js'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    ProductsList
  },
  setup() {
    const { products, categories } = storeToRefs(useProductsStore())
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      selectedCategory: computed(() => route.params.category),
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
      if (!categories.value.includes(state.selectedCategory)) {
        router.replace('/')
      }
    })

    return {
      ...toRefs(state),
      products
    }
  }
}
</script>
