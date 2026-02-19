import { test, expect } from '@playwright/test';

const MOCK_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

test.describe('auth flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    await page.evaluate((jwt) => {
      localStorage.setItem('fsc-auth-token', jwt);
      localStorage.setItem('fsc-auth-initialized', 'true');
    }, MOCK_JWT);
    await page.reload();
  });

  test('dashboard shows user greeting when logged in', async ({ page }) => {
    await expect(page.getByText('Welcome, Alex Morgan')).toBeVisible();
  });

  test('dashboard shows logout button when logged in', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible();
  });

  test('logged-out page shows message and login back button', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Log Out' }).click();

    await expect(
      page.getByText(
        'Your session has ended. Log back in to continue learning.',
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Log Back In' }),
    ).toBeVisible();
  });
});
