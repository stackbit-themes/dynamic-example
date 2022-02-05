const themeConfig = require('./content/data/theme.json');

module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{js,ts,jsx,tsx}']
    },
    plugins: [require('daisyui')]
};
