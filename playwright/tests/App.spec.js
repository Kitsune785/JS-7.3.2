const { test, expect } = require('@playwright/test');
const userData = require('./user');

// корректный ввод
test("test", async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.locator('[placeholder="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(userData.userEmail);
    await page.locator('[placeholder="Пароль"]').click();
    await page.locator('[placeholder="Пароль"]').fill(userData.userPassword);
    await page.locator('[data-testid="login-submit-btn"]').click();
    await expect(page).toHaveURL('https://netology.ru/profile');
    await expect(page.locator('h2')).toHaveText('Мои курсы и профессии');
  });

// некорректный ввод
test('test2', async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill('user@user');
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill('user@user.ru');
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill('123456789');
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator("[data-testid='login-error-hint']")).toHaveText(
    'Вы ввели неправильно логин или пароль'
);
});