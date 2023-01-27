<template>
  <div
    v-if="loading"
    class="h-screen flex flex-col justify-center items-center"
  >
    <Loader />
  </div>
  <div v-else>
    <header class="w-full">
      <Navbar>
        <div class="flex flex-col gap-10">
          <li class="text-[1.5rem]">
            <RouterLink to="/">Tous les produits</RouterLink>
          </li>
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="capitalize text-[1.5rem]"
          >
            <RouterLink :to="`/${category}`">{{ category }}</RouterLink>
          </li>
        </div>
        <div>
          <li class="text-[1.5rem]">
            <RouterLink to="/cart" class="cart relative">
              <div
                class="rounded-full border-2 border-black bg-white text-[#2c00d5] font-bold w-8 h-8 absolute top-0 right-0 flex justify-center items-center"
              >
                {{ productLength }}
              </div>
              <ShoppingCartIcon class="h-16" />
            </RouterLink>
          </li>
        </div>
        <template v-slot:navbar>
          <RouterLink to="/">Tous les produits</RouterLink>
          <RouterLink
            v-for="(category, index) in categories"
            :key="index"
            class="capitalize text-[1.5rem]"
            :to="`/${category}`"
            >{{ category }}</RouterLink
          >
          <RouterLink to="/cart">
            <div class="relative w-fit">
              <div
                class="badge rounded-full border border-black bg-white text-[#2c00d5] font-bold w-6 h-6 absolute -top-1/3 -right-1/2 flex justify-center items-center text-xs"
              >
                {{ productLength }}
              </div>
              <ShoppingCartIcon class="h-8" />
            </div>
          </RouterLink>
        </template>
      </Navbar>
    </header>

    <div class="pt-16">
      <RouterView />
    </div>
  </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/NavBar.vue'
import Loader from '@/components/Loader.vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products.js'
import { onMounted } from 'vue'
export default {
  components: {
    Navbar,
    Loader,
    ShoppingCartIcon,
    RouterLink,
    RouterView
  },
  setup() {
    const { productLength, categories, loading } = storeToRefs(
      useProductsStore()
    )
    const { fetchProducts } = useProductsStore()

    onMounted(async () => {
      await fetchProducts()
    })

    return {
      productLength,
      categories,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
}

div a,
li > span {
  display: flex;
  padding: 0 1rem;
  height: 100%;
  min-width: 100px;
  min-height: 60px;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: #e1e1e1;
    .badge {
      background-color: #e0dede;
    }
  }
  &.router-link-exact-active {
    color: #2c00d5;
    font-weight: bold;
    position: relative;
    &::before {
      content: '.';
      font-size: 2rem;
      position: absolute;
      bottom: 0;
      height: 40px;
    }
  }
}
li {
  width: 100%;
}
</style>
