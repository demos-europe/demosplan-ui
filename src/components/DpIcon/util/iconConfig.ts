import {
  PhArrowDown,
  PhArrowLeft,
  PhArrowRight,
  PhArrowsClockwise,
  PhArrowUp,
  PhCaretDoubleDown,
  PhCaretDoubleUp,
  PhCaretDown,
  PhCaretLeft,
  PhCaretRight,
  PhCaretUp,
  PhCheck,
  PhCheckCircle,
  PhCircleNotch,
  PhClock,
  PhClockCounterClockwise,
  PhCopy,
  PhCornersIn,
  PhCornersOut,
  PhDotsSixVertical,
  PhDotsThree,
  PhDownloadSimple,
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
  PhQuestion,
  PhRobot,
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
  PhosphorIconName } from '../../../../types'
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
  'arrows-clockwise': PhArrowsClockwise, // Alias: refresh
  'circle-notch': PhCircleNotch, // Alias: spinner
  'clock-counter-clockwise': PhClockCounterClockwise, // Alias: history
  'corners-in': PhCornersIn, // Alias: compress
  'corners-out': PhCornersOut, // Alias: expand
  'dots-six-vertical': PhDotsSixVertical, // Alias: drag-handle
  'download-simple': PhDownloadSimple, // Alias: download
  'envelope-simple': PhEnvelopeSimple, // Alias: mail
  'gear-six': PhGearSix, // Alias: settings
  'lock-simple': PhLockSimple, // Alias: lock
  'lock-simple-open': PhLockSimpleOpen, // Alias: unlock
  'magnifying-glass': PhMagnifyingGlass, // Alias: search
  'pencil-simple': PhPencilSimple, // Alias: edit
  'robot': PhRobot, // Alias: ai
  'warning-diamond': PhWarningDiamond, // Alias: severe
}

// Icon names that are used as aliases - the phosphor icon has a different name
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
  'chevron-down': 'landscape', // Alias for caret-down
  'chevron-left': 'portrait', // Alias for caret-left
  'chevron-right': 'portrait', // Alias for caret-right
  'chevron-up': 'landscape', // Alias for caret-up
  'drag-handle': 'portrait', // Alias for dots-six-vertical
  'mail': 'landscape', // Alias for envelope-simple
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

// Export the mapping objects for use in DpIcon stories
export { mappedIcons, mappedIconAliases }
