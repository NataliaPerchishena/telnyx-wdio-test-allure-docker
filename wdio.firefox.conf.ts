import { config as shared } from './wdio.shared.conf.js'

export const config = {
  ...shared,
  capabilities: [{
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: process.env.CI ? ['-headless'] : []
    },
    webSocketUrl: false,
    acceptInsecureCerts: true
  }]
}
