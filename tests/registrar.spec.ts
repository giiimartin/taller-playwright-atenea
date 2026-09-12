import { test, expect } from '@playwright/test';

test.describe('Feature: Registro de usuario', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('TC-01 Verificar elementos en la página de registro', async ({ page }) => {
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  });

  test('TC-02 Verificar botón de registro está inhabilitado por defecto', async ({ page }) => {
    await expect(page.getByTestId('boton-registrarse')).toBeDisabled();
  });

  test('TC-03 Verificar que el botón de registro se habilita al completar los campos del formulario', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill('Gise');
    await page.locator('input[name="lastName"]').fill('Martin');
    await page.locator('input[name="email"]').fill('Gise@gmail.com');
    await page.locator('input[name="password"]').fill('superseguro123');

    await expect(page.getByTestId('boton-registrarse')).toBeEnabled();
  });

  test('TC-04 Verificar redireccionamiento a página de inicio de sesión', async ({ page }) => {
    await page.getByTestId('boton-login-header-signup').click();

    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('TC-05 Verificar registro exitoso con datos válidos', async ({ page }) => {
    await page.locator('input[name="firstName"]').fill('Gise');
    await page.locator('input[name="lastName"]').fill('Martin');
    await page.locator('input[name="email"]')
      .fill('GiseM' + Date.now().toString() + '@gmail.com');
    await page.locator('input[name="password"]').fill('atenea123');

    await page.getByTestId('boton-registrarse').click();

    await expect(page.getByText('Registro exitoso')).toBeVisible();
  });

  test('TC-06 Verificar que un usuario no pueda registrarse con un correo existente', async ({ page }) => {
    const email = 'GiseM' + Date.now().toString() + '@gmail.com';
    const snackbar = page.locator('#notistack-snackbar');

    await page.locator('input[name="firstName"]').fill('Gise');
    await page.locator('input[name="lastName"]').fill('Martin');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill('atenea123');

    await page.getByTestId('boton-registrarse').click();

    await expect(page.getByText('Registro exitoso')).toBeVisible();

    await page.goto('http://localhost:3000/');

    await page.locator('input[name="firstName"]').fill('Gise');
    await page.locator('input[name="lastName"]').fill('Martin');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill('atenea123');

    await page.getByTestId('boton-registrarse').click();

    await expect(snackbar).toContainText('Email already in use');
    await expect(snackbar).toBeVisible();
  });

});