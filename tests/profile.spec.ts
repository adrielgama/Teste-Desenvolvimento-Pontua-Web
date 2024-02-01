import { test, expect } from '@playwright/test'

import { authenticatedRoutes, characterPickerList } from './utils'
import { authenticate } from './utils/sharedutils'

test('Profile', async ({ context }) => {
  const page = await authenticate(context)
  await page.goto(
    authenticatedRoutes.profile.replace(
      ':id',
      characterPickerList[1].id.toString()
    )
  )

  const sidenav = await page.locator('[aria-label="sidenav"]')
  const title = await getTitleElements(page, characterPickerList[1])

  await expect(sidenav).toBeVisible()

  await page.waitForTimeout(1000)
  await expect(title.perfilText).toBeVisible()
  await expect(title.slashText).toBeVisible()
  await expect(title.characterProfileName).toBeVisible()

  await expect(title.characterImage).toBeVisible()
  await expect(title.characterResumeName).toBeVisible()
  await expect(title.characterDescription).toBeVisible()

  await page.waitForTimeout(1000)
})

async function getTitleElements(page, character) {
  const perfilText = await page
    .locator('.font-bold.text-blue-800')
    .getByText('Perfil')

  const slashText = await page
    .locator('.px-2.font-bold.text-orange-500')
    .getByText('/')

  const characterProfileName = page
    .locator('.font-light.text-gray-500')
    .getByText(character.name.split(' (')[0])

  const characterImage = page.getByAltText(
    `${characterPickerList[1].name} thumbnail`
  )

  const characterResumeName = page
    .locator('.hidden.text-2xl.font-bold.text-blue-600')
    .getByText(character.name)

  const characterDescription = page
    .locator('.font-semibold.leading-6')
    .getByText(character.description)

  return {
    perfilText,
    slashText,
    characterProfileName,
    characterImage,
    characterResumeName,
    characterDescription,
  }
}
