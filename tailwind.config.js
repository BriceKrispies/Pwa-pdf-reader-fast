/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ramble color palette from mockups
        'cream': {
          50: '#fefcf7',
          100: '#fdf9f0',
          200: '#f9f1e1',
          300: '#f5f1e8', // Main background
          400: '#e8dcc6',
          500: '#d4c4a0',
        },
        'sage': {
          50: '#f6f9f5',
          100: '#e8f0e6',
          200: '#d1e1ce',
          300: '#b8ceb3',
          400: '#9fb999',
          500: '#7fa578',
          600: '#698a61',
        },
        'earth': {
          100: '#f0e8d8',
          200: '#e1d1b1',
          300: '#d2ba8a',
          400: '#c3a363',
          500: '#b48c3c',
          600: '#9a7633',
        },
        'coral': {
          50: '#fef7f6',
          100: '#fde8e5',
          200: '#fbc4bc',
          300: '#f9a093',
          400: '#f77c6a',
          500: '#f55841',
          600: '#e8472e',
        },
        'forest': {
          50: '#f4f8f4',
          100: '#e6f2e6',
          200: '#c4dfbd',
          300: '#a2cc94',
          400: '#80b96b',
          500: '#5ea642',
          600: '#4f8936',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'topo': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTBDNSA4IDEwIDEyIDE1IDEwQzIwIDggMjUgMTIgMzAgMTBDMzUgOCA0MCA4IDQwIDhWMTJDMzUgMTQgMzAgMTAgMjUgMTJDMjAgMTQgMTUgMTAgMTAgMTJDNSAxNCA0MCAxNCA0MCAxNFYxNkMzNSAxOCAzMCAxNCAyNSAxNkMyMCAxOCAxNSAxNCAxMCAxNkM1IDE4IDAgMTggMCAxOFYxMFoiIGZpbGw9IiM3ZmE1NzgiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPgo=')"
      }
    },
  },
  plugins: [],
}