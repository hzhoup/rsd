<template>
  <DragModal v-bind="getBindValue" @cancel="handleCancel">
    <template v-if="!$slots.closeIcon" #closeIcon>
      <ModalClose
        :can-fullscreen="getProps.canFullscreen"
        :full-screen="fullScreenRef"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>

    <template v-if="!$slots.title" #title>
      <ModalHeader
        :help-message="getProps.helpMessage"
        :title="getMergeProps.title"
        @dblclick="handleTitleDbClick"
      />
    </template>

    <template v-if="!$slots.footer" #footer>
      <ModalFooter v-bind="getBindValue" @cancel="handleCancel" @ok="handleOk">
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </ModalFooter>
    </template>

    <ModalWrapper
      ref="modalWrapperRef"
      :footer-offset="wrapperFooterOffset"
      :full-screen="fullScreenRef"
      :height="getWrapperHeight"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :min-height="getProps.minHeight"
      :modal-footer-height="footer !== undefined && !footer ? 0 : undefined"
      :use-wrapper="getProps.useWrapper"
      :visible="visibleRef"
      v-bind="omit(getProps.wrapperProps, 'visible', 'height', 'modalFooterHeight')"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <slot></slot>
    </ModalWrapper>

    <template v-for="item in Object.keys(omit($slots, 'default'))" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </DragModal>
</template>

<script lang="ts">
import { deepMerge } from '@/utils'
import { isFunction, omit } from 'lodash-es'
import DragModal from './components/DragModal'
import ModalClose from './components/ModalClose.vue'
import ModalFooter from './components/ModalFooter.vue'
import ModalHeader from './components/ModalHeader.vue'
import ModalWrapper from './components/ModalWrapper.vue'
import { useFullScreen } from './hooks/useModalFullScreen'
import { basicProps } from './props'
import { ModalMethods, ModalProps } from './typing'

const prefixCls = 'rds-basic-modal'

export default defineComponent({
  name: 'BasicModal',
  components: { DragModal, ModalClose, ModalFooter, ModalHeader, ModalWrapper },
  inheritAttrs: false,
  props: basicProps,
  emits: ['register', 'visible-change', 'update:visible', 'cancel', 'ok', 'height-change'],
  setup(props, { emit, attrs }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)
    const modalWrapperRef = ref<any>(null)

    const extHeightRef = ref(0)
    const modalMethods: ModalMethods = {
      setModalProps,
      emitVisible: undefined,
      redoModalHeight: () => {
        nextTick(() => {
          if (unref(modalWrapperRef)) {
            unref(modalWrapperRef).setModalHeight()
          }
        })
      }
    }

    const instance = getCurrentInstance()
    if (instance) emit('register', modalMethods, instance.uid)

    const getMergeProps = computed<Recordable>(() => {
      return { ...props, ...(unref(propsRef) as any) }
    })

    const { handleFullScreen, getWrapClassName, fullScreenRef } = useFullScreen({
      modalWrapperRef,
      extHeightRef,
      wrapClassName: toRef(getMergeProps.value, 'wrapClassName')
    })

    const getProps = computed<Recordable>(() => {
      const opt = {
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        okButtonProps: undefined,
        cancelButtonProps: undefined,
        title: undefined
      }
      return {
        ...opt,
        wrapClassName: unref(getWrapClassName)
      }
    })

    // 构造 antd modal props
    const getBindValue = computed<Recordable>(() => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        visible: unref(visibleRef),
        wrapClassName: unref(getWrapClassName)
      }
      if (unref(fullScreenRef)) return omit(attr, ['height', 'title'])
      return omit(attr, 'title')
    })

    const getWrapperHeight = computed(() => {
      if (unref(fullScreenRef)) return undefined
      return unref(getProps).height
    })

    watchEffect(() => {
      visibleRef.value = !!props.visible
      fullScreenRef.value = !!props.defaultFullscreen
    })

    watch(
      () => unref(visibleRef),
      v => {
        emit('visible-change', v)
        emit('update:visible', v)
        instance && modalMethods.emitVisible?.(v, instance.uid)
        nextTick(() => {
          if (props.scrollTop && v && unref(modalWrapperRef)) unref(modalWrapperRef).scrollTop()
        })
      },
      { immediate: false }
    )

    // 取消事件
    async function handleCancel(e: Event) {
      e?.stopPropagation()
      // 过滤自定义关闭按钮的空白区域
      if ((e.target as HTMLElement)?.classList?.contains(prefixCls + '-close--custom')) return
      if (props.closeFunc && isFunction(props.closeFunc)) {
        const isClose: boolean = await props.closeFunc()
        visibleRef.value = !isClose
        return
      }
      visibleRef.value = false
      emit('cancel', e)
    }

    // 设置 modal 参数
    function setModalProps(props: Partial<ModalProps>): void {
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
      if (Reflect.has(props, 'visible')) visibleRef.value = !!props.visible
      if (Reflect.has(props, 'defaultFullscreen')) fullScreenRef.value = !!props.defaultFullscreen
    }

    function handleOk(e: Event) {
      emit('ok', e)
    }

    function handleHeightChange(height: string) {
      emit('height-change', height)
    }

    function handleExtHeight(height: number) {
      extHeightRef.value = height
    }

    function handleTitleDbClick(e) {
      if (!props.canFullscreen) return
      e.stopPropagation()
      handleFullScreen(e)
    }

    return {
      handleCancel,
      getBindValue,
      getProps,
      handleFullScreen,
      fullScreenRef,
      getMergeProps,
      handleOk,
      visibleRef,
      omit,
      modalWrapperRef,
      handleExtHeight,
      handleHeightChange,
      handleTitleDbClick,
      getWrapperHeight
    }
  }
})
</script>

<style lang="less">
@import 'index';
</style>
