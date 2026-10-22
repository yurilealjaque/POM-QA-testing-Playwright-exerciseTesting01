import test, { expect } from "@playwright/test";
import RegistroPage from "./pages/Registro";


let registroPage;
test.describe("Pruebas de Registro e2e", () => {

    test.beforeEach(async ({ page }) => {
        registroPage = new RegistroPage(page)

    });

    test('Registro con datos validos', async ({ page }) => {
        await registroPage.registrar('Leonardo', 'ljcl79@gmail.com', '12345678', '12345678');
        await expect(page.getByText('Logout', { exact: true })).toHaveText('Logout');

    });


    test('Registro con password diferente', async ({ page }) => {
        await registroPage.registrar('Otro usuario', 'otro@gmail.com', '12345678', '12343434348');
        await expect(registroPage.mensajeError).toHaveText('Passwords do not match');
    });

    test('Registro con password inválido', async ({ page }) => {
        await registroPage.registrar('Otro usuario con password invalido', 'otro@gmail.com', '123', '123');
        await expect(registroPage.mensajeError).toHaveText('Password must be at least 6 characters long');
    });
});