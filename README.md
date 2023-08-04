# Aplicativo de Previsão de Temperatura Semanal

Este é um aplicativo de previsão de temperatura semanal que utiliza a API do serviço de previsão climática para fornecer informações sobre a temperatura ao longo da semana para uma determinada localidade.

## Funcionalidades

- Pesquisa de Localidades: Os usuários podem pesquisar por uma localidade específica utilizando o campo de pesquisa. O aplicativo exibe opções de localidades que correspondem à entrada do usuário.

- Gráfico de Temperatura: Quando o usuário seleciona uma localidade, o aplicativo obtém os dados de previsão climática para essa localidade e exibe um gráfico de linha mostrando a temperatura ao longo dos dias da semana.

- Interatividade do Gráfico: O gráfico é interativo e permite que os usuários passem o mouse sobre as linhas para ver detalhes de temperatura e horário.

## Como Usar

1. Instalação das Dependências: Antes de executar o aplicativo, certifique-se de instalar as dependências do projeto utilizando o comando `npm install`.

2. Executando o Aplicativo: Após a instalação das dependências, você pode executar o aplicativo utilizando o comando `ng serve`. O aplicativo estará disponível em `http://localhost:4200/`.

3. Pesquisa e Visualização: Na página inicial, utilize o campo de pesquisa para digitar o nome de uma localidade. O aplicativo exibirá opções de localidades correspondentes à entrada do usuário. Selecione uma localidade para ver o gráfico de previsão de temperatura.

## Tecnologias Utilizadas

- Angular: Framework de desenvolvimento web utilizado para criar a interface do usuário e gerenciar a lógica do aplicativo.

- Highcharts: Biblioteca de gráficos que permite criar gráficos interativos e visualmente atraentes.

- API de Previsão Climática: O aplicativo utiliza uma API de terceiros para obter os dados de previsão climática para as localidades selecionadas.

## Próximos Passos

- Melhorias no Design: O aplicativo poderia ser aprimorado visualmente com um design mais atraente e responsivo.

- Mais Recursos: Poderiam ser adicionados recursos como a exibição de previsões para outras métricas climáticas, como umidade ou vento.

- Testes: Implementar testes automatizados para garantir a estabilidade e a qualidade do código.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
