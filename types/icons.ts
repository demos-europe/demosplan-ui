export type IconAlias =
  'ai' // alias for 'robot'
  | 'cancel' // alias for 'xmark' -> 'x'
  | 'chevron-down' // alias for 'caret-down'
  | 'chevron-left' // alias for 'caret-left'
  | 'chevron-right' // alias for 'caret-right'
  | 'chevron-up' // alias for 'caret-up'
  | 'close' // alias for 'xmark' -> 'x'
  | 'compress' // alias for 'corners-in'
  | 'delete' // alias for 'trash-simple'
  | 'download' // alias for 'download-simple'
  | 'drag-handle' // alias for 'dots-six-vertical'
  | 'edit' // alias for 'pencil-simple'
  | 'expand' // alias for 'corners-out'
  | 'history' // alias for 'clock-counter-clockwise'
  | 'lock' // alias for 'lock-simple'
  | 'mail' // alias for 'envelope-simple'
  | 'refresh' // alias for 'arrows-clockwise'
  | 'remove' // alias for 'xmark' -> 'x'
  | 'search' // alias for magnifying-glass
  | 'settings' // alias for 'gear-six', weight: fill
  | 'severe' // alias for 'warning-diamond'
  | 'spinner' // alias for 'circle-notch'
  | 'success' // alias for 'check-circle'
  | 'unlock' // alias for 'lock-simple-open'
  | 'userSolid' // alias for 'user', weight: fill
  | 'xmark' // alias for 'x'

export type AliasedPhosphorIconName =
  'arrows-clockwise'
  | 'circle-notch'
  | 'clock-counter-clockwise'
  | 'corners-in'
  | 'corners-out'
  | 'dots-six-vertical'
  | 'download-simple'
  | 'envelope-simple'
  | 'gear-six'
  | 'lock-simple'
  | 'lock-simple-open'
  | 'magnifying-glass'
  | 'pencil-simple'
  | 'robot'
  | 'warning-diamond'

export type PhosphorIconName =
  'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'caret-double-down'
  | 'caret-double-up'
  | 'check'
  | 'check-circle'
  | 'clock'
  | 'copy'
  | 'dots-three'
  | 'file'
  | 'highlighter'
  | 'hourglass'
  | 'info'
  | 'map-pin'
  | 'plus'
  | 'phone'
  | 'question'
  | 'sign-out'
  | 'tag'
  | 'user'
  | 'users-three'
  | 'warning'
  | 'x'
  | 'x-circle'

export type IconName =
  | PhosphorIconName
  | AliasedPhosphorIconName
  | IconAlias

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge'

export type IconWeight = 'light' | 'regular' | 'bold' | 'fill'

export type IconProportion = 'landscape' | 'portrait' | 'square'
