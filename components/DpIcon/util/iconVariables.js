/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

/* eslint-disable quote-props */

/**
 * Copy the paths of the given icons into their aliases,
 * and return an object that is sorted by the icon keys.
 *
 * @param {Object} icons       The actual icons with their paths
 * @param {Object} iconAliases Icon aliases that should render the same paths
 * @return {{}}
 */
const mergeIconAliases = function (icons, iconAliases) {
  const aliasedIcons = {}
  const sortedIcons = {}
  const iconKeys = []
  let unsortedIcons = {}

  Object.keys(iconAliases).forEach((icon) => {
    aliasedIcons[icon] = icons[iconAliases[icon]]
  })

  unsortedIcons = { ...icons, ...aliasedIcons }

  for (const icon in unsortedIcons) {
    if (Object.prototype.hasOwnProperty.call(unsortedIcons, icon)) {
      iconKeys.push(icon)
    }
  }

  iconKeys.sort()

  for (const key of iconKeys) {
    sortedIcons[key] = unsortedIcons[key]
  }

  return sortedIcons
}

/*
 * Icons are manually extracted from https://fontawesome.com/v6/search,
 * resized to fit into a 16 x 16 square and run through https://jakearchibald.github.io/svgomg/
 * while checking maximum compression without visible loss of quality.
 */
const baseIcons = {
  'arrow-left': {
    path: 'm8.21 15.69.7-.7a.43.43 0 0 0 0-.61L3.39 8.84h12.2c.23 0 .42-.2.42-.43v-1c0-.24-.2-.43-.43-.43H3.37l5.55-5.54a.43.43 0 0 0 0-.6l-.7-.71a.43.43 0 0 0-.62 0L.13 7.6a.43.43 0 0 0 0 .61L7.6 15.7c.17.17.44.17.61 0Z'
  },
  'arrow-right': {
    path: 'm7.79.13-.7.7a.43.43 0 0 0 0 .6l5.53 5.55H.42c-.23 0-.42.2-.42.43v1c0 .23.2.43.43.43h12.2l-5.55 5.54a.43.43 0 0 0 0 .6l.7.71c.18.17.45.17.62 0l7.47-7.48a.43.43 0 0 0 0-.6L8.4.12a.43.43 0 0 0-.61 0Z'
  },
  check: {
    path: 'M15.67 2.34c.44.44.44 1.16 0 1.61l-9.15 9.14c-.44.45-1.17.45-1.61 0L.33 8.52a1.14 1.14 0 1 1 1.62-1.61l3.73 3.76 8.37-8.33a1.14 1.14 0 0 1 1.62 0Z'
  },
  'chevron-down': {
    path: 'm15.87 4.27-.71-.72a.43.43 0 0 0-.62 0L8 10.08 1.46 3.55a.43.43 0 0 0-.62 0l-.71.72a.43.43 0 0 0 0 .61l7.56 7.57c.17.17.45.17.62 0l7.56-7.57a.43.43 0 0 0 0-.61Z'
  },
  'chevron-up': {
    path: 'm.13 11.73.71.72c.17.17.45.17.62 0L8 5.92l6.54 6.53c.17.17.45.17.62 0l.71-.72a.43.43 0 0 0 0-.61L8.31 3.55a.43.43 0 0 0-.62 0L.13 11.12a.43.43 0 0 0 0 .61Z'
  },
  clock: {
    path: 'm8.75 7.77 1.85 2.81a.7.7 0 0 1-.18 1.02.72.72 0 0 1-1.04-.18l-2-3A.75.75 0 0 1 7.25 8V3.75a.75.75 0 1 1 1.5 0v4.02ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z'
  },
  compress: {
    path: 'M4.857 10.286h-4a.856.856 0 1 0 0 1.714H4v3.143c0 .475.382.857.857.857a.855.855 0 0 0 .857-.857v-4a.855.855 0 0 0-.857-.857Zm6.286-4.572h4a.857.857 0 0 0 0-1.714H12V.857a.856.856 0 1 0-1.714 0v4c0 .475.382.857.857.857ZM4.857 0A.856.856 0 0 0 4 .857V4H.857a.856.856 0 1 0 0 1.714h4a.855.855 0 0 0 .857-.857v-4A.856.856 0 0 0 4.857 0Zm10.286 10.286h-4a.855.855 0 0 0-.857.857v4a.857.857 0 0 0 1.714 0V12h3.143a.857.857 0 0 0 0-1.714Z'
  },
  delete: {
    path: 'M6 12.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V6c0-.28.22-.5.5-.5s.5.22.5.5v6.5Zm2.5 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V6c0-.28.22-.5.5-.5s.5.22.5.5v6.5Zm2.5 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V6c0-.28.22-.5.5-.5s.5.22.5.5v6.5ZM10.92.78l1.15 1.72h2.18a.75.75 0 1 1 0 1.5H14v9.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5V4h-.25a.75.75 0 1 1 0-1.5h2.18L5.08.78C5.4.29 5.95 0 6.53 0h2.94c.58 0 1.13.3 1.45.78ZM5.73 2.5h4.54l-.6-.89a.25.25 0 0 0-.2-.11H6.53c-.08 0-.18.04-.2.11l-.6.89Zm-2.23 11a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4h-9v9.5Z'
  },
  download: {
    path: 'M14 9.5h-1.67l-1.5 1.5H14c.28 0 .5.22.5.5V14a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-2.5c0-.28.22-.5.5-.5h3.17l-1.5-1.5H2a2 2 0 0 0-2 2V14c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2.5a2 2 0 0 0-2-2Zm-.5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM7.47 11.5c.15.18.34.25.53.25.2 0 .38-.07.53-.22l4.25-4.25a.75.75 0 1 0-1.06-1.06L8.75 9.19V.75a.75.75 0 1 0-1.5 0v8.44l-3-2.97A.75.75 0 1 0 3.2 7.28l4.28 4.22Z'
  },
  'drag-handle': {
    path: 'M5.69 0H3.38c-.64 0-1.16.51-1.16 1.14v2.29c0 .63.52 1.14 1.16 1.14h2.3c.65 0 1.16-.51 1.16-1.14V1.14C6.84.51 6.33 0 5.7 0Zm0 5.71H3.38c-.64 0-1.16.52-1.16 1.15v2.28c0 .63.52 1.15 1.16 1.15h2.3c.65 0 1.16-.52 1.16-1.15V6.86c0-.63-.51-1.15-1.15-1.15Zm0 5.72H3.38c-.64 0-1.16.51-1.16 1.14v2.29c0 .63.52 1.14 1.16 1.14h2.3c.65 0 1.16-.51 1.16-1.14v-2.29c0-.63-.51-1.14-1.15-1.14ZM12.62 0h-2.3c-.65 0-1.16.51-1.16 1.14v2.29c0 .63.51 1.14 1.15 1.14h2.31c.64 0 1.16-.51 1.16-1.14V1.14c0-.63-.52-1.14-1.16-1.14Zm0 5.71h-2.3c-.65 0-1.16.52-1.16 1.15v2.28c0 .63.51 1.15 1.15 1.15h2.31c.64 0 1.16-.52 1.16-1.15V6.86c0-.63-.52-1.15-1.16-1.15Zm0 5.72h-2.3c-.65 0-1.16.51-1.16 1.14v2.29c0 .63.51 1.14 1.15 1.14h2.31c.64 0 1.16-.51 1.16-1.14v-2.29c0-.63-.52-1.14-1.16-1.14Z'
  },
  expand: {
    path: 'M4.857 0h-4A.857.857 0 0 0 0 .857v4a.856.856 0 1 0 1.714 0V1.714h3.143a.856.856 0 1 0 0-1.714Zm10.286 0h-4a.856.856 0 1 0 0 1.714h3.143v3.143c0 .475.382.857.857.857A.855.855 0 0 0 16 4.857v-4A.856.856 0 0 0 15.143 0ZM4.857 14.286H1.714v-3.143a.856.856 0 1 0-1.714 0v4c0 .475.384.857.857.857h4a.855.855 0 0 0 .857-.857.855.855 0 0 0-.857-.857Zm10.286-4a.857.857 0 0 0-.857.857v3.143h-3.143a.857.857 0 1 0 0 1.714h4a.857.857 0 0 0 .857-.857v-4a.855.855 0 0 0-.857-.857Z'
  },
  file: {
    path: 'M2 2c0-1.1.9-2 2-2h5.17a2 2 0 0 1 1.41.59l2.84 2.83a2 2 0 0 1 .58 1.4V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2Zm10.5 12V5H10a1 1 0 0 1-1-1V1.5H4a.5.5 0 0 0-.5.5v12c0 .28.22.5.5.5h8a.5.5 0 0 0 .5-.5Z'
  },
  highlighter: {
    path: 'm0 14.12 2.94.94L3.98 14l-1.97-1.97L0 14.12ZM15.53 2.33 13.67.47a1.6 1.6 0 0 0-2.2-.07l-7.8 6.66a1.08 1.08 0 0 0-.32 1.12l.39 1.26-1 1a.7.7 0 0 0 0 1l1.83 1.83a.7.7 0 0 0 1 0l1-1 1.25.39a1.07 1.07 0 0 0 1.12-.32l6.66-7.8a1.6 1.6 0 0 0-.07-2.2Zm-7.5 8.91-1.86-.57-1.1 1.1-.83-.83 1.1-1.1-.57-1.86 1.12-.96 3.1 3.1-.97 1.12Zm6.5-7.62L9.6 9.4l-3-3 5.79-4.94a.2.2 0 0 1 .13-.05c.04 0 .1.01.14.06l1.86 1.86c.07.08.08.2 0 .3Z'
  },
  history: {
    path: 'M8 0a8 8 0 1 1-4.42 14.67.78.78 0 0 1-.23-1.04.79.79 0 0 1 1.07-.2 6.5 6.5 0 1 0-1.9-8.92h1.73a.75.75 0 1 1 0 1.49H.75A.75.75 0 0 1 0 5.25v-3.5a.75.75 0 0 1 1.5 0v1.58A8 8 0 0 1 8 0Zm0 4c.42 0 .75.33.75.75v2.94l2 2.03c.32.3.32.77 0 1.03-.26.32-.74.32-1.03 0L7.47 8.5a.64.64 0 0 1-.22-.5V4.75c0-.42.33-.75.75-.75Z'
  },
  hourglass: {
    path: 'M2 .75c0-.41.34-.75.75-.75h10.5a.75.75 0 1 1 0 1.5H13v.6a4.9 4.9 0 0 1-1.4 3.35L9.07 8l2.55 2.55c.86.89 1.39 2.1 1.39 3.36v.59h.25a.75.75 0 1 1 0 1.5H2.75a.75.75 0 1 1 0-1.5H3v-.6c0-1.25.5-2.46 1.4-3.35L6.93 8 4.4 5.45A4.8 4.8 0 0 1 3 2.1v-.6h-.25A.75.75 0 0 1 2 .75ZM5.12 12h5.76a3.3 3.3 0 0 0-.33-.4L8 9.07 5.45 11.6c-.12.12-.26.25-.33.39Zm5.76-8c.37-.55.62-1.22.62-1.9v-.6h-7v.6c0 .68.22 1.35.62 1.9h5.76Z'
  },
  info: {
    path: 'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 14.5a6.5 6.5 0 1 1 .01-13.01A6.5 6.5 0 0 1 8 14.5Zm1.25-4h-.5V7.75A.75.75 0 0 0 8 7H7a.75.75 0 0 0-.75.75c0 .41.34.75.75.75h.25v2h-.5a.75.75 0 0 0-.75.75c0 .41.34.75.75.75h2.5a.75.75 0 0 0 0-1.5ZM8 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
  },
  lock: {
    path: 'M4 6V4a4 4 0 1 1 8 0v2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h1Zm1.5 0h5V4a2.5 2.5 0 1 0-5 0v2Zm-3 8c0 .28.22.5.5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v6Z'
  },
  mail: {
    path: 'M0 4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm1.5 0v.7l5.4 4.42c.63.53 1.57.53 2.2 0l5.4-4.43v-.72c0-.25-.22-.5-.5-.5H2c-.28 0-.5.25-.5.5V4Zm0 2.63V12c0 .28.22.5.5.5h12a.5.5 0 0 0 .5-.5V6.63l-4.44 3.65a3.3 3.3 0 0 1-4.15 0L1.5 6.63Z'
  },
  refresh: {
    path: 'M14.63 9.07a.8.8 0 0 0-1 .54 5.9 5.9 0 0 1-10.87 1.06H6.1a.8.8 0 0 0 .8-.8c0-.44-.32-.8-.77-.8H.8a.8.8 0 0 0-.8.8v5.33a.8.8 0 0 0 1.6 0v-3.4a7.49 7.49 0 0 0 6.37 3.67 7.5 7.5 0 0 0 7.17-5.38c.16-.45-.09-.87-.51-1.02ZM15.2 0a.8.8 0 0 0-.8.8v3.4A7.5 7.5 0 0 0 8 .53 7.5 7.5 0 0 0 .83 5.91a.8.8 0 1 0 1.54.45A5.9 5.9 0 0 1 8 2.13a5.9 5.9 0 0 1 5.22 3.2H9.87a.8.8 0 0 0-.8.8c0 .44.36.8.8.8h5.33a.8.8 0 0 0 .8-.8V.8a.8.8 0 0 0-.8-.8Z'
  },
  search: {
    path: 'm15.76 14.72-4.2-4.19A6.5 6.5 0 0 0 6.47 0a6.5 6.5 0 1 0 4.03 11.6l4.2 4.18c.18.15.37.22.56.22.2 0 .39-.07.53-.22.3-.3.3-.77-.02-1.06ZM1.5 6.5a5 5 0 1 1 10.01.01A5 5 0 0 1 1.5 6.5Z'
  },
  settings: {
    path: 'M15.54 5.2a.7.7 0 0 1-.2.77L14 7.21a6.04 6.04 0 0 1 0 1.58l1.35 1.24c.21.2.3.5.2.76-.14.38-.3.74-.5 1.08l-.14.25c-.2.34-.44.67-.7.98a.68.68 0 0 1-.76.2l-1.74-.55c-.42.32-.9.6-1.37.8l-.4 1.78a.75.75 0 0 1-.56.56 8.16 8.16 0 0 1-2.66 0 .75.75 0 0 1-.57-.56l-.39-1.78c-.5-.2-.95-.48-1.37-.8l-1.74.56a.71.71 0 0 1-.77-.21 8.2 8.2 0 0 1-.69-.98l-.14-.25a7.8 7.8 0 0 1-.5-1.08.71.71 0 0 1 .2-.76L2.1 8.79a6.05 6.05 0 0 1 0-1.58L.74 5.97a.7.7 0 0 1-.2-.76c.14-.38.3-.74.5-1.08l.14-.25c.2-.34.44-.67.7-.98.18-.22.48-.3.76-.2l1.74.55c.42-.33.88-.6 1.37-.8l.4-1.78A.7.7 0 0 1 6.7.1a8.04 8.04 0 0 1 2.66 0c.29.05.5.27.57.56l.39 1.78c.46.2.95.47 1.37.8l1.74-.56a.71.71 0 0 1 .77.21c.25.31.48.64.69.98l.15.25c.18.34.35.7.49 1.08Zm-7.5 5.3a2.52 2.52 0 0 0 0-5.03 2.52 2.52 0 0 0 0 5.03Z'
  },
  success: {
    path: 'M7.62 10.62a.88.88 0 0 1-1.24 0l-2-2a.88.88 0 0 1 1.24-1.24L7 8.76l3.38-3.38a.88.88 0 0 1 1.24 1.24l-4 4ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z'
  },
  tag: {
    path: 'M2.93 4.1a1.17 1.17 0 1 1 2.34 0 1.17 1.17 0 0 1-2.34 0ZM7.23 0c.62 0 1.2.25 1.65.69l6.43 6.43c.92.92.92 2.4 0 3.32l-4.88 4.87c-.9.92-2.4.92-3.3 0L.68 8.88A2.33 2.33 0 0 1 0 7.22V1.76C0 .79.79 0 1.76 0h5.46Zm-5.3 7.64 6.43 6.43c.23.23.6.23.83 0l4.88-4.88a.58.58 0 0 0 0-.83L7.64 1.93a.59.59 0 0 0-.42-.17H1.76v5.46c0 .16.06.3.17.42Z'
  },
  unlock: {
    path: 'M5.5 6H13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h1V4a4 4 0 0 1 7.8-1.23c.13.4-.1.82-.48.94a.77.77 0 0 1-.94-.48 2.52 2.52 0 0 0-4.9.77l.02 2Zm-3 8c0 .28.22.5.5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v6Z'
  },
  user: {
    path: 'M9.5 9.5h-3A5.5 5.5 0 0 0 1 15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 5.5 5.5 0 0 0-5.5-5.5Zm-6.97 5A4 4 0 0 1 6.5 11h3a4 4 0 0 1 3.97 3.5H2.53ZM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z'
  },
  userSolid: {
    path: 'M8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm1.58 1.5H6.42A5.42 5.42 0 0 0 1 14.92c0 .6.49 1.08 1.08 1.08h11.84c.6 0 1.08-.48 1.08-1.08 0-3-2.42-5.42-5.42-5.42Z'
  },
  xmark: {
    path: 'M15.56 13.96a1.2 1.2 0 0 1-1.69 1.69l-5.9-5.94-5.93 5.94a1.2 1.2 0 0 1-1.69-1.7L6.3 8.03.35 2.04A1.2 1.2 0 0 1 2.05.35l5.93 5.98L13.9.4a1.2 1.2 0 0 1 1.7 1.69L9.67 8.02l5.9 5.94Z'
  }
}

const aliases = {
  close: 'xmark'
}

const ICONS = mergeIconAliases(baseIcons, aliases)

const SIZES = {
  small: 12,
  medium: 16,
  large: 24
}

export { ICONS, SIZES }
