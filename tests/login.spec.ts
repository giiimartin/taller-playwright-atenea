import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
//import { TestData } from '../data/testData.json';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.visitarPaginaLogin();
});

test('TC-07 Verificar elementos en la pagina de login', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
});

test('TC-08 Verificar inicio de sesión exitoso con credenciales válidas', async ({ page }) => {
    //  await loginPage.completarYhacerClickBotonLogin(TestData.usuarioValido.email, TestData.usuarioValido.contraseña);
    await loginPage.completarYhacerClickBotonLogin(
        'e.giii.martin@gmail.com',
        'QAautgise'
    );

    await expect(page.getByText('Inicio de sesión exitoso')).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toBeVisible();
});

test('TC-09 Verificar inicio de sesión con credenciales inválidas', async ({ page }) => {
    //  await loginPage.completarYhacerClickBotonLogin(TestData.usuarioValido.email, TestData.usuarioValido.contraseña);
    await loginPage.completarYhacerClickBotonLogin(
        'a@gmail.com',
        'QA'
    );

    await expect(page.getByText('Invalid credentials')).toBeVisible();
});