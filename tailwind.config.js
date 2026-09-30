/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        meil: {
          50: '#F0F5FA',
          100: '#E1ECF5',
          200: '#C3D8EB',
          300: '#94BDE0',
          400: '#5F9ED2',
          500: '#3A82C4',
          600: '#2667A8',
          700: '#1F5389',
          800: '#19426D',
          900: '#0F2942',
          950: '#0A1B2D',
        },
        esg: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
