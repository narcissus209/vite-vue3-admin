<template>
  <div class="header-tags">
    <template v-for="(tag, i) in tags.list" :key="tag.path">
      <div class="tag cursor-pointer" :class="{ activite: tag.isActive }" @click="$router.push(tag.path)">
        <span class="tag-name">{{ tag.title }}</span>
        <div class="tag-close" @click.stop="closeFn(i)">
          <el-icon><close /></el-icon>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/store'
const { tags, closeTag } = useLayoutStore()
const router = useRouter()
const closeFn = (i: number) => {
  if (tags.list.length === 1) return
  closeTag(i)
  router.back()
}
</script>
<style lang="scss" scoped>
.header-tags {
  height: 100%;
  display: flex;
  align-items: center;
  .tag {
    @include flex();
    font-size: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    color: #333;
    padding-left: 8px;
    border-radius: 3px;
    transition: background 0.3s, color 0.3s;
    margin-left: 12px;
    .tag-name {
      line-height: 30px;
    }
    .tag-close {
      padding: 4px 8px;
      line-height: 12px;
      visibility: hidden;
    }
    &:hover {
      color: #409eff;
      .tag-close {
        visibility: visible;
      }
    }
    &.activite {
      color: #fff;
      background: #409eff;
      border: 1px solid #409eff;
    }
  }
}
</style>
