/**
 * Explain to typescript what Vue components are.
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component

    import Vue from "vue";
    export default Vue
}
