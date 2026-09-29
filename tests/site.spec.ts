import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('published content, internal links, assets, and organizer affiliations are complete', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle('From Reasoning to Agency · AACL-IJCNLP 2026')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('From Reasoning')
  await expect(page.locator('.person')).toHaveCount(9)
  await expect(page.locator('.person').filter({ hasText: 'Xinping Lei' })).toContainText(
    'Nanjing University',
  )
  await expect(page.locator('.person').filter({ hasText: 'Haoran Yang' })).toContainText(
    'Central South University',
  )
  await expect(page.locator('.person').filter({ hasText: 'Jiayi Tian' })).toContainText('Alibaba')
  await expect(page.locator('#cfp')).toContainText('Double-blind review')
  await expect(page.locator('#cfp')).toContainText('ACL / ARR template')
  await expect(page.getByRole('link', { name: 'Submit your paper' })).toHaveAttribute(
    'href',
    'https://github.com/agent-aacl-workshop/agent-aacl-workshop.github.io.git',
  )
  await expect(page.locator('.workshop-date-row')).toContainText('exact day to be announced')
  const missingTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href')!)
        .filter((href) => href === '#' || !document.getElementById(href.slice(1))),
    )
  expect(missingTargets).toEqual([])
  await page.locator('.venue-image').scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      page
        .locator('.venue-image img')
        .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBeTruthy()
  expect(errors).toEqual([])
})

test('topic filters show relevant research themes and reset correctly', async ({ page }) => {
  await page.goto('/#topics')
  await expect(page.locator('.topic-card')).toHaveCount(6)
  await page.getByRole('button', { name: 'Reasoning', exact: true }).click()
  await expect(page.locator('.topic-card')).toHaveCount(1)
  await expect(page.locator('.topic-card h3')).toHaveText('Reasoning & planning')
  await page.getByRole('button', { name: 'Learning & adaptation', exact: true }).click()
  await expect(page.locator('.topic-card')).toHaveCount(2)
  await expect(page.locator('.topic-card h3')).toHaveText([
    'Learning to act',
    'Memory & adaptation',
  ])
  await page.getByRole('button', { name: 'Agentic systems', exact: true }).click()
  await expect(page.locator('.topic-card')).toHaveCount(3)
  await expect(page.locator('.topic-count')).toHaveText('03 research themes')
  await page.getByRole('button', { name: 'All topics' }).click()
  await expect(page.locator('.topic-card')).toHaveCount(6)
  await expect(page.getByRole('button', { name: 'All topics' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

test('the production HTML includes workshop content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('From Reasoning')
  await expect(page.locator('.topic-card')).toHaveCount(6)
  await expect(page.locator('.person')).toHaveCount(9)
  await expect(page.locator('#cfp')).toContainText('Double-blind review')
  await context.close()
})

test('AoE deadlines convert correctly without shifting the workshop dates', async ({ page }) => {
  await page.goto('/#dates')
  await expect(page.locator('.deadline-featured time')).toHaveText('Sep 30')
  await page.getByRole('button', { name: 'Your time', exact: true }).click()
  await expect(page.locator('.deadline-featured time')).toHaveText('Oct 119:59')
  await expect(page.locator('.local-time-note')).toContainText('Asia/Shanghai')
  await expect(page.locator('.workshop-date-row time')).toHaveText('Nov 9–10')
  await page.getByRole('button', { name: 'AoE', exact: true }).click()
  await expect(page.locator('.deadline-featured time')).toHaveText('Sep 30')
  await expect(page.locator('.local-time-note')).toHaveCount(0)
})

test('CFP and calendar downloads contain the actual workshop details', async ({ page }) => {
  await page.goto('/')
  const cfpEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download the CFP' }).click()
  const cfp = await cfpEvent
  expect(cfp.suggestedFilename()).toBe('reasoning-to-agency-2026-cfp.txt')
  const cfpText = await readFile((await cfp.path())!, 'utf8')
  expect(cfpText).toContain('Review: double-blind.')
  expect(cfpText).toContain('Jiayi Tian (Alibaba)')
  expect(cfpText).toContain('2026-09-30: Paper submission deadline')
  expect(cfpText).toContain('publication arrangements will be announced')

  const calendarEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Add dates to calendar' }).click()
  const calendar = await calendarEvent
  expect(calendar.suggestedFilename()).toBe('reasoning-to-agency-2026.ics')
  const raw = await readFile((await calendar.path())!, 'utf8')
  const unfolded = raw.replace(/\r\n /g, '')
  expect(unfolded).toContain('DTSTART:20261001T115900Z')
  expect(unfolded).toContain('DTSTART;VALUE=DATE:20261109')
  expect(unfolded).toContain('DTEND;VALUE=DATE:20261111')
  expect(unfolded).toContain('STATUS:TENTATIVE')
  expect(unfolded.match(/BEGIN:VEVENT/g)).toHaveLength(6)
  expect(raw.endsWith('\r\n')).toBeTruthy()
  expect(raw.split('\r\n').every((line) => Buffer.byteLength(line, 'utf8') <= 75)).toBeTruthy()
})

test('mobile navigation supports links, Escape, and focus restoration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await menu.click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page.getByRole('navigation').getByRole('link', { name: 'Topics', exact: true }).click()
  await expect(page).toHaveURL(/#topics$/)
  await expect(page.getByRole('navigation')).toBeHidden()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('navigation indicates the current section when moving from organizers to the CFP', async ({ page }) => {
  await page.goto('/#organizers')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  const organizers = nav.getByRole('link', { name: 'Organizers', exact: true })
  const cfp = nav.getByRole('link', { name: 'Call for papers', exact: true })
  await expect(organizers).toHaveAttribute('aria-current', 'location')
  await cfp.click()
  await expect(cfp).toHaveAttribute('aria-current', 'location')
  await expect(organizers).not.toHaveAttribute('aria-current', 'location')
})

test('FAQ reveals the confirmed review policy and pending publication policy', async ({ page }) => {
  await page.goto('/#faq')
  const format = page.locator('details').filter({ hasText: 'What are the paper format' })
  await format.locator('summary').click()
  await expect(format.locator('p')).toBeVisible()
  await expect(format).toContainText('Review will be double-blind')
  const archival = page.locator('details').filter({ hasText: 'Will accepted papers' })
  await archival.locator('summary').click()
  await expect(archival.locator('p')).toBeVisible()
  await expect(archival).toContainText('is to be confirmed')
  await format.locator('summary').click()
  await expect(format.locator('p')).toBeHidden()
})

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(pageWidth).toBeLessThanOrEqual(width)
    const headline = await page.locator('h1').boundingBox()
    expect(headline!.x).toBeGreaterThanOrEqual(0)
    expect(headline!.x + headline!.width).toBeLessThanOrEqual(width)
  })
}
