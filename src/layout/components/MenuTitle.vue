<template>
  <SvgIcon style="margin-right: 8px; font-size: 20px" :name="icon"></SvgIcon>
  <span style="user-select: none">{{ title }}</span>
</template>
<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}
defineProps<Props>()
</script>
