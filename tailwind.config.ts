import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        grotesk: ['Space Grotesk'],
      },
      colors: {
        'primary-blue': '#001a25',
        'secondary-blue': '#0b0d16',
        'real-white': '#ffffff',
        white: '#e4e4e4',
        raspberry: '#801834',
        'raspberry-dark': '#820025',
        orange: '#992210',
        shadow: '#161616',
        'orange-dark': '#972b1a',
      },
    },
    screens: {
      xsm: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1480px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
