<template>
  <dp-flyout
    align="left"
    class="u-ml-0_5"
    :has-menu="false">
    <template v-slot:trigger>
      <div class="c-header__nav-item-link">
        {{ Translator.trans('register.action') }}
        <i
          class="fa fa-angle-down"
          aria-hidden="true" />
      </div>
    </template>

    <div class="space-stack-s">
      <a
        class="display--block"
        :href="routes.citizenRegisterFormRoute"
        v-text="Translator.trans('register')" />
      <a
        class="display--block"
        :href="routes.orgaRegisterFormRoute"
        v-text="Translator.trans('register.orga')" />
    </div>
  </dp-flyout>
</template>

<script>
import DpFlyout from '../DpFlyout/DpFlyout'

export default {
  name: 'DpRegisterFlyout',

  components: {
    DpFlyout
  },

  props: {
    routes: {
      type: Object,
      required: true,
      validator: (prop) => {
        return Object.keys(prop).every(key => [
          'citizenRegisterFormRoute',
          'orgaRegisterFormRoute'
        ].includes(key))
      }
    }
  },

  mounted () {
    /*
     * The placeholder element is shown until all javascript has been loaded
     * and parsed to prevent a flash of missing content.
     */
    const placeholder = document.getElementById('registerFlyoutPlaceholder')
    if (placeholder) {
      placeholder.remove()
    }
  }
}
</script>
