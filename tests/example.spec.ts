import { test, expect } from '@playwright/test'

const user = {
  email: 'user@email.com',
  password: '123',
}

const loginRoutes = {
  login: '/',
  forgotPassword: '/forgot-password',
  recoveryPassword: '/recovery-password',
  characterPicker: '/character-picker',
}

test('Login', async ({ page }) => {
  const emailLogin = page.getByPlaceholder('Informe seu e-mail')
  const passwordLogin = page.getByPlaceholder('Informe sua senha')

  await page.context().clearCookies()

  await page.goto(loginRoutes.login)
  await expect(page).toHaveTitle(/Pontua Web/)
  await expect(page.getByText('Bem-vindo.')).toBeVisible()

  await emailLogin.fill(user.email)
  await passwordLogin.fill(user.password)
  await page.getByRole('button', { name: 'entrar' }).click()

  try {
    await expect(page.getByText('Login ou senha inválidos')).toBeVisible()
    await expect(page).toHaveURL(loginRoutes.login)
  } catch {
    await expect(page).toHaveURL(loginRoutes.characterPicker)
  }
})

test('Forgot Password', async ({ page }) => {
  await page.goto(loginRoutes.login)
  await page.getByRole('button', { name: 'Esqueceu a senha?' }).click()

  await expect(page).toHaveURL(loginRoutes.forgotPassword)
})

test('Password Recovery', async ({ page }) => {
  const emailPasswordRecovery = page.getByPlaceholder('Informe seu e-mail')

  await page.goto(loginRoutes.forgotPassword)
  await expect(page.getByRole('button', { name: 'enviar link' })).toBeDisabled()
  await emailPasswordRecovery.fill(user.email)
  await expect(page.getByRole('button', { name: 'enviar link' })).toBeEnabled()
  await page.getByRole('button', { name: 'enviar link' }).click()

  try {
    await expect(page.getByText('E-mail não encontrado')).toBeVisible()
    await expect(page).toHaveURL(loginRoutes.forgotPassword)
  } catch {
    await expect(page).toHaveURL(loginRoutes.recoveryPassword)
  }
})
