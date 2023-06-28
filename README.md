# Contagem de dias úteis - Data de Entrega
Este é um projeto simples que exibe a data de entrega com base em um número específico de dias úteis, levando em consideração feriados nacionais, municipais e facultativos.

## Funcionamento
O código HTML (index.html) contém a estrutura básica da página.

O código CSS (styles.css) define o estilo visual da página, incluindo fontes, cores, margens e tamanhos.

O código JavaScript (script.js) realiza o cálculo da data de entrega. Ele usa uma função calculaFeriado assíncrona para verificar se a data atual corresponde a um feriado. Se for um feriado facultativo, a função eFacultativo é chamada para armazenar o nome e a data do feriado. Se for um feriado nacional ou municipal, a função eFeriado é chamada.

A função main é chamada para calcular a data de entrega com base em um número específico de dias úteis. Ela itera pelos dias e verifica se são dias úteis, excluindo sábados e domingos. Além disso, verifica se há feriados ou feriados facultativos, ajustando o número de dias conforme necessário. No final, a data de entrega é exibida na página.

### Link
Link para o projeto [aqui](https://leonardos1lva.github.io/ContagemDiasUteis/)
