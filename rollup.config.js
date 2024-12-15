import url from '@rollup/plugin-url';

export default {
    plugins: [
        url({
            include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
            limit: 0, // 0 means no limit, all files will be copied
        }),
    ],
};
