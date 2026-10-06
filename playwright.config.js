// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const PORT = 8787;

module.exports = defineConfig({
  testDir: 'tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } },
    // Most visitors are on phones, and on iPhone that means WebKit.
    { name: 'iphone-safari', use: { ...devices['iPhone 15'] } },
  ],
  // wrangler dev serves public/ with Cloudflare's own asset handling,
  // so redirects like /thanks.html -> /thanks behave as in production.
  webServer: {
    command: `npx wrangler dev --ip 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    env: { WRANGLER_SEND_METRICS: 'false' },
  },
});
