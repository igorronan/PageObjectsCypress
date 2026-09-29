import Base from "../PageBase";
// import Variaveis from "../variaveis/variaveis";

// const base = new Base;
// const variaveis = (new Variaveis).itens;

class Login extends Base {
    constructor(url = '') {
        super(url);
    }

    login(usuario, senha){
        this.visitar();
        this.digitar(this.variaveis.login.campo.usuario,usuario)
        this.digitar(this.variaveis.login.campo.senha,senha)
        this.clicar(this.variaveis.login.botao.login)
    }

    loginIncorreto(){
        this.login(this.variaveis.login.constantes.usuario, this.variaveis.login.constantes.senhaincorreta)
    }

    loginCorreto(){
        this.login(this.variaveis.login.constantes.usuario, this.variaveis.login.constantes.senha)
        
    }

    verificaUsuarioLogado(){
        this.visivel(this.variaveis.carrinho.icone.carrinho)
    }

    verificaErroLogin(){
        this.visivel(this.variaveis.login.alerta.loginincorreto)
        this.visivel(this.variaveis.geral.icone.iconedeErro)
    }
}
export default Login