<template>
  <div v-if="loading">loading</div>
  <div v-else-if="product" class="checkout_box">
    <ul class="checkout_list">
      <li
        v-for="product in productsInCart"
        :key="product"
        class="checkout_product"
      >
        <router-link class="linkCart" to="./">
          <img :src="product.image" alt="" class="product_image" />
        </router-link>
        <router-link class="linkCart" to="./">
          <h3 class="product_name">{{ product.title }}</h3>
        </router-link>
        <span class="product_price">$ {{ product.price }} </span>
        <div class="quantity-toggle">
          <button @click="() => increment(product)">+</button>
          <input type="text" :value="product.quantity" readonly />
          <button @click="() => decrement(product)">-</button>
        </div>
        <button @click="() => remove(product)" class="delete">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const { loading } = storeToRefs(useProductsStore())
    const { productsInCart, updateCart } = useProductsStore()
    const product = ref(undefined)
    const increment = (product) => {
      updateCart(product, 1)
    }
    const decrement = (product) => {
      if (product.quantity === 1) {
        alert('Negative quantity not allowed')
      } else {
        updateCart(product, -1)
      }
    }
    const remove = (product) => {
      updateCart(product, 0)
    }

    onMounted(async () => {
      product.value = await productsInCart
    })
    return {
      remove,
      increment,
      decrement,
      productsInCart,
      product,
      loading
    }
  }
}
</script>

<style lang="scss">
.checkout_box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}
.checkout_list {
  padding: 0;
}
.checkout_product {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 0.5fr;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: 0.8em;
  margin: 1em 0;
}
.checkout_product * {
  place-self: center;
}
.product_image {
  grid-column: 1/2;
  width: 50%;
}
.product_name {
  box-sizing: border-box;
}
.product_price {
  font-size: 1.2em;
  font-weight: bold;
}
.total {
  font-size: 2em;
  font-weight: bold;
  align-self: flex-end;
}

$border: 2px solid #ddd;

.quantity-toggle {
  display: flex;

  input {
    border: 0;
    border-top: $border;
    border-bottom: $border;
    width: 2.5rem;
    text-align: center;
    padding: 0 0.5rem;
  }

  button {
    border: $border;
    // padding: 0.5rem;
    background: #f5f5f5;
    color: #888;
    font-size: 1rem;
    cursor: pointer;
  }
}
.linkCart:hover {
  color: blue;
}
.delete {
  font-size: 12px;
  color: hsl(219, 9%, 45%);
  padding-bottom: 10px;
}
</style>
