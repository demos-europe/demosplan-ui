import DpModal from '~/components/DpModal'
import shallowMountWithGlobalMocks from '../jest/shallowMountWithGlobalMocks'

describe('Modal', () => {
  beforeEach(() => {
    window.dplan = () => { return {} }

    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.open = true
    })

    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.open = false
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should open the modal when toggling a closed modal', () => {
    const instance = shallowMountWithGlobalMocks(DpModal, {
      slots: {
        default: '<div>Slot Content</div>',
      },
    })

    const modal = instance.vm

    modal.toggle()

    expect(modal.$refs.dialog.showModal).toHaveBeenCalled()
  })


  it('should start closing the modal when toggling an open modal', () => {
    const instance = shallowMountWithGlobalMocks(DpModal, {
      slots: {
        default: '<div>Slot Content</div>',
      },
    })

    const modal = instance.vm
    modal.$refs.dialog.open = true

    modal.toggle()

    expect(modal.isClosing).toBe(true)
    expect(modal.$refs.dialog.classList.contains('o-modal--closing')).toBe(true)
  })

  it('should emit modal:toggled when opening', () => {
    const instance = shallowMountWithGlobalMocks(DpModal)

    instance.vm.open()

    expect(instance.emitted('modal:toggled')).toEqual([[true]])
  })

  it('should start the closing animation when closing', () => {
    const instance = shallowMountWithGlobalMocks(DpModal)

    instance.vm.close()

    expect(instance.vm.isClosing).toBe(true)
    expect(instance.vm.$refs.dialog.classList.contains('o-modal--closing')).toBe(true)
  })

  it('should not start another closing animation when already closing', () => {
    const instance = shallowMountWithGlobalMocks(DpModal)

    instance.vm.close()
    instance.vm.close()

    expect(instance.vm.$refs.dialog.close).not.toHaveBeenCalled()
  })

  it('should close when clicking on the backdrop', () => {
    const instance = shallowMountWithGlobalMocks(DpModal)
    const modal = instance.vm
    const closeSpy = vi.spyOn(modal, 'close')

    modal.onBackdropClick({ target: modal.$refs.dialog })

    expect(closeSpy).toHaveBeenCalled()
  })

  it('should not close when clicking inside the dialog', () => {
    const instance = shallowMountWithGlobalMocks(DpModal)
    const modal = instance.vm
    const closeSpy = vi.spyOn(modal, 'close')

    const child = document.createElement('div')

    modal.onBackdropClick({ target: child })

    expect(closeSpy).not.toHaveBeenCalled()
  })

  it('should update the content height when smooth transition is enabled', async () => {
    const instance = shallowMountWithGlobalMocks(DpModal, {
      props: {
        enableSmoothHeightTransition: true,
      },
      slots: {
        default: '<div>Slot Content</div>',
      },
    })

    Object.defineProperty(instance.vm.$refs.bodyContent, 'scrollHeight', {
      configurable: true,
      value: 250,
    })

    instance.vm.updateContentHeight()
    await instance.vm.$nextTick()

    expect(instance.vm.contentHeight).toBe(250)
  })
})
