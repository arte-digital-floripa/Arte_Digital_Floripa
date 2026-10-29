import obraService from './obraService.js';

async function listarObras(req, res, next) {
    try {
        const { categoria, autor, titulo } = req.query;
        const obras = await obraService.listarObras({ categoria, autor, titulo });
        return res.status(200).json({
            sucesso: true,
            data: obras
        });
    } catch (error) {
        next(error);
    }
}

async function listarObraPorId(req, res, next) {
    try {
        const obra = await obraService.listarObraPorId(req.params.id);

        if (!obra) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Obra não encontrada.'
            });
        }

        return res.status(200).json({
            sucesso: true,
            data: obra
        });
    } catch (error) {
        next(error);
    }
}

async function criarObra(req, res, next) {
    try {
        const novaObra = await obraService.criarObra(req.body);
        return res.status(201).json({
            sucesso: true,
            mensagem: 'Obra criada com sucesso.',
            data: novaObra
        });
    } catch (error) {
        next(error);
    }
}

async function atualizarObra(req, res, next) {
    try {
        const obraAtualizada = await obraService.atualizarObra(req.params.id, req.body);
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Obra atualizada com sucesso.',
            data: obraAtualizada
        });
    } catch (error) {
        next(error);
    }
}

async function deletarObra(req, res, next) {
    try {
        await obraService.deletarObra(req.params.id);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export default {
    listarObras,
    listarObraPorId,
    criarObra,
    atualizarObra,
    deletarObra
};