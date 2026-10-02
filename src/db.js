import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFile } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "data.json");

export async function readEmprestimos() {
    try {
        const raw = await readFile(DB_PATH, 'utf8');
        return JSON.parse(raw)
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

export async function writeEmprestimos(emprestimos) { await writeFile(DB_PATH, JSON.stringify(emprestimos, null, 2), 'utf8') }