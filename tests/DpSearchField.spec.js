import { afterEach, beforeEach, expect, it } from '@jest/globals'
import DpButton from '~/components/DpButton'
import DpSearchField from '~/components/DpSearchField'
import { mount } from '@vue/test-utils'

describe('DpSearchField', () => {
  let wrapper
  const mocks = {
    Translator: {
      trans: jest.fn(key => key)
    }
  }

  beforeEach(() => {
    wrapper = mount(DpSearchField, {
      components: {
        DpButton
      },
      mocks,
      stubs: {
        DpResettableInput: true
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('emits a search event with the search term when search button is clicked and search term is changed', async() => {
    wrapper.setData({ searchTerm: 'test search' })
    await wrapper.find('[data-cy="handleSearch"]').trigger('click')

    expect(wrapper.emitted().search[0]).toEqual(['test search'])
  })

  it('does not emit a search event when search button is clicked and search term is unchanged', async () => {
    wrapper.setData({ searchTerm: 'test search' })
    wrapper.setData({ searchTermApplied: 'test search' })
    await wrapper.find('[data-cy="handleSearch"]').trigger('click')

    expect(wrapper.emitted().search).toBeUndefined()
  })

  it('emits a reset event when search field is reset', async() => {
    wrapper.setData({ searchTerm: 'test search' })
    wrapper.setData({ searchTermApplied: 'test search' })
    await wrapper.vm.handleReset()

    expect(wrapper.emitted().reset[0]).toBeDefined()
  })

  it('does not emit a reset event when search field is reset but no search term has been entered', async() => {
    await wrapper.vm.handleReset()

    expect(wrapper.emitted().reset).toBeUndefined()
  })
})
