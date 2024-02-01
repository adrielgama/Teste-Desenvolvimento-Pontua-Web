import { test, expect } from '@playwright/test'

import {
  user,
  loginRoutes,
  authenticatedRoutes,
  characterPickerList,
} from './utils'
import { login, authenticate } from './utils/sharedutils'

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
  await page.waitForTimeout(2000)

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

test('Forgot Password', async ({ context }) => {
  const page = await authenticate(context)
  await page.goto(loginRoutes.login)
  await page.getByRole('button', { name: 'Esqueceu a senha?' }).click()
  await expect(page).toHaveURL(loginRoutes.forgotPassword)
})

test('Password Recovery', async ({ context }) => {
  const page = await authenticate(context)
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
