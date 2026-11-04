import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../services/supabase'

async function consultarJogos() {
  return supabase
    .from('games')
    .select('*')
    .order('id', { ascending: true })
}

function ListaJogos() {
  const [jogos, setJogos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({
    nome_jogo: '',
    distribuidora: '',
    preco_jogo: '',
    desenvolvedor: '',
    plataforma: '',
    versao_atual: '',
    idade_minima: '',
    idioma_jogo: ''
  })

  useEffect(() => {
    let ativo = true

    async function carregar() {
      const { data, error } = await consultarJogos()
      if (!ativo) return

      if (error) {
        setErro(error.message)
      } else {
        setJogos(data ?? [])
      }
      setCarregando(false)
    }

    carregar()
    return () => {
      ativo = false
    }
  }, [])

  async function atualizarLista() {
    setCarregando(true)
    setErro('')
    const { data, error } = await consultarJogos()

    if (error) {
      setErro(error.message)
    } else {
      setJogos(data ?? [])
    }
    setCarregando(false)
  }

  function atualizarCampo(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value })
  }

  function limparFormulario() {
    setForm({
      nome_jogo: '',
      distribuidora: '',
      preco_jogo: '',
      desenvolvedor: '',
      plataforma: '',
      versao_atual: '',
      idade_minima: '',
      idioma_jogo: ''
    })
    setEditando(null)
  }

  async function salvarJogo(evento) {
    evento.preventDefault()
    setErro('')

    const jogo = {
      nome_jogo: form.nome_jogo,
      distribuidora: form.distribuidora,
      preco_jogo: Number(form.preco_jogo),
      desenvolvedor: form.desenvolvedor,
      plataforma: form.plataforma,
      versao_atual: Number(form.versao_atual),
      idade_minima: Number(form.idade_minima),
      idioma_jogo: form.idioma_jogo
    }

    const resultado = editando !== null
      ? await supabase.from('games').update(jogo).eq('id', editando)
      : await supabase.from('games').insert([jogo])

    if (resultado.error) {
      setErro(resultado.error.message)
      return
    }

    limparFormulario()
    atualizarLista()
  }

  function editarJogo(jogo) {
    setEditando(jogo.id)
    setForm({
      nome_jogo: jogo.nome_jogo || '',
      distribuidora: jogo.distribuidora || '',
      preco_jogo: jogo.preco_jogo ?? '',
      desenvolvedor: jogo.desenvolvedor || '',
      plataforma: jogo.plataforma || '',
      versao_atual: jogo.versao_atual ?? '',
      idade_minima: jogo.idade_minima ?? '',
      idioma_jogo: jogo.idioma_jogo || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function excluirJogo(id) {
    if (!window.confirm('Tem certeza que deseja excluir este jogo?')) return

    const { error } = await supabase.from('games').delete().eq('id', id)
    if (error) {
      setErro(error.message)
      return
    }
    atualizarLista()
  }

  return (
    <main className="container">
      <header className="topo">
        <div>
          <span className="subtitulo">BIBLIOTECA</span>
          <h1>Jogos cadastrados</h1>
          <p>Consulte, cadastre e mantenha seus registros atualizados.</p>
        </div>
        <div className="contador">
          <strong>{jogos.length}</strong>
          <span>Jogos cadastrados</span>
        </div>
      </header>

      {erro && <div className="erro" role="alert">Erro: {erro}</div>}

      <section className="painel">
        <h2>{editando !== null ? 'Editar jogo' : 'Cadastrar novo jogo'}</h2>
        <form onSubmit={salvarJogo}>
          <div className="form-grid">
            <input name="nome_jogo" placeholder="Nome do jogo" value={form.nome_jogo} onChange={atualizarCampo} required />
            <input name="distribuidora" placeholder="Distribuidora" value={form.distribuidora} onChange={atualizarCampo} required />
            <input name="desenvolvedor" placeholder="Desenvolvedor" value={form.desenvolvedor} onChange={atualizarCampo} required />
            <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={atualizarCampo} required />
            <input name="preco_jogo" type="number" step="0.01" min="0" placeholder="Preço" value={form.preco_jogo} onChange={atualizarCampo} required />
            <input name="versao_atual" type="number" step="0.01" min="0" placeholder="Versão atual" value={form.versao_atual} onChange={atualizarCampo} required />
            <input name="idade_minima" type="number" min="0" placeholder="Idade mínima" value={form.idade_minima} onChange={atualizarCampo} required />
            <input name="idioma_jogo" placeholder="Idioma" value={form.idioma_jogo} onChange={atualizarCampo} required />
          </div>
          <div className="botoes">
            <button type="submit" className="btn-principal">
              {editando !== null ? 'Salvar alterações' : 'Cadastrar jogo'}
            </button>
            {editando !== null && (
              <button type="button" className="btn-cancelar" onClick={limparFormulario}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="lista">
        <div className="lista-topo">
          <h2>Biblioteca de jogos</h2>
          <button onClick={atualizarLista} className="btn-atualizar" disabled={carregando}>
            {carregando ? 'Carregando...' : 'Atualizar lista'}
          </button>
        </div>

        {carregando ? (
          <p className="mensagem" role="status">Carregando jogos...</p>
        ) : erro ? null : jogos.length === 0 ? (
          <p className="mensagem">Nenhum jogo cadastrado.</p>
        ) : (
          <div className="jogos-grid">
            {jogos.map((jogo) => (
              <article className="jogo-card" key={jogo.id}>
                <div className="jogo-id">ID #{jogo.id}</div>
                <h3>{jogo.nome_jogo}</h3>
                <p><strong>Distribuidora:</strong> {jogo.distribuidora}</p>
                <p><strong>Desenvolvedor:</strong> {jogo.desenvolvedor}</p>
                <p><strong>Plataforma:</strong> {jogo.plataforma}</p>
                <p><strong>Idioma:</strong> {jogo.idioma_jogo}</p>
                <p><strong>Versão:</strong> {jogo.versao_atual}</p>
                <p><strong>Classificação:</strong> {jogo.idade_minima}+</p>
                <div className="preco">R$ {Number(jogo.preco_jogo).toFixed(2)}</div>
                <div className="acoes">
                  <Link className="btn-editar link-acao" to={`/registros/${jogo.id}`}>
                    Ver detalhes
                  </Link>
                  <button className="btn-editar" onClick={() => editarJogo(jogo)}>
                    Editar
                  </button>
                  <button className="btn-excluir" onClick={() => excluirJogo(jogo.id)}>
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ListaJogos