import { findAll, findById, createEmprestimo as createEmprestimoService, updateEmprestimo, patchEmprestimo } from '../services/emprestimos.service.js'

export async function listEmprestimos(req, res, next) {
  try {
    const emprestimos = await findAll()
    res.json(emprestimos)
  } catch (err) { next(err)}
}

export async function getEmprestimo(req, res, next) {
  try {
    const id = Number(req.params.id)
    const emprestimo = await findById(id)
    if (!emprestimo) return res.status(404).json({erro: 'Empréstimo não encontrado'})
    res.json(emprestimo)
  } catch (err) { next(err)}
}

export async function createEmprestimo(req, res, next) {
  try {
    const { nomeAluno, livro, devolvidoEm } = req.body || {}
    const novo = await createEmprestimoService(nomeAluno, livro, devolvidoEm)
    res.status(201).json(novo)
  } catch (err) { next(err) }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id)
    const { nomeAluno, livro, devolvidoEm } = req.body || {}
    const emprestimo = await updateEmprestimo(id, nomeAluno, livro, devolvidoEm)
    res.json(emprestimo)
  } catch (err) { next(err)}
}

export async function patch(req, res, next) {
  try {
    const id = Number(req.params.id)
    const emprestimo = await patchEmprestimo(id, req.body || {})
    res.json(emprestimo)
  } catch (err) { next(err)}
}