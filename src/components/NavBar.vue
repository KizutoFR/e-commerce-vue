<template>
  <div
    v-if="showMenu"
    class="h-screen w-full flex flex-col flex-start absolute"
  >
    <div
      class="menu-container h-16 flex flex-row items-center flex-start bg-[#f5f5f5] shadow"
    >
      <button @click="toggleBurger">
        <Bars3Icon v-if="!showBurger" :key="1" class="menu h-10 ml-4" />
        <XMarkIcon v-else :key="2" class="cross h-10 ml-4" />
      </button>
    </div>
    <div
      @click.self="showBurger = false"
      class="menu-background flex-grow"
      :class="{ displayed: showBurger }"
    >
      <div
        class="menu-list w-2/5 h-full flex flex-col justify-between gap-20 bg-[#f5f5f5] list-none items-center relative z-50 px-2 py-10"
      >
        <slot />
      </div>
    </div>
  </div>
  <div
    v-else
    class="navbar h-16 w-full flex justify-end gap-10 bg-[#f5f5f5] items-center absolute pr-4 shadow"
  >
    <slot name="navbar" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
export default {
  components: {
    Bars3Icon,
    XMarkIcon
  },
  setup() {
    const showMenu = ref(true)
    const showBurger = ref(false)
    const toggleBurger = () => {
      showBurger.value = !showBurger.value
    }
    let breakpoint = 800
    onMounted(() => {
      showMenu.value = window.innerWidth < breakpoint

      window.addEventListener('resize', () => {
        showMenu.value = window.innerWidth < breakpoint
      })
    })
    return {
      showMenu,
      showBurger,
      toggleBurger
    }
  }
}
</script>
<style scoped>
.menu-list {
  transition: all 0.5s ease-in-out;
  transform: translateX(-100%);
}
.displayed .menu-list {
  transform: translateX(0%);
}
.menu-background {
  transition: all 0.5s ease-in-out;
  background-color: transparent;
}
.displayed.menu-background {
  background-color: rgb(0, 0, 0, 0.3);
}
</style>
