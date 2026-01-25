// ========================================
// GOOGLE APPS SCRIPT - CRIMEDASH
// Power BI Dashboard - Integração com Power Automate
// ========================================

// CONFIGURAÇÕES
const CONFIG = {
    folderName: "CrimeDash_PowerBI",
    fileName: "Criminais.pdf", // Nome fixo do arquivo atualizado pelo Power Automate
};

// ========================================
// FUNÇÃO WEB APP - API para o frontend
// ========================================
function doGet(e) {
    try {
        const folder = getOrCreateFolder(CONFIG.folderName);
        const files = folder.getFilesByName(CONFIG.fileName);

        if (!files.hasNext()) {
            return ContentService.createTextOutput(
                JSON.stringify({
                    success: false,
                    error: "Nenhum arquivo disponível ainda",
                }),
            ).setMimeType(ContentService.MimeType.JSON);
        }

        const file = files.next();

        return ContentService.createTextOutput(
            JSON.stringify({
                success: true,
                fileName: file.getName(),
                fileUrl: file.getUrl(),
                downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`,
                fileId: file.getId(),
                lastUpdate: file.getLastUpdated().toISOString(),
                mimeType: file.getMimeType(),
            }),
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({
                success: false,
                error: error.message,
            }),
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

function getOrCreateFolder(folderName) {
    const folders = DriveApp.getFoldersByName(folderName);

    if (folders.hasNext()) {
        return folders.next();
    }

    const folder = DriveApp.createFolder(folderName);
    Logger.log(`📁 Pasta criada: ${folderName}`);
    return folder;
}

// ========================================
// FUNÇÃO DE TESTE - Verificar arquivo
// ========================================
function testAPI() {
    try {
        const folder = getOrCreateFolder(CONFIG.folderName);
        const files = folder.getFilesByName(CONFIG.fileName);

        if (!files.hasNext()) {
            Logger.log("❌ Arquivo não encontrado: " + CONFIG.fileName);
            return;
        }

        const file = files.next();
        Logger.log("✅ Arquivo encontrado!");
        Logger.log(`📄 Nome: ${file.getName()}`);
        Logger.log(`🆔 ID: ${file.getId()}`);
        Logger.log(`📅 Última modificação: ${file.getLastUpdated()}`);
        Logger.log(`🔗 URL: ${file.getUrl()}`);
    } catch (error) {
        Logger.log(`❌ Erro: ${error.message}`);
    }
}
