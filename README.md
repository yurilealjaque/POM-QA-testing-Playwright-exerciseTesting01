# Playwright E2E Testing – Arquitectura Page Object Model (POM)

Este repositorio contiene una suite de pruebas automatizadas End-to-End (E2E) construida con **Playwright** y **JavaScript**. Implementa el patrón de diseño **Page Object Model (POM)** sobre una plataforma de comercio electrónico para desacoplar la interfaz técnica de usuario de los escenarios de validación de negocio.

---

## 1. Estructura del proyecto

```text
├── tests/
│   ├── pages/
│   │   ├── Login.js           <- Page Object: Selectores y acciones de Login
│   │   └── Registro.js        <- Page Object: Selectores y acciones de Registro
│   ├── Login.spec.js          <- Test Suite: Escenarios de prueba de Login
│   └── Registro.spec.js       <- Test Suite: Escenarios de prueba de Registro
├── playwright-report/         <- Reportes HTML generados post-ejecución
├── test-results/              <- Evidencias de ejecución (capturas, videos, trazas)
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js       <- Configuración global de Playwright
└── README.md / README.txt
```

---

## 2. ¿Qué es el patrón Page Object Model (POM)?

El patrón POM divide las responsabilidades del framework en dos componentes:

### A) Page Objects (`tests/pages/`)

- Encapsulan los localizadores (Locators) del DOM de cada pantalla.
- Proveen métodos atómicos (interacciones directas como llenar campos o presionar botones) y métodos orquestadores de alto nivel.
- No realizan aserciones directas de prueba (`expect`); su única responsabilidad es operar la interfaz.

### B) Specs / Tests (`tests/*.spec.js`)

- Definen los escenarios funcionales (happy path y casos de error).
- Instancian los Page Objects necesarios y ejecutan los flujos de usuario.
- Contienen exclusivamente las aserciones (`expect`) para validar las respuestas del sistema.

---

## 3. Flujo lógico de ejecución

```text
[Playwright Test Runner]
        |
        v
1. Lee tests/Login.spec.js e inicia el bloque test.describe.
        |
        v
2. Por cada test individual (en un BrowserContext limpio y aislado):
        |
        +--> test.beforeEach() -> loginPage = new LoginPage(page).
        |
        +--> Invoca el flujo: await loginPage.entrarSesion(email, password)
        |      |
        |      +--> [Login.js] await page.goto(...) -> Navega a la app.
        |      +--> [Login.js] Click en el enlace 'Login'.
        |      +--> [Login.js] await llenarEmailAddressLogin(email)
        |      +--> [Login.js] await llenarPasswordLogin(password)
        |      +--> [Login.js] await clickbotonSingInLogin()
        |
        +--> Ejecuta la validación web-first (expect):
               - Caso Válido: expect(getByText('Logout')).toHaveText('Logout')
               - Caso Inválido: expect(getByText('Invalid email or password')).toBeVisible()
```

---

## 4. Código fuente y explicación detallada

### A) `tests/pages/Login.js`

```javascript
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

    async clickbotonSingInLogin(){
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
```

**Aspectos técnicos:**

- **JSDoc Typing:** el bloque `/** @param {import('@playwright/test').Page} page */` provee tipado al motor de JavaScript en VS Code, permitiendo autocompletar métodos nativos de Playwright sin requerir TypeScript.
- **Lazy Locators:** elementos como `this.page.getByRole()` y `this.page.getByLabel()` definen selectores basados en accesibilidad. No consultan el DOM en el constructor (no llevan `await`), sino que se evalúan de forma reactiva al ejecutar una acción (`.fill` o `.click`).
- **Auto-Waiting:** al ejecutar acciones asíncronas (`fill`, `click`), Playwright espera automáticamente a que el elemento esté en el DOM, visible y habilitado.

### B) `tests/Login.spec.js`

```javascript
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
});
```

**Aspectos técnicos:**

- **`test.beforeEach` y aislamiento de contexto:** cada test corre en un `BrowserContext` nuevo e independiente, garantizando que cookies, caché y sesiones no se crucen entre pruebas.
- **Web-First Assertions:** `expect(...).toHaveText()` y `expect(...).toBeVisible()` comprueban el DOM de manera asíncrona mediante reintentos continuos hasta cumplir la condición o agotar el timeout.

---

## 5. Comandos de ejecución

```bash
# Instalar dependencias del proyecto:
npm install

# Instalar navegadores requeridos por Playwright (Chromium, Firefox, WebKit):
npx playwright install

# Ejecutar la suite completa de pruebas en la terminal:
npx playwright test

# Ejecutar únicamente las pruebas del archivo Login.spec.js:
npx playwright test tests/Login.spec.js

# Ejecutar las pruebas en modo interactivo (UI Mode):
npx playwright test --ui

# Visualizar el reporte HTML detallado de la última ejecución:
npx playwright show-report
```