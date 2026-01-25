// ========================================
// GOOGLE APPS SCRIPT - CRIMEDASH (CORRIGIDO)
// Monitor de Emails Power BI
// ========================================

// CONFIGURAÇÕES
const CONFIG = {
    emailSubject: "Subscription for Criminais (Visão Geral Acervos)",
    attachmentName: "Criminais.pdf",
    folderName: "CrimeDash_PowerBI",
    processedLabel: "CrimeDash/Processado",
    checkHour: 8, // hora do dia (8h da manhã)
};

// ========================================
// FUNÇÃO PRINCIPAL - Processa novos emails
// ========================================
function processNewEmails() {
    try {
        // Busca pasta no Drive (ou cria se não existir)
        const folder = getOrCreateFolder(CONFIG.folderName);

        // Busca ou cria label para marcar emails processados
        const label = getOrCreateLabel(CONFIG.processedLabel);

        // Busca emails não processados
        const query = `subject:"${CONFIG.emailSubject}" has:attachment -label:${CONFIG.processedLabel}`;
        const threads = GmailApp.search(query, 0, 5);

        Logger.log(`Encontrados ${threads.length} email(s) não processado(s)`);

        threads.forEach((thread) => {
            const messages = thread.getMessages();

            messages.forEach((message) => {
                const attachments = message.getAttachments();

                attachments.forEach((attachment) => {
                    const fileName = attachment.getName().toLowerCase();

                    if (
                        fileName.includes("criminais") &&
                        fileName.endsWith(".pdf")
                    ) {
                        Logger.log(`Processando: ${attachment.getName()}`);

                        // Salva PDF no Drive
                        const file = folder.createFile(attachment);
                        file.setName(`Criminais_${new Date().getTime()}.pdf`);
                        file.setSharing(
                            DriveApp.Access.ANYONE_WITH_LINK,
                            DriveApp.Permission.VIEW,
                        );

                        // Salva metadados
                        saveMetadata(file, message.getDate());

                        Logger.log(`✅ Arquivo salvo: ${file.getName()}`);
                    }
                });
            });

            // Marca thread como processada
            thread.addLabel(label);
        });

        // Limpa arquivos antigos (mantém apenas os 5 mais recentes)
        cleanOldFiles(folder, 5);
    } catch (error) {
        Logger.log(`❌ Erro: ${error.message}`);
    }
}

// ========================================
// FUNÇÃO WEB APP - API para o frontend
// ========================================
function doGet(e) {
    try {
        const folder = getOrCreateFolder(CONFIG.folderName);
        const metadata = getMetadata();

        if (!metadata || !metadata.fileId) {
            return ContentService.createTextOutput(
                JSON.stringify({
                    success: false,
                    error: "Nenhum arquivo disponível ainda",
                }),
            ).setMimeType(ContentService.MimeType.JSON);
        }

        const file = DriveApp.getFileById(metadata.fileId);

        return ContentService.createTextOutput(
            JSON.stringify({
                success: true,
                fileName: file.getName(),
                fileUrl: file.getUrl(),
                downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`,
                fileId: file.getId(),
                lastUpdate: metadata.lastUpdate,
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

function getOrCreateLabel(labelName) {
    let label = GmailApp.getUserLabelByName(labelName);

    if (!label) {
        label = GmailApp.createLabel(labelName);
        Logger.log(`🏷️ Label criada: ${labelName}`);
    }

    return label;
}

function saveMetadata(file, emailDate) {
    const props = PropertiesService.getScriptProperties();
    const metadata = {
        fileId: file.getId(),
        fileName: file.getName(),
        lastUpdate: emailDate.toISOString(),
        processedAt: new Date().toISOString(),
    };

    props.setProperty("latestFile", JSON.stringify(metadata));
}

function getMetadata() {
    const props = PropertiesService.getScriptProperties();
    const data = props.getProperty("latestFile");

    if (!data) return null;

    try {
        return JSON.parse(data);
    } catch (e) {
        return null;
    }
}

function cleanOldFiles(folder, keepCount) {
    const files = folder.getFilesByType(MimeType.PDF);
    const fileList = [];

    while (files.hasNext()) {
        fileList.push(files.next());
    }

    // Ordena por data (mais recentes primeiro)
    fileList.sort(
        (a, b) => b.getDateCreated().getTime() - a.getDateCreated().getTime(),
    );

    // Remove arquivos antigos
    if (fileList.length > keepCount) {
        for (let i = keepCount; i < fileList.length; i++) {
            Logger.log(`🗑️ Removendo arquivo antigo: ${fileList[i].getName()}`);
            fileList[i].setTrashed(true);
        }
    }
}

// ========================================
// FUNÇÃO DE INSTALAÇÃO - Execute UMA VEZ
// ========================================
function install() {
    // Remove triggers antigos
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach((trigger) => ScriptApp.deleteTrigger(trigger));

    // Cria trigger para executar todos os dias às 8h
    ScriptApp.newTrigger("processNewEmails")
        .timeBased()
        .atHour(CONFIG.checkHour)
        .everyDays(1)
        .create();

    Logger.log("✅ Instalação concluída! Trigger criado.");
    Logger.log(
        `⏰ Verificação automática todos os dias às ${CONFIG.checkHour}h`,
    );

    // Executa uma vez agora para testar
    processNewEmails();
}

// ========================================
// FUNÇÃO DE TESTE MANUAL
// ========================================
function testScript() {
    Logger.log("🧪 Iniciando teste...");
    processNewEmails();
    Logger.log("✅ Teste concluído! Verifique os logs.");
}

// ========================================
// ATUALIZAR METADADOS PARA ARQUIVO MAIS RECENTE
// Use esta função se adicionar arquivo manualmente no Drive
// ========================================
function updateToLatestFile() {
    try {
        const folder = getOrCreateFolder(CONFIG.folderName);
        const files = folder.getFilesByType(MimeType.PDF);
        const fileList = [];

        while (files.hasNext()) {
            fileList.push(files.next());
        }

        if (fileList.length === 0) {
            Logger.log("❌ Nenhum arquivo PDF encontrado na pasta");
            return;
        }

        // Ordena por data (mais recente primeiro)
        fileList.sort(
            (a, b) =>
                b.getDateCreated().getTime() - a.getDateCreated().getTime(),
        );

        const latestFile = fileList[0];

        // Atualiza metadados
        const props = PropertiesService.getScriptProperties();
        const metadata = {
            fileId: latestFile.getId(),
            fileName: latestFile.getName(),
            lastUpdate: latestFile.getDateCreated().toISOString(),
            processedAt: new Date().toISOString(),
        };

        props.setProperty("latestFile", JSON.stringify(metadata));

        Logger.log("✅ Metadados atualizados!");
        Logger.log(`📄 Arquivo: ${latestFile.getName()}`);
        Logger.log(`📅 Data: ${latestFile.getDateCreated()}`);
    } catch (error) {
        Logger.log(`❌ Erro: ${error.message}`);
    }
}
