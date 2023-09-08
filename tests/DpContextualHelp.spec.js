import DpContextualHelp from '~/components/DpContextualHelp/DpContextualHelp.vue'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'

describe('DpContextualHelp', () => {
  it('should be an object', () => {
    expect(typeof DpContextualHelp).toBe('object')
  })

  it('should be named DpContextualHelp', () => {
    expect(DpContextualHelp.name).toBe('DpContextualHelp')
  })

  it('should render the correct html', async () => {

    const instance = shallowMountWithGlobalMocks(DpContextualHelp, {
      propsData: {
        text: 'This is the tooltip content.'
      }
    })

    expect(instance.html()).toMatchSnapshot()
  })
})
