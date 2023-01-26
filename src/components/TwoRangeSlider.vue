<template>
  <div class="flex flex-col w-full gap-2">
    <div class="relative min-h-[10px]">
      <input
        v-model="minValue"
        style="height: 0; z-index: 1"
        type="range"
        :min="props.min"
        :max="props.max"
        @change="
          () => props.onChange({ min: Number(minValue), max: Number(maxValue) })
        "
      />
      <input
        v-model="maxValue"
        type="range"
        :style="{
          background: gradient
        }"
        :min="props.min"
        :max="props.max"
        @change="
          () => props.onChange({ min: Number(minValue), max: Number(maxValue) })
        "
      />
    </div>
    <div
      class="relative flex justify-between text-lg"
      :class="`text-[${props.color}]`"
    >
      <div>{{ minValue }}{{ props.unit }}</div>
      <div>{{ maxValue }}{{ props.unit }}</div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    unit: {
      type: String,
      default: '$'
    },
    color: {
      type: String,
      default: '#25daa5'
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      minValue: props.min,
      maxValue: props.max,
      gradient: computed(() => {
        const rangeDistance = props.max - props.min
        const fromPosition = state.minValue - props.min
        const toPosition = state.maxValue - props.min
        return `linear-gradient(to right,
          #C6C6C6 0%,
          #C6C6C6 ${(fromPosition / rangeDistance) * 100}%,
          ${props.color} ${(fromPosition / rangeDistance) * 100}%,
          ${props.color} ${(toPosition / rangeDistance) * 100}%, 
          #C6C6C6 ${(toPosition / rangeDistance) * 100}%, 
          #C6C6C6 100%)`
      })
    })
    return {
      ...toRefs(state),
      props
    }
  }
}
</script>

<style lang="scss" scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type='range']::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
}
</style>
