# desafio-pitang-2022-frontend

O desafio do treinamento da Pitang de 2022, consiste em um sistema de agendamento para vacina da Covid-19.

## Rotas

A aplicação possui duas rotas:
Home (/) => Lista em uma tabela os agendamentos existentes;
Register (/create) => Exibi um formulário usado para fazer o registro de um novo agendamento;

### Layout

Para realizar a navegação entre rotas, um Layout foi estruturado como uma barra de navegação, possuindo dos redirecionadores, List e Create.

A barra de navegação permance fixa entre as rotas.

### Home

#### Dados

As informações do agendamento vem através de uma requisição a API, caso a requisição seja bem sucedida, atualiza o localStorage com os novos dados.
Os dados exibidos na tabela são os que estão no localStorage. Caso a requisição não seja brm sucedida, irá exibir os ultimos dados do localStorage.

#### Tabela

A tabela está estruturada da seguinte maneira:
Possue três colunas: Date Time, User 1 e User 2;
Date Time => Exibi a data e hora do agendamento
User 1 => Um dos usuários agendados.
User 2 => Outro usuário agendado.

As linhas exibem :
User => A coluna do usuário exibe nome. data de nascimento e seu status de agendamento. Também possue dois botões, usados para alterar o status do usuário.

A atualização do status realiza uma requisição a API , que se aceita, atualiza o dado da tabela como também do localStorage. Porém , se a requisição não for realizada, o status não será alterado, a fim de evitar desincronizar os dados da API com os dados do localStorage.

### Register

#### Formulário

O formulario possue quatro input's:
Date -> DatePicker para pegar a data do agendamento
Time -> TimeZone para pegar a hora do agendamento
Name -> Pegar o nome do usuário
Birth Date -> DatePicker para pegar a data de nascimento.

Também possui um tipo button para ação de cadastrar.

#### Dados

Os valores iniciais dos input's encontram-se zerados, se um valor for inserido, no localStorage será salvo e guardado o valor, para evitar perdar dos valores ao fechar ou recarregar a pagina.

Ao fazer um novo registro, uma requisição a API é realizada, mediante a resposta, será aprensentado uma mensagem indiicando a situação. O localStorage só será atualizado com o novo registro se a requisição for bem sucedida, a fim de evitar desincronação de dados da API com localStorage.

Também, com a requisição bem sucedida, o formulário é resetado para os valores iniciais zerados e a pagina será redirecionada para a Home.
