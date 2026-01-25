const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Escopo necessário para ler e modificar emails
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");

async function authorize() {
    // Verifica se o arquivo de credenciais existe
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error("\n❌ Arquivo credentials.json não encontrado!");
        console.log("\n📋 INSTRUÇÕES PARA CONFIGURAR GMAIL API:\n");
        console.log("1. Acesse: https://console.cloud.google.com/");
        console.log("2. Crie um novo projeto ou selecione um existente");
        console.log("3. Ative a Gmail API");
        console.log("4. Crie credenciais OAuth 2.0 (Aplicativo Desktop)");
        console.log(
            "5. Baixe o arquivo JSON e salve como server/credentials.json\n",
        );
        process.exit(1);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
    const { client_secret, client_id, redirect_uris } =
        credentials.installed || credentials.web;

    // Para aplicativos desktop, use o redirect URI correto
    const redirectUri = redirect_uris
        ? redirect_uris[0]
        : "urn:ietf:wg:oauth:2.0:oob";

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirectUri,
    );

    // Verifica se já temos um token salvo
    if (fs.existsSync(TOKEN_PATH)) {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);
        console.log("✅ Token já existe e foi carregado!");
        return oAuth2Client;
    }

    // Se não, solicita autorização
    return getNewToken(oAuth2Client);
}

function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("\n🔐 Autorize este app visitando esta URL:\n");
    console.log(authUrl);
    console.log("\n");
    console.log("⚠️  IMPORTANTE:");
    console.log("   1. Abra a URL acima no navegador");
    console.log("   2. Faça login e autorize o app");
    console.log("   3. Você será redirecionado para uma página com um código");
    console.log("   4. Copie APENAS o código (sem espaços)\n");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question("📝 Cole o código de autorização aqui: ", (code) => {
            rl.close();
            // Remove espaços em branco
            code = code.trim();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    console.error("❌ Erro ao obter token:", err);
                    reject(err);
                    return;
                }

                oAuth2Client.setCredentials(token);
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                console.log("\n✅ Token salvo em:", TOKEN_PATH);
                console.log("✅ Autorização concluída!\n");
                resolve(oAuth2Client);
            });
        });
    });
}

async function testGmailAccess(auth) {
    const gmail = google.gmail({ version: "v1", auth });

    try {
        const profile = await gmail.users.getProfile({ userId: "me" });
        console.log("\n✅ TESTE DE CONEXÃO BEM-SUCEDIDO!\n");
        console.log(`📧 Email: ${profile.data.emailAddress}`);
        console.log(`📊 Total de mensagens: ${profile.data.messagesTotal}`);
        console.log(`📁 Total de threads: ${profile.data.threadsTotal}\n`);

        // Testa busca de emails com o título específico
        console.log("🔍 Testando busca de emails...\n");
        const query =
            'subject:"Subscription for Criminais (Visão Geral Acervos)"';
        const response = await gmail.users.messages.list({
            userId: "me",
            q: query,
            maxResults: 5,
        });

        const messages = response.data.messages || [];
        console.log(
            `📬 Encontrados ${messages.length} email(s) com o título especificado\n`,
        );

        if (messages.length > 0) {
            console.log(
                "✅ Setup completo! O monitoramento está pronto para funcionar.\n",
            );
        } else {
            console.log("⚠️ Nenhum email encontrado com esse título ainda.");
            console.log(
                "   Quando receber um, o sistema irá processar automaticamente.\n",
            );
        }
    } catch (error) {
        console.error("❌ Erro ao testar acesso Gmail:", error.message);
    }
}

// Executa o setup
console.log("\n🚀 GMAIL API SETUP - CRIMEDASH\n");
console.log("═══════════════════════════════════════\n");

authorize()
    .then((auth) => testGmailAccess(auth))
    .then(() => {
        console.log("═══════════════════════════════════════");
        console.log("✅ Setup concluído com sucesso!");
        console.log("═══════════════════════════════════════\n");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Erro durante o setup:", error);
        process.exit(1);
    });
