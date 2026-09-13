import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
//import { TestData } from '../data/testData.json';

  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.visitarPaginaRegistro();
  });

  test('TC-01 Verificar elementos en la pagina de registro', async () => {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
    await expect(registerPage.loginButton).toBeVisible();
  });

  test('TC-02 Verificar botón de registro está inhabilitado por defecto', async () => {
    await expect(registerPage.registerButton).toBeDisabled();
  });

  test('TC-03 Verificar que el botón de registro se habilita al completar los campos del formulario ', async () => {
    await registerPage.completarFormularioRegistro('Gise', 'Martin', 'Gise@gmail.com', 'superseguro123');
    await expect(registerPage.registerButton).toBeEnabled();
  });

  test('TC-04 Verificar redireccionamiento a página de inicio de sesión al hacer click en el botón registrarse', async ({ page }) => {
    await registerPage.hacerClickBotonLogin();
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('TC-05 Verificar registro exitoso con datos válidos', async ({ page }) => {
    await registerPage.completarYhacerClickBotonRegistro('Gise', 'Martin', 'GiseM' + Date.now().toString() + '@gmail.com', 'superseguro123');
    await expect(page.getByText('Registro exitoso')).toBeVisible();
  });

  test('TC-06 Verificar que un usuario no pueda registrarse con un correo existente', async ({ page }) => {
    const email = 'GiseM' + Date.now().toString() + '@gmail.com';
    const snackbar = page.locator('#notistack-snackbar');
    await registerPage.completarYhacerClickBotonRegistro('Gise', 'Martin', email, 'superseguro123');
    await expect(page.getByText('Registro exitoso')).toBeVisible();
    await registerPage.visitarPaginaRegistro();
    await registerPage.completarYhacerClickBotonRegistro('Gise', 'Martin', email, 'superseguro123');
    await expect(page.getByText('Registro exitoso')).not.toBeVisible();
    await expect(snackbar).toContainText('Email already in use');
    await expect(snackbar).toBeVisible();
    await expect(snackbar).toBeHidden();
  });