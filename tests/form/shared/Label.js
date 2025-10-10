const runLabelTests = (wrapper) => describe('ComponentWithLabel', () => {
  it('displays a label if label is defined', async () => {
    const label  = {
      text: 'someLabel',
    }
    await wrapper.setProps({ label: label })
    const labelStub = wrapper.find('dp-label-stub')
    expect(labelStub.exists()).toBe(true)
    expect(labelStub.attributes('text')).toBe(label.text)
  })

  it('does not display a label if label is not defined', async () => {
    const label = {
      text: '',
    }
    await wrapper.setProps({ label: label })

    const labelStub = wrapper.find('dp-label-stub')
    expect(labelStub.exists()).toBe(false)
  })
})

export { runLabelTests }
