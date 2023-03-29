/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

import { createLocalVue, shallowMount } from '@vue/test-utils'
import DpModal from '../components/core/DpModal'

describe('Modal', () => {
  it('should be an object', () => {
    expect(typeof DpModal).toBe('object')
  })

  it('should be named dp-modal', () => {
    expect(DpModal.name).toBe('DpModal')
  })

  it('should toggle the modal state', () => {
    const localVue = createLocalVue()
    window.dplan = () => { return {} }

    const instance = shallowMount(DpModal, {
      propsData: {
        modalId: 'test'
      },
      slots: {
        default: '<div>Slot Content</div>'
      },
      localVue: localVue
    })

    const modal = instance.vm

    modal.toggle('test')
    expect(modal.isOpenModal).toBe(true)
  })
})
