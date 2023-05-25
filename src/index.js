import { attributes, length } from './shared'
import { CleanHtml, Tooltip, VPopover } from './directives'

import {
  bindFullScreenChange,
  DATE_FORMAT_LONG,
  debounce,
  deepMerge,
  exactlengthHint,
  formatDate,
  formatBytes,
  getAnimationEventName,
  getScrollTop,
  hasOwnProp,
  hasPermission,
  hasAllPermissions,
  hasAnyPermissions,
  isActiveFullScreen,
  maxlengthHint,
  minlengthHint,
  toDate,
  toggleFullscreen,
  prefixClass,
  sortAlphabetically,
  throttle,
  uniqueArrayByObjectKey,
  unbindFullScreenChange
} from './utils'

import {
  DpButton,
  DpDetails,
  DpIcon,
  DpInput,
  DpLabel,
  DpLoading,
  dataTableSearch,
  DpAccordion,
  DpAnonymizeText,
  DpAutocomplete,
  DpBulkEditHeader,
  DpButtonIcon,
  DpButtonRow,
  DpCard,
  DpChangeStateAtDate,
  DpCheckbox,
  DpCheckboxGroup,
  DpColumnSelector,
  DpContextualHelp,
  DpCopyPasteButton,
  DpDashboardTaskCard,
  DpDataTable,
  DpDataTableExtended,
  DpDatepicker,
  DpDateRangePicker,
  DpDatetimePicker,
  DpDraggable,
  DpEditableList,
  DpEditor,
  DpFlyout,
  DpFormRow,
  DpHeightLimit,
  DpInlineNotification,
  DpModal,
  DpMultiselect,
  DpMultistepNav,
  DpNotifyContainer,
  DpNotifyMessage,
  DpObscure,
  DpPager,
  DpProgressBar,
  DpRadio,
  DpRegisterFlyout,
  DpResettableInput,
  DpSearchField,
  DpSelect,
  DpSelectPageItemCount,
  DpSkeletonBox,
  DpSlidebar,
  DpSlidingPagination,
  DpSplitButton,
  DpStickyElement,
  DpSwitcher,
  DpTab,
  DpTableCard,
  DpTableCardListHeader,
  DpTabs,
  DpTextArea,
  DpTextWrapper,
  DpTimePicker,
  DpToggle,
  DpToggleForm,
  DpTooltipIcon,
  DpTransitionExpand,
  DpTreeList,
  DpUploadFiles,
  DpVideoPlayer,
  getFileIdsByHash
} from './components/'

import { dpSelectAllMixin, dpValidateMixin, tableSelectAllItems, prefixClassMixin } from './mixins/'

import {
  ActionMenu,
  Confirm,
  convertSize,
  checkResponse,
  Detabinator,
  dpApi,
  dpRpc,
  getCssVariable,
  getFileInfo,
  getFileTypes,
  handleResponseMessages,
  highlightActiveLinks,
  makeFormPost,
  MatchMedia,
  mimeTypes,
  SideNav,
  Stickier,
  Sticky,
  TableWrapper,
} from './lib/'

import {
  assignHandlerForTrigger,
  assignHandlersForInputs,
  assignObserver,
  dpValidate,
  dpValidateMultiselectDirective,
  validateDatepicker,
  validateEmail,
  validateFieldset,
  validateForm,
  validateInput,
  validateMultiselect,
  validateTiptap
} from './lib/validation/'

export default {
  ActionMenu,
  assignHandlerForTrigger,
  assignHandlersForInputs,
  assignObserver,
  attributes,
  Confirm,
  convertSize,
  checkResponse,
  dataTableSearch,
  DATE_FORMAT_LONG,
  debounce,
  deepMerge,
  Detabinator,
  formatDate,
  formatBytes,
  toggleFullscreen,
  bindFullScreenChange,
  isActiveFullScreen,
  getAnimationEventName,
  getCssVariable,
  getFileInfo,
  getFileTypes,
  getScrollTop,
  handleResponseMessages,
  highlightActiveLinks,
  hasOwnProp,
  hasPermission,
  hasAllPermissions,
  hasAnyPermissions,
  sortAlphabetically,
  throttle,
  uniqueArrayByObjectKey,
  toDate,
  length,
  dpApi,
  dpRpc,
  dpValidate,
  dpValidateMultiselectDirective,
  DpButton,
  DpDetails,
  DpIcon,
  DpInput,
  DpLabel,
  DpLoading,
  DpAccordion,
  DpAnonymizeText,
  DpAutocomplete,
  DpBulkEditHeader,
  DpButtonIcon,
  DpButtonRow,
  DpCard,
  DpChangeStateAtDate,
  DpCheckbox,
  DpCheckboxGroup,
  DpColumnSelector,
  DpContextualHelp,
  DpCopyPasteButton,
  DpDashboardTaskCard,
  DpDataTable,
  DpDataTableExtended,
  DpDatepicker,
  DpDateRangePicker,
  DpDatetimePicker,
  DpDraggable,
  DpEditableList,
  DpEditor,
  DpFlyout,
  DpFormRow,
  DpHeightLimit,
  DpInlineNotification,
  DpModal,
  DpMultiselect,
  DpMultistepNav,
  DpNotifyContainer,
  DpNotifyMessage,
  DpObscure,
  DpPager,
  DpProgressBar,
  DpRadio,
  DpRegisterFlyout,
  DpResettableInput,
  DpSearchField,
  DpSelect,
  DpSelectPageItemCount,
  DpSkeletonBox,
  DpSlidebar,
  DpSlidingPagination,
  DpSplitButton,
  DpStickyElement,
  DpSwitcher,
  DpTab,
  DpTableCard,
  DpTableCardListHeader,
  DpTabs,
  DpTextArea,
  DpTextWrapper,
  DpTimePicker,
  DpToggle,
  DpToggleForm,
  DpTooltipIcon,
  DpTransitionExpand,
  DpTreeList,
  DpUploadFiles,
  DpVideoPlayer,
  getFileIdsByHash,
  CleanHtml,
  prefixClassMixin,
  dpSelectAllMixin,
  dpValidateMixin,
  tableSelectAllItems,
  Tooltip,
  VPopover,
  exactlengthHint,
  makeFormPost,
  MatchMedia,
  maxlengthHint,
  minlengthHint,
  mimeTypes,
  SideNav,
  Stickier,
  Sticky,
  TableWrapper,
  prefixClass,
  unbindFullScreenChange,
  validateDatepicker,
  validateEmail,
  validateFieldset,
  validateForm,
  validateInput,
  validateMultiselect,
  validateTiptap
}

