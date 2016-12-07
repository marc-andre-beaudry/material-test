import path from 'path';

const basePath = path.join(__dirname, '../');

export default {
    paths: {
        basePath: basePath,
        appRoot: path.join(basePath, 'app'),
        serve: path.join(basePath, '.tmp/serve')
    },
};
