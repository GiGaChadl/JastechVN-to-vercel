import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('Japanese homepage loads correctly', async ({ page }) => {
    await page.goto('/ja');

    await expect(page).toHaveTitle(/Jastech/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jastech');
  });

  test('English homepage loads correctly', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveTitle(/Jastech/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to Jastech');
  });

  test('language switcher works', async ({ page }) => {
    await page.goto('/ja');

    await page.getByRole('link', { name: 'English' }).click();

    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to Jastech');
  });
});
