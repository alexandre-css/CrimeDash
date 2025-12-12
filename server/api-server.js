const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const LINKS_FILE = path.join(__dirname, '../src/hooks/useLinks.ts');
const BACKUP_DIR = path.join(__dirname, '../backups');

// Garantir que o diretório de backup existe
async function ensureBackupDir() {
    try {
        await fs.mkdir(BACKUP_DIR, { recursive: true });
    } catch (error) {
        console.error('Erro ao criar diretório de backup:', error);
    }
}

// Ler links do arquivo TypeScript
async function readLinks() {
    const content = await fs.readFile(LINKS_FILE, 'utf-8');
    
    // Extrair o array DEFAULT_LINKS (mais flexível)
    const match = content.match(/const DEFAULT_LINKS:\s*LinkCard\[\]\s*=\s*(\[[\s\S]*?\n\];)/);
    if (!match) {
        throw new Error('Não foi possível encontrar DEFAULT_LINKS no arquivo');
    }
    
    // Pegar apenas o conteúdo do array
    let linksStr = match[1];
    
    // Remover o ]; final
    linksStr = linksStr.replace(/\];$/, ']');
    
    // Converter TypeScript para JSON válido
    linksStr = linksStr
        .replace(/(\w+):/g, '"$1":')  // Adicionar aspas nas chaves
        .replace(/,(\s*[}\]])/g, '$1') // Remover trailing commas
        .replace(/"/g, '"');           // Normalizar aspas
    
    try {
        return JSON.parse(linksStr);
    } catch (error) {
        console.error('Erro ao fazer parse dos links:', error.message);
        console.error('String problemática:', linksStr.substring(0, 500));
        throw new Error('Erro ao fazer parse dos links: ' + error.message);
    }
}

// Salvar links no arquivo TypeScript
async function saveLinks(links) {
    // Fazer backup
    await ensureBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `useLinks-${timestamp}.ts`);
    const currentContent = await fs.readFile(LINKS_FILE, 'utf-8');
    await fs.writeFile(backupFile, currentContent, 'utf-8');
    
    // Gerar código TypeScript formatado
    const linksCode = JSON.stringify(links, null, 4)
        .replace(/"(\w+)":/g, '$1:')  // Remover aspas das chaves
        .replace(/"/g, '"');           // Usar aspas duplas
    
    // Ler arquivo atual
    let content = await fs.readFile(LINKS_FILE, 'utf-8');
    
    // Substituir apenas o array DEFAULT_LINKS
    const newContent = content.replace(
        /const DEFAULT_LINKS:\s*LinkCard\[\]\s*=\s*\[[\s\S]*?\n\];/,
        `const DEFAULT_LINKS: LinkCard[] = ${linksCode};`
    );
    
    await fs.writeFile(LINKS_FILE, newContent, 'utf-8');
    
    console.log(`✓ Links salvos! Backup: ${path.basename(backupFile)}`);
    return { success: true, backup: path.basename(backupFile) };
}

// Rotas da API
app.get('/api/links', async (req, res) => {
    try {
        const links = await readLinks();
        res.json({ success: true, links });
    } catch (error) {
        console.error('Erro ao ler links:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/links', async (req, res) => {
    try {
        const { links } = req.body;
        
        if (!Array.isArray(links)) {
            return res.status(400).json({ success: false, error: 'Links deve ser um array' });
        }
        
        const result = await saveLinks(links);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error('Erro ao salvar links:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/backups', async (req, res) => {
    try {
        const files = await fs.readdir(BACKUP_DIR);
        const backups = files
            .filter(f => f.endsWith('.ts'))
            .sort()
            .reverse()
            .slice(0, 10); // Últimos 10 backups
        
        res.json({ success: true, backups });
    } catch (error) {
        res.json({ success: true, backups: [] });
    }
});

// Iniciar servidor
async function start() {
    await ensureBackupDir();
    
    app.listen(PORT, () => {
        console.log('');
        console.log('========================================');
        console.log('  🔗 Editor de Links - Servidor API');
        console.log('========================================');
        console.log('');
        console.log(`  Servidor rodando em: http://localhost:${PORT}`);
        console.log(`  Arquivo: ${path.relative(process.cwd(), LINKS_FILE)}`);
        console.log(`  Backups: ${path.relative(process.cwd(), BACKUP_DIR)}`);
        console.log('');
        console.log('  Rotas disponíveis:`);
        console.log(`    GET  /api/links     - Listar links`);
        console.log(`    POST /api/links     - Salvar links`);
        console.log(`    GET  /api/backups   - Listar backups`);
        console.log('');
        console.log('  Pressione Ctrl+C para parar');
        console.log('========================================');
        console.log('');
    });
}

start().catch(console.error);
