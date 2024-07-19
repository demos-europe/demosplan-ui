import {
  PhArrowDown,
  PhArrowLeft,
  PhArrowRight,
  PhArrowsClockwise,
  PhArrowUp,
  PhCaretDown,
  PhCaretLeft,
  PhCaretRight,
  PhCaretUp,
  PhCaretDoubleDown,
  PhCaretDoubleUp,
  PhCheck,
  PhCheckCircle,
  PhCircleNotch,
  PhClock,
  PhCopy,
  PhCornersIn,
  PhCornersOut,
  PhClockCounterClockwise,
  PhDownloadSimple,
  PhDotsSixVertical,
  PhEnvelopeSimple,
  PhFile,
  PhGearSix,
  PhHighlighter,
  PhHourglass,
  PhInfo,
  PhLockSimple,
  PhLockSimpleOpen,
  PhMagnifyingGlass,
  PhPencilSimple,
  PhPhone,
  PhPlus,
  PhRobot,
  PhQuestion,
  PhSignOut,
  PhTag,
  PhTrash,
  PhUser,
  PhUsersThree,
  PhWarning,
  PhWarningDiamond,
  PhX,
  PhXCircle
} from '@phosphor-icons/vue'

// ICONS

// icon names that are used and already correspond to the phosphor icon name
const mappedIconNames = {
  'arrow-down': PhArrowDown,
  'arrow-left': PhArrowLeft,
  'arrow-right': PhArrowRight,
  'arrow-up': PhArrowUp,
  'caret-down': PhCaretDown,
  'caret-left': PhCaretLeft,
  'caret-right': PhCaretRight,
  'caret-up': PhCaretUp,
  'caret-double-down': PhCaretDoubleDown,
  'caret-double-up': PhCaretDoubleUp,
  'check': PhCheck,
  'check-circle': PhCheckCircle,
  'clock': PhClock,
  'copy': PhCopy,
  'file': PhFile,
  'highlighter': PhHighlighter,
  'hourglass': PhHourglass,
  'info': PhInfo,
  'plus': PhPlus,
  'phone': PhPhone,
  'question': PhQuestion,
  'sign-out': PhSignOut,
  'tag': PhTag,
  'user': PhUser,
  'users-three': PhUsersThree,
  'warning': PhWarning,
  'x': PhX,
  'x-circle': PhXCircle
}

// icon names that are not used yet but should replace the aliases
const mappedAliasedIconNames = {
  'arrows-clockwise': PhArrowsClockwise,
  'circle-notch': PhCircleNotch,
  'clock-counter-clockwise': PhClockCounterClockwise,
  'corners-in': PhCornersIn,
  'corners-out': PhCornersOut,
  'dots-six-vertical': PhDotsSixVertical,
  'download-simple': PhDownloadSimple,
  'envelope-simple': PhEnvelopeSimple,
  'gear-six': PhGearSix,
  'lock-simple': PhLockSimple,
  'lock-simple-open': PhLockSimpleOpen,
  'magnifying-glass': PhMagnifyingGlass,
  'pencil-simple': PhPencilSimple,
  'robot': PhRobot,
  'warning-diamond': PhWarningDiamond,
}

// icon names that are used as aliases - the phosphor icon has a different name
const mappedIconAliases = {
  'ai': PhRobot,
  'cancel': PhX,
  'chevron-down': PhArrowDown,
  'chevron-left': PhArrowLeft,
  'chevron-right': PhArrowRight,
  'chevron-up': PhArrowUp,
  'close': PhX,
  'compress': PhCornersIn,
  'delete': PhTrash,
  'download': PhDownloadSimple,
  'drag-handle': PhDotsSixVertical,
  'edit': PhPencilSimple,
  'expand': PhCornersOut,
  'history': PhClockCounterClockwise,
  'lock': PhLockSimple,
  'mail': PhEnvelopeSimple,
  'refresh': PhArrowsClockwise,
  'remove': PhX,
  'search': PhMagnifyingGlass,
  'settings': PhGearSix,
  'severe': PhWarningDiamond,
  'spinner': PhCircleNotch,
  'success': PhCheck,
  'unlock': PhLockSimpleOpen,
  'userSolid': PhUser,
  'xmark': PhX
}

// ICON PROPORTIONS

const iconsProportions = {
  'arrow-down': 'portrait',
  'arrow-left': 'landscape',
  'arrow-right': 'landscape',
  'arrow-up': 'portrait',
  'caret-down': 'landscape',
  'caret-left': 'portrait',
  'caret-right': 'portrait',
  'caret-up': 'landscape',
  'caret-double-down': 'portrait',
  'caret-double-up': 'portrait',
  'check': 'landscape',
  'dots-six-vertical': 'portrait',
  'envelope-simple': 'landscape'
}

const aliasedIconsProportions = {
  'chevron-down': 'landscape', // alias for caret-down
  'chevron-left': 'portrait', // alias for caret-left
  'chevron-right': 'portrait', // alias for caret-right
  'chevron-up': 'landscape', // alias for caret-up
  'drag-handle': 'portrait', // alias for dots-six-vertical
  'mail': 'landscape', // alias for envelope-simple
}

// EXPORTS

export const iconComponents = {
  ...mappedIconNames,
  ...mappedAliasedIconNames,
  ...mappedIconAliases
}

export const proportions = {
  ...iconsProportions,
  ...aliasedIconsProportions
}

export const SIZES = {
  'small': 16,
  'medium': 20,
  'large': 24,
  'xlarge': 32,
}
