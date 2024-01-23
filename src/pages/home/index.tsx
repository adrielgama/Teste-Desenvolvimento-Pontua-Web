import LogoPontuaWhite from '@/assets/logo_pontua_white.svg'

import ForgotPassword from './forgotPassword'
import Login from './login'
import PasswordRecovery from './passwordRecovery'

interface FormPageProps {
  page: string
}
type PageComponents = {
  [key: string]: React.ReactNode
}

const pages: PageComponents = {
  login: <Login />,
  forgotPassword: <ForgotPassword />,
  passwordRecovery: <PasswordRecovery />,
}

const FormPage: React.FC<FormPageProps> = ({ page }) => {
  const selectedPage = pages[page]

  return (
    <div className="bg-blue-900 h-screen w-screen p-4 font-navigation">
      <div className="absolute lg:left-36">
        <img src={LogoPontuaWhite} alt="Logo PONTUA cor branca" />
      </div>
      {selectedPage}
    </div>
  )
}

export default FormPage
