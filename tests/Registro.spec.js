import test from "@playwright/test";
import RegistroPage from "./pages/Registro";

test.describe("Pruebas de Registro e2e", () =>{

    test.beforeEach(async ({ page }) => {
        registroPage = new RegistroPage

    });

    test('Registro con datos validos', async ({ page }) =>{

    });

    test('Registro con password diferente', async ({ page }) =>{

    });

    test('Registro con password invalido', async ({ page }) =>{

    });
    


});