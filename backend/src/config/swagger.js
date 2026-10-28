import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adicione aqui o caminho de cada arquivo de rotas
const routeFiles = [
    join(__dirname, '../modules/usuario/usuarioRoutes.js'),
    join(__dirname, '../modules/auth/authRoutes.js'),
    join(__dirname, '../modules/autor/autorRoutes.js'),
    join(__dirname, '../modules/obra/obraRoutes.js'),
];

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Arte Digital Floripa',
            version: '1.0.0',
            description: 'Documentação da API do projeto Arte Digital Floripa',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Autor: {
                    type: 'object',
                    properties: {
                        id_autor: { type: 'integer', example: 1 },
                        nome_publico: { type: 'string', example: 'João Silva' },
                        nacionalidade: { type: 'string', example: 'Brasileiro' },
                        data_nascimento: { type: 'string', format: 'date', example: '1990-01-01' },
                    },
                },
                Usuario: {
                    type: 'object',
                    properties: {
                        id_cadastro: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', format: 'email', example: 'joao@email.com' },
                        tipo_usuario: { type: 'string', example: 'admin' },
                        data_cadastro: { type: 'string', format: 'date-time' },
                    },
                },
                Erro: {
                    type: 'object',
                    properties: {
                        sucesso: { type: 'boolean', example: false },
                        mensagem: { type: 'string', example: 'Descrição do erro' },
                    },
                },
                Obra: {
                    type: 'object',
                    properties: {
                        id_obra: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Escultura 3D' },
                        data_criacao: { type: 'string', format: 'date', example: '2024-01-01' },
                        descricao: { type: 'string', example: 'Uma escultura digital' },
                        categoria: { type: 'string', example: 'Escultura' },
                        midia3d: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id_midia3d: { type: 'integer' },
                                    nome_arquivo: { type: 'string' },
                                    data_upload: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                        autor_acervo: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    autor: {
                                        type: 'object',
                                        properties: {
                                            id_autor: { type: 'integer' },
                                            nome_publico: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: routeFiles,
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };