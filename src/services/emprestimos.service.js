import { emprestimosModel } from '../models/emprestimos.model.js'

export async function findAll() { 
  let emprestimos = await emprestimosModel.findAll()
  emprestimos = emprestimos.filter( emprestimo => !emprestimo.deletedAt)
  return emprestimos
}

export async function findById(id) { return await emprestimosModel.findById(id) }

export async function createEmprestimo(nomeAluno, livro, devolvidoEm) {
  if (!nomeAluno || typeof nomeAluno !== 'string') {
    const erro = new Error('Nome do aluno é obrigatório')
    erro.status = 400
    throw erro
  }
  if (!livro || typeof livro !== 'string') {
    const erro = new Error('Livro é obrigatório')
    erro.status = 400
    throw erro
  }
  return await emprestimosModel.create({ nomeAluno, livro, devolvidoEm })
}

export async function updateEmprestimo(id, nomeAluno, livro, devolvidoEm) {
  if (!nomeAluno || typeof nomeAluno !== 'string') {
    const erro = new Error('Nome do aluno é obrigatório')
    erro.status = 400
    throw erro
  }
  if (!livro || typeof livro !== 'string') {
    const erro = new Error('Livro é obrigatório')
    erro.status = 400
    throw erro
  }
  const emprestimo = await emprestimosModel.update(id, { nomeAluno, livro, devolvidoEm })
  if (!emprestimo) {
    const erro = new Error('Empréstimo não encontrado')
    erro.status = 404
    throw erro
  }
  return emprestimo
}

export async function patchEmprestimo(id, data) {
  const { id: _, createdAt: __, updatedAt: ___, ...dadosPermitidos } = data
  const emprestimo = await emprestimosModel.patch(id, dadosPermitidos)
  if (!emprestimo) {
    const erro = new Error('Empréstimo não encontrado')
    erro.status = 404
    throw erro
  }
  return emprestimo
}