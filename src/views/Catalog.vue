<template>
  <span v-if="loading">loading</span>
  <div v-else class="p-8 flex flex-col gap-8">
    <h1 class="text-3xl font-bold">Catalog</h1>
    <div class="flex flex-col justify-start items-end gap-8">
      <input
        v-model="searched"
        type="text"
        placeholder="Search for product(s) name"
        class="border rounded p-3 w-full"
      />
      <div class="border shadow rounded-md p-4 flex flex-col gap-10 w-full">
        <select @change="handleSelectCategory" class="border rounded p-2">
          <option :value="undefined" disabled>Category</option>
          <option :value="undefined">All</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <TwoRangeSlider
          :min="lowestPrice"
          :max="highestPrice"
          color="#2c00d5"
          :onChange="handleSelectPrice"
        />
      </div>
      <div class="flex flex-col justify-start items-end gap-2">
        <span class="text-sm text-gray-500">Order by</span>
        <select @change="handleSelectOrder" class="border rounded p-2">
          <option
            v-for="(orderType, index) in orderTypes"
            :key="index"
            :value="JSON.stringify(orderType)"
          >
            {{ orderType.name }}
          </option>
        </select>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7"
      >
        <Product
          v-for="product in sortedProducts"
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
import TwoRangeSlider from '@/components/TwoRangeSlider.vue'
import { useProductsStore } from '@/stores/products.js'
import { computed, onMounted, reactive, toRefs } from 'vue'

const orderTypes = [
  {
    name: 'Note 5-0',
    property: 'rating.rate',
    direction: -1
  },
  {
    name: 'Note 0-5',
    property: 'rating.rate',
    direction: 1
  },
  {
    name: 'A-Z',
    property: 'title',
    direction: 1
  },
  {
    name: 'Z-A',
    property: 'title',
    direction: -1
  },
  {
    name: 'Price 0-9',
    property: 'price',
    direction: 1
  },
  {
    name: 'Price 9-0',
    property: 'price',
    direction: -1
  }
]

export default {
  components: {
    Product,
    TwoRangeSlider
  },
  setup() {
    const { products, loading, categories } = storeToRefs(useProductsStore())
    const { fetchProducts } = useProductsStore()

    const state = reactive({
      lowestPrice: computed(() =>
        products.value.reduce((acc, product) => {
          if (!acc) {
            return product.price
          }
          return acc < product.price ? acc : product.price
        }, undefined)
      ),
      highestPrice: computed(() =>
        products.value.reduce((acc, product) => {
          return acc > product.price ? acc : product.price
        }, 0)
      ),
      selectedCategory: undefined,
      selectedPrice: undefined,
      selectedOrder: orderTypes[0],
      searched: undefined,
      filteredProducts: computed(() => {
        return products.value.filter((product) => {
          const isMatchingCategory =
            !state.selectedCategory ||
            product.category === state.selectedCategory
          const isMatchingPrice =
            !state.selectedPrice ||
            (product.price >= state.selectedPrice.min &&
              product.price <= state.selectedPrice.max)
          const isMatchingSearch =
            !state.searched ||
            product.title.toLowerCase().includes(state.searched.toLowerCase())
          return isMatchingCategory && isMatchingPrice && isMatchingSearch
        })
      }),
      sortedProducts: computed(() => {
        return state.filteredProducts.slice(0).sort((a, b) => {
          const { property, direction } = state.selectedOrder
          const aProp = getPropertyInObject(a, property)
          const bProp = getPropertyInObject(b, property)
          if (aProp < bProp) {
            return -1 * direction
          }
          if (aProp > bProp) {
            return 1 * direction
          }
          return 0
        })
      })
    })

    const getPropertyInObject = (object, property) => {
      return property
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t !== '')
        .reduce((prev, cur) => prev && prev[cur], object)
    }

    const handleSelectCategory = (e) => {
      const value = e.target.value === 'All' ? undefined : e.target.value
      state.selectedCategory = value
    }

    const handleSelectPrice = (data) => {
      state.selectedPrice = data
    }

    const handleSelectOrder = (e) => {
      state.selectedOrder = JSON.parse(e.target.value)
    }

    onMounted(async () => {
      await fetchProducts()
    })

    return {
      ...toRefs(state),
      categories,
      products,
      loading,
      handleSelectCategory,
      handleSelectPrice,
      handleSelectOrder,
      orderTypes
    }
  }
}
</script>
