
import { z } from 'zod'

export const registroSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  email: z
    .string()
    .trim()
    .email('Digite um e-mail válido'),

  senha: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),

  confirmarSenha: z
    .string()
    .min(1, 'Confirme sua senha')
}).refine((dados) => dados.senha === dados.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha']
})
