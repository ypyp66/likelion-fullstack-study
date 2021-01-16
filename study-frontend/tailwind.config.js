module.exports = {
  corePlugins: {
    backgroundImage: true,
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    minWidth: {
      30: '8rem',
    },
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        8: 'repeat(8, minmax(0, 1fr))',
        // Complex site-specific row configuration
        layout: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      padding: ['hover'],
      maxHeight: ['focus'],
      gridTemplateRows: ['hover', 'focus'],
    },
  },
  plugins: [],
};
