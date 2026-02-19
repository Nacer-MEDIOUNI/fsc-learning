import { test, expect } from '@playwright/test';

test.describe('not-found page', () => {
  test('shows 404 page for invalid route (English)', async ({ page }) => {
    await page.goto('/en/nonexistent');

    await expect(
      page.getByRole('heading', { name: 'Page not found' }),
    ).toBeVisible();
    await expect(
      page.getByText('The page you are looking for does not exist.'),
    ).toBeVisible();
  });

  test('shows Go to Dashboard button', async ({ page }) => {
    await page.goto('/en/nonexistent');

    await expect(
      page.getByRole('button', { name: 'Go to Dashboard' }),
    ).toBeVisible();
  });

  test('Go to Dashboard navigates to home', async ({ page }) => {
    await page.goto('/en/nonexistent');
    await page.getByRole('button', { name: 'Go to Dashboard' }).click();

    await expect(page).toHaveURL('/en');
  });

  test('shows 404 page for invalid route (Spanish)', async ({ page }) => {
    await page.goto('/es/nonexistent');

    await expect(
      page.getByRole('heading', { name: 'Página no encontrada' }),
    ).toBeVisible();
  });
});
