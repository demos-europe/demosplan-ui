import DpProgressBar from '~/components/DpProgressBar'
import { shallowMount } from '@vue/test-utils'

describe('DpProgressBar', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    return shallowMount(DpProgressBar, {
      props: {
        ...props,
      },
    })
  }

  const getProgressLine = () => {
    return wrapper.find('.c-progress-bar__line')
  }

  const expectProgressWidth = (expectedWidth) => {
    const progressLine = getProgressLine()
    expect(progressLine.attributes('style')).toContain(`width: ${expectedWidth}%`)
  }

  const expectAnimatedClass = (shouldHaveClass) => {
    const hasClass = getProgressLine().classes().includes('is-animated')
    expect(hasClass).toBe(shouldHaveClass)
  }

  const expectTextContent = (text) => {
    expect(wrapper.text()).toContain(text)
  }

  const expectTextNotToContain = (text) => {
    expect(wrapper.text()).not.toContain(text)
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders label when provided', () => {
      wrapper = createWrapper({ label: 'Loading...' })

      expectTextContent('Loading...')
    })
  })

  describe('Indeterminate mode', () => {
    it('renders with animated class', () => {
      wrapper = createWrapper({ indeterminate: true })

      expectAnimatedClass(true)
    })

    it('renders label in indeterminate mode', () => {
      wrapper = createWrapper({
        indeterminate: true,
        label: 'Processing',
      })

      expectTextContent('Processing')
    })

    it('does not render percentage in indeterminate mode', () => {
      wrapper = createWrapper({
        indeterminate: true,
        percentage: 50,
        showPercentage: true,
      })

      expectTextNotToContain('%')
    })
  })

  describe('Determinate mode', () => {
    it('renders progress bar with correct width', () => {
      wrapper = createWrapper({ percentage: 45 })

      expectProgressWidth(45)
    })

    it('renders without animated class', () => {
      wrapper = createWrapper({ percentage: 45 })

      expectAnimatedClass(false)
    })

    it('shows percentage when showPercentage is true', () => {
      wrapper = createWrapper({
        percentage: 80,
        showPercentage: true,
      })

      expectTextContent('80%')
    })

    it('hides percentage when showPercentage is false', () => {
      wrapper = createWrapper({
        percentage: 80,
        showPercentage: false,
      })

      expectTextNotToContain('80%')
    })
  })

  describe('Default props', () => {
    it('uses 0% as default width', () => {
      wrapper = createWrapper()

      expectProgressWidth(0)
    })

    it('uses non-indeterminate mode by default', () => {
      wrapper = createWrapper()

      expectAnimatedClass(false)
    })
  })
})

