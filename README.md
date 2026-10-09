# Teste técnico de QA — Verzel Store

Neste projeto, registrei os cenários de teste, os resultados das execuções manuais e um bug encontrado na Verzel Store. Também automatizei três cenários com Playwright em JavaScript.

## Organização dos arquivos

- `cenarios.md`: cenários escritos em Gherkin.
- `resultado.md`: resultados dos testes manuais e automatizados.
- `bugs.md`: descrição do bug encontrado e passos para reproduzir.
- `evidencias/`: imagens das execuções.
- `tests/cupom.spec.js`: testes automatizados de cupons.
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

## Cenários automatizados

- CT-04: aplicar um cupom válido.
- CT-05: rejeitar um cupom inexistente.
- CT-06: rejeitar um cupom expirado.

Na execução registrada, os três testes passaram.

## Bug encontrado

Com subtotal de exatamente R$ 200,00, o carrinho cobrou
R$ 19,90 de frete, embora a documentação informe frete
grátis a partir desse valor.

Os detalhes e a evidência estão em `bugs.md`.

## Limitações

A validação do limite de cinco unidades pela API ainda
não foi testada. O resultado registrado para esse cenário
se refere à interface.

## Uso de IA

Utilizei IA como apoio na organização da documentação
e na elaboração dos testes automatizados. Realizei as
execuções manuais e automatizadas e conferi os resultados
registrados neste projeto.