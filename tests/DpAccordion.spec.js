import DpAccordion from '~/components/DpAccordion/DpAccordion.vue'
import DpTransitionExpand from '~/components/DpTransitionExpand'
import { shallowMount } from '@vue/test-utils'

describe('DpAccordion', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DpAccordion, {
      props: {
        dataCy: 'accordionToggle',
        fontWeight: 'bold',
        compressed: false,
        isOpen: false,
        title: 'Test Title',
      },
    })
  })

  it('the component is mounted', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the title passed in as a prop', () => {
    expect(wrapper.find('button').text()).toContain('Test Title')
  })

  it('displays the title as "bold" if "fontWeight" is set to "bold"', () => {
    expect(wrapper.find('[data-cy="accordion:title"]').classes()).toContain('weight--bold')
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
    expect(wrapper.find('[data-cy="accordion:title"]').classes()).toContain('text-base')
  })

  /*
   * The prefix must stay outside of the toggle button, otherwise interactive slot content
   * ends up nested within a button, which is invalid and swallows its own clicks.
   */
  it('renders "titlePrefix" content next to the toggle button, not inside it', () => {
    const wrapperWithPrefix = shallowMount(DpAccordion, {
      props: { title: 'Test Title' },
      slots: { titlePrefix: '<input id="prefix" type="checkbox">' },
    })

    expect(wrapperWithPrefix.find('#prefix').exists()).toBe(true)
    expect(wrapperWithPrefix.find('button #prefix').exists()).toBe(false)
  })

  /*
   * The trigger classes sit on the row around the button, so that inset spacing and the
   * highlight cover the titlePrefix slot as well.
   */
  it('adds inset trigger spacing if "padded" is set to true', async () => {
    await wrapper.setProps({ padded: true })
    expect(wrapper.find('[data-cy="accordion:trigger"]').classes()).toContain('py-2')
    expect(wrapper.find('[data-cy="accordion:trigger"]').classes()).toContain('pr-2')
    expect(wrapper.find('[data-cy="accordion:trigger"]').classes()).toContain('pl-1.5')
  })

  it('highlights the trigger if "highlightToggledTrigger" is true and accordion is open', async () => {
    await wrapper.setProps({
      highlightToggledTrigger: true,
      isOpen: true,
    })
    expect(wrapper.find('[data-cy="accordion:trigger"]').classes()).toContain('bg-surface-light')
  })

  it('does not render the status dot by default', () => {
    expect(wrapper.find('[data-cy="accordion:statusDot"]').exists()).toBe(false)
  })

  it('renders the status dot if "showStatusDot" is true', async () => {
    await wrapper.setProps({ showStatusDot: true })
    expect(wrapper.find('[data-cy="accordion:statusDot"]').exists()).toBe(true)
  })

  it('renders the status dot label for screen readers if "statusDotLabel" is set', async () => {
    await wrapper.setProps({ showStatusDot: true, statusDotLabel: 'Unsaved changes' })
    const label = wrapper.find('.sr-only')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Unsaved changes')
  })

  it('does not render the status dot label if "statusDotLabel" is empty', async () => {
    await wrapper.setProps({ showStatusDot: true })
    expect(wrapper.find('.sr-only').exists()).toBe(false)
  })
})
