# Projeto Rastreio de Ativos

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![NestJS](https://img.shields.io/badge/NestJS-v10-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v6-green)

## Contexto

Este projeto foi desenvolvido como resposta a um **desafio de rastreio de ativos**, com foco na ingestão e gestão de dados de telemetria. A aplicação é estruturada de forma moderna, seguindo boas práticas de desenvolvimento, Clean Code e Clean Architecture.

Para atender aos requisitos do desafio, a aplicação utiliza **dois bancos de dados distintos**:

- **MongoDB**: utilizado para **inserção rápida de dados de telemetria**.  
  A escolha do Mongo permite, no futuro, criar um **microserviço isolado**, responsável apenas por receber e armazenar dados de telemetria, evitando impacto na aplicação principal. Futuramente, será implementado **enfileiramento de dados** para garantir escalabilidade e alta disponibilidade.

- **PostgreSQL**: utilizado para **gestão e estruturação de dados**.  
  Por ser um banco relacional, garante **integridade e governança confiável** dos dados, sendo ideal para consultas estruturadas e relatórios.  

---

## Tecnologias Utilizadas

A aplicação foi construída com tecnologias modernas e robustas:

- **NestJS**: framework Node.js modular e escalável.
- **TypeORM**: integração com PostgreSQL para gerenciamento de entidades e migrations.
- **Mongoose**: para interação com MongoDB.
- **Jest**: testes unitários e de integração.
- **ESLint**: padronização de código e melhores práticas.
- **Swagger**: documentação de API e visualização de endpoints.

---

## Estrutura e Boas Práticas

O projeto segue princípios de **Clean Architecture** e **Clean Code**:

- Separação de responsabilidades por módulos (`TelemetryModule`, `LocationModule`, `AuthModule`, etc.).
- Serviços (`Service`) tratados de forma isolada, permitindo fácil testabilidade e manutenção.
- Tratamento de erros padronizado através do utilitário **`handleError`**, garantindo mensagens consistentes para toda a aplicação.
- Respostas padronizadas utilizando a interface `IApiResponse`, permitindo que todas as rotas retornem um formato uniforme.
- Uso de **decorators personalizados** para rotas públicas, facilitando a definição de endpoints que não requerem autenticação.

---

## Autenticação

- A aplicação utiliza **JWT (JSON Web Token)** para autenticação.  
- Guardas (`JwtAuthGuard`) são aplicados globalmente, garantindo que somente usuários autenticados possam acessar endpoints privados.  
- Rotas públicas podem ser definidas através de decorators específicos, simplificando a configuração de acesso.

---

## Documentação

- A API está totalmente documentada com **Swagger**, permitindo visualizar todos os endpoints, parâmetros e exemplos de retorno.  
- O Swagger está disponível ao rodar a aplicação, facilitando testes manuais e integração com front-end ou clientes externos.

---

## Decisões de Arquitetura

1. **Banco de dados duplo**:
   - MongoDB para ingestão rápida de dados de telemetria.
   - PostgreSQL para consultas estruturadas, integridade e governança de dados.

2. **Clean Architecture e Clean Code**:
   - Separação clara entre módulos, serviços e controladores.
   - Testes unitários e mocks isolados para maior confiabilidade.

3. **Padronização**:
   - `handleError` para tratamento uniforme de exceções.
   - `IApiResponse` para respostas consistentes em toda a API.

4. **Segurança**:
   - JWT para autenticação.
   - Decorators para rotas públicas/privadas.

---

## Rodando a Aplicação

1. Instale as dependências:

yarn install

2. Configure variáveis de ambiente no .env:
- **POSTGRES_HOST=localhost**
- **POSTGRES_PORT=5432**
- **POSTGRES_USER=usuario**
- **POSTGRES_PASSWORD=senha**
- **POSTGRES_DB=rastreio**
- **MONGO_URI=mongodb://localhost:27017**
- **MONGO_DB_NAME=telemetry**
- **JWT_SECRET=seu_segredo**

3. Rode a aplicação: yarn start:dev


4. Acesse a documentação Swagger em: http://localhost:3000/api/docs

## Testes

### Executar todos os testes:

yarn test


### Executar testes com cobertura:

yarn test:cov

## Considerações Finais

Este projeto foi desenvolvido pensando em escalabilidade, manutenibilidade e boas práticas modernas.
O uso de bancos distintos, tratamento de erros, autenticação robusta, padronização de respostas e documentação completa garantem que a aplicação esteja pronta para evoluir e se integrar a outros sistemas no futuro.
