import { test, expect } from '@playwright/test'

import { authenticatedRoutes, loginRoutes } from './utils'
import { authenticate } from './utils/sharedutils'

test('Logout', async ({ context }) => {
  const page = await authenticate(context)
  await page.goto(authenticatedRoutes.home)
  const sidenav = await page.locator('[aria-label="sidenav"]')
  const logout = await page.getByText('Sair')

  await expect(sidenav).toBeVisible()
  await expect(logout).toBeVisible()

  await page.getByText('Sair').click()
  await page.waitForTimeout(1000)

  await expect(page).toHaveURL(loginRoutes.login)
})
