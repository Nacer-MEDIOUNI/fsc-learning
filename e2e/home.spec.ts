import { test, expect } from '@playwright/test';

test('home page renders title and refresh button', async ({ page }) => {
  await page.goto('/en');

  await expect(
    page.getByRole('heading', { name: 'FSC Learning Dashboard' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Refresh Page' }),
  ).toBeVisible();
});
