import prisma from '../../db/prisma.js';

async function listarAutores() {
    const autores = await prisma.autor.findMany({
        orderBy: { nome_publico: 'asc' }
    });

    return autores;
}

async function listarAutorPorId(id) {
    const idAutor = Number(id);
    // Se o id não for um número, o Service vai barrar e retornar um erro.
    if (isNaN(idAutor)) {
        throw new Error("Id inválido");
    }

    const autor = await prisma.autor.findUnique({
        where: { id_autor: idAutor }
    });

    return autor;
}

async function criarAutor(dadosAutor) {
    const { nome_publico, nacionalidade, data_nascimento } = dadosAutor;

    const nomeLimpo = nome_publico ? nome_publico.trim() : null;
    const nacionalidadeLimpa = nacionalidade ? nacionalidade.trim() : null;
    const dataNascValida = data_nascimento ? new Date(data_nascimento) : null;

    if (!nomeLimpo) {
        throw new Error("É necessário cadastrar um nome!");
    }

    const novoAutor = await prisma.autor.create({
        data: {
            nome_publico: nomeLimpo,
            nacionalidade: nacionalidadeLimpa,
            data_nascimento: dataNascValida
        }
    });

    return novoAutor;
}

async function atualizarAutor(id, dadosAutor) {
    // Utilizando a funcao de Ler o autor pelo ID para validar se realmente existe
    const autorExiste = await listarAutorPorId(id);

    if (!autorExiste) {
        throw new Error("Autor não encontrado.")
    };

    const { nome_publico, nacionalidade, data_nascimento } = dadosAutor;

    /* Caso algum dos valores seja não tenha sido preenchido, atualiza com os dados 
       atuais e muda apenas onde foi enviado conteúdo */
    const nomeAtualizado = nome_publico ? nome_publico.trim() : autorExiste.nome_publico
    const nacionalidadeAtualizada = nacionalidade ? nacionalidade.trim() : autorExiste.nacionalidade;
    const dataNascAtualizada = data_nascimento ? data_nascimento : autorExiste.data_nascimento;

    const autorAtualizado = await prisma.autor.update({
        where: { id_autor: Number(id) },
        data: {
            nome_publico: nomeAtualizado,
            nacionalidade: nacionalidadeAtualizada,
            data_nascimento: dataNascAtualizada
        }
    });

    return autorAtualizado;
}

async function deletarAutor(id) {
    // Utilizando a funcao de Ler o autor pelo ID para validar se realmente existe
    const autorExiste = await listarAutorPorId(id);

    if (!autorExiste) {
        throw new Error("Autor nao encontrado.")
    };

    const autorDeletado = await prisma.autor.delete({
        where: { id_autor: Number(id) }
    });

    return autorDeletado;
}

export default {
    listarAutores,
    listarAutorPorId,
    criarAutor,
    atualizarAutor,
    deletarAutor
}