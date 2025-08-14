import { browser, expect } from '@wdio/globals'
import axios from 'axios'

describe('Smoke', () => {
  it('Check status and url for main', async () => {

    const envName = process.env.ENV_NAME
    const urlFromEnv = process.env.BASE_URL

    // if (!urlFromEnv) {
    //   throw new Error('BASE_URL is not set. Make sure ENV_FILE points to a .env.* with BASE_URL')
    // }
    console.log('ENV_NAME =', envName)
    console.log('BASE_URL =', urlFromEnv)

   /// console.log('Running tests on environment:', process.env.ENV_NAME)
   //const url = (browser.options.baseUrl as string) || process.env.BASE_URL!

    const resp = await axios.get(urlFromEnv)
    expect(resp.status).toBe(200)
    
    //   await browser.execute((u) => { (window as any).location.href = u as string }, urlFromEnv)
    await browser.navigateTo(urlFromEnv)
   //  await browser.pause(3000)
    const currentUrl = await browser.getUrl()
    expect(currentUrl).toContain('telnyx')
   })
})
