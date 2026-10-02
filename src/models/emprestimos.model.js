import { readEmprestimos, writeEmprestimos } from '../db.js'

export const emprestimosModel = {
  async findAll() {return await readEmprestimos()},
  async findById(id) {
    const emprestimos = await readEmprestimos()
    const emprestimo = emprestimos.find(emprestimo => emprestimo.id === id)
    return emprestimo || null
  },
  
  async create(data) {
    const emprestimos = await readEmprestimos()
    const id = emprestimos.length ? Math.max(...emprestimos.map(emprestimo => emprestimo.id)) + 1 : 1
    const novoEmprestimo = { id, ...data }
    emprestimos.push(novoEmprestimo)
    await writeEmprestimos(emprestimos)
    return novoEmprestimo
  },

    async update(id, data) {
        const emprestimos = await readEmprestimos()
        const index = emprestimos.findIndex( emprestimo => emprestimo.id === id && !emprestimo.deletedAt )
        if (index === -1) return null
        emprestimos[index] = { id, ...data }
        await writeEmprestimos(emprestimos)
        return emprestimos[index]
    },
  
    async patch(id, data) {
        const emprestimos = await readEmprestimos()

        const emprestimo = emprestimos.find(emprestimo => emprestimo.id === id && !emprestimo.deletedAt)
        if (!emprestimo) return null

        Object.assign(emprestimo, data)
        emprestimo.updatedAt = new Date().toISOString()
        await writeEmprestimos(emprestimos)
        return emprestimo
    }
}