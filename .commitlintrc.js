module.exports = {
    extends: ['@commitlint/config-conventional'],

    rules: {
        'header-max-length': [2, 'always', 100],
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [0, 'always'],
        'references-empty': [0, 'never'],
        'body-empty': [0, 'never'],
        'subject-min-length': [2, 'always', 10],
    },
    formatter: '@commitlint/format',
    parserPreset: {
        parserOpts: {
            issuePrefixes: ['ui-'],
        },
    },
};
