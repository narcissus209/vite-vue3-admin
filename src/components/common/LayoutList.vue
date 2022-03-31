<template>
  <div class="layout-list">
    <div v-if="$slots.operation" class="layout-list-operation">
      <slot name="operation"></slot>
    </div>
    <div v-if="$slots.search" class="layout-list-search">
      <slot name="search"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.layout-list {
  position: relative;
  .layout-list-operation {
    margin-bottom: 12px;
  }
  .layout-list-search {
    margin-bottom: 12px;
  }
}
</style>
