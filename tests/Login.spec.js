import test, { expect } from "@playwright/test";
import LoginPage from "./pages/Login";


let loginPage; 

test.describe('Prubas de login e2e ' , () => {
    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
    })

})