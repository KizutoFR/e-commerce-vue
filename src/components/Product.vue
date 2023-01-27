<template>
  <div
    class="overflow-hidden rounded-2xl border border-[#e8e8e8] flex flex-col"
  >
    <div class="p-4 flex justify-center items-center">
      <img :src="data.image" class="object-scale-down h-44" />
    </div>
    <div class="bg-[#f4f4f4] p-5 flex flex-col justify-between gap-4 flex-grow">
      <div class="flex flex-col justify-start items-start gap-2">
        <span class="text-gray-400 text-xs">
          {{ data.rating.rate }} / 5 ({{ data.rating.count }}
          {{ data.rating.count > 1 ? 'notes' : 'note' }})
        </span>
        <span
          class="text-sm font-bold underline overflow-ellipsis overflow-hidden product-title"
          :title="data.title"
          >{{ data.title }}</span
        >
        <span
          class="bg-[#dad5f0] p-1 px-1.5 rounded border text-[#2c00d5] uppercase text-[0.6rem] font-bold"
          ><a :href="`/${data.category}`">{{ data.category }}</a></span
        >
      </div>
      <div class="flex flex-row justify-between items-center w-full">
        <div class="flex flex-col">
          <span class="text-gray-400">Price : </span>
          <span>${{ data.price }}</span>
        </div>
        <button class="bg-[#2c00d5] text-white rounded-xl p-3">
          <ShoppingCartIcon class="text-white h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { toRefs } from 'vue'
export default {
  components: {
    ShoppingCartIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
