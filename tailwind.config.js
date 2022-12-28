module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'comment': '2.5rem 45rem 4rem',
      },
    },
    screens: {
      'sm': '620px',
      // => @media (min-width: 376px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    maxWidth: {
      '11/12': '91.666667%',
      'sm': '24rem',
      '4xl': '56rem',
      'full': '100%',
    },
    extend: {
      colors: {
        blue: "hsl(238, 40%, 52%)",
        red: "hsl(358, 79%, 66%)",
        grayblue: "hsl(239, 57%, 85%)",
        palered: "hsl(357, 100%, 86%)",
        "neutral-700": "hsl(212, 24%, 26%)",
        "neutral-500": "hsl(211, 10%, 45%)",
        "neutral-300": "hsl(223, 19%, 93%)",
        "neutral-200": "hsl(228, 33%, 97%)",
        "neutral-100": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// refer to https://www.youtube.com/watch?v=pfaSUYaSgRo
// mode: 'jit' will compile css on the fly and make it faster
// purge any unused css from final bundle, will allow to ship smaller css files to the browser