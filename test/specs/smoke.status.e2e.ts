import { browser, expect } from '@wdio/globals'
import axios from 'axios'

describe('Smoke', () => {
  it('Check status and url for main', async () => {
    console.log('Running tests on environment:', process.env.ENV_NAME)
    const url = (browser.options.baseUrl as string) || 'https://telnyx.com'

    const resp = await axios.get(url)
    expect(resp.status).toBe(200)

    // Перевірка у браузері
    await browser.url('/')
    const currentUrl = await browser.getUrl()
    expect(currentUrl).toContain('telnyx')
  })
})
