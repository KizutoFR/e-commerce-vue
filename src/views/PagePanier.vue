<template>
  <div v-if="hasProducts" class="checkout-message">
    <checkoutList />
    <div class="divBuy">
      <h3 class="totalPrice">Total {{ totalPrice }}$</h3>
      <button class="Btn" @click="removeAllCart">Buy</button>
    </div>
  </div>
  <div class="noProduct" v-else>
    <h3>No products...</h3>
    <router-link to="./" class="Btn">Back to list of products</router-link>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import CheckoutList from '@/components/CheckoutList.vue'

export default {
  // props: ['id'],
  //   setup(props) {
  components: {
    CheckoutList
  },
  setup() {
    const { productsInCart, updateCart } = useProductsStore()
    const totalPrice = computed(() => {
      return productsInCart.reduce((acc, product) => {
        return acc + Math.round(product.quantity * product.price * 100) / 100
      }, 0)
    })
    const removeAllCart = () => {
      productsInCart.forEach((product) => {
        updateCart(product, 0)
      })
    }

    const hasProducts = computed(() => productsInCart.length > 0)
    onMounted(async () => {
      // product.value = await fetchProduct(props.id)
    })
    return {
      removeAllCart,
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
  display: grid;
  align-items: center;
  grid-template-columns: 20% auto;
  justify-content: center;
  border: none;
  background: #3cb4a8;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: white;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
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
