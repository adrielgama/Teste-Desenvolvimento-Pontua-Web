import { test, expect } from '@playwright/test'

import { authenticatedRoutes, characterPickerList } from './utils'
import { authenticate } from './utils/sharedutils'

test('Home and select Character', async ({ context }) => {
  const page = await authenticate(context)
  await page.goto(authenticatedRoutes.home)

  const sidenav = await page.locator('[aria-label="sidenav"]')
  const search = await page.locator('[aria-label="search-input"]')
  const searchInput = await page.locator('[placeholder="Busque um agente"]')
  const skeletonElement = await page.locator('[aria-label="skeleton"]')
  const charactersList = await page.locator('[aria-label="characters-list"]')
  const pagination = await page.locator('[aria-label="Pagination"]')

  await expect(sidenav).toBeVisible()
  await expect(search).toBeVisible()
  await expect(searchInput).toBeVisible()
  await expect(skeletonElement).toBeVisible()

  await pagination.waitFor({ state: 'visible', timeout: 1000 })
  await charactersList.waitFor({ state: 'visible', timeout: 3000 })

  await page
    .locator(`[aria-label="${characterPickerList[1].id.toString()}"]`)
    .click()

  await page.waitForTimeout(1000)

  await expect(page).toHaveURL(
    authenticatedRoutes.profile.replace(
      ':id',
      characterPickerList[1].id.toString()
    )
  )
})
