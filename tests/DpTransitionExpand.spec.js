import { shallowMount } from '@vue/test-utils'
import DpTransitionExpand from '~/components/DpTransitionExpand/DpTransitionExpand.vue'

// Mock requestAnimationFrame with a small delay
global.requestAnimationFrame = (cb) => setTimeout(cb, 0)


describe('DpTransitionExpand', () => {
  let wrapper
  let element

  beforeEach(() => {
    // Mock getComputedStyle to return specific values for Testing
    window.getComputedStyle = jest.fn().mockImplementation((el) => {
      return {
        width: '100px',
        height: '100px',
        position: el.style.position || '',
        visibility: el.style.visibility || ''
      }
    })

    wrapper = shallowMount(DpTransitionExpand, {
      slots: {
        default: '<div class="test-content">Test Content</div>'
      }
    })
    element = wrapper.find('.test-content').element
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Render the slot content', () => {
    expect(wrapper.html()).toContain('<div class="test-content">Test Content</div>')
  })

  it('Sets height to auto after entering', async () => {
    const data = wrapper.vm.$options.render.call(wrapper.vm)
    data.props.onAfterEnter(element)
    await wrapper.vm.$nextTick()
    expect(element.style.height).toBe('auto')
  })

  it('Applies correct styles on enter', async () => {
    const data = wrapper.vm.$options.render.call(wrapper.vm)
    data.props.onEnter(element)

    console.log(wrapper.html())
    console.log(element)

    await wrapper.vm.$nextTick()

    // Check immediately after calling onEnter
    expect(element.style.height).toBe('0px')
    expect(element.style.visibility).toBe('hidden')
    expect(element.style.position).toBe('absolute')

    // Wait for the next animation frame to give the DOM a chance to update.
    await new Promise(resolve => requestAnimationFrame(resolve))

    // Re-check to see if the style has been reset, which is expected in this implementation
    expect(element.style.position).toBe(null)
  })

  it('Applies correct styles on leave', () => {
    element.style.height = '100px' // Set initial height to test transition
    const data = wrapper.vm.$options.render.call(wrapper.vm)
    data.props.onLeave(element)

    expect(element.style.height).toBe('100px') // Initial height before transition

    // Simulate the requestAnimationFrame call
    requestAnimationFrame(() => {
      expect(element.style.height).toBe('0px')
    })
  })
})
