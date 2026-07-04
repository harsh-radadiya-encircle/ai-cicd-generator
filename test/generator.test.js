const test = require('node:test');
const assert = require('node:assert/strict');
const { generateWorkflows } = require('../src/generator');

test('dev-staging-main branch flow generates staging workflow even when deploy environments default to production', () => {
  const files = generateWorkflows({
    projectType: 'nextjs',
    packageManager: 'npm',
    deployTarget: 'vercel',
    branchFlow: 'dev-staging-main',
    checks: ['lint', 'test', 'build'],
    deployEnvironments: ['production'],
  });

  assert.ok(files['.github/workflows/deploy-staging.yml'], 'staging workflow should be generated');
  assert.ok(files['.github/workflows/deploy-production.yml'], 'production workflow should also be generated');
});

test('generated notes include a step-by-step usage guide', () => {
  const files = generateWorkflows({
    projectType: 'nextjs',
    packageManager: 'npm',
    deployTarget: 'vercel',
    branchFlow: 'dev-staging-main',
    checks: ['lint', 'test', 'build'],
    deployEnvironments: ['both'],
  });

  const notes = files['DEPLOYMENT_NOTES.md'];
  assert.match(notes, /How to use these files/i);
  assert.match(notes, /Add the workflow files to your repository/i);
});
