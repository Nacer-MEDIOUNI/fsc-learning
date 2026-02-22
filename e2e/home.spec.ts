import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads at / with greeting and key sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FSC/i);

    const greeting = page.getByRole('region', {
      name: /Welcome back, Sarah/i,
    });
    await expect(greeting).toBeVisible();
    await expect(greeting).toContainText('Welcome back, Sarah!');

    await expect(
      page.getByRole('heading', { name: /Continue Learning/i }),
    ).toBeVisible();
  });

  test('renders page tabs and switches between them', async ({ page }) => {
    await page.goto('/');

    const overviewTab = page.getByRole('tab', { name: /Overview/i });
    const savedTab = page.getByRole('tab', { name: /My Saved List/i });
    const achievementsTab = page.getByRole('tab', { name: /My Achievements/i });

    await expect(overviewTab).toBeVisible();
    await expect(savedTab).toBeVisible();
    await expect(achievementsTab).toBeVisible();

    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');

    await savedTab.click();
    await expect(savedTab).toHaveAttribute('aria-selected', 'true');
    await expect(
      page.getByRole('heading', { name: /My Saved List/i }),
    ).toBeVisible();

    await achievementsTab.click();
    await expect(achievementsTab).toHaveAttribute('aria-selected', 'true');
    await expect(
      page.getByRole('heading', { name: /Completed Courses/i }),
    ).toBeVisible();

    await overviewTab.click();
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    await expect(
      page.getByRole('heading', { name: /Continue Learning/i }),
    ).toBeVisible();
  });

  test('sidebar navigation items render', async ({ page }) => {
    await page.goto('/');

    const sidebar = page.getByLabel('Main navigation');
    await expect(
      sidebar.getByRole('link', { name: /Overview/i }),
    ).toBeVisible();
    await expect(
      sidebar.getByRole('link', { name: /Catalogue/i }),
    ).toBeVisible();
  });

  test('search modal opens with Ctrl+K', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Control+k');

    const searchInput = page.getByPlaceholder(/Search courses/i);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(searchInput).not.toBeVisible();
  });

  test('loads French locale at /fr', async ({ page }) => {
    await page.goto('/fr');

    await expect(page.getByText(/Bon retour, Sarah/i)).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Continuer l'apprentissage/i }),
    ).toBeVisible();
  });

  test('loads German locale at /de', async ({ page }) => {
    await page.goto('/de');

    await expect(page.getByText(/Willkommen zurück, Sarah/i)).toBeVisible();
  });

  test('loads Spanish locale at /es', async ({ page }) => {
    await page.goto('/es');

    await expect(page.getByText(/Bienvenido de nuevo, Sarah/i)).toBeVisible();
  });
});
