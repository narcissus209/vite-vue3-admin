<template>
  <div class="com-upload-img-one">
    <div v-show="modelValue" class="pre-img-box" :style="{ width: width, height: height }">
      <img :src="modelValue" class="avatar" />
      <div class="mask">
        <el-icon class="mask-icon" @click="preView"><ZoomIn /></el-icon>
        <el-icon v-if="hasRemove" class="mask-icon" @click="removeImg"><Delete /></el-icon>
      </div>
    </div>
    <ComUpload v-show="!modelValue" list-type="picture" :show-file-list="false" :on-success="successHandle" :before-upload="beforeUploadHandle">
      <div class="upload-icon-box" :style="{ height: height, width: width }">
        <el-icon class="upload-icon"><Plus /></el-icon>
        <span class="upload-span">请上传图片</span>
      </div>
    </ComUpload>
    <el-dialog v-model="preImg" width="500px">
      <div style="text-align: center">
        <img width="400" :src="modelValue" />
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { ref } from 'vue'

interface IProps {
  modelValue: string // 图片
  height?: string // 高
  width?: string // 宽
  hasRemove?: boolean // 使用禁止删除
  removeTips?: boolean // 删除提示
  beforeUpload?: () => any // 上传前校验
}

const props = withDefaults(defineProps<IProps>(), {
  height: '100px',
  width: '100px',
  hasRemove: false,
  removeTips: false
})
interface Emits {
  (e: 'update:modelValue', val: string): string
}
const emit = defineEmits<Emits>()

// 上传前校验
const beforeUploadHandle: UploadProps['beforeUpload'] = async file => {
  if (!/^image\/.+/.test(file.type)) {
    ElMessage.error('请上传图片格式')
    return Promise.reject(`请上传图片格式`)
  }
  try {
    if (props.beforeUpload) {
      await props.beforeUpload()
    }
  } catch (error) {
    console.log(error)
  }
  return true
}

// 上传成功
const successHandle: UploadProps['onSuccess'] = res => {
  console.log(res)
  ElMessage.success('上传成功')
  emit('update:modelValue', res.data.url)
}

// 预览大图
const preImg = ref(false)
const preView = () => {
  preImg.value = true
}

// 移除上传的图片
const removeImg = () => {
  emit('update:modelValue', '')
}
</script>
<style lang="scss" scoped>
.com-upload-img-one {
  .upload-icon-box {
    @include flex();
    flex-direction: column;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    &:hover {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
    .upload-icon {
      font-size: 24px;
    }
    .upload-span {
      font-size: 12px;
      line-height: 16px;
    }
  }
  .pre-img-box {
    position: relative;
    .mask {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 6px;
      @include flex();
      visibility: hidden;
      .mask-icon {
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        & + .mask-icon {
          margin-left: 20px;
        }
      }
    }
    &:hover {
      .mask {
        visibility: visible;
      }
    }
  }
}
</style>
