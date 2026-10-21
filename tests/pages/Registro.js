class RegistroPage {
    // propiedades de la pagina
    // seran los elementos disponibles
    /** @param {import('@playwright/test').Page} page */  // este comentario es para que vs code autocomplete con los metodos de play
    constructor(page) {
        this.page = page;
        this.inputFullName = this.page.getByRole('textbox', { name: 'Full Name' });
        this.inputEmailAddress = this.page.getByRole('textbox', { name: 'Email Address' });
        this.inputPassword = this.page.getByLabel('Password', { exact: true });
        this.inputConfirmPassword = this.page.getByLabel('Confirm Password', { exact: true });
        this.botonCreateAccount = this.page.getByRole('button', { name: 'Create Account' });
        this.mensajeError = this.page.getByText('Password must be at least 6 characters long', { exact: true });
    }

    // Acciones

    async llenarFullName(value){
        await this.inputFullName.fill(value)

    }

    async llenarEmailAddress(value){
        await this.inputEmailAddress.fill(value)
        
    }

    async llenarPassword(value){
        await this.inputPassword.fill(value)
        
    }

    async llenarConfirmPassword(value){
        await this.inputConfirmPassword.fill(value)
        
    }

    async clicarBotonCreateAccount(){
        await this.botonCreateAccount.click()
        
    }
    
    async registrar(fullName, emailAddress, password, confirmPassword){
        // Se entra a la pagina

        await this.page.goto('https://ecommerce-js-test.vercel.app/');
        await this.page.getByRole('link', { name: 'Register' })

        // se accede a los metodos

        await this.llenarFullName(fullName);
        await this.llenarEmailAddress(emailAddress);
        await this.llenarPassword(password);
        await this.llenarConfirmPassword(confirmPassword);
        await this.clicarBotonCreateAccount();

        
    }

}

export default RegistroPage;