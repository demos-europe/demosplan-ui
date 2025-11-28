import {
  bindFullScreenChange,
  isActiveFullScreen,
  toggleFullscreen,
  unbindFullScreenChange,
} from './fullscreen'

import {
  DATE_FORMAT_LONG,
  formatDate,
  toDate,
} from './date'

import {
  exactlengthHint,
  maxlengthHint,
  minlengthHint } from './lengthHint/lengthHint'

import {
  hasAllPermissions,
  hasAnyPermissions,
  hasPermission,
} from './hasPermission'

import { capitalizeFirstLetter } from './formatString'
import debounce from './debounce'
import deepMerge from './deepMerge'
import formatBytes from './formatBytes'
import getAnimationEventName from './getAnimationEventName'
import getScrollTop from './getScrollTop'
import hasOwnProp from './hasOwnProp'
import prefixClass from './prefixClass'
import resistFingerprintingDuckTest from './resistFingerprintingDuckTest'
import sortAlphabetically from './sortAlphabetically'
import throttle from './throttle'
import uniqueArrayByObjectKey from './uniqueArrayByObjectKey'

export {
  bindFullScreenChange,
  capitalizeFirstLetter,
  DATE_FORMAT_LONG,
  debounce,
  deepMerge,
  exactlengthHint,
  formatBytes,
  formatDate,
  toggleFullscreen,
  unbindFullScreenChange,
  isActiveFullScreen,
  toDate,
  getScrollTop,
  getAnimationEventName,
  hasAllPermissions,
  hasAnyPermissions,
  hasPermission,
  hasOwnProp,
  maxlengthHint,
  minlengthHint,
  resistFingerprintingDuckTest,
  sortAlphabetically,
  throttle,
  prefixClass,
  uniqueArrayByObjectKey,
}
