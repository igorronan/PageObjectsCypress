import Login from "../../../modules/login/login";
import Carrinho from "../../../modules/carrinho/carrinho";


const login = new Login();
const carrinho = new Carrinho();

describe('Verificações sobre a pagina de carrinho', () => {
  beforeEach(() => {
    login.loginCorreto();
    login.verificaUsuarioLogado();
    carrinho.adicionarItens();
    carrinho.visitar('?/cart.html');

  })

  it('Deve verificar se todos os itens estão presentes no carrinho', () => {
    carrinho.visivel(carrinho.variaveis.carrinho.texto.tituloItem)
    carrinho.visivel(carrinho.variaveis.carrinho.texto.preco)
    carrinho.visivel(carrinho.variaveis.carrinho.botao.voltar)
    carrinho.visivel(carrinho.variaveis.carrinho.botao.checkout)
  }) 

  it('Deve verificar se o item foi removido do carrinho', () => {
    carrinho.clicar(carrinho.variaveis.carrinho.botao.removerItem)
    carrinho.totalItens(carrinho.variaveis.carrinho.texto.tituloItem, 0)
  })

  it('Deve verificar o icone do carrinho contem o total de itens adicionados', () => {
    carrinho.textoContem(carrinho.variaveis.carrinho.icone.totalitens, 1)  
  })

  it('Deve verificar se o usuario é redirecionado para a pagina de checkout', () => {
    carrinho.clicar(carrinho.variaveis.carrinho.botao.checkout)
    carrinho.textoContem(carrinho.variaveis.geral.texto.tituloPagina, 'Checkout')   
  })

  it.only('Deve verificar se o usuario é redirecionado para a pagina de inventario mantendo os itens do carrinho', () => {
    carrinho.clicar(carrinho.variaveis.carrinho.botao.voltar)
    carrinho.textoContem(carrinho.variaveis.geral.texto.tituloPagina, 'Products')
    carrinho.textoContem(carrinho.variaveis.carrinho.icone.totalitens, 1)     
  })


})