import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { supabase } from '../services/supabase'

function DetalheJogo() {
  const { id } = useParams()
  const [resultado, setResultado] = useState({ id: null, jogo: null, erro: '', concluido: false })

  useEffect(() => {
    let ativo = true

    async function carregarJogo() {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (ativo) {
        setResultado({ id, jogo: data, erro: error?.message ?? '', concluido: true })
      }
    }

    carregarJogo()
    return () => {
      ativo = false
    }
  }, [id])

  const carregando = resultado.id !== id || !resultado.concluido
  const jogo = resultado.id === id ? resultado.jogo : null
  const erro = resultado.id === id ? resultado.erro : ''

  return (
    <main className="container">
      <section className="painel detalhe">
        <Link className="link-voltar" to="/registros">← Voltar à listagem</Link>
        {carregando ? (
          <p className="mensagem" role="status">Carregando detalhes...</p>
        ) : erro ? (
          <div className="erro" role="alert">Erro ao consultar o jogo: {erro}</div>
        ) : !jogo ? (
          <p className="mensagem">Jogo não encontrado.</p>
        ) : (
          <>
            <span className="subtitulo">DETALHES DO REGISTRO #{jogo.id}</span>
            <h1>{jogo.nome_jogo}</h1>
            <div className="detalhe-grid">
              <p><strong>Distribuidora</strong><span>{jogo.distribuidora}</span></p>
              <p><strong>Desenvolvedor</strong><span>{jogo.desenvolvedor}</span></p>
              <p><strong>Plataforma</strong><span>{jogo.plataforma}</span></p>
              <p><strong>Idioma</strong><span>{jogo.idioma_jogo}</span></p>
              <p><strong>Versão</strong><span>{jogo.versao_atual}</span></p>
              <p><strong>Classificação etária</strong><span>{jogo.idade_minima}+</span></p>
              <p><strong>Preço</strong><span>R$ {Number(jogo.preco_jogo).toFixed(2)}</span></p>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default DetalheJogo