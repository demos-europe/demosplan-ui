import DpModal from '~/components/DpModal'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'

describe('Modal', () => {
  it('should be an object', () => {
    expect(typeof DpModal).toBe('object')
  })

  it('should be named dp-modal', () => {
    expect(DpModal.name).toBe('DpModal')
  })

  it('should toggle the modal state', () => {
    window.dplan = () => { return {} }

    // Mock dialog element methods
    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      this.open = true
    })
    HTMLDialogElement.prototype.close = jest.fn(function () {
      this.open = false
    })

    const instance = shallowMountWithGlobalMocks(DpModal, {
      props: {
        modalId: 'test',
      },
      slots: {
        default: '<div>Slot Content</div>',
      },
    })

    const modal = instance.vm

    modal.toggle('test')
    expect(modal.$refs.dialog.showModal).toHaveBeenCalled()
  })
})
