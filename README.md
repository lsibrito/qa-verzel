# Teste técnico de QA — Verzel Store

Neste projeto, registrei cenários de teste, resultados das
execuções manuais e dois bugs encontrados na Verzel Store.
Também implementei oito testes automatizados com Playwright
em JavaScript, cobrindo a interface e a API do carrinho.

## Organização dos arquivos

- `cenarios.md`: cenários escritos em Gherkin.
- `resultado.md`: resultados dos testes manuais e automatizados.
- `bugs.md`: descrição do bug encontrado e passos para reproduzir.
- `evidencias/`: imagens das execuções.
- `tests/cupom.spec.js`: testes automatizados de cupons.
- `tests/carrinho-api.spec.js`: testes de limite de unidades
  e frete pela API.
- `playwright.config.js`: configuração do Playwright.

## Como executar os testes

É necessário ter Node.js e npm instalados.

Depois de baixar o projeto, abra o terminal na pasta do projeto e instale as dependências:

```bash
npm ci
```

Instale o navegador utilizado nos testes:

```bash
npx playwright install chromium
```

Execute os testes:

```bash
npx playwright test
```

Para acompanhar a execução com o navegador visível:

```bash
npx playwright test --headed
```

Para abrir o relatório HTML após a execução:

```bash
npx playwright show-report
```

## Testes automatizados

Implementei oito testes:

- Cupom válido, inexistente e expirado: três testes.
- Cupom em minúsculas e com espaços: dois testes.
- Limite de cinco unidades pela API: dois testes.
- Frete grátis em subtotal de exatamente R$ 200,00 pela API:
  um teste.

Na execução completa, seis testes passaram e dois falharam.

As falhas reproduzem os bugs documentados:
- BUG-01: cobrança de frete no subtotal de R$ 200,00.
- BUG-02: API de cálculo aceita seis unidades do mesmo produto.

Os testes verificam o comportamento esperado na documentação.
Por isso, a execução termina com falha enquanto esses problemas
persistirem na aplicação.

## Bugs encontrados

- BUG-01: frete cobrado no subtotal de exatamente R$ 200,00,
  reproduzido na interface e na API.
- BUG-02: API de cálculo aceita quantidade acima do limite
  de cinco unidades por produto.

Os passos de reprodução e as evidências estão em `bugs.md`.

## Limitações

Os testes de API cobrem o endpoint de cálculo do carrinho.
A confirmação de pedidos pela API não foi testada.

## Uso de IA

Utilizei IA como apoio na organização da documentação
e na elaboração dos testes automatizados. Realizei as
execuções manuais e automatizadas e conferi os resultados
registrados neste projeto.