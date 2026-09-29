import Login from "../../../modules/login/login";
const login = new Login();

describe('Verificações sobre o login', () => {
  beforeEach(() => {
  })

  it('Deve verificar logar com um usuario valido', () => {
    login.loginCorreto();
    login.verificaUsuarioLogado()
  })  
  
  it('Deve verificar logar com ususario incorreto', () => {
    login.loginIncorreto();
    login.verificaErroLogin()
  })
  
  it('Deve verificar se quando acessar uma pagina restrita volta para a pagina principal', () => {
    login.visitar('?/inventory-item.html?id=4');
    login.verificaErroLogin()
  })


})