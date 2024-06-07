import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      red: '#8d1e2b',
      'light-red': '#e52735',
      purple: '#372239',
      'dark-purple': '#19000e',
      green: '#13ce66',
      yellow: '#b87a08',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#e1e1e1',
      black: '#000',
      white: '#fff',
    },
  },
  plugins: [],
  variants: {
    extend: {
      padding: ['last'],
    },
  },
};
export default config;
