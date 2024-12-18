import { DpUploadFiles } from '~/components/DpUploadFiles'
import { shallowMount } from '@vue/test-utils'


describe.skip('DpUploadFiles', () => {
  it('should be an object', () => {
    expect(typeof DpUploadFiles).toBe('object')
  })

  it('should be named DpUploadedFiles', () => {
    expect(DpUploadFiles.name).toBe('DpUploadFiles')
  })

  it('should update Files-list after adding a file', () => {
    const File = {
      hash: 'xxx-qqq-sss'
    }

    const instance = shallowMountWith(DpUploadFiles, {
      props: {
        allowedFileTypes: 'pdf'
      }
    })

    const comp = instance.vm
    comp.addFile(File)
    expect(comp.uploadedFiles.length).toBe(1)
    expect(comp.uploadedFiles[0].hash).toBe(File.hash)
    expect(comp.fileHashes.length).toBe(0)
  })

  it('should update filterhash-list if we need a hidden input', () => {
    const File = {
      hash: 'xxx-qqq-sss'
    }

    const instance = shallowMount(DpUploadFiles, {
      props: {
        allowedFileTypes: 'pdf',
        needsHiddenInput: true
      }
    })

    const comp = instance.vm
    comp.addFile(File)
    expect(comp.uploadedFiles.length).toBe(1)
    expect(comp.uploadedFiles[0].hash).toBe(File.hash)
    expect(comp.fileHashes.length).toBe(1)
    expect(comp.fileHashes[0]).toBe(File.hash)
  })

  it('should reset the files and filehash-list after calling the clear-list method', () => {
    const File = {
      hash: 'xxx-qqq-sss'
    }

    const File2 = {
      hash: 'yyy-qqq-sss'
    }

    const instance = shallowMount(DpUploadFiles, {
      props: {
        allowedFileTypes: 'pdf',
        needsHiddenInput: true
      }
    })

    const comp = instance.vm
    comp.addFile(File)
    comp.addFile(File2)

    comp.clearFilesList()
    expect(comp.uploadedFiles.length).toBe(0)
    expect(comp.fileHashes.length).toBe(0)
  })
})
