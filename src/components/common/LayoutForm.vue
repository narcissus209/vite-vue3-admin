<template>
  <div class="layout-form">
    <div class="layout-form-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="layout-form-footer" :style="{ paddingLeft: props.paddingLeft }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ paddingLeft?: string }>(), {
  paddingLeft: '120px'
})
</script>
<style lang="scss" scoped>
.layout-form {
  position: relative;
  .layout-form-content {
    padding-bottom: 64px;
  }
  .layout-form-footer {
    height: 48px;
    display: flex;
    align-items: center;
    background: #ffffff;
    position: sticky;
    bottom: 48px;
  }
}
</style>
