// wdio.shared.conf.ts
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'

dotenv.config({ path: process.env.ENV_FILE || '.env' })

const root = process.cwd()

// Якщо задано SPEC — запускаємо тільки його; інакше всі *.ts у test/specs
const specFromEnv = (process.env.SPEC || '').trim()
const specsGlob = specFromEnv
  ? (specFromEnv.startsWith('.') ? specFromEnv : `./${specFromEnv}`)
  : './test/specs/**/*.ts'   // ← під твій скрін: test/specs/*.ts

const isRemote = !!process.env.WD_HOST

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: [specsGlob],
  exclude: [],
  maxInstances: 1,

  framework: 'mocha',
  mochaOpts: { timeout: 60000 },

  baseUrl: process.env.BASE_URL,

  // прокидання параметрів для Selenium у Docker
  ...(isRemote ? {
    hostname: process.env.WD_HOST,
    port: Number(process.env.WD_PORT || 4444),
    path: process.env.WD_PATH || '/wd/hub',
  } : {}),

  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results' }],
  ],

  onPrepare: () => {
    const outDir = path.resolve(root, 'allure-results')
    fs.mkdirSync(outDir, { recursive: true })

    const envName =
      process.env.ENV_NAME ??
      (process.env.ENV_FILE?.replace(/\.env\.?/, '') || 'prod')

    fs.writeFileSync(
      path.join(outDir, 'environment.properties'),
      [`Environment=${envName}`, `Base URL=${process.env.BASE_URL ?? ''}`].join('\n'),
      'utf8'
    )

    const runNumber = process.env.GITHUB_RUN_NUMBER || '0'
    const runId     = process.env.GITHUB_RUN_ID || ''
    const repo      = process.env.GITHUB_REPOSITORY || ''
    const server    = process.env.GITHUB_SERVER_URL || 'https://github.com'
    const buildUrl  = runId && repo ? `${server}/${repo}/actions/runs/${runId}` : ''

    const executor = {
      name: 'GitHub Actions',
      type: 'github',
      buildName: `Build #${runNumber} (${envName})`,
      buildUrl,
      buildOrder: Number(runNumber) || Date.now(),
    }
    fs.writeFileSync(path.join(outDir, 'executor.json'), JSON.stringify(executor), 'utf8')
  },

  // браузерні capabilities задаємо у wdio.chrome.conf.ts / wdio.firefox.conf.ts
  capabilities: []
}
