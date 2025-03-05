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
  PhDotsThree,
  PhEnvelopeSimple,
  PhFaders,
  PhFile,
  PhGearSix,
  PhHighlighter,
  PhHourglass,
  PhInfo,
  PhLockSimple,
  PhLockSimpleOpen,
  PhMagnifyingGlass,
  PhMapPin,
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
import {
  AliasedPhosphorIconName,
  IconAlias,
  IconName,
  IconProportion,
  IconSize,
  PhosphorIconName} from '../../../../types'
import type { Component } from 'vue'

// ICONS

// icon names that are used and already correspond to the phosphor icon name
const mappedIcons: Record<PhosphorIconName | AliasedPhosphorIconName, Component> = {
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
  'dots-three': PhDotsThree,
  'faders': PhFaders,
  'file': PhFile,
  'highlighter': PhHighlighter,
  'hourglass': PhHourglass,
  'info': PhInfo,
  'map-pin': PhMapPin,
  'plus': PhPlus,
  'phone': PhPhone,
  'question': PhQuestion,
  'sign-out': PhSignOut,
  'tag': PhTag,
  'user': PhUser,
  'users-three': PhUsersThree,
  'warning': PhWarning,
  'x': PhX,
  'x-circle': PhXCircle,
  'arrows-clockwise': PhArrowsClockwise, // alias: refresh
  'circle-notch': PhCircleNotch, // alias: spinner
  'clock-counter-clockwise': PhClockCounterClockwise, // alias: history
  'corners-in': PhCornersIn, // alias: compress
  'corners-out': PhCornersOut, // alias: expand
  'dots-six-vertical': PhDotsSixVertical, // alias: drag-handle
  'download-simple': PhDownloadSimple, // alias: download
  'envelope-simple': PhEnvelopeSimple, // alias: mail
  'gear-six': PhGearSix, // alias: settings
  'lock-simple': PhLockSimple, // alias: lock
  'lock-simple-open': PhLockSimpleOpen, // alias: unlock
  'magnifying-glass': PhMagnifyingGlass, // alias: search
  'pencil-simple': PhPencilSimple, // alias: edit
  'robot': PhRobot, // alias: ai
  'warning-diamond': PhWarningDiamond, // alias: severe
}

// icon names that are used as aliases - the phosphor icon has a different name
const mappedIconAliases: Record<IconAlias, Component> = {
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

const iconsProportions: Record<string, IconProportion> = {
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

const aliasedIconsProportions: Record<string, IconProportion> = {
  'chevron-down': 'landscape', // alias for caret-down
  'chevron-left': 'portrait', // alias for caret-left
  'chevron-right': 'portrait', // alias for caret-right
  'chevron-up': 'landscape', // alias for caret-up
  'drag-handle': 'portrait', // alias for dots-six-vertical
  'mail': 'landscape', // alias for envelope-simple
}

// EXPORTS

export const iconComponents: Record<IconName, Component> = {
  ...mappedIcons,
  ...mappedIconAliases
}

export const proportions: Record<string, IconProportion> = {
  ...iconsProportions,
  ...aliasedIconsProportions
}

export const SIZES: Record<IconSize, number> = {
  'small': 16,
  'medium': 20,
  'large': 24,
  'xlarge': 32,
}
