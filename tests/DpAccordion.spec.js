import { shallowMount } from '@vue/test-utils'
import DpAccordion from '~/components/DpAccordion/DpAccordion.vue'
import DpTransitionExpand from '~/components/DpTransitionExpand'

describe('DpAccordion', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpAccordion, {
      props: {
        dataCy: 'accordionToggle',
        fontWeight: 'bold',
        compressed: false,
        isOpen: false,
        title: 'Test Title'
      }
    })
  })

  it('the component is mounted', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the title passed in as a prop', () => {
    expect(wrapper.find('button').text()).toContain('Test Title')
  })

  it('displays the title as "bold" if "fontWeight" is set to "bold"', () => {
    expect(wrapper.find('button').classes()).toContain('weight--bold')
  })

  it('sets "aria-expanded" to false if "isOpen" is false', () => {
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')
  })

  it('renders the given data-cy attribute', () => {
    expect(wrapper.find('button').attributes('data-cy')).toContain('accordionToggle')
  })

  it('toggles the accordion visibility when the button is clicked', async () => {
    expect(wrapper.vm.isVisible).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.isVisible).toBe(true)
  })

  it('sets aria-expanded to true when the accordion button is clicked', async () => {
    expect(wrapper.find('button').attributes('aria-expanded')).toBeTruthy()
  })

  it('emits the "item:toggle" event with correct payload when the accordion is toggled', async () => {
    await wrapper.find('button').trigger('click')
    const isVisible = wrapper.vm.isVisible
    expect(wrapper.emitted('item:toggle')).toBeTruthy()
    expect(wrapper.emitted('item:toggle')[0]).toEqual([isVisible])
  })

  it('renders the slot content when the accordion is expanded', async () => {
    await wrapper.setProps({ isOpen: true })
    expect(wrapper.findComponent(DpTransitionExpand).isVisible()).toBe(true)
  })

  it('displays a reduced font size if "compressed" is set to "true"', async () => {
    await wrapper.setProps({ compressed: true })
    expect(wrapper.find('span').classes()).toContain('font-size-medium')
  })
})
