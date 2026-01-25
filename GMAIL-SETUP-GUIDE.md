# 🔐 Guia de Configuração - Gmail API para Power BI Automation

Este guia explica como configurar a integração com Gmail API para automatizar o download e exibição de relatórios Power BI.

## 📋 Pré-requisitos

- Conta Google (alexandresimassantos@gmail.com)
- Node.js instalado
- Dependências do projeto instaladas (`npm install`)

---

## 🚀 Passo a Passo

### 1️⃣ Criar Projeto no Google Cloud Console

1. Acesse: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Nomeie o projeto (ex: "CrimeDash Email Monitor")

### 2️⃣ Ativar Gmail API

1. No menu lateral, vá em **APIs e Serviços** → **Biblioteca**
2. Pesquise por "Gmail API"
3. Clique em **Ativar**

### 3️⃣ Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS** → **ID do cliente OAuth**
3. Configure a tela de consentimento (se necessário):
    - Tipo: **Externo** (ou Interno se sua organização tiver)
    - Preencha informações básicas
    - Escopos: adicione `https://www.googleapis.com/auth/gmail.readonly`
    - Adicione seu email como usuário de teste
4. Volte para **Credenciais** → **+ CRIAR CREDENCIAIS** → **ID do cliente OAuth**
5. Tipo de aplicativo: **Aplicativo de computador**
6. Nome: "CrimeDash Desktop Client"
7. **IMPORTANTE**: Adicione os seguintes URIs de redirecionamento:
    - `urn:ietf:wg:oauth:2.0:oob`
    - `http://localhost`
8. Clique em **Criar**

### 4️⃣ Baixar Credenciais

1. Após criar, clique no ícone de **download** (⬇️) ao lado das credenciais criadas
2. Salve o arquivo JSON baixado como `credentials.json` na pasta `server/`
3. **IMPORTANTE**: Adicione ao `.gitignore`:
    ```
    server/credentials.json
    server/token.json
    ```

### 5️⃣ Autorizar Aplicação

No terminal, execute:

```bash
node server/gmail-setup.cjs
```

Siga as instruções:

1. Uma URL será exibida no terminal
2. Copie e cole no navegador
3. Faça login com sua conta Google (alexandresimassantos@gmail.com)
4. Aceite as permissões solicitadas
5. Você verá uma página com o código de autorização
6. Copie APENAS o código (sem espaços)
7. Cole no terminal quando solicitado

✅ Um arquivo `token.json` será criado automaticamente na pasta `server/`

### 6️⃣ Testar Configuração

Inicie o servidor:

```bash
npm run dev:api
```

Você deve ver:

```
✅ Gmail API inicializada com sucesso
📧 Monitoramento de emails ativo!
```

---

## 🔄 Como Funciona

1. **Monitoramento Automático**: A cada 5 minutos, o servidor verifica novos emails
2. **Filtro**: Busca emails com título "Subscription for Criminais (Visão Geral Acervos)"
3. **Download**: Baixa o anexo "Criminais.pdf"
4. **Conversão**: Converte o PDF para PNG automaticamente
5. **Exibição**: Frontend atualiza e exibe a imagem mais recente

---

## 🗂️ Estrutura de Arquivos

```
server/
├── credentials.json      ⬅️ CRIAR (não commitar)
├── token.json           ⬅️ GERADO (não commitar)
├── gmail-setup.cjs      ✅ Script de configuração
├── email-monitor.cjs    ✅ Monitoramento de emails
└── api-server.cjs       ✅ Servidor principal

public/images/powerbi/
├── latest.1.png         ⬅️ GERADO (imagem convertida)
└── metadata.json        ⬅️ GERADO (informações da última atualização)
```

---

## 🛠️ Solução de Problemas

### ❌ Erro: "Erro 400: bad_request"

**Causas comuns:**

1. Redirect URI não configurado no Google Cloud Console
2. URI de redirecionamento incorreto

**Solução:**

1. Vá para o Google Cloud Console → **APIs e Serviços** → **Credenciais**
2. Clique nas suas credenciais OAuth 2.0
3. Em **URIs de redirecionamento autorizados**, adicione:
    - `urn:ietf:wg:oauth:2.0:oob`
    - `http://localhost`
4. Salve as alterações
5. **IMPORTANTE**: Baixe o arquivo JSON novamente e substitua o `credentials.json`
6. Execute `node server/gmail-setup.cjs` novamente

### ❌ Erro: "credentials.json não encontrado"

**Solução**: Baixe as credenciais do Google Cloud Console e salve em `server/credentials.json`

### ❌ Erro: "Token não encontrado"

**Solução**: Execute `node server/gmail-setup.cjs` para autorizar

### ❌ Erro: "Invalid grant" ou "Token expirado"

**Solução**: Delete `server/token.json` e execute `node server/gmail-setup.cjs` novamente

### ⚠️ Nenhum email encontrado

**Solução**: Certifique-se de que:

- O título do email é exatamente: "Subscription for Criminais (Visão Geral Acervos)"
- O anexo é chamado "Criminais.pdf"
- O email foi recebido em alexandresimassantos@gmail.com

---

## 🔒 Segurança

- ✅ `credentials.json` e `token.json` estão no `.gitignore`
- ✅ OAuth2 garante segurança sem expor senha
- ✅ Acesso apenas de leitura aos emails (`gmail.readonly`)
- ✅ Tokens podem ser revogados a qualquer momento no Google Cloud Console

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do servidor
2. Teste a conexão com: `node server/gmail-setup.cjs`
3. Verifique permissões no Google Cloud Console

---

**Configuração concluída! 🎉**
