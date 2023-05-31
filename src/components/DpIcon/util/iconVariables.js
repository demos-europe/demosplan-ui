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
 * Icons are manually extracted from https://phosphoricons.com/.
 */
const baseIcons = {
  'arrow-left': {
    path: 'M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8Z',
    proportions: 'landscape'
  },
  'arrow-right': {
    path: 'm221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z',
    proportions: 'landscape'
  },
  check: {
    phosphorName: 'check',
    weight: 'bold',
    path: 'm232.49 80.49-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183 215.51 63.51a12 12 0 0 1 17 17Z',
    proportions: 'landscape'
  },
  'chevron-down': {
    phosphorName: 'caret-down',
    path: 'm213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z',
    proportions: 'landscape'
  },
  'chevron-up': {
    phosphorName: 'caret-up',
    path: 'M213.66 165.66a8 8 0 0 1-11.32 0L128 91.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32Z',
    proportions: 'landscape'
  },
  'chevron-left': {
    phosphorName: 'caret-left',
    path: 'M165.66 202.34a8 8 0 0 1-11.32 11.32l-80-80a8 8 0 0 1 0-11.32l80-80a8 8 0 0 1 11.32 11.32L91.31 128Z',
    proportions: 'portrait'
  },
  'chevron-right': {
    phosphorName: 'caret-right',
    path: 'm181.66 133.66-80 80a8 8 0 0 1-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z',
    proportions: 'portrait'
  },
  clock: {
    path: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8Z',
    proportions: 'square'
  },
  compress: {
    path: 'M152 96V48a8 8 0 0 1 16 0v40h40a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8Zm-56 56H48a8 8 0 0 0 0 16h40v40a8 8 0 0 0 16 0v-48a8 8 0 0 0-8-8Zm112 0h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-40h40a8 8 0 0 0 0-16ZM96 40a8 8 0 0 0-8 8v40H48a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z',
    proportions: 'square'
  },
  delete: {
    path: 'M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z',
    proportions: 'square'
  },
  download: {
    phosphorName: 'download-simple',
    weight: 'fill',
    path: 'M82.34 117.66A8 8 0 0 1 88 104h32V40a8 8 0 0 1 16 0v64h32a8 8 0 0 1 5.66 13.66l-40 40a8 8 0 0 1-11.32 0ZM216 144a8 8 0 0 0-8 8v56H48v-56a8 8 0 0 0-16 0v56a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-56a8 8 0 0 0-8-8Z',
    proportions: 'square'
  },
  'drag-handle': {
    path: 'M108 60a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16 16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Z',
    proportions: 'portrait'
  },
  edit: {
    phosphorName: 'pencil-simple',
    path: 'm227.31 73.37-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63ZM92.69 208H48v-44.69l88-88L180.69 120ZM192 108.68 147.31 64l24-24L216 84.68Z',
    proportions: 'square'
  },
  expand: {
    path: 'M216 48v40a8 8 0 0 1-16 0V56h-32a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8ZM88 200H56v-32a8 8 0 0 0-16 0v40a8 8 0 0 0 8 8h40a8 8 0 0 0 0-16Zm120-40a8 8 0 0 0-8 8v32h-32a8 8 0 0 0 0 16h40a8 8 0 0 0 8-8v-40a8 8 0 0 0-8-8ZM88 40H48a8 8 0 0 0-8 8v40a8 8 0 0 0 16 0V56h32a8 8 0 0 0 0-16Z',
    proportions: 'square'
  },
  file: {
    path: 'm213.66 82.34-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8 8 0 0 0-2.34-5.66ZM160 51.31 188.69 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Z',
    proportions: 'square'
  },
  highlighter: {
    path: 'm227.32 73.37-44.69-44.68a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.32l112-112a16 16 0 0 0 0-22.63ZM136 75.31 152.69 92 68 176.69 51.31 160ZM48 208v-28.69L76.69 208Zm48-3.31L79.32 188 164 103.31 180.69 120Zm96-96L147.32 64l24-24L216 84.69Z',
    proportions: 'square'
  },
  history: {
    path: 'M136 80v43.47l36.12 21.67a8 8 0 0 1-8.24 13.72l-40-24A8 8 0 0 1 120 128V80a8 8 0 0 1 16 0Zm-8-48a95.44 95.44 0 0 0-67.92 28.15C52.81 67.51 46.35 74.59 40 82V64a8 8 0 0 0-16 0v40a8 8 0 0 0 8 8h40a8 8 0 0 0 0-16H49c7.15-8.42 14.27-16.35 22.39-24.57a80 80 0 1 1 1.66 114.75 8 8 0 1 0-11 11.64A96 96 0 1 0 128 32Z',
    proportions: 'square'
  },
  hourglass: {
    path: 'M200 75.64V40a16 16 0 0 0-16-16H72a16 16 0 0 0-16 16v36a16.07 16.07 0 0 0 6.4 12.8l52.27 39.2-52.27 39.2A16.07 16.07 0 0 0 56 180v36a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16v-35.64a16.09 16.09 0 0 0-6.35-12.77L141.27 128l52.38-39.59A16.09 16.09 0 0 0 200 75.64Zm-16 104.72V216H72v-36l48-36v24a8 8 0 0 0 16 0v-23.92Zm0-104.72L178.23 80H77.33L72 76V40h112Z',
    proportions: 'portrait'
  },
  info: {
    path: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm16-40a8 8 0 0 1-8 8 16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16 16 16 0 0 1 16 16v40a8 8 0 0 1 8 8Zm-32-92a12 12 0 1 1 12 12 12 12 0 0 1-12-12Z',
    proportions: 'square'
  },
  lock: {
    path: 'M208 80h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16ZM96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160v112Z',
    proportions: 'square'
  },
  mail: {
    path: 'M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8Zm-20.57 16L128 133.15 52.57 64ZM216 192H40V74.19l82.59 75.71a8 8 0 0 0 10.82 0L216 74.19V192Z',
    proportions: 'landscape'
  },
  refresh: {
    phosphorName: 'arrows-clockwise',
    path: 'M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z',
    proportions: 'square'
  },
  search: {
    path: 'm229.66 218.34-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z',
    proportions: 'square'
  },
  settings: {
    path: 'M237.94 107.21a8 8 0 0 0-3.89-5.4l-29.83-17-.12-33.62a8 8 0 0 0-2.83-6.08 111.91 111.91 0 0 0-36.72-20.67 8 8 0 0 0-6.46.59L128 41.85 97.88 25a8 8 0 0 0-6.47-.6 111.92 111.92 0 0 0-36.68 20.75 8 8 0 0 0-2.83 6.07l-.15 33.65-29.83 17a8 8 0 0 0-3.89 5.4 106.47 106.47 0 0 0 0 41.56 8 8 0 0 0 3.89 5.4l29.83 17 .12 33.63a8 8 0 0 0 2.83 6.08 111.91 111.91 0 0 0 36.72 20.67 8 8 0 0 0 6.46-.59L128 214.15 158.12 231a7.91 7.91 0 0 0 3.9 1 8.09 8.09 0 0 0 2.57-.42 112.1 112.1 0 0 0 36.68-20.73 8 8 0 0 0 2.83-6.07l.15-33.65 29.83-17a8 8 0 0 0 3.89-5.4 106.47 106.47 0 0 0-.03-41.52ZM128 168a40 40 0 1 1 40-40 40 40 0 0 1-40 40Z',
    proportions: 'square'
  },
  success: {
    path: 'M173.66 98.34a8 8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 0ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104Zm-16 0a88 88 0 1 0-88 88 88.1 88.1 0 0 0 88-88Z',
    proportions: 'square'
  },
  tag: {
    path: 'M243.31 136 144 36.69A15.86 15.86 0 0 0 132.69 32H40a8 8 0 0 0-8 8v92.69A15.86 15.86 0 0 0 36.69 144L136 243.31a16 16 0 0 0 22.63 0l84.68-84.68a16 16 0 0 0 0-22.63Zm-96 96L48 132.69V48h84.69L232 147.31ZM96 84a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z',
    proportions: 'square'
  },
  unlock: {
    path: 'M208 80H96V56a32 32 0 0 1 32-32c15.37 0 29.2 11 32.16 25.59a8 8 0 0 0 15.68-3.18C171.32 24.15 151.2 8 128 8a48.05 48.05 0 0 0-48 48v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16Zm0 128H48V96h160v112Z',
    proportions: 'square'
  },
  user: {
    path: 'M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z',
    proportions: 'square'
  },
  userSolid: {
    path: 'M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8Z',
    proportions: 'square'
  },
  xmark: {
    path: 'M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128 47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z',
    proportions: 'square'
  }
}

const aliases = {
  cancel: 'xmark',
  close: 'xmark',
  remove: 'xmark'
}

const ICONS = mergeIconAliases(baseIcons, aliases)

const SIZES = {
  small: 16,
  medium: 20,
  large: 28
}

export { ICONS, SIZES }
