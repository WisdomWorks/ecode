import plugin from 'tailwindcss/plugin'
import { generateCustomComponentPlugin } from './src/utils/tailwindcss.utils'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        editor: {
          dark: '#282c34',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents(generateCustomComponentPlugin(theme), {
        respectImportant: true,
      })
    }),
  ],
  important: true,
}
