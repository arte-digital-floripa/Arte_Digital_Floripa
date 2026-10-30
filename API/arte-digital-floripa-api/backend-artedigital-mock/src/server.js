import express from 'express';
import prisma from './libs/prisma.js';

// import de rotas da api

import artistRoutes from './routes/artistRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';

const app = express();

// porta do servidor

const port = process.env.PORT || 3000

app.use(express.json());

app.use('/api/artists', artistRoutes);
app.use('/api/artwork', artworkRoutes);

// health check do supabase

app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: 'ok',
        })
    } catch (error) {
        console.error('Health check falhou: ', error)
        res.status(500).json({
            status: 'error'
        })
    }
})

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

