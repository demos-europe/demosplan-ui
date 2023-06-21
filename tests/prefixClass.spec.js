import { prefixClass } from '@/utils'

window.dplan = {
  settings: {
    publicCSSClassPrefix: 'dp-'
  }
}

describe('prefixClass', () => {
  it('should return a list of classes prefixed', () => {
    expect(prefixClass('test foo bar')).toEqual('dp-test dp-foo dp-bar')
  })

  it('should return a query selector with prefixed classes', () => {
    expect(prefixClass('#test .foo .bar')).toEqual('#test .dp-foo .dp-bar')
    expect(prefixClass('[data-some-stuff="its all right"] > .a-class > label')).toEqual('[data-some-stuff="its all right"] > .dp-a-class > label')
  })

  it('should return the same string if there are no points at the beginning of a word', () => {
    expect(prefixClass('[data-some-stuff="its all right"] > a:hover > label')).toEqual('[data-some-stuff="its all right"] > a:hover > label')
  })
})
