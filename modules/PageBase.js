
import Variaveis from "./variaveis/variaveis";

class Base{

    variaveis = (new Variaveis).itens;

    constructor(url = '') {
        this.baseurl = 'https://www.saucedemo.com/' + url;
    }

    visitar(url = ''){
        cy.log(this.baseurl + url)
        cy.visit(this.baseurl + url)
    }

    pegar(localizador){
        return cy.get(localizador)
    }

    digitar(localizador, texto){
        this.pegar(localizador).type(texto)
    }

    clicar(localizador){
        this.pegar(localizador).click();
    }

    visivel(localizador){
        this.pegar(localizador).should('be.visible')
    }

    invisivel(localizador){
        this.pegar(localizador).should('not.be.visible')
    }

    totalItens(localizador, quantidade){
        this.pegar(localizador).should('have.length', quantidade)
    }

    textoContem(localizador, texto){
        this.pegar(localizador).should('contain.text', texto)
    }   

}

export default Base;