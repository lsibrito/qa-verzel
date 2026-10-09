# Cenários de teste — Verzel Store

## CT-05 — Cupom inexistente

Critério de aceite relacionado: CA03.

```gherkin
Cenário: Aplicar um cupom inexistente
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  E preenchi o campo de cupom com "maoexiste123"
  Quando clico em "Aplicar cupom"
  Então aparece a mensagem "Cupom inválido."
  E o desconto fica em R$ 0,00
  E o total permanece em R$ 119,90
```

## CT-02 — Frete grátis com subtotal de R$ 200,00

Critério de aceite relacionado: CA06.

```gherkin
Cenário: Obter frete grátis no valor mínimo
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  Quando aumento a quantidade para duas unidades
  Então o subtotal fica em R$ 200,00
  E o frete deve ser grátis
  E o total deve ser R$ 200,00
```

## CT-01 — Frete com subtotal abaixo de R$ 200,00

Critério de aceite relacionado: CA07.

```gherkin
Cenário: Cobrar frete abaixo do valor mínimo
  Dado que o carrinho está vazio
  Quando adiciono uma mochila de R$ 100,00 e abro o carrinho
  Então o subtotal fica em R$ 100,00
  E o frete fica em R$ 19,90
  E o total fica em R$ 119,90
  E aparece que faltam R$ 100,00 para o frete grátis
```

## CT-03 — Frete grátis com subtotal acima de R$ 200,00

Critério de aceite relacionado: CA06.

```gherkin
Cenário: Obter frete grátis acima do valor mínimo
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  Quando aumento a quantidade para três unidades
  Então o subtotal fica em R$ 300,00
  E o frete deve ser grátis
  E o total deve ser R$ 300,00
```

## CT-04 — Aplicar cupom válido

Critérios de aceite relacionados: CA01 e CA09.

```gherkin
Cenário: Aplicar o desconto do BEMVINDO10
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  E preencho o campo de cupom com "BEMVINDO10"
  Quando clico em "Aplicar cupom"
  Então o cupom deve ser aplicado
  E o desconto deve ser de R$ 10,00
  E o frete deve continuar em R$ 19,90
  E o total deve ser R$ 109,90
```

## CT-06 — Cupom expirado

Critério de aceite relacionado: CA04.

```gherkin
Cenário: Rejeitar um cupom expirado
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  E preencho o campo de cupom com "VERAO2026"
  Quando clico em "Aplicar cupom"
  Então aparece a mensagem "Cupom expirado."
  E o cupom não deve ser aplicado
  E o desconto fica em R$ 0,00
  E o total permanece em R$ 119,90
```

## CT-07 — Cupom com letras minúsculas e espaços

Critério de aceite relacionado: CA02.

```gherkin
Esquema do Cenário: Aceitar variações do código do cupom
  Dado que tenho uma mochila de R$ 100,00 no carrinho, sem cupom
  E preencho o campo de cupom com "<codigo>"
  Quando clico em "Aplicar cupom"
  Então o cupom BEMVINDO10 deve ser aplicado
  E o desconto deve ser de R$ 10,00
  E o total deve ser R$ 109,90

    Exemplos:
    | codigo     |
    | bemvindo10 |
    | BEMVINDO10 |
```

Observação: na segunda variação, inserir um espaço antes e um depois de BEMVINDO10.

## CT-08 — Frete calculado antes do desconto

Critérios de aceite relacionados: CA08 e CA11.

```gherkin
Cenário: Manter frete grátis quando o desconto reduz o total abaixo de R$ 200,00
  Dado que tenho uma mochila, uma garrafa e dois kits de meias no carrinho
  E o subtotal é R$ 209,80
  Quando aplico o cupom "BEMVINDO10"
  Então o desconto deve ser de R$ 20,98
  E o frete deve ser grátis
  E o total deve ser R$ 188,82
```

## CT-09 — Remover cupom

Critério de aceite relacionado: CA05.

```gherkin
Cenário: Retirar o desconto ao remover o cupom
  Dado que tenho uma mochila, uma garrafa e dois kits de meias no carrinho
  E o cupom BEMVINDO10 está aplicado
  Quando clico em "Remover cupom"
  Então o desconto deve ficar em R$ 0,00
  E o frete deve continuar grátis
  E o total deve ser R$ 209,80
```

## CT-10 — Limite de cinco unidades por produto

Critério de aceite relacionado: CA10.

```gherkin
Cenário: Impedir a inclusão da sexta mochila
  Dado que tenho cinco mochilas no carrinho
  Quando verifico as opções para adicionar outra mochila
  Então o botão de aumentar a quantidade deve estar desabilitado
  E o botão "Adicionar ao carrinho" da mochila deve estar desabilitado no catálogo
  E deve aparecer uma mensagem informando o limite de cinco unidades
```

## Complemento do CT-10 — Limite de unidades pela API

Critério de aceite relacionado: CA10.

```gherkin
Cenário: Aceitar cinco unidades pela API
  Dado que envio o produto P005 com quantidade 5 e sem cupom
  Quando solicito o cálculo em POST /api/carrinho/calcular
  Então a resposta deve ter status 200
  E deve conter um item com quantidade 5
  E o subtotal deve ser 500
  E o desconto e o frete devem ser 0
  E o total deve ser 500

Cenário: Rejeitar seis unidades pela API
  Dado que envio o produto P005 com quantidade 6 e sem cupom
  Quando solicito o cálculo em POST /api/carrinho/calcular
  Então a resposta deve ter status 422
  E o código de erro deve ser QUANTIDADE_MAXIMA_EXCEDIDA
```

## Complemento do CT-02 — Frete no limite pela API

Critérios de aceite relacionados: CA06 e CA07.

```gherkin
Cenário: Aplicar frete grátis no subtotal de exatamente 200
  Dado que envio o produto P005 com quantidade 2 e sem cupom
  Quando solicito o cálculo em POST /api/carrinho/calcular
  Então a resposta deve ter status 200
  E o subtotal deve ser 200
  E o desconto deve ser 0
  E o valor faltante para frete grátis deve ser 0
  E o frete deve ser 0
  E freteGratis deve ser verdadeiro
  E o total deve ser 200
```