import { test, expect } from '@playwright/test';

test.describe('Expense Tracker App (dockerized)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('renders the app header and starts with a zero balance', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Expense Tracker App' })).toBeVisible();
        await expect(page.locator('#balance')).toHaveText('$0.00');
        await expect(page.getByText('Transaction History')).toBeVisible();
    });

    test('adds an income transaction and updates balance and history', async ({ page }) => {
        await page.getByLabel('Description').fill('Salary');
        await page.getByLabel('Transaction Amount').fill('500');
        await page.getByRole('button', { name: 'Add Transaction' }).click();

        await expect(page.locator('#balance')).toHaveText('$500.00');
        await expect(page.locator('.money.plus')).toHaveText('500.00');
        await expect(page.locator('.list li').first()).toContainText('Salary');
        await expect(page.locator('.list li').first()).toContainText('+$500');
    });

    test('adds an expense transaction and updates balance and history', async ({ page }) => {
        await page.getByLabel('Description').fill('Groceries');
        await page.getByLabel('Transaction Amount').fill('-50');
        await page.getByRole('button', { name: 'Add Transaction' }).click();

        await expect(page.locator('#balance')).toHaveText('$-50.00');
        await expect(page.locator('.money.minus')).toHaveText('50.00');
        await expect(page.locator('.list li').first()).toContainText('Groceries');
        await expect(page.locator('.list li').first()).toContainText('-$50');
    });

    test('deletes a transaction and recalculates the balance', async ({ page }) => {
        await page.getByLabel('Description').fill('Bonus');
        await page.getByLabel('Transaction Amount').fill('100');
        await page.getByRole('button', { name: 'Add Transaction' }).click();

        await expect(page.locator('.list li')).toHaveCount(1);

        await page.locator('.list li').filter({ hasText: 'Bonus' }).getByRole('button', { name: 'X' }).click();

        await expect(page.locator('.list li')).toHaveCount(0);
        await expect(page.locator('#balance')).toHaveText('$0.00');
    });
});
