import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const productLength = ref(0)
  const productsInCart = ref([])
  const updateCart = (product, action) => {
    let productInCart = productsInCart.value.findIndex(
      (p) => p.id === product.id
    )

    if (action === 0) {
      productsInCart.value.splice(productInCart, 1)
    }
    if (productInCart != -1) {
      console.log(product)
      productsInCart.value[productInCart] = {
        ...product,
        quantity: productsInCart.value[productInCart].quantity + action
      }
    } else {
      productsInCart.value.push({
        ...product,
        quantity: 1
      })
    }
  }

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

  const fetchProduct = async (id) => {
    try {
      loading.value = true
      const response = await fetch('https://fakestoreapi.com/products/' + id)
      const result = await response.json()
      loading.value = false
      return result
    } catch (err) {
      console.error(err)
    }
  }

  return {
    products,
    fetchProducts,
    fetchProduct,
    updateCart,
    productsInCart,
    categories,
    productLength,
    loading
  }
})
