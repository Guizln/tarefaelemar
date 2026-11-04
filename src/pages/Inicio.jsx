import { Link } from 'react-router'

function Inicio() {
  return (
    <main className="container inicio">
      <section className="inicio-conteudo">
        <span className="subtitulo">SISTEMA DE GERENCIAMENTO</span>
        <h1>Game<span>Store</span></h1>
        <p>Consulte e gerencie sua biblioteca de jogos em um só lugar.</p>
        <Link className="btn-principal link-botao" to="/registros">
          Acessar jogos
        </Link>
      </section>
    </main>
  )
}

export default Inicio