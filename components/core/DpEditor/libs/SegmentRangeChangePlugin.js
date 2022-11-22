import { Plugin } from 'prosemirror-state'

export default new Plugin({
/*
 *  State: {
 *  init () {
 *    return {}
 *  },
 *  apply (tr, set) {
 *    console.log(set)
 *  }
 *  },
 */
  appendTransaction (transactions) {
    // Console.log(transactions)
  }
/*
 *  View () {
 *  return {
 *    update (editorView, prevState) {
 *      debugger
 *    }
 *  }
 *  }
 */
})
