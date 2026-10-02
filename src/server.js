import express from 'express'
import router from './routes/emprestimos.routes.js'


const app = express()
app.use(express.json())
const PORT = 3000

app.use('/emprestimos', router)

app.use((err, req, res, next) => { res.status(err.status || 500).json({ erro: err.message }) })

app.listen(PORT, () => { console.log(`Server rodando em http://localhost:${PORT}`) })