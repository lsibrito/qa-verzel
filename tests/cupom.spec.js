const { test, expect } = require('@playwright/test');

test('CT-04 — Aplicar o cupom BEMVINDO10', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('article', { name: 'Mochila Urbana 20L' })
    .getByRole('button', { name: 'Adicionar ao carrinho' })
    .click();

  await page
    .getByRole('link', { name: 'Carrinho 1 itens no carrinho' })
    .click();

  await page
    .getByRole('textbox', { name: 'Cupom de desconto' })
    .fill('BEMVINDO10');

  await page
    .getByRole('button', { name: 'Aplicar cupom' })
    .click();

  await expect(page.getByText('Cupom BEMVINDO10 aplicado.'))
    .toBeVisible();

  await expect(page.getByText(/^[-−]\s*R\$\s*10,00$/))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*19,90$/))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*109,90$/))
    .toBeVisible();
});

test('CT-05 — Rejeitar cupom inexistente', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('article', { name: 'Mochila Urbana 20L' })
    .getByRole('button', { name: 'Adicionar ao carrinho' })
    .click();

  await page
    .getByRole('link', { name: 'Carrinho 1 itens no carrinho' })
    .click();

  await page
    .getByRole('textbox', { name: 'Cupom de desconto' })
    .fill('naoexiste123');

  await page.getByRole('button', { name: 'Aplicar cupom' }).click();

  await expect(page.getByText('Cupom inválido.', { exact: true }))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*0,00$/))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*119,90$/))
    .toBeVisible();

  await expect(page.getByRole('button', { name: 'Remover cupom' }))
    .toHaveCount(0);
});

test('CT-06 — Rejeitar cupom expirado', async ({ page }) => {
  await page.goto('/');

  await page
    .getByRole('article', { name: 'Mochila Urbana 20L' })
    .getByRole('button', { name: 'Adicionar ao carrinho' })
    .click();

  await page
    .getByRole('link', { name: 'Carrinho 1 itens no carrinho' })
    .click();

  await page
    .getByRole('textbox', { name: 'Cupom de desconto' })
    .fill('VERAO2026');

  await page.getByRole('button', { name: 'Aplicar cupom' }).click();

  await expect(page.getByText('Cupom expirado.', { exact: true }))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*0,00$/))
    .toBeVisible();

  await expect(page.getByText(/^R\$\s*119,90$/))
    .toBeVisible();

  await expect(page.getByRole('button', { name: 'Remover cupom' }))
    .toHaveCount(0);
});