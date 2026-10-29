import usuarioService from "./usuarioService.js";

async function listarUsuarios(req, res, next) { 
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json({
            sucesso: true,
            data: usuarios
        });
    } catch(error) {
        return next(error);
    }
    
}

async function listarUsuarioPorId(req, res, next) {
    try {
        const id = Number(req.params.id);
        const usuario = await usuarioService.listarUsuarioPorId(id);
        return res.status(200).json({
            sucesso: true,
            data: usuario
        });
    } catch(error) {
        return next(error);
    }   
}

async function cadastrarUsuario(req, res, next) {
    try {
        const { email } = req.body;
        
        await usuarioService.cadastrarUsuario({ email });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuário cadastrado com sucesso! Um email foi enviado com as instruções de acesso."
        });
    } catch(error) {
        return next(error);
    }    
}

async function atualizarUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nome, email, tipoUsuario } = req.body;
        const usuarioBody = {
            nome,
            email, 
            tipoUsuario
        };
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, usuarioBody);
        return res.status(200).json({
            sucesso: true,
            mensagem: "Usuário atualizado com sucesso",
            data: usuarioAtualizado
        });
    } catch(error) {
        return next(error);
    }
}

async function deletarUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        await usuarioService.deletarUsuario(id, req.usuario.id_cadastro);
        return res.status(204).end();
    } catch(error) {
        return next(error);
    }
    
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
}

