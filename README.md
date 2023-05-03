## HexaColorGamer 

O HexaColorGamer é um jogo emocionante que desafia os jogadores a acertarem o maior número possível de cores em apenas 30 segundos. Ao iniciar o jogo, uma cor aleatória será exibida, juntamente com três opções de resposta, todas em formato hexadecimal. Duas das opções são incorretas, geradas aleatoriamente, enquanto a terceira é a correta. O jogador tem apenas 10 segundos para responder e ganhar ou perder pontos. Se não responder a tempo, perde 2 pontos. Se responder corretamente, ganha 5 pontos, mas se responder incorretamente, perde 1 ponto.

O jogo mantém um histórico visual das cores respondidas, indicando quais foram acertadas, quais foram erradas e o tempo de resposta. A pontuação da partida atual e o recorde de pontuação mais alta também são exibidos para manter o jogador motivado e desafiado. O HexaColorGamer é uma ótima opção para quem busca um jogo simples, mas desafiador, que testa a velocidade de raciocínio e conhecimento sobre cores em formato hexadecimal.

## :rocket: Tecnologias

- [ReactJS](https://reactjs.org/)

## :boom: Como Executar

- ### **Pré-requisitos**

1.  Faça um clone do repositório:

```sh
  $ https://github.com/LuizBoas/HexaColorGamer.git
```

2. Executando a Aplicação:

```sh
  # API
  $ cd hexacolor
  # Instalando as dependências do projeto.
  $ yarn # ou npm install
  # Configurando o banco de dados e criando as tabelas.
  $ yarn start # ou npm start
  # Aplicação web
```

## Escolhas feitas

1. Alteração da barra lateral

Devido à preocupação com a responsividade da página, decidi que seria melhor usar uma barra centralizada 
com um scroll lateral infinito, em vez de #manter a barra lateral com o histórico de cores.

2. Uso de várias páginas

Com o objetivo de tornar o código mais limpo e a visualização mais agradável, 
optei por trabalhar com paginação de telas, seguindo as sugestões do designer.
