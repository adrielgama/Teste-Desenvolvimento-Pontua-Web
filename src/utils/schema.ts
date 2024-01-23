import z from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Precisa ser um email válido.',
  }),
  password: z.string().min(3, {
    message: 'Use 3 caracteres ou mais.',
  }),
})

export const recoverPasswordSchema = z.object({
  email: z.string().email({
    message: 'Precisa ser um email válido.',
  }),
})
