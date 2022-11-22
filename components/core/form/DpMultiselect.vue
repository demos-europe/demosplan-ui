<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'DpMultiselect',

  functional: true,

  props: {
    required: {
      required: false,
      type: Boolean,
      default: false
    },

    selectionControls: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  render: function (createElement, context) {
    const defaults = {
      placeholder: Translator.trans('choose'),
      selectLabel: '',
      selectGroupLabel: '',
      selectedLabel: '',
      deselectLabel: '',
      deselectGroupLabel: '',
      tagPlaceholder: Translator.trans('tag.create')
    }
    context.data.attrs = { ...defaults, ...context.data.attrs }
    if (context.props.required) {
      context.data.directives = [
        {
          name: 'dp-validate-multiselect'
        }
      ]
      context.data.staticClass = context.data.staticClass ? context.data.staticClass + ' is-required' : 'is-required'
    }

    const functions = {
      noResult: () => createElement('span', Translator.trans('autocomplete.noResults')),
      noOptions: () => createElement('span', Translator.trans('explanation.noentries'))
    }

    if (context.props.selectionControls) {
      const menuOptions = context.data.attrs.options
      const menuSelectedValue = context.data.model.value

      // Add disabled attribute for selection Controls Buttons when click.
      const buttonSelectAll = document.querySelector('[data-select-all]')
      const buttonUnselectAll = document.querySelector('[data-unselect-all]')
      if (buttonSelectAll) {
        if (menuSelectedValue.length === menuOptions.length) {
          buttonSelectAll.setAttribute('disabled', 'disabled')
        } else {
          buttonSelectAll.removeAttribute('disabled')
        }
      }

      if (buttonUnselectAll) {
        if (menuSelectedValue.length === 0) {
          buttonUnselectAll.setAttribute('disabled', 'disabled')
        } else {
          buttonUnselectAll.removeAttribute('disabled')
        }
      }

      functions.beforeList = () => {
        return createElement('div', {
          attrs: {
            class: 'border--bottom'
          }
        }, [
          createElement(
            'button',
            {
              domProps: {
                innerHTML: Translator.trans('select.all')
              },
              attrs: {
                class: 'btn--blank weight--bold u-ph-0_5 u-pv-0_25',
                type: 'button',
                'data-select-all': ''
              },
              on: {
                click: context.listeners['select-all']
              }
            }
          ),
          createElement(
            'button',
            {
              domProps: {
                innerHTML: Translator.trans('unselect.all')
              },
              attrs: {
                class: 'btn--blank weight--bold u-ph-0_5 u-pv-0_25',
                type: 'button',
                'data-unselect-all': ''
              },
              on: {
                click: context.listeners['unselect-all']
              }
            }
          )
        ])
      }
    }

    context.data.scopedSlots = { ...context.data.scopedSlots, ...functions }

    return createElement(VueMultiselect, context.data, context.children)
  }
}
</script>
