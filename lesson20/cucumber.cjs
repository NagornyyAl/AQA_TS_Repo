const common = {
    requireModule: ['tsx/esm'],
    import: ['src/**/*.ts'],
    format: ['@cucumber/pretty-formatter'],
    formatOptions: {
        snippetInterface: 'async-await'
    },
    tags: 'not @skip'
};

const ci = {
    ...common,
    format: [...common.format, 'json:./reports/cucumber.json', 'html:./reports/cucumber-report.html'],
    retry: 1
};

const local = {
    ...common,
    retry: 0
};

module.exports = {
    default: common,
    ci: ci,
    local: local
};
