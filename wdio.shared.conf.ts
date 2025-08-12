import dotenv from 'dotenv'
import fs from 'node:fs'         
import path from 'node:path'      

dotenv.config({ path: process.env.ENV_FILE || '.env' })

export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./test/specs/**/*.e2e.ts'],
  maxInstances: 2,
  logLevel: 'info',
  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 60000 },

  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results' }]
  ],
  onPrepare: () => {
    const outDir = path.resolve(process.cwd(), 'allure-results')
    fs.mkdirSync(outDir, { recursive: true })
    const envName =
      process.env.ENV_NAME
      ?? (process.env.ENV_FILE?.replace(/\.env\.?/, '') || 'prod')

    const lines = [
      `Environment=${envName}`,
      `Base URL=${process.env.BASE_URL || 'https://telnyx.com'}`
    ]
    fs.writeFileSync(path.join(outDir, 'environment.properties'), lines.join('\n'), 'utf8')
  },

  capabilities: []
}
