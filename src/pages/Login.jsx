
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router'

import { loginSchema } from '../schemas/loginSchema'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  })

  async function onSubmit(dados) {
    const { error } = await login(dados.email, dados.senha)

    if (error) {
      setError('root.server', {
        message: 'E-mail ou senha incorretos.'
      })
      return
    }

    navigate('/registros')
  }

  return (
    <main style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '12px'
    }}>
      <h1>Entrar na sua conta</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')}
            style={{ display: 'block', width: '100%', padding: '10px' }}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register('senha')}
            style={{ display: 'block', width: '100%', padding: '10px' }}
          />
          {errors.senha && <p>{errors.senha.message}</p>}
        </div>

        {errors.root?.server && (
          <p>{errors.root.server.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isSubmitting ? 'Entrando...' : 'ENTRAR'}
        </button>
      </form>

      <p>
        Ainda não tem conta? <Link to="/registro">Cadastre-se</Link>
      </p>

      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </main>
  )
}

export default Login
