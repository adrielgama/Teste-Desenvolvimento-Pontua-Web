import { test, expect, BrowserContext as Context } from '@playwright/test'

import { user, loginRoutes, characterPickerList } from './mocks'
import { authenticatedRoutes } from './mocks/authenticatedRoutes'

const login = async (page) => {
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

const authenticate = async (context: Context) => {
  const page = await context.newPage()
  await login(page)
  return page
}

const selectCharacter = async (page, character) => {
  await expect(
    page.getByText('Selecione o seu agente mais legal')
  ).toBeVisible()

  const combobox = page.locator('[role="combobox"]')
  await combobox.click()

  await page.waitForSelector('[role="dialog"]')

  const itemSelector = page.locator(
    `[data-value="${character.name.toLowerCase()}"]`
  )
  await itemSelector.click()

  await page.waitForTimeout(2000) // TIMEOUT PARA FECHAR COMBOBOX

  await page.getByRole('button', { name: 'Entrar' }).click()
}

const loginAndSelectCharacter = async (page, character) => {
  await login(page)
  await selectCharacter(page, character)

  const profileURL = authenticatedRoutes.profile.replace(
    ':id',
    character.id.toString()
  )
  await expect(page).toHaveURL(profileURL)
  await page.goto(profileURL)
}

test('Login and Select Character', async ({ context }) => {
  const page = await authenticate(context)
  const character = characterPickerList[1] // A-Bomb (HAS)
  await loginAndSelectCharacter(page, character)
})

test('Forgot Password', async ({ page }) => {
  await page.goto(loginRoutes.login)
  await page.getByRole('button', { name: 'Esqueceu a senha?' }).click()
  await expect(page).toHaveURL(loginRoutes.forgotPassword)
})

test('Password Recovery', async ({ page }) => {
  await page.goto(loginRoutes.forgotPassword)

  const emailPasswordRecovery = page.getByPlaceholder('Informe seu e-mail')
  await expect(page.getByRole('button', { name: 'enviar link' })).toBeDisabled()

  await emailPasswordRecovery.fill(user.email)
  await expect(page.getByRole('button', { name: 'enviar link' })).toBeEnabled()
  await page.getByRole('button', { name: 'enviar link' }).click()

  try {
    await expect(page).toHaveURL(loginRoutes.recoveryPassword)
  } catch {
    await expect(page.getByText('E-mail não encontrado')).toBeVisible()
    await expect(page).toHaveURL(loginRoutes.forgotPassword)
  }
})
