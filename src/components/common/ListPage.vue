<template>
  <div class="list-page">
    <el-pagination
      :currentPage="page.page"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="changeSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script setup lang="ts">
interface IProps {
  page: IPage
}
const props = defineProps<IProps>()

interface Emits {
  (e: 'change-page'): void
  (e: 'update:page', val: IPage): void
}
const emit = defineEmits<Emits>()

const changeSize = (size: number) => {
  emit('update:page', { ...props.page, size: size, page: 1 })
  emit('change-page')
}
const changePage = (page: number) => {
  emit('update:page', { ...props.page, page })
  emit('change-page')
}
</script>
<style lang="scss" scoped>
.list-page {
  display: flex;
  justify-content: end;
  margin-top: 12px;
}
</style>
