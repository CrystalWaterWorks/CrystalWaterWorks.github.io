// @ts-check
const { test, expect } = require('@playwright/test');

const FORM_ENDPOINT = 'https://formsubmit.co/crystalwaterworks@gmail.com';

// Collect JS errors and failed same-origin requests (images, CSS backgrounds, etc.).
function trackProblems(page) {
  const problems = [];
  page.on('pageerror', (err) => problems.push(`JS error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console.error: ${msg.text()}`);
  });
  page.on('response', (res) => {
    if (res.url().startsWith('http://127.0.0.1') && res.status() >= 400) {
      problems.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });
  return problems;
}

test.describe('home page', () => {
  test('loads without errors or broken assets', async ({ page }) => {
    const problems = trackProblems(page);
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page).toHaveTitle(/Crystal Water Works/);
    expect(problems).toEqual([]);
  });

  test('every image renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const images = page.locator('img');
    expect(await images.count()).toBeGreaterThan(0);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      const width = await img.evaluate((el) => /** @type {HTMLImageElement} */ (el).naturalWidth);
      expect(width, `image did not render: ${await img.getAttribute('src')}`).toBeGreaterThan(0);
    }
  });

  test('every in-page link points to a section that exists', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((a) => a.getAttribute('href')).filter((h) => h && h !== '#'),
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      await expect(page.locator(/** @type {string} */ (href)), `missing target for ${href}`).toHaveCount(1);
    }
  });

  test('phone number is tap-to-call', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('footer').getByRole('link', { name: '231-352-9253' })).toHaveAttribute(
      'href',
      'tel:+12313529253',
    );
  });

  test('does not scroll sideways', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('contact form', () => {
  test('submits name, email and message to formsubmit.co', async ({ page }) => {
    const problems = trackProblems(page);
    // Intercept the POST so no real email is sent.
    let posted = null;
    await page.route(FORM_ENDPOINT, async (route) => {
      posted = new URLSearchParams(route.request().postData() ?? '');
      await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>intercepted</p>' });
    });

    await page.goto('/');
    const form = page.locator('#contact-form');
    await form.locator('[name=name]').fill('CI Test');
    await form.locator('[name=email]').fill('ci@example.com');
    await form.locator('[name=phone]').fill('231-555-0100');
    await form.locator('[name=message]').fill('Automated smoke test');
    await form.locator('button[type=submit]').click();

    await expect.poll(() => posted).not.toBeNull();
    expect(Object.fromEntries(posted)).toMatchObject({
      name: 'CI Test',
      email: 'ci@example.com',
      phone: '231-555-0100',
      message: 'Automated smoke test',
      _next: 'https://crystalwaterworks.com/thanks.html',
    });
    expect(problems).toEqual([]);
  });

  test('blocks submission when required fields are empty', async ({ page }) => {
    let submitted = false;
    await page.route(FORM_ENDPOINT, (route) => {
      submitted = true;
      return route.abort();
    });

    await page.goto('/');
    await page.locator('#contact-form button[type=submit]').click();

    const valid = await page.locator('#contact-form').evaluate((f) => /** @type {HTMLFormElement} */ (f).checkValidity());
    expect(valid).toBe(false);
    expect(submitted).toBe(false);
  });
});

test('thank-you page loads and links back home', async ({ page }) => {
  const problems = trackProblems(page);
  await page.goto('/thanks.html');

  await expect(page.getByRole('heading', { name: 'Thank You!' })).toBeVisible();
  await page.getByRole('link', { name: 'Return to Home' }).click();
  await expect(page).toHaveTitle(/Crystal Water Works/);
  expect(problems).toEqual([]);
});
