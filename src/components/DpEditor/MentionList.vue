<template>
  <ul class="o-list suggestion__popup">
    <template v-if="items.length">
      <li
        class="o-list__item suggestion__list-item u-ph-0_5 u-pv-0_25"
        :class="{ 'suggestion__list-item--is-active': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="item.id"
        @click="selectItem(index)">
        <button class="btn--blank">
          {{ item.label }}
        </button>
      </li>
    </template>
    <li class="o-list__item suggestion__list-item" v-else>
      No result
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MentionList',

  props: {
    items: {
      type: Array,
      required: true,
    },

    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },

  watch: {
    items: {
      handler () {
        this.selectedIndex = 0
      },
      deep: true
    },
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()

        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()

        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()

        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command(item)
      }
    }
  },
  mounted () {
    console.log('MentionList mounted')
  }
}
</script>
