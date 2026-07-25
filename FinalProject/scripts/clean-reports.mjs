import { rm } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';

const projectRoot = resolve(process.cwd());
const profile = process.argv[2] ?? 'primary';
const profiles = {
    primary: ['playwright-report', 'allure-results', 'allure-report', 'test-results'],
    'with-bugs': ['playwright-report-with-bugs', 'allure-results-with-bugs', 'allure-report-with-bugs', 'test-results-with-bugs']
};
const generatedReportDirectories = profiles[profile];

if (generatedReportDirectories === undefined) {
    throw new Error(`Unknown report profile: ${profile}`);
}

const ensureProjectChild = (directory) => {
    const target = resolve(projectRoot, directory);
    const pathFromRoot = relative(projectRoot, target);
    if (pathFromRoot.startsWith('..') || pathFromRoot === '' || pathFromRoot.includes(`..${sep}`)) {
        throw new Error(`Refusing to clean a path outside the project: ${target}`);
    }
    return target;
};

await Promise.all(generatedReportDirectories.map((directory) => rm(ensureProjectChild(directory), { force: true, recursive: true })));
