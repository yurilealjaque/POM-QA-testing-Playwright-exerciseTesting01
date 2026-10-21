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

    async llenarEmailAddress(){
        
    }

    async llenarPassword(){
        
    }

    async llenarConfirmPassword(){
        
    }

    async clicarBotonCreateAccount(){
        
    }
    
    async registrar(){
        await this.llenarFullName();
        await this.llenarEmailAddress();
        await this.llenarPassword();
        await this.llenarConfirmPassword();
        await this.clicarBotonCreateAccount();

        
    }

}