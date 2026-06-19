import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo-deep': '#1a0533',
        'lavender-light': '#f5f3ff',
      },
    },
  },
  plugins: [],
}

export default config
