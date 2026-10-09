# Bugs encontrados — Verzel Store

## BUG-01 — Frete cobrado com subtotal de R$ 200,00

### Regra esperada
O CA06 prevê frete grátis a partir de R$ 200,00, inclusive.
O CA07 prevê cobrança de frete somente abaixo desse valor.

### Passos para reproduzir
1. Adicionar uma Mochila Urbana 20L de R$ 100,00 ao carrinho.
2. Abrir o carrinho, sem cupom aplicado.
3. Aumentar a quantidade para duas unidades.
4. Conferir o frete e o total.

### Resultado esperado
Subtotal de R$ 200,00, frete grátis e total de R$ 200,00.

### Resultado obtido
Subtotal de R$ 200,00, frete de R$ 19,90 e total de R$ 219,90.
A tela informa que faltam R$ 0,00 para o frete grátis.

### Impacto
O resumo da compra apresenta uma cobrança indevida de R$ 19,90.

### Reprodução
O comportamento se repetiu ao reduzir para uma mochila
e aumentar novamente para duas.

### Evidência

![BUG-01: frete cobrado com subtotal de R$ 200,00](evidencias/bug-01-frete-200.png)