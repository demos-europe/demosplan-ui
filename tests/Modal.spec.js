import { shallowMount } from '@vue/test-utils'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'
import DpModal from '@/components/DpModal/DpModal.vue'

describe('Modal', () => {
  it('should be an object', () => {
    expect(typeof DpModal).toBe('object')
  })

  it('should be named dp-modal', () => {
    expect(DpModal.name).toBe('DpModal')
  })

  it('should toggle the modal state', () => {
    window.dplan = () => { return {} }

    const instance = shallowMountWithGlobalMocks(DpModal, {
      propsData: {
        modalId: 'test'
      },
      slots: {
        default: '<div>Slot Content</div>'
      }
    })

    const modal = instance.vm

    modal.toggle('test')
    expect(modal.isOpenModal).toBe(true)
  })
})
