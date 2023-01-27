import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)

  const fetchProducts = async () => {
    try {
      loading.value = true
      const productsResponse = await fetch('https://fakestoreapi.com/products')
      products.value = await productsResponse.json()

      const categoriesResponse = await fetch(
        'https://fakestoreapi.com/products/categories'
      )
      categories.value = await categoriesResponse.json()
      loading.value = false
    } catch (err) {
      console.error(err)
    }
  }

  return { products, fetchProducts, loading, categories }
})
