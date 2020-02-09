const path = require('path');

const source = path.resolve(__dirname, './source');

const dir = {
    source,
    '11ty': path.resolve(source, './site'),
    build: path.resolve(__dirname, './build')
}

module.exports = { dir }