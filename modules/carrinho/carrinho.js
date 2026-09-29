import Base from "../PageBase";


class Carrinho extends Base {
    constructor(url = '') {
        super(url);
    }

    adicionarItens(){  
        this.visitar('?/inventory.html');
        this.clicar(this.variaveis.geral.botao.adicionarCarrinho)
    }
}
export default Carrinho