const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const { fromPath } = require("pdf2pic");

class EmailMonitor {
    constructor() {
        this.gmail = null;
        this.auth = null;
        this.isRunning = false;
        this.lastCheckedMessageId = null;
    }

    async initialize() {
        try {
            // Carrega credenciais do arquivo credentials.json
            const credentialsPath = path.join(__dirname, "credentials.json");
            if (!fs.existsSync(credentialsPath)) {
                console.error(
                    "❌ Arquivo credentials.json não encontrado em server/",
                );
                console.log(
                    "📋 Siga as instruções no README para configurar Gmail API",
                );
                return false;
            }

            const credentials = JSON.parse(
                fs.readFileSync(credentialsPath, "utf8"),
            );
            const { client_secret, client_id, redirect_uris } =
                credentials.installed || credentials.web;

            // Para aplicativos desktop, use o redirect URI correto
            const redirectUri = redirect_uris
                ? redirect_uris[0]
                : "urn:ietf:wg:oauth:2.0:oob";

            // Configura OAuth2
            const oAuth2Client = new google.auth.OAuth2(
                client_id,
                client_secret,
                redirectUri,
            );

            // Carrega token salvo
            const tokenPath = path.join(__dirname, "token.json");
            if (!fs.existsSync(tokenPath)) {
                console.error(
                    "❌ Token não encontrado. Execute o setup primeiro.",
                );
                console.log("📋 Execute: node server/gmail-setup.cjs");
                return false;
            }

            const token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
            oAuth2Client.setCredentials(token);

            this.auth = oAuth2Client;
            this.gmail = google.gmail({ version: "v1", auth: oAuth2Client });

            console.log("✅ Gmail API inicializada com sucesso");
            return true;
        } catch (error) {
            console.error("❌ Erro ao inicializar Gmail API:", error.message);
            return false;
        }
    }

    async checkForNewEmails() {
        if (!this.gmail) return;

        try {
            // Busca emails com título específico
            const query =
                'subject:"Subscription for Criminais (Visão Geral Acervos)" has:attachment';

            const response = await this.gmail.users.messages.list({
                userId: "me",
                q: query,
                maxResults: 5,
            });

            const messages = response.data.messages || [];

            if (messages.length === 0) {
                console.log("📧 Nenhum email novo encontrado");
                return;
            }

            // Processa apenas o mais recente
            const latestMessage = messages[0];

            // Verifica se já processamos este email
            if (this.lastCheckedMessageId === latestMessage.id) {
                console.log("✅ Email já processado anteriormente");
                return;
            }

            console.log("📬 Novo email encontrado! Processando...");
            await this.processEmail(latestMessage.id);
            this.lastCheckedMessageId = latestMessage.id;
        } catch (error) {
            console.error("❌ Erro ao verificar emails:", error.message);
        }
    }

    async processEmail(messageId) {
        try {
            const message = await this.gmail.users.messages.get({
                userId: "me",
                id: messageId,
            });

            const parts = message.data.payload.parts || [];

            // Procura o anexo "Criminais.pdf"
            for (const part of parts) {
                if (
                    part.filename &&
                    part.filename.toLowerCase().includes("criminais.pdf")
                ) {
                    console.log(`📎 Anexo encontrado: ${part.filename}`);
                    await this.downloadAndConvertAttachment(messageId, part);
                    return;
                }
            }

            console.log('⚠️ Anexo "Criminais.pdf" não encontrado neste email');
        } catch (error) {
            console.error("❌ Erro ao processar email:", error.message);
        }
    }

    async downloadAndConvertAttachment(messageId, part) {
        try {
            const attachmentId = part.body.attachmentId;

            const attachment = await this.gmail.users.messages.attachments.get({
                userId: "me",
                messageId: messageId,
                id: attachmentId,
            });

            // Decodifica o anexo (base64)
            const data = Buffer.from(attachment.data.data, "base64");

            // Salva temporariamente o PDF
            const tempPdfPath = path.join(
                __dirname,
                "..",
                "public",
                "images",
                "powerbi",
                "temp.pdf",
            );
            fs.writeFileSync(tempPdfPath, data);
            console.log("💾 PDF baixado temporariamente");

            // Converte PDF para PNG
            await this.convertPdfToImage(tempPdfPath);

            // Remove PDF temporário
            fs.unlinkSync(tempPdfPath);
            console.log("🗑️ PDF temporário removido");
        } catch (error) {
            console.error("❌ Erro ao baixar/converter anexo:", error.message);
        }
    }

    async convertPdfToImage(pdfPath) {
        try {
            const outputDir = path.join(
                __dirname,
                "..",
                "public",
                "images",
                "powerbi",
            );

            const options = {
                density: 150,
                saveFilename: "latest",
                savePath: outputDir,
                format: "png",
                width: 1920,
                height: 1095,
            };

            const convert = fromPath(pdfPath, options);
            const pageToConvert = 1;

            const result = await convert(pageToConvert, {
                responseType: "image",
            });

            console.log("✅ PDF convertido para PNG com sucesso!");
            console.log(`📍 Salvo em: ${result.path}`);

            // Atualiza metadados
            const metadataPath = path.join(outputDir, "metadata.json");
            const metadata = {
                lastUpdate: new Date().toISOString(),
                fileName: result.name,
                path: `/images/powerbi/${result.name}`,
            };
            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        } catch (error) {
            console.error("❌ Erro ao converter PDF:", error.message);
            throw error;
        }
    }

    startMonitoring(intervalMinutes = 5) {
        if (this.isRunning) {
            console.log("⚠️ Monitoramento já está ativo");
            return;
        }

        // Cron job: executa a cada X minutos
        const cronExpression = `*/${intervalMinutes} * * * *`;

        console.log(
            `🚀 Iniciando monitoramento de emails (intervalo: ${intervalMinutes} min)`,
        );

        // Executa imediatamente
        this.checkForNewEmails();

        // Agenda execuções periódicas
        this.cronJob = cron.schedule(cronExpression, () => {
            console.log(
                `\n⏰ [${new Date().toLocaleString()}] Verificando novos emails...`,
            );
            this.checkForNewEmails();
        });

        this.isRunning = true;
        console.log("✅ Monitoramento ativo!");
    }

    stopMonitoring() {
        if (this.cronJob) {
            this.cronJob.stop();
            this.isRunning = false;
            console.log("🛑 Monitoramento parado");
        }
    }
}

module.exports = EmailMonitor;
