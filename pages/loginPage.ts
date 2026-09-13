import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Iniciar sesión' });
    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
    }

    async completarFormularioLogin(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async completarYhacerClickBotonLogin(email: string, password: string) {
        await this.completarFormularioLogin(email, password);
        await this.loginButton.click();
    }

    async hacerClickBotonLogin() {
        await this.loginButton.click();
    }
}