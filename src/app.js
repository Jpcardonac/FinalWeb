import express from 'express'
import UsuariosRoutes from './routes/Usuarios.routes.js'
import TransaccionRoutes from './routes/Transaccion.routes.js'
import ProductosRoutes from './routes/Productos.routes.js'
import CategoriasRoutes from './routes/Categorias.routes.js'
import IndexRoutes from './routes/index.routes.js'



const app = express()

app.use(express.json())

app.use('/api',UsuariosRoutes)
app.use('/api',TransaccionRoutes)
app.use('/api',ProductosRoutes)
app.use('/api',CategoriasRoutes)
app.use('/api',IndexRoutes)

app.use((req, res, next) => {
    // Define un estado HTTP y un mensaje de respuesta
    res.status(404).send("Lo siento, la página que buscas no se encontró.");
});


export default app;