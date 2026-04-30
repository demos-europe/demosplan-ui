import DpIcon from '~/components/DpIcon/DpIcon.vue'
import { shallowMount } from '@vue/test-utils'

describe('DpIcon', () => {
  it.each([
    ['small', '16'],
    ['medium', '20'],
    ['large', '24'],
    ['xlarge', '32'],
  ])('maps size "%s" to %s pixels', (size, expected) => {
    const wrapper = shallowMount(DpIcon, {
      props: { icon: 'check', size },
    })
    expect(wrapper.attributes('size')).toBe(expected)
  })

  it.each(['light', 'regular', 'bold', 'fill'])(
    'sets weight attribute to "%s"',
    (weight) => {
      const wrapper = shallowMount(DpIcon, {
        props: { icon: 'check', weight },
      })
      expect(wrapper.attributes('weight')).toBe(weight)
    })

  it.each([
    ['arrow-up', 'portrait'],
    ['check', 'landscape'],
    ['plus', 'square'],
  ])('applies proportion class "%s" for icon "%s"', (icon, proportionClass) => {
    const wrapper = shallowMount(DpIcon, {
      props: { icon },
    })
    expect(wrapper.classes()).toContain(proportionClass)
  })

  it('uses default size "medium" (20px) and weight "regular" when no props are given', () => {
    const wrapper = shallowMount(DpIcon, {
      props: { icon: 'check' },
    })
    expect(wrapper.attributes('size')).toBe('20')
    expect(wrapper.attributes('weight')).toBe('regular')
  })
})
