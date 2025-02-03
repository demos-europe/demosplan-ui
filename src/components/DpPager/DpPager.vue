<template>
  <div class="c-pager__dropdown">
    <label
        :aria-label="labelTexts.multipleLabel"
        class="c-pager__dropdown-label u-m-0 u-p-0 weight--normal inline-block">
      <dp-sliding-pagination
          v-if="totalItems > Math.min(...limits)"
          class="inline-block"
          :current="currentPage"
          :non-sliding-size="3"
          :sliding-ending-size="1"
          :sliding-window-size="1"
          :total="totalPages || 1"
          @page-change="handlePageChange" />
      <div
          class="inline-block"
          v-if="totalItems > Math.min(...limits)">
        <dp-multiselect
            v-model="itemsPerPage"
            class="inline-block"
            :options="filteredLimits"
            :searchable="false"
            selected-label=""
            @select="handleSizeChange" />
      </div>
      <span v-else>{{ totalItems }}</span>
      <span aria-hidden="true">
          {{ labelTexts.multipleOf }}
          <span data-cy="totalItems">{{ totalItems }}</span>
          {{ labelTexts.multipleItems }}
        </span>
    </label>
  </div>
</template>

<script>
import DpMultiselect from '~/components/DpMultiselect'
import DpSlidingPagination from '~/components/DpSlidingPagination'
import { de } from '~/components/shared/translations'

export default {
  name: 'DpPager',

  components: {
    DpSlidingPagination,
    DpMultiselect
  },

  props: {
    currentPage: {
      required: false,
      type: Number,
      default: 1
    },

    limits: {
      required: false,
      type: Array,
      default: () => []
    },

    totalItems: {
      required: false,
      type: Number,
      default: 1
    },

// Note: Props are primarily listed in alphabetical order.
// However, `totalItems` must precede `labelText` because `labelText` relies on the value of `totalItems`.
// Arranging them in this order ensures `totalItems` is initialized before `labelText` references it.

    labelTexts: {
      required: false,
      type: Object,
      default () {
        return ({
          multipleItems: de.pager.multipleItems,
          multipleLabel: `${de.pager.chooseEntries} ${this.totalItems} ${de.pager.ofEntries}`,
          multipleOf: de.pager.multipleOf
        })
      }
    },

    totalPages: {
      required: false,
      type: Number,
      default: 1
    },

    perPage: {
      required: false,
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      itemsPerPage: this.perPage <= this.totalItems ? this.perPage : this.totalItems
    }
  },

  computed: {
    // computedMultipleLabel () {
    //   return this.labelTexts.multipleLabel
    //       ||
    //       `${de.pager.chooseEntries} ${this.totalItems} ${de.pager.ofEntries}`
    // },
    //
    // computedMultipleOf () {
    //   return this.labelTexts.multipleOf || de.pager.multipleOf
    // },
    //
    // computedMultipleItems () {
    //   return this.labelTexts.multipleItems || de.pager.multipleItems
    // },

    filteredLimits () {
      const filtered = this.limits.filter(limit => limit <= this.totalItems)

      if (filtered.length < this.limits.length && this.totalItems > filtered[filtered.length - 1]) {
        filtered.push(this.totalItems)
      }

      if (filtered.includes(this.itemsPerPage) === false) {
        filtered.push(this.itemsPerPage)
      }
      filtered.sort((a, b) => a - b)

      return filtered
    }
  },

  methods: {
    handlePageChange (newPage) {
      this.$emit('page-change', newPage)
    },

    handleSizeChange (selectedOption) {
      this.$emit('size-change', parseInt(selectedOption))
    }
  },
}
</script>
