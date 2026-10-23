import { test, expect } from "@playwright/test";
import LoginPage from "./pages/Login";


let loginPage; 

test.describe('Prubas de login e2e ' , () => {
    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
    });


    test('Registros con datos validos', async({page})=> {
        await loginPage.entrarSesion('admin@example.com', 'admin123');
        await expect(page.getByText('Logout', { exact: true })).toHaveText('Logout');


    })
     test('Registro con password inválido', async ({ page }) => {
        await loginPage.entrarSesion('admin@example.com', '123');
        await expect(page.getByText('Invalid email or password', { exact: true })).toBeVisible();
      
    });



})