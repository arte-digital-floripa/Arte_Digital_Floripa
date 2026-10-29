import 'dotenv/config'
import cors from 'cors';
import express from 'express';
import usuarioRoutes from './modules/usuario/usuarioRoutes.js';
import autorRoutes from './modules/autor/autorRoutes.js';
import obraRoutes from './modules/obra/obraRoutes.js';
import authRoutes from './modules/auth/authRoutes.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json({
    limit: '50mb'
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/usuários", usuarioRoutes);
app.use("/autores", autorRoutes);
app.use("/obras", obraRoutes);
app.use("/auth", authRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port);