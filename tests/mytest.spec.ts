import { test, expect } from '@playwright/test';

// Тест бүр шинэ browser context-той, login хуудаснаас эхэлнэ.
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

// Нэвтэрсэн бол тестийн төгсгөлд системээс гарна.
test.afterEach(async ({ page }) => {
  if (page.url() !== 'https://www.saucedemo.com/') {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  }
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Зөв нэр, нууц үгээр нэвтрэх', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараах хуудас, гарчгийг шалгана.
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('Буруу нууц үгээр нэвтрэх', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдэгдэл гарч, login хуудсандаа үлдэх ёстой.
  await expect(page.getByText(
    'Epic sadface: Username and password do not match any user in this service',
  )).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Бараа сагсанд нэмэх', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Backpack барааг нэрээр нь олж, тухайн барааны товчийг дарна.
  const product = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await product.getByRole('button', { name: 'Add to cart' }).click();
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.locator('.cart_quantity')).toHaveText('1');
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});
