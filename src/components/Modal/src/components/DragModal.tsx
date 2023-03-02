import { useAttrs } from '@/hooks/core/useAttrs'
import { extendSlots } from '@/utils/common/tsxHelper'
import { Modal } from 'ant-design-vue'
import { defineComponent, toRefs, unref } from 'vue'
import { useModalDragMove } from '../hooks/useModalDrag'
import { basicProps } from '../props'

export default defineComponent({
  name: 'DragModal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable
    })

    const onCancel = (e: Event) => {
      emit('cancel', e)
    }

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>
    }
  }
})
