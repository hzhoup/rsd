const validColors = ['error', 'warning', 'success', ''] as const
type ButtonColorType = (typeof validColors)[number]

export const buttonProps = {
  color: {
    type: String as PropType<ButtonColorType>,
    validator: v => validColors.includes(v),
    default: ''
  },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  onClick: { type: Function as PropType<(...args) => any>, default: null }
}
