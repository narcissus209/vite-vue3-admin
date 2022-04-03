<template>
  <div class="list-page">
    <el-pagination
      :currentPage="modelValue.page"
      :page-size="modelValue.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="modelValue.total"
      @size-change="changeSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
interface IProps {
  modelValue: IPage
}
const props = defineProps<IProps>()

interface Emits {
  (e: 'change-page'): void
  (e: 'update:modelValue', val: IPage): IPage
}
const emit = defineEmits<Emits>()

const changeSize = (size: number) => {
  emit('update:modelValue', { ...props.modelValue, size: size, page: 1 })
  emit('change-page')
}
const changePage = (page: number) => {
  emit('update:modelValue', { ...props.modelValue, page })
  emit('change-page')
}
</script>
<style lang="scss" scoped>
.list-page {
  @include flex(center, flex-end);
  margin-top: 12px;
}
</style>
