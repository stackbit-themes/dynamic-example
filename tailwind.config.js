const plugin = require('tailwindcss/plugin');
const themeStyle = require('./content/data/style.json');

module.exports = {
    mode: 'jit',
    purge: {
        content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*'],
        safelist: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h']
    },
    plugins: [
        require('daisyui'),
    ]
};
