import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpIcon', () => {
  it.each(['check', 'close', 'edit'])(
    'renders correct icon for icon "%s"',
    (icon) => {
      const wrapper = shallowMount(DpIcon, {
        props: { icon },
      })
      expect(wrapper.props('icon')).toBe(icon)
    })

  it.each(['light', 'regular', 'bold', 'fill'])(
    'renders icon with weight "%s"',
    (weight) => {
      const wrapper = shallowMount(DpIcon, {
        props: { icon: 'check', weight },
      })
      expect(wrapper.props('weight')).toBe(weight)
    })

  it.each(['small', 'medium', 'large', 'xlarge'])(
    'renders icon with size "%s"',
    (size) => {
      const wrapper = shallowMount(DpIcon, {
        props: { icon: 'check', size },
      })
      expect(wrapper.props('size')).toBe(size)
    })
})
