import autorService from "./autorService.js";

async function listarAutores(req, res, next) {
    try {
        const autores = await autorService.listarAutores();

        return res.status(200).json({
            sucesso: true,
            data: autores
        });
    } catch (error) {
        return next(error);
    }
}

async function listarAutorPorId(req, res, next) {
    try {
        const id = req.params.id;
        const autor = await autorService.listarAutorPorId(id);

        // If para lidar com o caso de o autor nao existir
        if (!autor) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Autor não encontrado."
            });
        }

        return res.status(200).json({
            sucesso: true,
            data: autor
        });
        // Catch para lidar com possíveis entradas de Id inválido, como palavras, letras etc.
    } catch (error) {
        return next(error);
    }
}

async function criarAutor(req, res, next) {
    try {
        const novoAutor = await autorService.criarAutor(req.body);

        return res.status(201).json({
            sucesso: true,
            mensagem: "Autor criado com sucesso.",
            data: novoAutor
        });
    } catch (error) {
        return next(error);
    }
}

async function atualizarAutor(req, res, next) {
    try {
        const id = req.params.id;
        const dados = req.body;

        // O Service vai verificar se o ID existe e validar os dados
        const autorAtualizado = await autorService.atualizarAutor(id, dados);

        if (!autorAtualizado) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Autor não encontrado."
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "Autor atualizado com sucesso.",
            data: autorAtualizado
        });
    } catch (error) {
        return next(error);
    }
}

async function deletarAutor(req, res, next) {
    try {
        const id = req.params.id;
        await autorService.deletarAutor(id);
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
}

export default {
    listarAutores,
    listarAutorPorId,
    criarAutor,
    atualizarAutor,
    deletarAutor
}