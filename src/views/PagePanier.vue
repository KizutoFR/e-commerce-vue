<template>
  <div v-if="hasProducts" class="checkout-message">
    <CheckoutList />
    <div class="divBuy">
      <h3 class="totalPrice">Total : {{ totalPrice }}$</h3>
      <h3 class="totalPrice">Products in cart : {{ productLength }}</h3>
      <button class="Btn" @click="removeAllCart">Buy</button>
    </div>
  </div>
  <div class="noProduct" v-else>
    <h3 class="font-bold text-lg py-3">No products...</h3>
    <router-link to="./" class="Btn">Back to list of products</router-link>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import CheckoutList from '@/components/CheckoutList.vue'

export default {
  components: {
    CheckoutList
  },
  setup() {
    const { productsInCart, productLength } = storeToRefs(useProductsStore())
    const { updateCart } = useProductsStore()
    const totalPrice = computed(() => {
      return productsInCart.value
        .reduce((acc, product) => {
          return acc + product.quantity * product.price
        }, 0)
        .toFixed(2)
    })
    const removeAllCart = () => {
      productsInCart.value.forEach((product) => {
        updateCart(product, 0)
      })
    }

    const hasProducts = computed(() => productsInCart.value.length > 0)
    onMounted(async () => {
      // product.value = await fetchProduct(props.id)
    })
    return {
      removeAllCart,
      productLength,
      hasProducts,
      totalPrice
    }
  }
}
</script>

<style lang="scss">
.checkout_message {
  font-size: 1.5em;
}
.totalPrice {
  font-size: 1.2em;
  font-weight: bold;
}
.Btn {
  width: 100%;
  border: none;
  background: #2c00d5;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: white;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  display: block;
}
.Btn:hover {
  opacity: 0.8;
}
.Btn {
  max-width: 350px;
}
.divBuy {
  text-align: center;
  .Btn {
    margin-left: auto;
    margin-right: auto;
  }
}
.noProduct {
  text-align: center;

  .Btn {
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 700px) {
  .Btn {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
