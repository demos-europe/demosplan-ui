import DpContextualHelp from '~/components/DpContextualHelp/DpContextualHelp.vue'

describe('DpContextualHelp', () => {
  it('should be an object', () => {
    expect(typeof DpContextualHelp).toBe('object')
  })

  it('should be named DpContextualHelp', () => {
    expect(DpContextualHelp.name).toBe('DpContextualHelp')
  })
})
