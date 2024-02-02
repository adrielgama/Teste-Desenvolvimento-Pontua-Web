import { expect, BrowserContext } from '@playwright/test'

import { loginRoutes, user } from './index'

export const login = async (page) => {
  await page.goto(loginRoutes.login)
  await expect(page).toHaveTitle(/Pontua Web/)
  await expect(page.getByText('Bem-vindo.')).toBeVisible()

  const emailLogin = page.getByPlaceholder('Informe seu e-mail')
  const passwordLogin = page.getByPlaceholder('Informe sua senha')

  await emailLogin.fill(user.email)
  await passwordLogin.fill(user.password)
  await page.getByRole('button', { name: 'entrar' }).click()

  try {
    await expect(page).toHaveURL(loginRoutes.characterPicker)
  } catch {
    await expect(page.getByText('Login ou senha inválidos')).toBeVisible()
    await expect(page).toHaveURL(loginRoutes.login)
  }
}

export const authenticate = async (context: BrowserContext) => {
  const page = await context.newPage()
  await login(page)
  return page
}

export const waitForSpinnerToHide = async (page) => {
  await page.waitForSelector('.spinner', { state: 'hidden' })
}

export const expectURLToBe = async (page, url) => {
  await expect(page).toHaveURL(url)
}
