import { shallowMount } from '@vue/test-utils'
import DpAccordion from '~/components/DpAccordion/DpAccordion.vue'
import DpTransitionExpand from '~/components/DpTransitionExpand'

describe('DpAccordion', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpAccordion, {
      propsData: {
        dataCy: 'accordionToggle',
        fontWeight: 'bold',
        compressed: false,
        isOpen: false,
        title: 'Test Title'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with the correct title and default props', () => {
    expect(wrapper.find('button').text()).toContain('Test Title')
    expect(wrapper.find('button').classes()).toContain('weight--bold')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('button').attributes('data-cy')).toContain('accordionToggle')
  })

  it('toggles the accordion visibility when the button is clicked', async () => {
    expect(wrapper.vm.isVisible).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })

  it('emits an event when the accordion is toggled', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('item:toggle')).toBeTruthy()
    expect(wrapper.emitted('item:toggle')[0]).toEqual([true])
  })

  it('renders the slot content when the accordion is expanded', async () => {
    await wrapper.setProps({ isOpen: true })
    expect(wrapper.findComponent(DpTransitionExpand).isVisible()).toBe(true)
  })

  it('applies the correct font weight class based on the prop', async () => {
    await wrapper.setProps({ fontWeight: 'normal' })
    expect(wrapper.find('button').classes()).toContain('weight--normal')
  })

  it('applies the correct font size class based on the compressed prop', async () => {
    await wrapper.setProps({ compressed: true })
    expect(wrapper.find('span').classes()).toContain('font-size-medium')
  })
})
