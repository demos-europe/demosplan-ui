<template>
  <sliding-pagination
    :aria-pagination-label="Translator.trans('pager.label')"
    :aria-goto-page-label="Translator.trans('pager.goto.page.from.pages', { page: current, total: total })"
    :aria-previous-page-label="Translator.trans('pager.previous')"
    :aria-next-page-label="Translator.trans('pager.next')"
    :aria-current-page-label="Translator.trans('pager.page.from.pages.current.page', { page: current, total: total })"
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

  methods: {
    prefixClass (classList) {
      return prefixClass(classList)
    }
  }
}
</script>
