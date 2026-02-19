import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no a11y violations', async ({ page }) => {
  await page.goto('/en');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('home page (Spanish) has no a11y violations', async ({ page }) => {
  await page.goto('/es');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('logged-out page has no a11y violations', async ({ page }) => {
  await page.goto('/en');
  await page.evaluate(() => {
    localStorage.removeItem('fsc-auth-token');
    localStorage.setItem('fsc-auth-initialized', 'true');
  });
  await page.goto('/en/logged-out');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('not-found page has no a11y violations', async ({ page }) => {
  await page.goto('/en/nonexistent');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
