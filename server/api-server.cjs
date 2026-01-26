const express = require("express");
const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const cors = require("cors");
const EmailMonitor = require("./email-monitor.cjs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const LINKS_FILE = path.join(__dirname, "../src/hooks/useLinks.ts");
const BACKUP_DIR = path.join(__dirname, "../backups");

// Garantir que o diretório de backup existe
async function ensureBackupDir() {
    try {
        await fs.mkdir(BACKUP_DIR, { recursive: true });
    } catch (error) {
        console.error("Erro ao criar diretório de backup:", error);
    }
}

// Ler links do arquivo TypeScript
async function readLinks() {
    const content = await fs.readFile(LINKS_FILE, "utf-8");

    // Extrair o array DEFAULT_LINKS (mais flexível)
    const match = content.match(
        /const DEFAULT_LINKS:\s*LinkCard\[\]\s*=\s*(\[[\s\S]*?\n\];)/,
    );
    if (!match) {
        throw new Error("Não foi possível encontrar DEFAULT_LINKS no arquivo");
    }

    // Pegar apenas o conteúdo do array
    let linksStr = match[1];

    // Remover o ]; final
    linksStr = linksStr.replace(/\];$/, "]");

    // Remover comentários (// e /* */)
    // Mas preservar :// nas URLs
    linksStr = linksStr
        .replace(/([^:]|^)\/\/.*$/gm, "$1") // Remove comentários de linha (mas não ://)
        .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove comentários de bloco

    // PRIMEIRO normalizar aspas curvas para retas (ANTES de adicionar aspas nas chaves)
    linksStr = linksStr.replace(/[""]/g, '"');

    // DEPOIS converter TypeScript para JSON válido
    // Adicionar aspas apenas em chaves de objetos (no início da linha, após espaços)
    linksStr = linksStr
        .replace(/(\s+)(\w+):/g, '$1"$2":') // Adicionar aspas nas chaves (com espaço antes)
        .replace(/,(\s*[}\]])/g, "$1"); // Remover trailing commas

    try {
        return JSON.parse(linksStr);
    } catch (error) {
        console.error("Erro ao fazer parse dos links:", error.message);
        console.error(
            "String problemática (primeiros 500 chars):",
            linksStr.substring(0, 500),
        );
        throw new Error("Erro ao fazer parse dos links: " + error.message);
    }
}

// Salvar links no arquivo TypeScript
async function saveLinks(links) {
    // Fazer backup
    await ensureBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `useLinks-${timestamp}.ts`);
    const currentContent = await fs.readFile(LINKS_FILE, "utf-8");
    await fs.writeFile(backupFile, currentContent, "utf-8");

    // Gerar código TypeScript formatado
    const linksCode = JSON.stringify(links, null, 4)
        .replace(/"(\w+)":/g, "$1:") // Remover aspas das chaves
        .replace(/"/g, '"'); // Usar aspas duplas

    // Ler arquivo atual
    let content = await fs.readFile(LINKS_FILE, "utf-8");

    // Substituir apenas o array DEFAULT_LINKS
    const newContent = content.replace(
        /const DEFAULT_LINKS:\s*LinkCard\[\]\s*=\s*\[[\s\S]*?\n\];/,
        `const DEFAULT_LINKS: LinkCard[] = ${linksCode};`,
    );

    await fs.writeFile(LINKS_FILE, newContent, "utf-8");

    console.log(`✓ Links salvos! Backup: ${path.basename(backupFile)}`);
    return { success: true, backup: path.basename(backupFile) };
}

// Salvar ordem das categorias
async function saveCategoryOrder(categoryOrder) {
    await ensureBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `useLinks-${timestamp}.ts`);
    const currentContent = await fs.readFile(LINKS_FILE, "utf-8");
    await fs.writeFile(backupFile, currentContent, "utf-8");

    // Gerar código do array
    const orderCode = JSON.stringify(categoryOrder, null, 4).replace(/"/g, '"');

    // Substituir CATEGORY_ORDER no arquivo
    const newContent = currentContent.replace(
        /export const CATEGORY_ORDER = \[[\s\S]*?\];/,
        `export const CATEGORY_ORDER = ${orderCode};`,
    );

    await fs.writeFile(LINKS_FILE, newContent, "utf-8");

    console.log(
        `✓ Ordem de categorias salva! Backup: ${path.basename(backupFile)}`,
    );
    return { success: true, backup: path.basename(backupFile) };
}

// Ler ordem das categorias
async function readCategoryOrder() {
    const content = await fs.readFile(LINKS_FILE, "utf-8");
    const match = content.match(
        /export const CATEGORY_ORDER = \[([\s\S]*?)\];/,
    );

    if (!match) {
        return [];
    }

    try {
        const orderStr = "[" + match[1] + "]";
        const normalized = orderStr.replace(/"/g, '"');
        return JSON.parse(normalized);
    } catch (error) {
        console.error("Erro ao ler ordem das categorias:", error.message);
        return [];
    }
}

// Rotas da API
app.get("/api/links", async (req, res) => {
    try {
        const links = await readLinks();
        res.json({ success: true, links });
    } catch (error) {
        console.error("Erro ao ler links:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post("/api/links", async (req, res) => {
    try {
        const { links } = req.body;

        if (!Array.isArray(links)) {
            return res
                .status(400)
                .json({ success: false, error: "Links deve ser um array" });
        }

        const result = await saveLinks(links);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("Erro ao salvar links:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obter ordem das categorias
app.get("/api/category-order", async (req, res) => {
    try {
        const order = await readCategoryOrder();
        res.json({ success: true, order });
    } catch (error) {
        console.error("Erro ao ler ordem das categorias:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Salvar ordem das categorias
app.post("/api/category-order", async (req, res) => {
    try {
        const { order } = req.body;

        if (!Array.isArray(order)) {
            return res.status(400).json({
                success: false,
                error: "Order deve ser um array de strings",
            });
        }

        const result = await saveCategoryOrder(order);
        res.json({ success: true, ...result });
    } catch (error) {
        console.error("Erro ao salvar ordem das categorias:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get("/api/backups", async (req, res) => {
    try {
        const files = await fs.readdir(BACKUP_DIR);
        const backups = files
            .filter((f) => f.endsWith(".ts"))
            .sort()
            .reverse()
            .slice(0, 10); // Últimos 10 backups

        res.json({ success: true, backups });
    } catch (error) {
        res.json({ success: true, backups: [] });
    }
});

// ===== ROTAS POWER BI =====

// Obter última imagem do Power BI
app.get("/api/powerbi/latest", async (req, res) => {
    try {
        const metadataPath = path.join(
            __dirname,
            "../public/images/powerbi/metadata.json",
        );

        if (!fsSync.existsSync(metadataPath)) {
            return res.status(404).json({
                success: false,
                error: "Nenhuma imagem disponível ainda",
            });
        }

        const metadata = JSON.parse(await fs.readFile(metadataPath, "utf-8"));
        res.json({ success: true, ...metadata });
    } catch (error) {
        console.error("Erro ao obter metadata Power BI:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Status do monitoramento de emails
app.get("/api/powerbi/status", (req, res) => {
    if (!global.emailMonitor) {
        return res.json({
            success: true,
            monitoring: false,
            message: "Monitoramento não configurado",
        });
    }

    res.json({
        success: true,
        monitoring: global.emailMonitor.isRunning,
        lastChecked: global.emailMonitor.lastCheckedMessageId ? "Sim" : "Não",
    });
});

// ===== GIT COMMIT E PUSH =====

// Fazer commit e push das mudanças
app.post("/api/git/push", async (req, res) => {
    try {
        const { exec } = require("child_process");
        const { promisify } = require("util");
        const execAsync = promisify(exec);

        const { message: commitMessage } = req.body;
        const finalMessage = commitMessage || "Atualiza links";

        console.log("\n🔄 Iniciando commit e push...");

        // 1. Verificar se há mudanças
        const { stdout: statusOutput } = await execAsync(
            "git status --porcelain",
        );

        if (!statusOutput.trim()) {
            return res.json({
                success: true,
                message: "✓ Não há mudanças para commitar",
                hasChanges: false,
            });
        }

        console.log("📝 Mudanças detectadas:");
        console.log(statusOutput);

        // 2. Adicionar arquivos
        await execAsync("git add .");
        console.log("✓ Arquivos adicionados");

        // 3. Fazer commit
        await execAsync(`git commit -m "${finalMessage}"`);
        console.log("✓ Commit realizado");

        // 4. Fazer push
        await execAsync("git push");
        console.log("✓ Push realizado");

        res.json({
            success: true,
            message: "✓ Mudanças enviadas para o GitHub!",
            hasChanges: true,
            commitMessage: finalMessage,
        });
    } catch (error) {
        console.error("❌ Erro ao fazer commit/push:", error);

        // Mensagens de erro mais amigáveis
        let errorMessage = error.message;
        if (error.message.includes("nothing to commit")) {
            errorMessage = "Não há mudanças para commitar";
        } else if (error.message.includes("not a git repository")) {
            errorMessage = "Diretório não é um repositório Git";
        } else if (error.message.includes("failed to push")) {
            errorMessage =
                "Falha ao fazer push. Verifique suas credenciais Git.";
        }

        res.status(500).json({
            success: false,
            error: errorMessage,
            details: error.stderr || error.stdout,
        });
    }
});

// Iniciar servidor
async function start() {
    await ensureBackupDir();

    app.listen(PORT, () => {
        console.log("");
        console.log("========================================");
        console.log("  🔗 Editor de Links - Servidor API");
        console.log("========================================");
        console.log("");
        console.log(`  Servidor rodando em: http://localhost:${PORT}`);
        console.log(`  Arquivo: ${path.relative(process.cwd(), LINKS_FILE)}`);
        console.log(`  Backups: ${path.relative(process.cwd(), BACKUP_DIR)}`);
        console.log("");
        console.log("  Rotas disponíveis:");
        console.log("    GET  /api/links              - Listar links");
        console.log("    POST /api/links              - Salvar links");
        console.log("    GET  /api/backups            - Listar backups");
        console.log("    POST /api/git/push           - Commit e push Git");
        console.log(
            "    GET  /api/powerbi/latest     - Última imagem Power BI",
        );
        console.log("    GET  /api/powerbi/status     - Status monitoramento");
        console.log("");
        console.log("  Pressione Ctrl+C para parar");
        console.log("========================================");
        console.log("");

        // Inicializar monitoramento de emails
        initializeEmailMonitoring();
    });
}

async function initializeEmailMonitoring() {
    try {
        const monitor = new EmailMonitor();
        const initialized = await monitor.initialize();

        if (initialized) {
            // Monitora a cada 5 minutos
            monitor.startMonitoring(5);
            global.emailMonitor = monitor;
            console.log("📧 Monitoramento de emails ativo!");
        } else {
            console.log("⚠️  Monitoramento de emails não configurado");
            console.log("    Execute: node server/gmail-setup.cjs");
        }
    } catch (error) {
        console.log("⚠️  Erro ao inicializar monitoramento:", error.message);
    }
}

start().catch(console.error);
