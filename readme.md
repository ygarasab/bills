# Bills - uma aplicação de demonstração

Este repositório dispões de rotinas de validação de boletos, apresentados no formato de uma api simples, que valida e dispõe informações sobre o boleto, mediante a apresentação de sua linha digitável.

## Instalação

```
$ yarn

ou

$ npm i
```

## Execução

```
$ yarn start

ou

$ npm run start
```

## Testes
```
$ yarn test

ou

$ npm test
```

## Uso

A aplicação por padrão deve iniciar um servidor na porta 8080 se esta estiver disponível, você pode verificar suas linhas digitáveis por meio da rota "boleto", da seguinte forma:

```
http://localhost:8080/boleto/{linha digitavel}

Ex: http://localhost:8080/boleto/21290001192110001210904475617405975870000002000
```
