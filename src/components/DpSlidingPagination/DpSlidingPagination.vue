<template>
  <sliding-pagination
    :aria-pagination-label="translations.pageNavigation"
    :aria-goto-page-label="translations.goToPageOfPages"
    :aria-previous-page-label="translations.pagerPrevious"
    :aria-next-page-label="translations.pagerNext"
    :aria-current-page-label="translations.currentPageOfPages"
    :class-map="{
      componentClass: prefixClass('c-sliding-pagination'),
      list: prefixClass('c-sliding-pagination__list'),
      element: prefixClass('c-sliding-pagination__list-element'),
      elementDisabled: prefixClass('c-sliding-pagination__list-element--disabled'),
      elementActive: prefixClass('c-sliding-pagination__list-element--active'),
      page: prefixClass('c-sliding-pagination__page')
    }"
    :current="current"
    :total="total"
    @page-change="payload => $emit('page-change', payload)" />
</template>

<script>
import { de } from '~/components/shared/translations'
import { prefixClass } from '~/utils'
import SlidingPagination from 'vue-sliding-pagination'

export default {
  name: 'DpSlidingPagination',

  components: {
    SlidingPagination
  },

  props: {
    current: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      translations: {
        gotoPageFromPages: de.pager.goToPageOfPages({ page: this.current, total: this.total }),
        currentPageOfPages: de.pager.currentPageOfPages({ page: this.current, total: this.total }),
        pageNavigation: de.pager.pageNavigation,
        pagerPrevious: de.pager.previous,
        pagerNext: de.pager.next,
      }
    }
  },

  methods: {
    prefixClass (classList) {
      return prefixClass(classList)
    }
  }
}
</script>
