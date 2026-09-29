# Cypress Page Object Model

Projeto base para automação de testes E2E utilizando **Cypress**, organizado com o padrão **Page Object Model (POM)**.

A estrutura foi desenvolvida para separar os **cenários de teste**, as **ações da aplicação**, os **seletores** e as **constantes utilizadas pelos testes**, facilitando a manutenção e permitindo uma futura adaptação para outro framework, como **Playwright**.

---

## 📁 Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── carrinho/
│   │   └── login/
│   │
│   ├── fixtures/
│   │
│   └── support/
│
├── modules/
│   ├── carrinho/
│   ├── login/
│   └── variaveis/
│
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidade de cada diretório

| Diretório              | Responsabilidade                                        |
| ---------------------- | ------------------------------------------------------- |
| `cypress/e2e`          | Cenários de teste                                       |
| `cypress/e2e/login`    | Testes relacionados ao login                            |
| `cypress/e2e/carrinho` | Testes relacionados ao carrinho                         |
| `cypress/fixtures`     | Dados externos utilizados pelos testes                  |
| `cypress/support`      | Configurações e comandos globais do Cypress             |
| `modules/login`        | Page Objects e funcionalidades relacionadas ao login    |
| `modules/carrinho`     | Page Objects e funcionalidades relacionadas ao carrinho |
| `modules/variaveis`    | Seletores, constantes e demais variáveis centralizadas  |

---

# 🏗️ Conceito da arquitetura

O projeto separa o teste da implementação da interface.

A estrutura segue o fluxo:

```text
┌───────────────────────────┐
│       cypress/e2e          │
│                            │
│       Cenário de teste     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│          modules           │
│                            │
│ Page Objects / Funcional. │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│       variaveis            │
│                            │
│ Seletores / Constantes     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│          Cypress           │
└───────────────────────────┘
```

Dessa forma, o teste não precisa conhecer diretamente os seletores utilizados pela aplicação.

---

# 🧪 Testes

Os testes ficam dentro de:

```text
cypress/e2e/
```

Organizados por funcionalidade:

```text
cypress/
└── e2e/
    ├── login/
    │   └── login.cy.js
    │
    └── carrinho/
        └── carrinho.cy.js
```

Um teste deve descrever **o comportamento que está sendo validado**, evitando concentrar detalhes de implementação.

Exemplo:

```javascript
describe('Login', () => {

    it('Deve realizar login com usuário válido', () => {

        loginPage.acessar();

        loginPage.realizarLogin(
            variaveis.itens.login.constantes.usuario,
            variaveis.itens.login.constantes.senha
        );

        loginPage.validarLoginRealizado();

    });

});
```

A intenção é que o teste seja facilmente compreendido mesmo por alguém que não conheça os detalhes da implementação da página.

---

# 📦 Modules

A pasta `modules` contém a implementação das funcionalidades utilizadas pelos testes.

```text
modules/
├── carrinho/
├── login/
└── variaveis/
```

Cada módulo representa uma área ou funcionalidade da aplicação.

---


# 📌 Variáveis centralizadas

Uma característica importante deste projeto é a existência de um arquivo específico para centralizar **seletores e constantes**.

A ideia é manter em um único local informações relacionadas à interface e aos dados utilizados pelo módulo.


---

# 🔄 Utilização das constantes

As constantes podem ser acessadas diretamente pelo Page Object ou pelo teste.

Exemplo:

```javascript
variaveis.itens.login.constantes.usuario
```

Retorna:

```text
usuario
```

E:

```javascript
variaveis.itens.login.constantes.senha
```

retorna:

```text
senha
```

Isso evita espalhar valores fixos pelo projeto.

---

# 🌎 Cypress.env()

As constantes centralizadas também podem ser substituídas posteriormente por variáveis de ambiente do Cypress.

Por exemplo, atualmente:

```javascript
variaveis.itens.login.constantes.usuario
```

pode retornar:

```text
standard_user
```

Posteriormente, caso seja necessário utilizar diferentes ambientes:

```javascript
Cypress.env('usuario')
```

pode ser utilizado.

Exemplo:

```javascript
const usuario =
    Cypress.env('usuario') ||
    variaveis.itens.login.constantes.usuario;
```

Dessa maneira, é possível manter um valor padrão no projeto e permitir que o valor seja sobrescrito externamente.

---

# 🔐 Dados sensíveis

Dados como:

* senhas;
* tokens;
* usuários reais;
* chaves de API;
* credenciais de ambientes;

não devem ser versionados no GitHub.

Para esses casos, recomenda-se utilizar variáveis de ambiente.

Exemplo:

```javascript
const senha =
    Cypress.env('senha') ||
    variaveis.itens.login.constantes.senha;
```

Assim, a constante pode servir como valor padrão para ambientes de teste, enquanto ambientes reais podem fornecer o valor através do Cypress.


---

# 🔎 Seletores

Os seletores devem ser centralizados no arquivo de variáveis.

Exemplo:

```javascript
campo: {

    usuario: '[data-test="username"]',

    senha: '[data-test="password"]'

}
```

Assim, o teste ou Page Object não precisa conhecer diretamente:

```text
[data-test="username"]
```

Caso a aplicação altere:

```html
<input data-test="username">
```

para:

```html
<input data-test="user">
```

a alteração poderá ser realizada no arquivo de variáveis:

```javascript
usuario: '[data-test="user"]'
```

sem necessidade de alterar todos os testes que utilizam esse campo.

---

# 🏷️ Preferência por seletores estáveis

Sempre que possível, utilizar atributos específicos para automação:

```html
data-test="username"
```

```html
data-test="password"
```

```html
data-test="login-button"
```

Evitar seletores baseados exclusivamente na estrutura visual:

```javascript
cy.get('.btn.btn-primary');
```

ou:

```javascript
cy.get('div:nth-child(3) > button');
```

---

# 🧱 Princípios do projeto

## 1. Teste não deve conhecer o seletor

Evitar:

```javascript
cy.get('[data-test="username"]')
    .type('standard_user');
```

Preferir:

```javascript
loginPage.preencherUsuario(usuario);
```

---

## 2. Page Object não deve espalhar constantes

Evitar:

```javascript
cy.get('[data-test="username"]')
    .type('standard_user');
```

Preferir:

```javascript
cy.get(
    variaveis.itens.login.campo.usuario
)
.type(
    variaveis.itens.login.constantes.usuario
);
```

---

## 3. Variáveis devem possuir contexto

Evitar:

```javascript
variaveis.usuario
variaveis.senha
variaveis.botao
```

Preferir:

```javascript
variaveis.itens.login.constantes.usuario
variaveis.itens.login.constantes.senha
variaveis.itens.login.botao.login
```

Isso evita conflitos conforme o projeto cresce.

---

# 🚀 Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre no projeto:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

---

# ▶️ Executando o Cypress

Abrir o Cypress:

```bash
npx cypress open
```

Executar os testes:

```bash
npx cypress run
```

Caso exista um script configurado no `package.json`:

```bash
npm run cypress
```

---

# 🧪 Executando um teste específico

Exemplo:

```bash
npx cypress run \
    --spec "cypress/e2e/login/login.cy.js"
```

Para o módulo de carrinho:

```bash
npx cypress run \
    --spec "cypress/e2e/carrinho/carrinho.cy.js"
```

---

# 📌 Fluxo para criação de uma nova funcionalidade

Ao adicionar uma nova funcionalidade:

### 1. Criar o módulo

```text
modules/
└── novaFuncionalidade/
```

### 2. Criar o Page Object

```text
modules/
└── novaFuncionalidade/
    └── NovaFuncionalidadePage.js
```

### 3. Adicionar as variáveis

```javascript
itens: {

    novaFuncionalidade: {
      icone: {},
      botao: {},
      texto: {},
      campo: {},
      alerta: {},
      outros: {},
      constantes: {},
    }

}
```

### 4. Criar os testes

```text
cypress/
└── e2e/
    └── novaFuncionalidade/
        └── novaFuncionalidade.cy.js
```

### 5. Implementar as ações no Page Object

```javascript
novaAcao() {

    cy.get(
        variaveis.itens.novaFuncionalidade.botao.acao
    ).click();

}
```

### 6. Utilizar o Page Object no teste

```javascript
it('Deve executar nova ação', () => {

    novaFuncionalidadePage.novaAcao();

});
```

---

# 📋 Checklist

Antes de criar ou alterar um teste:

* [ ] O teste está em `cypress/e2e`?
* [ ] O módulo correspondente está em `modules`?
* [ ] Os seletores estão centralizados?
* [ ] As constantes estão no contexto correto?
* [ ] Dados sensíveis estão fora do código versionado?
* [ ] O Page Object contém as ações da página?
* [ ] O teste contém apenas o cenário/validação?
* [ ] É possível sobrescrever constantes utilizando `Cypress.env()` quando necessário?
* [ ] Foi evitado o uso de seletores diretamente no teste?
* [ ] Foi evitado `cy.wait()` fixo quando existe uma condição melhor para aguardar?
* [ ] A alteração mantém a possibilidade de evolução para Playwright?

---

# 📐 Padrão resumido

A arquitetura pode ser resumida em:

```text
cypress/e2e
    │
    │  Cenários
    ▼
modules
    │
    │  Page Objects
    ▼
modules/variaveis
    │
    │  Seletores + Constantes
    ▼
Cypress
```

Os **testes descrevem o que deve acontecer**.

Os **Page Objects descrevem como interagir com a aplicação**.

O arquivo de **variáveis centraliza seletores e constantes**.

O `Cypress.env()` pode fornecer valores específicos de cada ambiente quando necessário.

---
