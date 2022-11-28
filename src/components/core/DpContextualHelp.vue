<script>
import Tooltip from './../../directives/Tooltip/Tooltip'

export default {
  name: 'DpContextualHelp',

  functional: true,

  props: {
    /**
     * A translation key representing the actual tooltip content.
     * May actually be any string including html.
     */
    text: {
      type: String,
      required: true
    }
  },

  directives: {
    tootip: Tooltip
  },

  render: function (h, { props, data }) {
    return h('i', {
      attrs: {
        class: `fa fa-question-circle ${typeof data.staticClass === 'undefined' ? '' : data.staticClass}`,
        'aria-label': Translator.trans('contextual.help')
      },
      directives: [
        {
          name: 'tooltip',
          value: props.text
        }
      ]
    })
  }
}
</script>
