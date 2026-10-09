const { test, expect } = require('@playwright/test');

test('CT-10 API — Aceitar cinco unidades do produto', async ({ request }) => {
  const resposta = await request.post('/api/carrinho/calcular', {
    data: {
      itens: [
        { produtoId: 'P005', quantidade: 5 },
      ],
    },
  });

  expect(resposta.status()).toBe(200);

  const corpo = await resposta.json();

  expect(corpo.itens).toHaveLength(1);
  expect(corpo.itens[0].quantidade).toBe(5);
  expect(corpo.subtotal).toBe(500);
  expect(corpo.desconto).toBe(0);
  expect(corpo.frete).toBe(0);
  expect(corpo.total).toBe(500);
});

test('CT-10 API — Rejeitar seis unidades do produto', async ({ request }) => {
  const resposta = await request.post('/api/carrinho/calcular', {
    data: {
      itens: [
        { produtoId: 'P005', quantidade: 6 },
      ],
    },
  });

  const corpo = await resposta.json();

  
  expect(resposta.status()).toBe(422);

  expect(corpo.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
});

test('CT-02 API — Frete grátis no subtotal de exatamente R$ 200,00', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: {
        itens: [
          { produtoId: 'P005', quantidade: 2 },
        ],
      },
    });
  
    expect(resposta.status()).toBe(200);
  
    const corpo = await resposta.json();
  
    expect(corpo.subtotal).toBe(200);
    expect(corpo.desconto).toBe(0);
    expect(corpo.valorFaltanteFreteGratis).toBe(0);
  
    expect.soft(corpo.frete).toBe(0);
    expect.soft(corpo.freteGratis).toBe(true);
    expect.soft(corpo.total).toBe(200);
  });