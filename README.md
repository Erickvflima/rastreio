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

```powershell
yarn install
```

2. Configure variáveis de ambiente no .env:
- **POSTGRES_HOST=localhost**
- **POSTGRES_PORT=5432**
- **POSTGRES_USER=usuario**
- **POSTGRES_PASSWORD=senha**
- **POSTGRES_DB=rastreio**
- **MONGO_URI=mongodb://localhost:27017**
- **MONGO_DB_NAME=telemetry**
- **JWT_SECRET=seu_segredo**

3. Rode a aplicação: 

```powershell
yarn start:dev
```

4. Acesse a documentação Swagger em: http://localhost:3000/api/docs

## Testes

### Executar todos os testes:
```powershell
yarn test
```


### Executar testes com cobertura:
```powershell
yarn test:cov
```

## Conexão TCP para Dispositivos (GPRS)

Além da API HTTP, a aplicação disponibiliza um servidor TCP para ingestão direta de dados de telemetria enviados por dispositivos de rastreamento via GPRS/TCP.

### Configuração do Servidor TCP

Host: 0.0.0.0
Porta: 3001
Protocolo: TCP Raw (socket)

Esse servidor é responsável por:
- **Receber o payload em formato HEX**
- **Normalizar e validar o pacote**
- **Processar os dados de telemetria**
- **Persistir as informações no MongoDB**

## Validação do Payload TCP

O payload recebido segue um protocolo específico (SFT9001), contendo:

- **Header: 50F7**
- **Footer: 73C4**
- Conteúdo em formato HEX

Antes do processamento, o payload é:

- Normalizado (trim + toUpperCase)
- Validado quanto a header, footer e tamanho mínimo
- Rejeitado em caso de inconsistência, com logs apropriados

## Testando Conexão TCP no Windows (PowerShell)

É possível simular o envio de dados por um dispositivo real utilizando PowerShell.

Script de Teste
```powershell
$client = New-Object System.Net.Sockets.TcpClient
$client.Connect("127.0.0.1", 3001)
$stream = $client.GetStream()
$writer = New-Object System.IO.StreamWriter($stream)
$writer.AutoFlush = $true
$payload = "50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4"
$writer.WriteLine($payload)
$writer.Close()
$stream.Close()
$client.Close()
```

Resultado Esperado

- Conexão TCP estabelecida com sucesso
- Payload recebido e validado
- Telemetria processada e armazenada
- Conexão encerrada corretamente


## Considerações Finais

Este projeto foi desenvolvido pensando em escalabilidade, manutenibilidade e boas práticas modernas.
A utilização de bancos distintos, ingestão via TCP para dispositivos, tratamento padronizado de erros, autenticação robusta e documentação completa tornam a aplicação preparada para evoluir, escalar e se integrar a outros sistemas no futuro.
