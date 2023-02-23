<template>
  <section
    v-show="loading"
    :class="{ absolute }"
    :style="[background ? `background-color: ${background}` : '']"
    class="full-loading"
  >
    <Spin :size="size" :spinning="loading" :tip="tip" v-bind="$attrs" />
  </section>
</template>
<script lang="ts">
import { Spin } from 'ant-design-vue'
import type { SpinSize } from 'ant-design-vue/es/spin/Spin'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Loading',
  components: { Spin },
  props: {
    tip: {
      type: String as PropType<string>,
      default: ''
    },
    size: {
      type: String as PropType<SpinSize>,
      default: 'default',
      validator: (v: SpinSize): boolean => {
        return ['default', 'small', 'large'].includes(v)
      }
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    background: {
      type: String as PropType<string>,
      default: 'none'
    }
  }
})
</script>
<style lang="less" scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgb(240 242 245 / 40%);

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }
}
</style>
