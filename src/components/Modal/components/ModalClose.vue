<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <a-tooltip v-if="fullScreen" placement="bottom" title="还原">
        <FullscreenExitOutlined class="text-24" @click="handleFullScreen" />
      </a-tooltip>
      <a-tooltip v-else placement="bottom" title="全屏">
        <FullscreenOutlined class="text-24" @click="handleFullScreen" />
      </a-tooltip>
    </template>
    <a-tooltip placement="bottom" title="关闭">
      <CloseOutlined class="text-24" @click="handleCancel" />
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent } from 'vue'

const prefixCls = 'rds-basic-modal-close'

export default defineComponent({
  name: 'ModalClose',
  components: { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined },
  props: {
    canFullscreen: { type: Boolean, default: true },
    fullScreen: { type: Boolean }
  },
  emits: ['cancel', 'fullscreen'],
  setup(props, { emit }) {
    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen
        }
      ]
    })

    function handleCancel(e: Event) {
      emit('cancel', e)
    }

    function handleFullScreen(e: Event) {
      e?.stopPropagation()
      e?.preventDefault()
      emit('fullscreen')
    }

    return {
      getClass,
      prefixCls,
      handleCancel,
      handleFullScreen
    }
  }
})
</script>

<style lang="less" scoped>
@prefix-cls: ~'rds-basic-modal-close';

.@{prefix-cls} {
  display: flex;
  height: 95%;
  align-items: center;

  > span {
    margin-left: 48px;
    font-size: 16px;
  }

  &--can-full {
    > span {
      margin-left: 12px;
    }
  }

  &:not(&--can-full) {
    > span:nth-child(1) {
      &:hover {
        font-weight: 700;
      }
    }
  }

  & span:nth-child(1) {
    display: inline-block;
    padding: 10px;

    &:hover {
      color: #1890ff;
    }
  }

  & span:last-child {
    &:hover {
      color: #ff4d4f;
    }
  }
}
</style>
