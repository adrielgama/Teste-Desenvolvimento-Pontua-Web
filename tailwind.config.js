/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      body: ['Inter', 'sans-serif'],
      navigation: ['Epilogue', 'sans-serif'],
    },
    extend: {
      colors: {
        white: 'rgb(255, 255, 255)',
        black: 'rgb(0, 0, 0)',
        divider: 'rgb(235, 239, 242)',
        'blue-200': 'rgb(116, 125, 148)',
        'blue-500': 'rgb(41, 61, 113)',
        'blue-600': 'rgb(33, 55, 112)',
        'blue-800': 'rgb(8, 27, 78)',
        'blue-900': 'rgb(0, 17, 61)',
        'orange-400': 'rgb(242, 26, 5)',
        'orange-500': 'rgb(244, 55, 36)',
        'gray-background': 'rgb(245, 246, 248)',
        'gray-100': 'rgb(234, 236, 240)',
        'gray-400': 'rgb(183, 183, 183)',
        'gray-500': 'rgb(119, 119, 119)',
      },
      dropShadow: {
        shadow: '0px 17px 25px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
