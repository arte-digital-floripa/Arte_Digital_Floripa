import 'dotenv/config';
import express from 'express';
import prisma from './libs/prisma.js';

// import de rotas da api

import artistRoutes from './routes/artistRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';

const app = express();

// porta do servidor

const port = process.env.PORT || 3000;

// Middleware CORS para permitir chamadas do frontend em producao e desenvolvimento
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Arte Digital Floripa API',
  });
});

app.use('/api/artists', artistRoutes);
app.use('/api/artwork', artworkRoutes);
app.use('/api/artworks', artworkRoutes);

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

