<template>
  <a-drawer :class="prefixCls" v-bind="getBindValues" @close="onClose">
    <template v-if="!$slots.title" #title>
      <DrawerHeader
        :is-detail="isDetail"
        :show-detail-back="showDetailBack"
        :title="getMergeProps.title"
        @close="onClose"
      >
        <template #titleToolbar>
          <slot name="titleToolbar"></slot>
        </template>
      </DrawerHeader>
    </template>
    <template v-else #title>
      <slot name="title"></slot>
    </template>

    <ScrollContainer
      v-loading="getLoading"
      :loading-tip="loadingText || '加载中...'"
      :style="getScrollContentStyle"
    >
      <slot></slot>
    </ScrollContainer>
    <DrawerFooter :height="getFooterHeight" v-bind="getProps" @close="onClose" @ok="handleOk">
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </DrawerFooter>
  </a-drawer>
</template>
<script lang="ts">
import ScrollContainer from '@/components/Container/src/ScrollContainer.vue'
import { useAttrs } from '@/hooks/core/useAttrs'
import { deepMerge } from '@/utils'
import { isFunction, isNumber } from 'lodash-es'
import type { CSSProperties } from 'vue'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  ref,
  toRaw,
  unref,
  watch
} from 'vue'
import DrawerFooter from './components/DrawerFooter.vue'
import DrawerHeader from './components/DrawerHeader.vue'
import { basicProps } from './props'
import type { DrawerInstance, DrawerProps } from './typing'

const prefixVar = 'rds-'
const prefixCls = 'rds-basic-drawer'

export default defineComponent({
  components: { ScrollContainer, DrawerFooter, DrawerHeader },
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'ok', 'close', 'register'],
  setup(props, { emit }) {
    const visibleRef = ref(false)
    const attrs = useAttrs()
    const propsRef = ref<Partial<Nullable<DrawerProps>>>(null)

    const drawerInstance: DrawerInstance = {
      setDrawerProps: setDrawerProps,
      emitVisible: undefined
    }

    const instance = getCurrentInstance()

    instance && emit('register', drawerInstance, instance.uid)

    const getMergeProps = computed((): DrawerProps => {
      return deepMerge(toRaw(props), unref(propsRef))
    })

    const getProps = computed((): DrawerProps => {
      const opt = {
        placement: 'right',
        ...unref(attrs),
        ...unref(getMergeProps),
        visible: unref(visibleRef)
      }
      opt.title = undefined
      const { isDetail, width, wrapClassName, getContainer } = opt
      if (isDetail) {
        if (!width) {
          opt.width = 'calc(100% - 180px)'
        }
        const detailCls = `${prefixCls}__detail`
        opt.class = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls

        if (!getContainer) {
          // TODO type error?
          opt.getContainer = `.${prefixVar}-layout-content` as any
        }
      }
      return opt as DrawerProps
    })

    const getBindValues = computed((): DrawerProps => {
      return {
        ...attrs,
        ...unref(getProps)
      }
    })

    // Custom implementation of the bottom button,
    const getFooterHeight = computed(() => {
      const { footerHeight, showFooter } = unref(getProps)
      if (showFooter && footerHeight) {
        return isNumber(footerHeight) ? `${footerHeight}px` : `${footerHeight.replace('px', '')}px`
      }
      return `0px`
    })

    const getScrollContentStyle = computed((): CSSProperties => {
      const footerHeight = unref(getFooterHeight)
      return {
        position: 'relative',
        height: `calc(100% - ${footerHeight})`
      }
    })

    const getLoading = computed(() => {
      return !!unref(getProps)?.loading
    })

    watch(
      () => props.visible,
      (newVal, oldVal) => {
        if (newVal !== oldVal) visibleRef.value = newVal
      },
      { deep: true }
    )

    watch(
      () => visibleRef.value,
      visible => {
        nextTick(() => {
          emit('visible-change', visible)
          instance && drawerInstance.emitVisible?.(visible, instance.uid)
        })
      }
    )

    // Cancel event
    async function onClose(e: Recordable) {
      const { closeFunc } = unref(getProps)
      emit('close', e)
      if (closeFunc && isFunction(closeFunc)) {
        const res = await closeFunc()
        visibleRef.value = !res
        return
      }
      visibleRef.value = false
    }

    function setDrawerProps(props: Partial<DrawerProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)

      if (Reflect.has(props, 'visible')) {
        visibleRef.value = !!props.visible
      }
    }

    function handleOk() {
      emit('ok')
    }

    return {
      onClose,
      prefixCls,
      getMergeProps: getMergeProps as any,
      getScrollContentStyle,
      getProps: getProps as any,
      getLoading,
      getBindValues,
      getFooterHeight,
      handleOk
    }
  }
})
</script>
<style lang="less">
@header-height: 60px;
@detail-header-height: 40px;
@prefix-cls: ~'rds-basic-drawer';
@prefix-cls-detail: ~'rds-basic-drawer__detail';

.@{prefix-cls} {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }

  .ant-drawer-close {
    &:hover {
      color: #ff4d4f;
    }
  }

  .ant-drawer-body {
    height: calc(100% - 56px);
    padding: 0;
    background-color: #fff;

    .scrollbar__wrap {
      padding: 16px !important;
      margin-bottom: 0 !important;
    }

    > .scrollbar > .scrollbar__bar.is-horizontal {
      display: none;
    }
  }
}

.@{prefix-cls-detail} {
  position: absolute;

  .ant-drawer-header {
    width: 100%;
    height: 40px;
    padding: 0;
    border-top: 1px solid #d9d9d9;
    box-sizing: border-box;
  }

  .ant-drawer-title {
    height: 100%;
  }

  .ant-drawer-close {
    height: 40px;
    line-height: 40px;
  }

  .scrollbar__wrap {
    padding: 0 !important;
  }

  .ant-drawer-body {
    height: calc(100% - 40px);
  }
}
</style>
