// Middleware 404 para rotas não encontradas
// Deve ser adicionado após todas as rotas e antes do errorMiddleware
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });
};

export default notFoundHandler;