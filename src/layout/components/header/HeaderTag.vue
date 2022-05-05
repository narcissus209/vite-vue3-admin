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
  // 如果是未激活tab，可直接关闭
  if (tags.list[i].isActive) {
    closeTag(i)
    router.replace(tags.list[tags.list.length - 1].path)
  } else {
    closeTag(i)
  }
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
    border-radius: 3px;
    transition: all 1s;
    margin-left: 12px;
    min-width: 86px;
    .tag-name {
      line-height: 30px;
    }
    .tag-close {
      padding: 8px;
      line-height: 12px;
      display: none;
    }
    &:hover {
      color: #409eff;
      .tag-close {
        display: inline-block;
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
