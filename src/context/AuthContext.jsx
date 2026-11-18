
import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { supabase } from '../services/supabase'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let ativo = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!ativo) return

      if (error) {
        console.error('Não foi possível verificar a sessão:', error)
      }

      setUsuario(data.session?.user ?? null)
      setCarregando(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUsuario(session?.user ?? null)
      setCarregando(false)
    })

    return () => {
      ativo = false
      subscription.unsubscribe()
    }
  }, [])

  function login(email, senha) {
    return supabase.auth.signInWithPassword({ email, password: senha })
  }

  function cadastrar(email, senha, nomeCompleto) {
    return supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome_completo: nomeCompleto } }
    })
  }

  function sair() {
    return supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, login, cadastrar, sair }}
    >
      {children}
    </AuthContext.Provider>
  )
}
