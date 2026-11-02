import { describe, expect, it, vi } from 'vitest'
import DpButtonRow from '~/components/DpButtonRow'
import DpCheckbox from '~/components/DpCheckbox'
import DpConfirmDialog from '~/components/DpConfirmDialog'
import { mount } from '@vue/test-utils'

// The native dialog element is not supported by jsdom
const DpModalStub = {
  name: 'DpModal',
  template: '<div><slot name="header" /><slot /></div>',
  methods: {
    toggle: vi.fn(),
  },
}

const mountDialog = (props = {}) => mount(DpConfirmDialog, {
  props,
  global: {
    stubs: {
      DpModal: DpModalStub,
    },
  },
})

describe('DpConfirmDialog', () => {
  describe('checkbox', () => {
    it('is not shown without checkboxText', () => {
      const wrapper = mountDialog()

      expect(wrapper.findComponent(DpCheckbox).exists()).toBe(false)
      expect(wrapper.findComponent(DpButtonRow).props('disabled')).toEqual({ primary: false })
    })

    it('disables the confirm button until it is checked', async () => {
      const wrapper = mountDialog({ checkboxText: 'I understand' })

      expect(wrapper.findComponent(DpButtonRow).props('disabled')).toEqual({ primary: true })

      await wrapper.findComponent(DpCheckbox).vm.$emit('change', true)

      expect(wrapper.findComponent(DpButtonRow).props('disabled')).toEqual({ primary: false })
    })

    it('is unchecked again when the dialog is opened', async () => {
      const wrapper = mountDialog({ checkboxText: 'I understand' })
      await wrapper.findComponent(DpCheckbox).vm.$emit('change', true)

      wrapper.vm.open()
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(DpCheckbox).props('checked')).toBe(false)
      expect(wrapper.findComponent(DpButtonRow).props('disabled')).toEqual({ primary: true })
    })
  })

  describe('message', () => {
    it('is shown as text by default', () => {
      const wrapper = mountDialog({ message: '<strong>Bold</strong>' })

      expect(wrapper.find('#dialogDescription').text()).toBe('<strong>Bold</strong>')
    })

    it('is shown as sanitized HTML with allowHtml', () => {
      const wrapper = mountDialog({
        allowHtml: true,
        message: '<strong>Bold</strong><img src="x" onerror="alert(1)">',
      })
      const description = wrapper.find('#dialogDescription')

      expect(description.find('strong').text()).toBe('Bold')
      expect(description.html()).not.toContain('onerror')
    })
  })
})
