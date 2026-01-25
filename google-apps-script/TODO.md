# 📋 Lista de Tarefas - Configuração Google Apps Script

## ✅ O que já foi feito:

1. ✅ Código do Google Apps Script criado (`google-apps-script/Code.gs`)
2. ✅ Guia de configuração criado (`google-apps-script/SETUP-GUIDE.md`)
3. ✅ Componente React atualizado para usar Google Apps Script
4. ✅ Viewer de PDF integrado (iframe do Google Drive)

---

## 📝 O que VOCÊ precisa fazer:

### **1. Configurar Google Apps Script (15 minutos)**

Siga o guia completo em: `google-apps-script/SETUP-GUIDE.md`

**Resumo:**

1. Acesse https://script.google.com/
2. Crie novo projeto
3. Cole o código de `google-apps-script/Code.gs`
4. Execute a função `install()` e autorize
5. Implante como Web App
6. **COPIE A URL da Web App**

---

### **2. Atualizar URL no Frontend**

Abra o arquivo:

```
src/components/dashboard/PowerBIDashboard.tsx
```

**Linha 12**, substitua:

```typescript
const GOOGLE_APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/SEU_ID_AQUI/exec";
```

Por:

```typescript
const GOOGLE_APPS_SCRIPT_URL = "SUA_URL_COPIADA_AQUI";
```

---

### **3. Testar**

1. Execute: `npm run dev`
2. Acesse: http://localhost:5173/powerbi
3. Se aparecer erro "Nenhum arquivo disponível", é normal (ainda não tem email processado)
4. Envie um email de teste ou aguarde o próximo email do Power BI

---

## 🎯 Vantagens desta solução:

- ✅ **100% gratuito** (sem custos de servidor)
- ✅ **Sempre ativo** (roda na nuvem do Google)
- ✅ **Não precisa PC ligado**
- ✅ **Automático** (verifica emails a cada 5 minutos)
- ✅ **Fácil de configurar** (interface visual)
- ✅ **Integração nativa** com Gmail e Drive

---

## 🆘 Precisa de ajuda?

Consulte o arquivo `google-apps-script/SETUP-GUIDE.md` para:

- Instruções passo a passo
- Solução de problemas
- Como monitorar execuções

---

**Próximo passo:** Abra o arquivo `google-apps-script/SETUP-GUIDE.md` e siga as instruções! 🚀
