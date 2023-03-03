<script lang="tsx">
import { CollapseTransition } from '@/components/Transition'
import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { triggerWindowResize } from '@/utils/event'
import { Skeleton } from 'ant-design-vue'
import { isNil } from 'lodash-es'
import { defineComponent, type ExtractPropTypes, type PropType, ref, unref } from 'vue'
import CollapseHeader from './CollapseHeader.vue'

const collapseContainerProps = {
  title: { type: String, default: '' },
  loading: { type: Boolean },
  canExpan: { type: Boolean, default: true },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: ''
  },
  triggerWindowResize: { type: Boolean },
  lazyTime: { type: Number, default: 0 }
}

export type CollapseContainerProps = ExtractPropTypes<typeof collapseContainerProps>

const prefixCls = 'rds-collapse-container'

export default defineComponent({
  name: 'CollapseContainer',

  props: collapseContainerProps,

  setup(props, { expose, slots }) {
    const show = ref(true)

    const handleExpand = (val: boolean) => {
      show.value = isNil(val) ? !show.value : val
      if (props.triggerWindowResize) {
        useTimeoutFn(triggerWindowResize, 200)
      }
    }

    expose({ handleExpand })

    return () => (
      <div class={unref(prefixCls)}>
        <CollapseHeader
          {...props}
          prefixCls={unref(prefixCls)}
          onExpand={handleExpand}
          show={show.value}
          v-slots={{
            title: slots.title,
            action: slots.action
          }}
        />

        <div class='p-2'>
          <CollapseTransition enable={props.canExpan}>
            {props.loading ? (
              <Skeleton active={props.loading} />
            ) : (
              <div class={`${prefixCls}__body`} v-show={show.value}>
                {slots.default?.()}
              </div>
            )}
          </CollapseTransition>
        </div>

        {slots.footer && <div class={`${prefixCls}__footer`}>{slots.footer()}</div>}
      </div>
    )
  }
})
</script>

<style lang="less">
@prefix-cls: ~'rds-collapse-container';

.@{prefix-cls} {
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;

  &__header {
    display: flex;
    height: 32px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
  }

  &__footer {
    border-top: 1px solid #d9d9d9;
  }

  &__action {
    display: flex;
    text-align: right;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
