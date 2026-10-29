import prisma from '../../db/prisma.js';
import emailService from "../../services/emailService.js";
import crypto from 'crypto';

async function listarUsuarios() {
    const usuarios = await prisma.cadastro.findMany({
        select: {
            id_cadastro: true,
            nome: true,
            email: true,
            tipo_usuario: true,
            data_cadastro: true
        }
    });
    return usuarios;
}  


async function listarUsuarioPorId(idCadastro) {
    // Erro 400 id inválido
    if(isNaN(idCadastro)) throw new Error ("Id inválido");
    const usuario = await prisma.cadastro.findUnique({
        where: { id_cadastro: idCadastro },
        select: {
            id_cadastro: true,
            nome: true,
            email: true,
            tipo_usuario: true,
            data_cadastro: true
        }
    });

    // erro 404 não encontrado
    if (!usuario) throw new Error('Usuário não encontrado');

    return usuario;
}

async function cadastrarUsuario(cadastroBody) {
    // Token para completar cadastro com segurança
    const token = crypto.randomBytes(32).toString('hex');
    // Expiração do token = agora + 24 horas
    const expiracao = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Erro 400 body veio vazio
    if(!cadastroBody || typeof cadastroBody !== 'object') {
        const erro = new Error("Dados de cadastro inválidos");
        erro.statusCode = 400;
        throw erro;
    }
    const { email } = cadastroBody;

    // Erro 400 email não tem formato correto
    if(typeof email !== 'string') {
        const erro = new Error("Email deve ser uma string");
        erro.statusCode = 400;
        throw erro;
    }

    const emailLimpo = email.trim().toLowerCase();

    // Erro 400 email vazio
    if(!emailLimpo || emailLimpo.length === 0) {
        const erro = new Error("Email não pode estar vazio ou ter apenas espaços em branco.");
        erro.statusCode = 400;
        throw erro;
    }

    // Erro 400 email não é válido
    if(!emailLimpo.includes("@")) throw new Error("Email não é válido");
        
    const emailExiste = await verificarEmailExiste(emailLimpo);

    // Erro 409 email já existe
    if(emailExiste) {
        const erro = new Error("Esse email já está cadastrado!");
        erro.statusCode = 409;
        throw erro;
    }

    const resultado = await prisma.$transaction(async (tx) => {
        const cadastro = await tx.cadastro.create({
                data: {
                email: emailLimpo,
                tipo_usuario: "admin",
                token_temporario: token,
                token_expiracao: expiracao
            }
        });
        const usuario = await tx.usuario.create({
            data: {
                tipo_usuario: 'admin',
                id_cadastro: cadastro.id_cadastro
            }
        });   
        
        return { cadastro, usuario };
    });

    await emailService.enviarEmailBoasVindas(emailLimpo, token);
}

async function atualizarUsuario(idCadastro, registroBody) {
    // Erro 400 id não é um número
    if(isNaN(idCadastro)) throw new Error("Id inválido");

    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idCadastro);

    // Erro 400 body veio vazio
    if(!registroBody || typeof registroBody !== 'object') {
        const erro = new Error("Dados de cadastro inválidos");
        erro.statusCode = 400;
        throw erro;
    }

    const { nome, email, tipoUsuario } = registroBody;

    // Erro 400 formato errado
    if(nome !== undefined && typeof nome !== 'string') {
        const erro = new Error("Formato do nome está errado");
        erro.statusCode = 400;
        throw erro;
    }
    if(email !== undefined && typeof email !== 'string') {
        const erro = new Error("Formato do email está errado");
        erro.statusCode = 400;
        throw erro;
    }
    if(tipoUsuario !== undefined && typeof tipoUsuario !== 'string'){
        const erro = new Error("Formato do tipo de usuário está errado");
        erro.statusCode = 400;
        throw erro;
    } 

    const dadosParaAtualizar = {};

    if (nome !== undefined) {
        const nomeLimpo = nome.trim();
        // Erro 400 nome vazio ou com espaços em branco
        if(nomeLimpo.length === 0) {
            const erro = new Error("Nome não pode ter apenas espaços em branco ou estar vazio.");
            erro.statusCode = 400;
            throw erro;
        }
        dadosParaAtualizar.nome = nomeLimpo;
    }
    if (email !== undefined) {
        const emailLimpo = email.trim().toLowerCase();
        // Erro 400 email vazio
        if(emailLimpo.length === 0) {
            const erro = new Error("Email não pode ter apenas espaços em branco ou estar vazio.");
            erro.statusCode = 400;
            throw erro;
        }
        // Erro 400 email não é válido
        if(!emailLimpo.includes("@")) throw new Error("Email não é válido");
        const emailExiste = await verificarEmailExiste(emailLimpo);
        // Erro 409 email já existe
        if(emailExiste && emailExiste.id_cadastro !== idCadastro) {
            const erro = new Error("Esse email já está cadastrado!");
            erro.statusCode = 409;
            throw erro;
        }
        dadosParaAtualizar.email = emailLimpo;
    } 
    if (tipoUsuario !== undefined) {
        const tipoUsuarioLimpo = tipoUsuario.trim();

        if (tipoUsuarioLimpo.length === 0) {
            const erro = new Error("Tipo de usuário não pode ter apenas espaços em branco ou estar vazio.");
            erro.statusCode = 400;
            throw erro;
        }

        dadosParaAtualizar.tipo_usuario = tipoUsuarioLimpo;
    }

    if(Object.keys(dadosParaAtualizar).length === 0) {
        // Erro 400 body vazio
        const erro = new Error("Nenhum campo para atualizar foi enviado!");
        erro.statusCode = 400;
        throw erro;
    }

    const cadastroAtualizado = await prisma.cadastro.update({
        where: { id_cadastro: idCadastro },
        data: dadosParaAtualizar
    });

    if (tipoUsuario !== undefined) {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id_cadastro: idCadastro },
            data: { tipo_usuario: tipoUsuario.trim() }
        });
    }

    const { senha: _, token_temporario: __, token_expiracao: ___, ...cadastroSemSenha } = cadastroAtualizado;

    return cadastroSemSenha;
}

async function deletarUsuario(idCadastro) {

    // Erro 400 id não é um número  
    if(isNaN(idCadastro)) throw new Error("Id inválido");
    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idCadastro);

    const registro = await prisma.cadastro.delete({
        where: { id_cadastro: idCadastro }
    });
}

async function verificarEmailExiste(email) {
    const emailExiste = await prisma.cadastro.findFirst({
        where: { email: email }
    });

    return emailExiste;
}



export default {
    listarUsuarios,
    listarUsuarioPorId,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
}
