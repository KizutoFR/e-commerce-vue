<template>
  <div v-if="product" class="product">
    <div class="product_container">
      <div class="image">
        <img :src="product.image" class="image_product" :alt="product.title" />
      </div>
      <div class="product_detail">
        <h1 class="name_product">{{ product.title }}</h1>
        <span
          class="bg-[#dad5f0] p-1 px-1.5 rounded border text-[#2c00d5] uppercase text-[0.6rem] font-bold mb-2"
          ><a :href="`/${product.category}`">{{ product.category }}</a></span
        >
        <div class="rate_product">
          <p>{{ product.rating.rate }}</p>
          <StarIcon class="h-6 w-6 text-blue-500" />
          <p class="avis_product">avis :{{ product.rating.count }}</p>
        </div>

        <p class="description_product">{{ product.description }}</p>
        <div class="price">
          <p class="price_product">{{ product.price }}€</p>
        </div>
        <button @click="addProductToCart()" class="addTocartBtn">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import { onMounted, ref } from 'vue'
import { StarIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

export default {
  components: { StarIcon },
  setup() {
    const route = useRoute()
    const { loading } = storeToRefs(useProductsStore())
    const { fetchProduct, updateCart } = useProductsStore()
    const product = ref(undefined)
    const addProductToCart = () => {
      updateCart(product.value, 1)
    }
    onMounted(async () => {
      product.value = await fetchProduct(route.params.id)
    })
    return {
      addProductToCart,
      product,
      loading
    }
  }
}
</script>

<style lang="scss">
.loading {
  text-align: center;
}
.product_detail {
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-top: 20px;
  max-width: 550px;
  margin: 0 auto;
}
.name_product {
  font-size: 30px;
  width: 100%;
  max-width: 500px;
  color: hsl(220, 13%, 13%);
}
.categorie_product {
  font-size: 12px;
  color: hsl(219, 9%, 45%);
  padding-bottom: 10px;
}
.rate_product {
  display: flex;
}
.avis_product {
  font-size: 12px;
  color: hsl(219, 9%, 45%);
  max-width: 550px;
  line-height: 26px;
  width: 100%;
}
.description_product {
  font-size: 16px;
  color: hsl(219, 9%, 45%);
  max-width: 550px;
  line-height: 26px;
  width: 100%;
  padding-bottom: 10px;
}

.image_product {
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 20px;
}
.addTocartBtn {
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 20% auto;
  justify-content: center;
  border: none;
  background: #2c00d5;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: white;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  text-align: start;
}
.price {
  width: 100%;
  font-size: 16px;
  text-decoration: none;
  padding-top: 10px;
  display: grid;
  grid-template-columns: 55% 45%;
}
.price_product {
  font-weight: 700;
  color: hsl(220, 13%, 13%);
  width: 100%;
  padding-top: 5px;
  text-align: end;
}
.addTocartBtn:hover {
  opacity: 0.8;
}
.addToCartBtn {
  max-width: 24px;
}
.product {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

.product_container {
  display: grid;
  height: 90%;
  grid-template-columns: 100%;
  justify-content: space-between;
}

@media screen and (min-width: 800px) {
  .product_container {
    grid-template-columns: 48% 48%;
  }
}
@media screen and (min-width: 620px) {
  .price {
    font-size: 18px;
  }
}

@media screen and (min-width: 700px) {
  .product {
    width: 90%;
  }
  .product_detail {
    padding: 30px;
    padding-top: 80px;
  }
  .name_product {
    font-size: 40px;
    // padding-bottom: 30px;
  }

  .price {
    grid-template-columns: 100%;

    .price_product {
      text-align: start;
    }
  }

  .addTocartBtn {
    grid-template-columns: 30% auto;
    text-align: center;
  }

  .description_product {
    max-width: 420px;
  }
  .image_product {
    max-width: 600px;
  }
}
</style>
