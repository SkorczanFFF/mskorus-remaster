import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        mont: ['Montserrat'],
      },
      colors: {
        'primary-blue': '#001a25',
        'secondary-blue': '#0b0d16',
        'real-white': '#ffffff',
        white: '#e4e4e4',
        raspberry: '#801834',
        orange: '#992210',
        shadow: '#161616',
        oranger: '#972b1a',
      },
    },
    screens: {
      xsm: '480px',
      // => @media (min-width: 480px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      xxl: '1480px',
      // => @media (min-width: 1480px) { ... }
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
