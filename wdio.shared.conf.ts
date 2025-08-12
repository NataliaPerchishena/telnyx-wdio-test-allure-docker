import dotenv from 'dotenv'

// 1) Підхопити змінні середовища з .env (дозволяємо вибрати файл через ENV_FILE)
dotenv.config({ path: process.env.ENV_FILE || '.env' })

// 2) Базовий конфіг WDIO — тільки те, що реально потрібно
export const config: WebdriverIO.Config = {
  // Локальний раннер (звичайний режим без Selenium Grid/Cloud)
  runner: 'local',

  // Де шукати тести
  specs: ['./test/specs/**/*.e2e.ts'],

  // Скільки воркерів піднімати паралельно
  maxInstances: 2,

  // Рівень логів (info достатньо)
  logLevel: 'info',

  // Базова адреса (з .env, з дефолтом на всяк випадок)
  baseUrl: process.env.BASE_URL || 'https://telnyx.com',

  // Таймаут для команд типу waitFor*
  waitforTimeout: 10000,

  // Тестовий фреймворк
  framework: 'mocha',

  // Налаштування Mocha — тільки інтерфейс і таймаут
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  // Репортери: консольний і Allure (скидаємо результати у allure-results)
  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results' }]
  ],

  before: async () => {
  const mod = await import('@wdio/allure-reporter')
    const allure = (mod as any).default || mod
    allure.addEnvironment('Environment', process.env.ENV_NAME || 'prod')
    allure.addEnvironment('Base URL', process.env.BASE_URL || String(browser.options.baseUrl))
  },
  // capabilities задаються у браузерних конфигах (chrome/firefox)
  capabilities: []
}



