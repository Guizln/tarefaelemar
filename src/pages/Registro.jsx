
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router'

import { registroSchema } from '../schemas/registroSchema'
import { useAuth } from '../context/useAuth'

function Registro() {
  const { cadastrar } = useAuth()
  const navigate = useNavigate()
  const [mensagem, setMensagem] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registroSchema),
    mode: 'onBlur'
  })

  async function onSubmit(dados) {
    setMensagem('')

    const { data, error } = await cadastrar(
      dados.email,
      dados.senha,
      dados.nomeCompleto
    )

    if (error) {
      setError('root.server', {
        message: 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.'
      })
      return
    }

    if (data.session) {
      navigate('/registros')
    } else {
      setMensagem(
        'Cadastro realizado! Verifique seu e-mail para confirmar sua conta.'
      )
    }
  }

  return (
    <div>
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome completo</label>
          <input
            type="text"
            {...register('nomeCompleto')}
          />
          {errors.nomeCompleto && (
            <p>{errors.nomeCompleto.message}</p>
          )}
        </div>

        <div>
          <label>E-mail</label>
          <input
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            {...register('senha')}
          />
          {errors.senha && (
            <p>{errors.senha.message}</p>
          )}
        </div>

        <div>
          <label>Confirmar senha</label>
          <input
            type="password"
            {...register('confirmarSenha')}
          />
          {errors.confirmarSenha && (
            <p>{errors.confirmarSenha.message}</p>
          )}
        </div>

        {errors.root?.server && (
          <p>{errors.root.server.message}</p>
        )}

        {mensagem && <p>{mensagem}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  )
}

export default Registro
