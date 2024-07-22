import { shallowMount } from '@vue/test-utils'
import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { ICONS, SIZES } from '~/components/DpIcon/util/iconVariables'

describe('DpIcon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpIcon, {
      props: {
        icon: 'check',
        size: 'medium'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly with given props', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().icon).toBe('check')
    expect(wrapper.props().size).toBe('medium')
  })

  it('computes pxSize correctly based on size prop', () => {
    expect(wrapper.vm.pxSize).toBe(SIZES.medium)
  })

  it('displays warning icon when provided icon is not supported or non-existent icon name', async () => {
    await wrapper.setProps({ icon: 'unsupported-icon' })
    expect(wrapper.vm.path).toBe(ICONS.warning.path)
  })

  it('applies correct SVG attributes', () => {
    const svg = wrapper.find('svg')
    expect(svg.attributes('class')).toContain('c-icon')
    expect(svg.attributes('class')).toContain(ICONS.check.proportions || 'square')
    expect(svg.attributes('height')).toBe(SIZES.medium.toString())
    expect(svg.attributes('width')).toBe(SIZES.medium.toString())
    expect(svg.attributes('viewBox')).toBe('0 0 256 256')
  })

  it('renders path element with correct "d" attribute', () => {
    const path = wrapper.find('path')
    expect(path.attributes('d')).toBe(ICONS.check.path)
  })
})
