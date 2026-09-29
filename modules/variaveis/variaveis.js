class Variaveis{
    itens ={
        login: {
            campo: {
                usuario: '[data-test="username"]',
                senha: '[data-test="password"]'
            },
            botao: {
                login: '[data-test="login-button"]'
            },
            constantes: {
                usuario: 'standard_user',
                senha: 'secret_sauce',
                senhaincorreta: '123456'
            },
            alerta:{
                loginincorreto: '[data-test="error"]'
            }
        },
        carrinho: {
            icone: {
                carrinho:'[data-test="shopping-cart-link"]',
                totalitens: '[class="shopping_cart_badge"]'
            },
            texto:{
                carrinhoVazio: '[data-test="cart-empty"]',
                tituloItem: '[data-test="inventory-item-name"]',
                preco: '[data-test="inventory-item-price"]',
            },
            botao:{
                removerItem: '[data-test="remove-sauce-labs-backpack"]',
                checkout: '[data-test="checkout"]',
                voltar: '[data-test="continue-shopping"]',
            },
            outros:{
                tabelaItens: '[class="cart_list"]',
            }
        },
        geral: {
            icone: {
                iconedeErro: '[data-icon="circle-xmark"]'
            },
            botao: {
                adicionarCarrinho: '[data-test="add-to-cart-sauce-labs-backpack"]'
            },
            texto: {
                tituloPagina: '[class="title"]',
            }
        },
        padrao:{
            icone: {},
            botao: {},
            texto: {},
            campo: {},
            alerta: {},
            outros: {},
            constantes: {},
        }
    }
}

export default Variaveis