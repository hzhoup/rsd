import { Input, Select } from 'ant-design-vue'
import 'ant-design-vue/es/select/style/css'
import VXETable from 'vxe-table'

VXETable.renderer.add('AntInput', {
  renderItemContent(renderOpts, params) {
    const { data, field } = params
    const props = renderOpts.props || {}
    return <Input style='width: 100%' v-model:value={data[field]} {...props} />
  }
})

VXETable.renderer.add('AntSelect', {
  renderItemContent(renderOpts, params) {
    const { data, field } = params
    const props = renderOpts.props || {}
    return <Select style='width: 100%' v-model:value={data[field]} {...props} />
  }
})
