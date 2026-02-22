import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.describe('Accessibility — WCAG 2.1 AA', () => {
  test('Overview page has no violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Saved List page has no violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /My Saved List/i }).click();
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Achievements page has no violations', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /My Achievements/i }).click();
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Catalog page has no violations', async ({ page }) => {
    await page.goto('/');
    await page
      .getByLabel('Main navigation')
      .getByRole('link', { name: /Catalogue/i })
      .click();
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('French locale has no violations', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('html lang attribute matches locale', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.goto('/fr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

    await page.goto('/de');
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');

    await page.goto('/es');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('main content region exists', async ({ page }) => {
    await page.goto('/');

    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();
  });

  test('keyboard navigation through page tabs', async ({ page }) => {
    await page.goto('/');

    const overviewTab = page.getByRole('tab', { name: /Overview/i });
    await overviewTab.focus();
    await expect(overviewTab).toBeFocused();

    await page.keyboard.press('Tab');

    const savedTab = page.getByRole('tab', { name: /My Saved List/i });
    await savedTab.focus();
    await savedTab.press('Enter');
    await expect(savedTab).toHaveAttribute('aria-selected', 'true');
  });
});
