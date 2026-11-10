# Handoff Backend - Arte Digital Floripa

Este documento contém as especificações diretas para a criação da API REST. O banco de dados PostgreSQL (hospedado no Supabase) já está populado. O papel da api será conectar a este banco e fornecer os dados via endpoints.

## 1. Stack Obrigatória

*   **Runtime:** Node.js
*   **Framework Web:** Express.js
*   **ORM:** Prisma (Recomendado) ou TypeORM. 

**Material de Apoio (Conexão e Introspecção com Prisma):**
Como o banco de dados já está pronto e populado no Supabase, não precisará criar as tabelas (migrations) do zero. Recomendamos utilizar o recurso de introspecção do Prisma (`db pull`) para gerar os modelos automaticamente. Caso tenha dúvidas de como configurar essa conexão, consulte a documentação oficial:
*   [Prisma: Introspection (db pull)](https://www.prisma.io/docs/orm/prisma-schema/introspection)
*   [Prisma: Conectando com Supabase](https://www.prisma.io/docs/orm/overview/databases/supabase)


## 2. Modelo de Dados

O banco possui duas tabelas principais. A API fará apenas operações de leitura (`SELECT`) nestas tabelas.

**Tabela `artists`**
*   `id` (VARCHAR 50, Primary Key)
*   `name` (VARCHAR 255)
*   `bio` (TEXT)
*   `photo_url` (TEXT) - Link direto e público para a foto do artista.

**Tabela `artworks`**
*   `id` (VARCHAR 50, Primary Key)
*   `artist_id` (VARCHAR 50, Foreign Key -> artists.id)
*   `title` (VARCHAR 255)
*   `date` (VARCHAR 100)
*   `category` (VARCHAR 100)
*   `medium` (VARCHAR 255)
*   `remote_url` (TEXT) - Link direto e público da imagem da obra.
*   `largura` (INTEGER)
*   `altura` (INTEGER)

## 3. Endpoints Obrigatórios da API REST

A API deverá retornar as respostas no formato JSON:

*   **`GET /api/artists`**: Retorna a lista de todos os artistas.
*   **`GET /api/artists/:id`**: Retorna os detalhes de um artista específico.
*   **`GET /api/artworks`**: Retorna a lista de todas as obras cadastradas.
*   **`GET /api/artworks/:id`**: Retorna os detalhes de uma obra específica.
*   **`GET /api/artists/:id/artworks`**: Retorna todas as obras pertencentes a um artista.

## 4. Endpoint de Health Check (Evitar Inatividade)

Como utilizaremos hospedagem gratuita, a API sofrerá requisições de um CRON Job externo a cada 14 minutos para manter o servidor online e o banco de dados do Supabase ativo.

*   **`GET /api/health`**
*   **Ação obrigatória**: O endpoint deve executar exatamente a seguinte instrução no banco de dados:
    ```sql
    SELECT 1;
    ```
*   **Retorno esperado**: Status `200 OK`.
