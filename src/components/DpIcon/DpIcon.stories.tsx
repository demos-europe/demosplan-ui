import type { Meta, StoryObj } from '@storybook/vue3'
import { iconComponents, mappedIcons, mappedIconAliases } from './util/iconConfig'
import DpIcon from './'

interface IDpIcon {
    icon: string
    size: string
    weight: string
}

// Get all available icons
const allIcons = Object.keys(iconComponents)

const meta: Meta<typeof DpIcon> = {
    component: DpIcon,
    title: "Components/Icon",
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: allIcons,
            description: 'The icon to display'
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large', 'xlarge'],
            description: 'Size of the icon'
        },
        weight: {
            control: { type: 'select' },
            options: ['light', 'regular', 'bold', 'fill'],
            description: 'Weight of the icon'
        }
    },
    tags: ['autodocs', '!dev'],
}

export default meta

type Story = StoryObj<IDpIcon>

export const Default: Story = {
    args: {
        icon: 'history',
        size: 'medium',
        weight: 'regular'
    },
    tags: ['!autodocs', 'dev'],
}

export const AllSizes: Story = {
    render: () => ({
        components: { DpIcon },
        setup() {
            const sizes = ['small', 'medium', 'large', 'xlarge']
            return { sizes }
        },
        template: `
            <div class="flex flex-col gap-3">
                <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
                    <DpIcon class="w-4" icon="history" :size="size" />
                    <span>{{ size }}</span>
                </div>
            </div>
        `
    })
}

export const AllWeights: Story = {
  render: () => ({
    components: { DpIcon },
    setup() {
      const weights = ['light', 'regular', 'bold', 'fill']
      return { weights }
    },
    template: `
            <div class="flex flex-col gap-3">
                <div v-for="weight in weights" :key="weight" class="flex items-center gap-3">
                    <DpIcon class="w-4" icon="hourglass" :weight="weight" />
                    <span>{{ weight }}</span>
                </div>
            </div>
        `
  })
}

export const AllIcons: Story = {
    render: () => ({
        components: { DpIcon },
        setup() {
            const icons = Object.keys(iconComponents)

            // Create mapping from phosphor icons to aliases
            const phosphorToAliases: Record<string, string[]> = {}

            // Get all phosphor icon names (original icons)
            const phosphorIconNames = Object.keys(mappedIcons)

            // Get all alias names
            const aliasNames = Object.keys(mappedIconAliases)

            // For each alias, find the matching phosphor icon
            aliasNames.forEach(alias => {
                // Find which phosphor icon this alias points to
                for (const phosphorName of phosphorIconNames) {
                    if (mappedIconAliases[alias] === mappedIcons[phosphorName]) {
                        // This is a match - the alias points to the same component as the phosphor icon
                        if (!phosphorToAliases[phosphorName]) {
                            phosphorToAliases[phosphorName] = []
                        }
                        phosphorToAliases[phosphorName].push(alias)
                        break
                    }
                }
            })

            // Find which phosphor icon each alias refers to
            const aliasToPhosphor: Record<string, string> = {}
            aliasNames.forEach(alias => {
                const component = mappedIconAliases[alias]
                for (const phosphorName of phosphorIconNames) {
                    if (mappedIcons[phosphorName] === component) {
                        aliasToPhosphor[alias] = phosphorName
                        break
                    }
                }
            })

            return { icons, phosphorToAliases, aliasToPhosphor, phosphorIconNames, aliasNames }
        },
        template: `
            <div class="flex flex-col gap-3">
                <div v-for="icon in icons" :key="icon" class="flex items-center gap-3">
                    <DpIcon class="w-4" :icon="icon" size="medium" />
                    <span style="min-width: 12rem">{{ icon }}</span>

                    <!-- If this is a phosphor icon with aliases -->
                    <span v-if="phosphorIconNames.includes(icon) && phosphorToAliases[icon] && phosphorToAliases[icon].length" class="text-gray-500 text-sm">
                        (alias: {{ phosphorToAliases[icon].join(', ') }})
                    </span>

                    <!-- If this is an alias -->
                    <span v-if="aliasNames.includes(icon) && aliasToPhosphor[icon]" class="text-gray-500 text-sm">
                        (phosphor: {{ aliasToPhosphor[icon] }})
                    </span>
                </div>
            </div>
        `
    })
}
