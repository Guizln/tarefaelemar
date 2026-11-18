import { Link, Route, Routes } from 'react-router'
import Inicio from './pages/Inicio'
import ListaJogos from './pages/ListaJogos'
import DetalheJogo from './pages/DetalheJogo'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './App.css'

function App() {
  return (
    <>
      <nav className="navegacao" aria-label="Navegação principal">
        <Link className="marca" to="/">
          Game<span>Store</span>
        </Link>
        <div className="navegacao-links">
          <Link to="/">Início</Link>
          <Link to="/registros">Jogos</Link>
          <Link className="botao-login" to="/login">Entrar</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registros" element={<ListaJogos />} />
        <Route path="/registros/:id" element={<DetalheJogo />} />
        <Route
          path="*"
          element={
            <main className="container">
              <section className="painel estado-pagina">
                <h1>Página não encontrada</h1>
                <Link className="link-detalhe" to="/">
                  Voltar ao início
                </Link>
              </section>
            </main>
          }
        />
      </Routes>
    </>
  )
}

export default App