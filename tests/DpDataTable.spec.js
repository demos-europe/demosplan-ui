import DpDataTable from '~/components/DpDataTable/DpDataTable.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

const headerFields = [
  { field: 'a', label: 'A' },
  { field: 'b', label: 'B' },
]
const items = [{ id: '1', a: 'a1', b: 'b1' }]

const mountTable = async (props = {}) => {
  const wrapper = mount(DpDataTable, {
    global: {
      directives: { tooltip: {} },
    },
    props: {
      hasFlyout: true,
      headerFields,
      isExpandable: true,
      items,
      trackBy: 'id',
      ...props,
    },
    slots: {
      expandedContent: '<p class="expanded-test-content">Details</p>',
      flyout: '<span class="flyout-test-content">Flyout</span>',
    },
  })

  wrapper.vm.toggleExpand('1')
  await nextTick()

  return wrapper
}

describe('DpDataTable expanded row', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('by default', () => {
    it('lets the expanded content span all columns', async () => {
      wrapper = await mountTable()

      const expandedCell = wrapper.find('tr.is-expanded-content td')

      expect(expandedCell.attributes('colspan')).toBe(String(wrapper.vm.colCount))
      expect(wrapper.find('td.c-data-table__col--flyout').attributes('rowspan')).toBeUndefined()
      expect(wrapper.find('td.c-data-table__col--expand').attributes('rowspan')).toBeUndefined()
    })
  })

  describe('with expandedRowspan', () => {
    it('lets the flyout and expand cells span the row of the expanded content', async () => {
      wrapper = await mountTable({ expandedRowspan: true })

      expect(wrapper.find('td.c-data-table__col--flyout').attributes('rowspan')).toBe('2')
      expect(wrapper.find('td.c-data-table__col--expand').attributes('rowspan')).toBe('2')
    })

    it('ends the expanded content before the flyout and expand columns', async () => {
      wrapper = await mountTable({ expandedRowspan: true })

      const expandedCell = wrapper.find('tr.is-expanded-content td')

      // Two data columns, no further cells
      expect(expandedCell.attributes('colspan')).toBe(String(wrapper.vm.colCount - 2))
    })

    it('does not span the expanded row while the row is collapsed', async () => {
      wrapper = await mountTable({ expandedRowspan: true })
      wrapper.vm.toggleExpand('1')
      await nextTick()

      expect(wrapper.find('tr.is-expanded-content').exists()).toBe(false)
      expect(wrapper.find('td.c-data-table__col--flyout').attributes('rowspan')).toBeUndefined()
      expect(wrapper.find('td.c-data-table__col--expand').attributes('rowspan')).toBeUndefined()
    })

    it('adds a right border to the expanded content with hasBorders', async () => {
      wrapper = await mountTable({ expandedRowspan: true, hasBorders: true })

      expect(wrapper.find('tr.is-expanded-content td').classes()).toContain('border-r')
    })

    it('adds padding to the expanded content with density spacious', async () => {
      wrapper = await mountTable({ density: 'spacious', expandedRowspan: true })

      expect(wrapper.find('tr.is-expanded-content td').classes()).toContain('p-[16px]')
    })

    it('does not add border or padding without hasBorders and density spacious', async () => {
      wrapper = await mountTable({ expandedRowspan: true })

      const classes = wrapper.find('tr.is-expanded-content td').classes()

      expect(classes).not.toContain('border-r')
      expect(classes).not.toContain('p-[16px]')
    })
  })

  describe('without expandedRowspan', () => {
    it('adds neither border nor padding to the expanded content', async () => {
      wrapper = await mountTable({ density: 'spacious', hasBorders: true })

      const classes = wrapper.find('tr.is-expanded-content td').classes()

      expect(classes).not.toContain('border-r')
      expect(classes).not.toContain('p-[16px]')
    })
  })
})

describe('DpDataTable last header column', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  const lastHeaderCell = () => wrapper.find('th[data-col-field="b"]')

  it('has no right padding if columns are resizable', async () => {
    wrapper = await mountTable({ isResizable: true })

    expect(lastHeaderCell().classes()).toContain('u-pr-0')
  })

  it('keeps its right padding if it has a handle for reordering', async () => {
    wrapper = await mountTable({ isColumnsDraggable: true, isResizable: true })

    expect(lastHeaderCell().classes()).not.toContain('u-pr-0')
  })

  it('has no right padding if it is fixed and has no handle for reordering', async () => {
    wrapper = await mountTable({
      headerFields: [headerFields[0], { ...headerFields[1], fixed: true }],
      isColumnsDraggable: true,
      isResizable: true,
    })

    expect(lastHeaderCell().classes()).toContain('u-pr-0')
  })
})

describe('DpDataTable free space of the table', () => {
  let wrapper

  const resizableFields = [
    { field: 'a', label: 'A', colWidth: '100px' },
    { field: 'b', label: 'B', colWidth: '100px' },
  ]

  // The widths of the cells in the first row are set like the table does when it is resizable
  const prepare = async ({ containerWidth, props = {}, widths = {}, storedWidthOfB }) => {
    wrapper = await mountTable({
      headerFields: resizableFields,
      isResizable: true,
      ...props,
    })

    Object.defineProperty(wrapper.vm.tableEl.parentElement, 'clientWidth', { configurable: true, value: containerWidth })

    const cells = () => wrapper.findAll('thead tr:first-child > th')
    const setWidth = (cell, width) => { cell.element.style.width = `${width}px` }

    cells().forEach(cell => {
      const field = cell.attributes('data-col-field')
      setWidth(cell, widths[field] ?? { a: 100, b: 100, flyout: 60 }[field] ?? 50)
    })

    if (storedWidthOfB) {
      wrapper.vm.writeStoredColWidth('b', storedWidthOfB)
    }

    return {
      cell: field => wrapper.find(`thead tr:first-child > th[data-col-field="${field}"]`).element,
      expandCell: () => wrapper.find('thead tr:first-child > th.c-data-table__col--expand').element,
    }
  }

  afterEach(() => {
    wrapper?.unmount()
  })

  it('goes to the last data column if the columns do not fill the table', async () => {
    const { cell } = await prepare({ containerWidth: 900 })

    wrapper.vm.absorbFreeSpace()

    // 900 - (a 100 + flyout 60 + expand 50)
    expect(cell('b').style.width).toBe('690px')
    expect(cell('a').style.width).toBe('100px')
    expect(cell('flyout').style.width).toBe('60px')
  })

  it('does not widen the last data column if the columns overflow the table', async () => {
    const { cell } = await prepare({ containerWidth: 200, storedWidthOfB: '100px' })

    wrapper.vm.absorbFreeSpace()

    expect(cell('b').style.width).toBe('100px')
  })

  it('lets the last data column shrink again when another column gets wider', async () => {
    const { cell } = await prepare({ containerWidth: 900 })

    wrapper.vm.absorbFreeSpace()
    expect(cell('b').style.width).toBe('690px')

    cell('a').style.width = '400px'
    wrapper.vm.absorbFreeSpace()

    // 900 - (a 400 + flyout 60 + expand 50)
    expect(cell('b').style.width).toBe('390px')
  })

  it('gives the former last column its own width back after reordering', async () => {
    const { cell } = await prepare({ containerWidth: 900 })

    wrapper.vm.absorbFreeSpace()
    expect(wrapper.vm.absorbedField).toBe('b')

    // Move column a behind column b
    wrapper.vm.applyReorder(['b', 'a'])
    await nextTick()
    wrapper.vm.absorbFreeSpace()

    expect(wrapper.vm.absorbedField).toBe('a')
    expect(cell('b').style.width).toBe('100px')
  })

  it('takes back the width that other cells need beyond their set width', async () => {
    const { cell } = await prepare({ containerWidth: 900 })

    // The table is 2px wider than the container, e.g. because a cell cannot be narrower than its padding
    vi.spyOn(wrapper.vm.tableEl, 'getBoundingClientRect').mockReturnValue({ width: 902 })
    wrapper.vm.absorbFreeSpace()

    expect(cell('b').style.width).toBe('688px')
  })

  it('does not take the width of the last data column below its base width', async () => {
    const { cell } = await prepare({ containerWidth: 900, storedWidthOfB: '100px' })

    vi.spyOn(wrapper.vm.tableEl, 'getBoundingClientRect').mockReturnValue({ width: 2000 })
    wrapper.vm.absorbFreeSpace()

    expect(cell('b').style.width).toBe('100px')
  })

  it('does nothing without sticky columns', async () => {
    const { cell } = await prepare({ containerWidth: 900, props: { hasFlyout: false, isExpandable: false } })

    wrapper.vm.absorbFreeSpace()

    expect(cell('b').style.width).toBe('100px')
  })

  it('does nothing if the table is not resizable', async () => {
    await prepare({ containerWidth: 900, props: { isResizable: false } })

    wrapper.vm.absorbFreeSpace()

    expect(wrapper.vm.absorbedField).toBeNull()
  })
})

describe('DpDataTable width of the container', () => {
  let observers
  let wrapper

  const headerFields = [
    { field: 'a', label: 'A', colWidth: '100px' },
    { field: 'b', label: 'B', colWidth: '100px' },
  ]

  beforeEach(() => {
    observers = []
    vi.stubGlobal('ResizeObserver', class {
      constructor (callback) {
        this.callback = callback
        this.disconnect = vi.fn()
        this.observe = vi.fn()
        observers.push(this)
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.unstubAllGlobals()
  })

  it('is observed by a resizable table with sticky columns', async () => {
    wrapper = await mountTable({ headerFields, isResizable: true })

    expect(observers).toHaveLength(1)
    expect(observers[0].observe).toHaveBeenCalledWith(wrapper.vm.tableEl.parentElement)
  })

  it('distributes the free space of the table again when it changes', async () => {
    wrapper = await mountTable({ headerFields, isResizable: true })

    const container = wrapper.vm.tableEl.parentElement
    const cells = wrapper.findAll('thead tr:first-child > th')
    const widths = { a: 100, b: 100, flyout: 60 }

    cells.forEach(cell => {
      cell.element.style.width = `${widths[cell.attributes('data-col-field')] ?? 50}px`
    })
    const lastCell = wrapper.find('thead tr:first-child > th[data-col-field="b"]').element

    Object.defineProperty(container, 'clientWidth', { configurable: true, value: 900 })
    observers[0].callback()
    // 900 - (a 100 + flyout 60 + expand 50)
    expect(lastCell.style.width).toBe('690px')

    Object.defineProperty(container, 'clientWidth', { configurable: true, value: 700 })
    observers[0].callback()
    expect(lastCell.style.width).toBe('490px')
  })

  it('is no longer observed after the table is unmounted', async () => {
    wrapper = await mountTable({ headerFields, isResizable: true })

    wrapper.unmount()
    wrapper = null

    expect(observers[0].disconnect).toHaveBeenCalled()
  })

  it('is not observed if the table is not resizable', async () => {
    wrapper = await mountTable({ headerFields })

    expect(observers).toHaveLength(0)
  })
})
