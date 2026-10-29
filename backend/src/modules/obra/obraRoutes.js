import express, { Router } from 'express'
import obraController from './obraController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /obras/listar:
 *   get:
 *     summary: Listar todas as obras
 *     description: Rota pública. Não requer autenticação.
 *     tags: [Obras]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoria
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Filtrar por nome público do autor
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Filtrar por título da obra (busca parcial, case-insensitive)
 *     responses:
 *       200:
 *         description: Lista de obras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_obra:
 *                         type: integer
 *                       titulo:
 *                         type: string
 *                       data_criacao:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       descricao:
 *                         type: string
 *                         nullable: true
 *                       categoria:
 *                         type: string
 *                         nullable: true
 *                       midia3d:
 *                         type: array
 *                         items:
 *                           type: object
 *                       usuario_acervo:
 *                         type: array
 *                         items:
 *                           type: object
 *                       autor_acervo:
 *                         type: array
 *                         items:
 *                           type: object
 */
router.get("/listar", obraController.listarObras);

/**
 * @swagger
 * /obras/listar/{id}:
 *   get:
 *     summary: Buscar obra por ID
 *     description: Rota pública. Não requer autenticação.
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     responses:
*       200:
 *         description: Obra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_obra:
 *                       type: integer
 *                     titulo:
 *                       type: string
 *                     data_criacao:
 *                       type: string
*                       format: date-time
 *                       nullable: true
 *                     categoria:
 *                       type: string
 *                       nullable: true
 *                     midia3d:
 *                       type: array
 *                       items:
 *                         type: object
 *                     usuario_acervo:
 *                       type: array
 *                       items:
 *                         type: object
 *                     autor_acervo:
 *                       type: array
 *                       items:
 *                         type: object
 *                 usuario_acervo:
 *                   type: array
 *                   items:
 *                     type: object
 *                 autor_acervo:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Id inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/listar/:id", obraController.listarObraPorId);

/**
 * @swagger
 * /obras/criar:
 *   post:
 *     summary: Criar nova obra
 *     description: Requer autenticação (Bearer token).
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Obrigatório, não pode ser vazio
 *               data:
 *                 type: string
 *                 format: date
 *                 description: Mapeada para data_criacao. Se omitida, fica null.
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               midias3d:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - nome_arquivo
 *                     - arquivo
 *                   properties:
 *                     nome_arquivo:
 *                       type: string
 *                     arquivo:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       description: Bytes do arquivo (0-255)
 *               usuariosIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de usuários que serão vinculados à obra (todos precisam existir)
 *               autoresIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: IDs de autores que serão vinculados à obra (todos precisam existir)
 *     responses:
 *       201:
 *         description: Obra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: Obra criada com sucesso.
 *                 data:
 *                   $ref: '#/components/schemas/Obra'
 *       400:
 *         description: Dados inválidos (título ausente, IDs inválidos, mídia inválida)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Autores ou usuários informados não existem
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/criar", authMiddleware, obraController.criarObra);

/**
 * @swagger
 * /obras/atualizar/{id}:
 *   put:
 *     summary: Atualizar obra
 *     description: |
 *       Requer autenticação (Bearer token).
 *       Atualiza apenas os campos enviados no body (campos omitidos não são alterados).
 *       Atenção: se `midias3d`, `usuariosIds` ou `autoresIds` forem enviados,
 *       eles substituem completamente os relacionamentos/mídias existentes
 *       (delete + create). Arrays vazios não removem os existentes.
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *                 description: Mapeada para data_criacao
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               midias3d:
 *                 type: array
 *                 description: Substitui todas as mídias existentes da obra
 *                 items:
 *                   type: object
 *                   required:
 *                     - nome_arquivo
 *                     - arquivo
 *                   properties:
 *                     nome_arquivo:
 *                       type: string
 *                     arquivo:
 *                       type: array
 *                       items:
 *                         type: integer
 *                       description: Bytes do arquivo (0-255)
 *               usuariosIds:
 *                 type: array
 *                 description: Substitui todos os usuários vinculados à obra
 *                 items:
 *                   type: integer
 *               autoresIds:
 *                 type: array
 *                 description: Substitui todos os autores vinculados à obra
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Obra atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: Obra atualizada com sucesso.
 *                 data:
 *                   $ref: '#/components/schemas/Obra'
 *       400:
 *         description: Dados inválidos enviados ao servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Obra, usuário ou autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.put("/atualizar/:id", authMiddleware, obraController.atualizarObra);

/**
 * @swagger
 * /obras/deletar/{id}:
 *   delete:
 *     summary: Deletar obra
 *     description: Requer autenticação (Bearer token).
 *     tags: [Obras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     responses:
 *       204:
 *         description: Obra deletada com sucesso (sem conteúdo)
 *       401:
 *         description: Não autorizado (token ausente ou inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete("/deletar/:id", authMiddleware, obraController.deletarObra);

export default router;
