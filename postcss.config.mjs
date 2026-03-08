/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // You need autoprefixer for tailwind
  },
};

export default config;
