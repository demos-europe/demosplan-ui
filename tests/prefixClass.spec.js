import { prefixClass } from '../src/utils'

window.dplan = {
  settings: {
    publicCSSClassPrefix: 'dp-',
  },
}

describe('prefixClass', () => {
  it('should return a list of classes prefixed', () => {
    expect(prefixClass('test foo bar')).toEqual('dp-test dp-foo dp-bar')
  })

  it('should return a quereyselector with prefixed classes', () => {
    expect(prefixClass('#test .foo .bar')).toEqual('#test .dp-foo .dp-bar')
    expect(prefixClass('[data-some-stuff="its all right"] > .a-class > label')).toEqual('[data-some-stuff="its all right"] > .dp-a-class > label')
  })

  it('should return the same string if there are no points at the beginning of a word', () => {
    expect(prefixClass('[data-some-stuff="its all right"] > a:hover > label')).toEqual('[data-some-stuff="its all right"] > a:hover > label')
  })

  it('should prefix Tailwind utilities that contain arbitrary values or fractional spacing', () => {
    expect(prefixClass('c-notify__icon shrink-0 mt-[2px]')).toEqual('dp-c-notify__icon dp-shrink-0 dp-mt-[2px]')
    expect(prefixClass('grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4')).toEqual('dp-grid dp-grid-cols-[repeat(auto-fit,minmax(300px,1fr))] dp-gap-4')
    expect(prefixClass('font-[700] mb-2')).toEqual('dp-font-[700] dp-mb-2')
    expect(prefixClass('mb-0.5 text-muted')).toEqual('dp-mb-0.5 dp-text-muted')
  })

  it('should treat compound selectors with a type selector as querySelectors', () => {
    expect(prefixClass('div.foo')).toEqual('div.dp-foo')
    expect(prefixClass('div#main')).toEqual('div#main')
    expect(prefixClass('a[href]')).toEqual('a[href]')
    expect(prefixClass('td.bar > .baz')).toEqual('td.dp-bar > .dp-baz')
  })
})
