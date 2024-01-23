import { useNavigate } from 'react-router-dom'

import Box from '@/components/box'
import { Button } from '@/components/ui/button'

function PasswordRecovery() {
  const navigate = useNavigate()

  return (
    <Box
      title="Tudo certo "
      symbol=";)"
      description="Foi enviado um e-mail para você com instruções de como redefinir a sua senha."
      className="justify-start gap-4"
    >
      <div className="mt-2">
        <Button
          type="submit"
          className="mt-2 w-full gap-2 rounded-[10px] bg-blue-800 py-7 text-2xl font-bold text-white disabled:bg-gray-500"
          onClick={() => navigate('/')}
        >
          voltar para o login
        </Button>
      </div>
    </Box>
  )
}

export default PasswordRecovery
