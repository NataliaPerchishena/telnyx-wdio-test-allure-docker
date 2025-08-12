import { config as shared } from './wdio.shared.conf.js'

export const config: WebdriverIO.Config = {
  ...shared,
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: process.env.CI ? ['-headless'] : []
    }
  }]
}
