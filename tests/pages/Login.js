class LoginPage {
    // propiedades de la pagina
    // seran los elementos disponibles
    
    
    /** @param {import('@playwright/test').Page} page */  // este comentario es para que vs code autocomplete con los metodos de play
    
    
    constructor(page) {
        this.page = page;

        this.inputEmailAddressLogin = this.page.getByRole('textbox', { name: 'Email Address' })
        this.inputPasswordLogin =  this.page.getByLabel('Password')
        this.botonSingInLogin = this.page.getByRole('button', { name: 'Sign In' })

    
    }


    async llenarEmailAddressLogin(value){
        await this.inputEmailAddressLogin.fill(value)
        

    } 

    async llenarPasswordLogin(value){
        await this.inputPasswordLogin.fill(value)  
    
    }

    async clickbotonSingInLogin(value){

        await this.botonSingInLogin.click()
    }


    async entrarSesion(emailAddress, paswordlogin){
        await this.page.goto('https://ecommerce-js-test.vercel.app/');
        await this.page.getByRole('link', { name: 'Login' }).click();

        await this.llenarEmailAddressLogin(emailAddress);
        await this.llenarPasswordLogin(paswordlogin);
        await this.clickbotonSingInLogin();


    }

    


}

export default LoginPage
