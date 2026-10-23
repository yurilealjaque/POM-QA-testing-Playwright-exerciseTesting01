# Playwright E2E Testing – Arquitectura Page Object Model (POM)

Este proyecto contiene una suite de pruebas automatizadas End-to-End (E2E) desarrollada con **Playwright** y **JavaScript**. Implementa el patrón de diseño **Page Object Model (POM)** para garantizar escalabilidad, legibilidad y facilidad de mantenimiento al probar una aplicación web de comercio electrónico.

---

## 1. Estructura del proyecto

```text
├── pages/
│   └── Login.js           <- Page Object: Localizadores y acciones de la vista
└── tests/
    └── Login.spec.js      <- Test Suite: Definición de casos de prueba y aserciones
```

---

## 2. ¿Qué es el patrón Page Object Model (POM)?

El patrón POM divide la automatización en dos capas independientes:

### A) Capa de Interacción y Modelo (`pages/Login.js`)

- Modela la página web como un objeto en JavaScript.
- Almacena los localizadores del DOM orientados a accesibilidad.
- Expone métodos de acción atómicos (ej. llenar inputs, clicks) y métodos de flujo compuesto (ej. `entrarSesion`).
- **Regla de oro:** no contiene aserciones de prueba (`expect`).

### B) Capa de Casos de Prueba y Validación (`tests/Login.spec.js`)

- Define los escenarios de negocio (pruebas positivas y negativas).
- Llama a los métodos del Page Object para ejecutar las acciones en el navegador.
- Contiene exclusivamente las aserciones (`expect`) para validar el comportamiento.

---

## 3. Flujo lógico de ejecución

```text
[Playwright Test Runner]
        |
        v
1. Ejecuta tests/Login.spec.js y agrupa los tests con test.describe.
        |
        v
2. Por cada test individual (aislado en su propio contexto de navegador):
        |
        +--> test.beforeEach() -> Instancia: loginPage = new LoginPage(page).
        |
        +--> Ejecuta el test: await loginPage.entrarSesion(usuario, password)
        |      |
        |      +--> [Login.js] Navega a la URL base y abre el formulario.
        |      +--> [Login.js] Rellena el campo Email mediante .fill()
        |      +--> [Login.js] Rellena el campo Password mediante .fill()
        |      +--> [Login.js] Dispara el clic en el botón 'Sign In'
        |
        +--> Ejecuta la aserción en el test:
               - Login Válido: valida aparición de 'Logout' con expect().toHaveText()
               - Login Inválido: valida aparición de error con expect().toBeVisible()
```

---

## 4. Detalle técnico de los scripts

### A) `pages/Login.js`

- **JSDoc** (`@param {import('@playwright/test').Page} page`): permite habilitar el autocompletado nativo (IntelliSense) de Playwright en JavaScript puro.
- **Lazy Locators:** definir localizadores con `getByRole` y `getByLabel` no busca en el DOM de inmediato ni requiere `await` en el constructor; Playwright pospone la búsqueda hasta el momento exacto de interactuar (`.fill` o `.click`).
- **Auto-Waiting:** al ejecutar métodos como `.fill()` o `.click()`, Playwright espera automáticamente a que los elementos estén presentes, visibles y habilitados.

### B) `tests/Login.spec.js`

- **Hooks de ciclo de vida:** `test.beforeEach` garantiza un navegador limpio para cada prueba, aislando cookies, almacenamiento y sesiones residuales.
- **Web-First Assertions:** aserciones como `expect(...).toBeVisible()` o `.toHaveText()` esperan activamente y reintentan la verificación de forma asíncrona hasta que se cumpla la condición esperada o termine el timeout configurado.

---

## 5. Comandos de ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Instalar navegadores de Playwright:

   ```bash
   npx playwright install
   ```

3. Ejecutar todas las pruebas en consola:

   ```bash
   npx playwright test
   ```

4. Ejecutar pruebas en modo visual e interactivo:

   ```bash
   npx playwright test --ui
   ```

5. Abrir reporte HTML de resultados:

   ```bash
   npx playwright show-report
   ```