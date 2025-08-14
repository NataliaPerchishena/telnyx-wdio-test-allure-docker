// wdio.chrome.conf.ts
import { config as shared } from './wdio.shared.conf.js'

export const config: WebdriverIO.Config = {
  ...shared,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: process.env.CI
          ? ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage']
          : []
      },
    webSocketUrl: false,
    acceptInsecureCerts: true
    }
  ]
}
