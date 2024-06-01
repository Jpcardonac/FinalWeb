// app.js
import express from 'express';
import cors from 'cors';
import UsuariosRoutes from './routes/Usuarios.routes.js';
import TransaccionRoutes from './routes/Transaccion.routes.js';
import ProductosRoutes from './routes/Productos.routes.js';
import CategoriasRoutes from './routes/Categorias.routes.js';
import IndexRoutes from './routes/index.routes.js';

const app = express();

// Middleware para habilitar CORS
app.use(cors());

app.use(express.json());

app.use('/api', UsuariosRoutes);
app.use('/api', TransaccionRoutes);
app.use('/api', ProductosRoutes);
app.use('/api', CategoriasRoutes);
app.use('/api', IndexRoutes);

app.use((req, res, next) => {
    res.status(404).send("Lo siento, la página que buscas no se encontró.");
});

export default app;
