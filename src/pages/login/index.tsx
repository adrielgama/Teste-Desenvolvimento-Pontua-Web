import LogoPontuaWhite from '@/assets/logo_pontua_white.svg'

import CharacterPicker from './CharacterPicker'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import PasswordRecovery from './PasswordRecovery'

interface FormPageProps {
  page: string
}
type PageComponents = {
  [key: string]: React.ReactNode
}

const pages: PageComponents = {
  login: <Login />,
  characterPicker: <CharacterPicker />,
  forgotPassword: <ForgotPassword />,
  passwordRecovery: <PasswordRecovery />,
}

const FormPage: React.FC<FormPageProps> = ({ page }) => {
  const selectedPage = pages[page]

  return (
    <div className="h-screen w-screen bg-blue-900 p-4 font-navigation">
      <div className="absolute lg:left-36">
        <img src={LogoPontuaWhite} alt="Logo PONTUA cor branca" />
      </div>
      {selectedPage}
    </div>
  )
}

export default FormPage
