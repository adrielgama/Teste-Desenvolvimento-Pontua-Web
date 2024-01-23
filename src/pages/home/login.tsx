import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign, Eye, EyeOff, ShieldQuestion } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import ArrowRightSquare from '@/assets/login_arrow_right.svg'
import Box from '@/components/box'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import { loginSchema } from '@/utils/schema'

function Login() {
  const navigate = useNavigate()
  const { login: onLogin, isAuthenticated } = useAuthContext()

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await onLogin(values.email, values.password)
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  const handleForgorPassword = () => {
    navigate('/forgot-password')
  }

  return (
    <Box
      title="Bem-vindo"
      symbol="."
      description="informe as suas credenciais de acesso ao portal"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Informe sua senha"
                        className={`rounded-[10px] px-4 py-7 placeholder:font-normal placeholder:text-gray-400 first-of-type:font-bold first-of-type:text-blue-500 focus:outline-none ${field.value ? 'border-blue-500' : 'border-gray-400'}`}
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <EyeOff
                            size={17}
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <Eye
                            size={17}
                            className={
                              field.value ? 'text-blue-500' : 'text-gray-400'
                            }
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <Button
            type="submit"
            className="mt-2 w-full gap-2 rounded-[10px] bg-blue-800 py-7 text-2xl font-bold text-white"
          >
            entrar
            <img src={ArrowRightSquare} alt="Seta para direita" />
          </Button>
        </Form>
        <div className="mt-3 flex w-full justify-end">
          <button
            className="flex cursor-pointer flex-row gap-1 text-end text-[11px] text-orange-400 "
            onClick={handleForgorPassword}
          >
            <ShieldQuestion size={14} />
            Esqueceu a senha?
          </button>
        </div>
      </div>
    </Box>
  )
}

export default Login
