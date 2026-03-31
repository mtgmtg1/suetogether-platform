import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load the homepage and check title', async ({ page }) => {
    // Navigate to the index page
    await page.goto('/');

    // Check that the page title contains something reasonable
    // (We might need to adjust this depending on the actual page content)
    await expect(page).toHaveTitle(/SueTogether|Company OS/i);
    
    // Check if the main heading is visible. Given we built a "Company OS" style landing page.
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });
});
