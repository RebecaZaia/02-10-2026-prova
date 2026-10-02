import { Router } from 'express'
import { listEmprestimos, getEmprestimo, createEmprestimo, update, patch } from '../controllers/emprestimos.controller.js' //deleteEmprestimo, restoreEmprestimo
const router = Router()
router.get('/', listEmprestimos)
router.get('/:id', getEmprestimo)
router.post('/', createEmprestimo)
router.put('/:id', update)
router.patch('/:id/restore', patch)
export default router