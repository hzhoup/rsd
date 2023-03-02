<script lang="tsx">
import BasicTitle from '@/components/Application/BasicTitle.vue'
import { computed, defineComponent, type ExtractPropTypes, unref } from 'vue'

const collapseHeaderProps = {
  prefixCls: String,
  title: String,
  show: Boolean,
  canExpan: Boolean,
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: ''
  }
}

export type CollapseHeaderProps = ExtractPropTypes<typeof collapseHeaderProps>

const prefixCls = 'rds-collapse-container'

export default defineComponent({
  name: 'CollapseHeader',
  inheritAttrs: false,
  props: collapseHeaderProps,
  emits: ['expand'],
  setup(props, { slots, attrs, emit }) {
    const _prefixCls = computed(() => props.prefixCls || unref(prefixCls))
    return () => (
      <div class={[`${unref(_prefixCls)}__header px-2 py-5`, attrs.class]}>
        <BasicTitle helpMessage={props.helpMessage} normal>
          {slots.title?.() || props.title}
        </BasicTitle>

        <div class={`${unref(_prefixCls)}__action`}>
          {slots.action ? slots.action() : null}
          {props.canExpan && <BasicArrow up expand={props.show} onClick={() => emit('expand')} />}
        </div>
      </div>
    )
  }
})
</script>
