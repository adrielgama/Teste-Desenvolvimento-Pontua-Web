import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import Box from '@/components/box'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import { recoverPasswordSchema } from '@/utils/schema'

function ForgotPassword() {
  const navigate = useNavigate()
  const { recoverPassword } = useAuthContext()

  const form = useForm<z.infer<typeof recoverPasswordSchema>>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof recoverPasswordSchema>) => {
    try {
      await recoverPassword(values.email)
      navigate('/recovery-password')
    } catch (error) {
      toast.error('E-mail não encontrado')
    }
  }

  return (
    <Box
      title="Recuperar senha"
      symbol="."
      description="Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua senha."
    >
      <div className="mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="e-mail"
                        placeholder="Informe seu e-mail"
                        className={`rounded-[10px] px-4 py-7 placeholder:font-normal placeholder:text-gray-400 first-of-type:font-bold first-of-type:text-blue-500 focus:outline-none ${field.value ? 'border-blue-500' : 'border-gray-400'}`}
                        {...field}
                      />
                      <div
                        className={`absolute inset-y-0 right-0 flex items-center pr-3 ${field.value ? 'text-blue-500' : 'text-gray-400'} cursor-pointer`}
                      >
                        <AtSign size={17} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-[10px] bg-blue-800 py-7 text-2xl font-bold text-white disabled:bg-gray-500"
              disabled={!form.formState.isValid}
            >
              enviar link
            </Button>
          </form>
        </Form>
      </div>
    </Box>
  )
}

export default ForgotPassword
