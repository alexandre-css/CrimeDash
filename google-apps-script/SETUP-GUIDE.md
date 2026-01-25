# 🚀 Guia de Configuração - Google Apps Script

Este guia explica como configurar o monitoramento automático de emails usando Google Apps Script (100% gratuito e na nuvem).

---

## 📋 Passo a Passo

### 1️⃣ Criar Projeto no Google Apps Script

1. Acesse: **https://script.google.com/**
2. Clique em **+ Novo projeto**
3. Nomeie o projeto: **"CrimeDash Email Monitor"**

---

### 2️⃣ Colar o Código

1. Delete o código padrão (`function myFunction() {}`)
2. Copie TODO o conteúdo do arquivo `google-apps-script/Code.gs`
3. Cole no editor
4. Clique em **💾 Salvar** (Ctrl+S)

---

### 3️⃣ Autorizar Permissões

1. No menu superior, selecione a função **`install`**
2. Clique em **▶️ Executar**
3. Uma janela vai pedir autorização:
    - Clique em **"Analisar permissões"**
    - Selecione sua conta Google
    - Clique em **"Avançado"**
    - Clique em **"Acessar CrimeDash Email Monitor (não seguro)"**
    - Clique em **"Permitir"**

**Permissões solicitadas:**

- ✅ Ler emails do Gmail
- ✅ Criar/modificar arquivos no Google Drive
- ✅ Executar como trigger temporal

---

### 4️⃣ Verificar Instalação

Após executar `install()`, verifique os logs:

- Menu: **Exibir** → **Registros de execução**
- Deve aparecer: "✅ Instalação concluída! Trigger criado."

---

### 5️⃣ Implantar como Web App

1. No canto superior direito, clique em **"Implantar"** → **"Nova implantação"**
2. Clique no ícone de **engrenagem ⚙️** → **"Aplicativo da Web"**
3. Configure:
    - **Descrição:** CrimeDash PowerBI API
    - **Executar como:** Eu (seu email)
    - **Quem tem acesso:** Qualquer pessoa
4. Clique em **"Implantar"**
5. **COPIE A URL** que aparece (algo como: `https://script.google.com/macros/s/AKfy...../exec`)
6. Clique em **"Concluído"**

⚠️ **IMPORTANTE:** Guarde essa URL, você vai precisar dela no frontend!

---

### 6️⃣ Testar Manualmente

1. Selecione a função **`testScript`** no menu superior
2. Clique em **▶️ Executar**
3. Verifique os logs para ver se encontrou emails

---

## 🔄 Como Funciona

### **Monitoramento Automático:**

- ⏰ A cada **5 minutos**, o script verifica novos emails
- 📧 Busca emails com título: `"Subscription for Criminais (Visão Geral Acervos)"`
- 📎 Baixa anexos chamados `"Criminais.pdf"`
- 💾 Salva no Google Drive (pasta **CrimeDash_PowerBI**)
- 🏷️ Marca email como processado (label **CrimeDash/Processado**)

### **API para Frontend:**

- 🌐 Expõe endpoint público: `https://script.google.com/.../exec`
- 📦 Retorna JSON com URL do último PDF
- 🖼️ Frontend pode exibir diretamente

---

## 🔧 Atualizar o Frontend

Após implantar, você precisa atualizar o componente React para usar a URL do Google Apps Script.

**Cole a URL da Web App aqui:**

```
https://script.google.com/macros/s/SEU_ID_AQUI/exec
```

Guarde essa URL para o próximo passo!

---

## 🗂️ Estrutura de Arquivos

```
Google Drive/
└── CrimeDash_PowerBI/          ← Pasta criada automaticamente
    ├── Criminais_1737734400000.pdf
    └── Criminais_1737820800000.pdf (mantém últimos 5)

Gmail/
└── Labels/
    └── CrimeDash/Processado    ← Marca emails já processados
```

---

## 🛠️ Solução de Problemas

### ❌ "Não encontrei emails"

**Solução:**

- Verifique se o título do email é exatamente: `"Subscription for Criminais (Visão Geral Acervos)"`
- Verifique se tem anexo PDF com "Criminais" no nome

### ❌ "Erro de permissão"

**Solução:** Execute `install()` novamente e autorize todas as permissões

### ❌ "Trigger não está executando"

**Solução:**

1. Vá em **Gatilhos** (ícone de relógio ⏰ no menu lateral)
2. Verifique se existe um trigger `processNewEmails`
3. Se não, execute `install()` novamente

---

## 📊 Monitorar Execuções

1. Clique no ícone de **relógio ⏰** no menu lateral esquerdo
2. Veja o histórico de todas as execuções
3. Clique em uma execução para ver os logs detalhados

---

## 🎯 Próximos Passos

Depois de configurar o Google Apps Script:

1. ✅ Copie a URL da Web App
2. ➡️ Atualize o componente React para usar essa URL
3. 🚀 Pronto! Tudo funcionando na nuvem gratuitamente

---

**Configuração concluída! 🎉**

Qualquer dúvida, consulte os logs no Google Apps Script.
