<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  prefix?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon' // 目录未svg
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
