# CrimeDash 🔴

Dashboard personalizado para gestão de gabinete com foco em matéria criminal.

## 🎯 Sobre

CrimeDash é um hub centralizado para compartilhamento de links úteis e informações com membros da equipe, servindo como referência para diversas áreas da gestão de um gabinete de desembargador focado em direito criminal.

## ✨ Funcionalidades

-   🔗 **Links Úteis Organizados por Categoria**

    -   Legislação Criminal (Código Penal, CPP, LEP, Lei de Drogas)
    -   Sistemas Judiciais (TJSC, SEEU, BNMP, CNJ)
    -   Jurisprudência (STF, STJ, TJSC)

-   ⚙️ **Área Administrativa**

    -   Adicionar, editar e excluir links
    -   Organização por categorias
    -   Protegido por senha

-   🌙 **Modo Escuro/Claro**
-   📱 **Design Responsivo**
-   📅 **Calendário** (em desenvolvimento)

## 🚀 Tecnologias

-   **React 19** - Framework JavaScript
-   **TypeScript** - Tipagem estática
-   **Tailwind CSS v4** - Estilização
-   **Vite** - Build tool
-   **React Router** - Roteamento
-   **Lucide React** - Ícones
-   **LocalStorage** - Persistência de dados

## 📦 Instalação

### Opção 1: Modo Simples (Windows)

```bash
# Clone o repositório
git clone https://github.com/alexandre-css/CrimeDash.git

# Entre na pasta
cd CrimeDash

# Instale as dependências (apenas na primeira vez)
npm install

# Execute usando o arquivo .bat (recomendado)
start-server.bat
```

### Opção 2: Modo Auto-Reinício (Windows)

Para servidor que reinicia automaticamente em caso de erro:

```bash
start-server-auto.bat
```

### Opção 3: Modo Manual

```bash
# Execute o projeto manualmente
npm run dev
```

## 🔧 Arquivos .bat Disponíveis

- **`start-server.bat`** - Inicia o servidor com verificações de segurança
- **`start-server-auto.bat`** - Inicia com reinício automático (recomendado para desenvolvimento)

Ambos incluem:
- ✅ Verificação de Node.js/npm
- ✅ Instalação automática de dependências
- ✅ Mensagens claras de status
- ✅ Opção de reiniciar ao parar

O projeto estará disponível em `http://localhost:5173/`

## 🔐 Área Administrativa

Acesse `/admin` e use a senha para gerenciar os links.

## 🏗️ Build para Produção

```bash
npm run build
```

## 📝 Deploy no Vercel

Este projeto está configurado para deploy fácil no Vercel:

1. Faça push para o GitHub
2. Conecte o repositório no Vercel
3. Deploy automático! ✨

## 📄 Licença

Este projeto é de uso interno.

## 👨‍💻 Desenvolvimento

-   **Framework Base**: TailAdmin React Template
-   **Personalização**: Focado em matéria criminal
-   **Cor Principal**: #760014 (vermelho escuro)

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/TailAdmin/free-react-tailwind-admin-dashboard.git
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

2. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Components

TailAdmin is a pre-designed starting point for building a web-based dashboard using React.js and Tailwind CSS. The
template includes:

-   Sophisticated and accessible sidebar
-   Data visualization components
-   Prebuilt profile management and 404 page
-   Tables and Charts(Line and Bar)
-   Authentication forms and input elements
-   Alerts, Dropdowns, Modals, Buttons and more
-   Can't forget Dark Mode 🕶️

All components are built with React and styled using Tailwind CSS for easy customization.

## Feature Comparison

### Free Version

-   1 Unique Dashboard
-   30+ dashboard components
-   50+ UI elements
-   Basic Figma design files
-   Community support

### Pro Version

-   7 Unique Dashboards: Analytics, Ecommerce, Marketing, CRM, SaaS, Stocks, Logistics (more coming soon)
-   500+ dashboard components and UI elements
-   Complete Figma design file
-   Email support

To learn more about pro version features and pricing, visit our [pricing page](https://tailadmin.com/pricing).

## Changelog

### Version 2.0.2 - [March 25, 2025]

-   Upgraded to React 19
-   Included overrides for packages to prevent peer dependency errors.
-   Migrated from react-flatpickr to flatpickr package for React 19 support

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

-   Upgraded to Tailwind CSS v4 for better performance and efficiency.
-   Updated class usage to match the latest syntax and features.
-   Replaced deprecated class and optimized styles.

#### Next Steps

-   Run npm install or yarn install to update dependencies.
-   Check for any style changes or compatibility issues.
-   Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
-   This update keeps the project up to date with the latest Tailwind improvements. 🚀

### Version 2.0.0 - [February 2025]

A major update with comprehensive redesign and modern React patterns implementation.

#### Major Improvements

-   Complete UI redesign with modern React patterns
-   New features: collapsible sidebar, chat, and calendar
-   Improved performance and accessibility
-   Updated data visualization using ApexCharts

#### Key Features

-   Redesigned dashboards (Ecommerce, Analytics, Marketing, CRM)
-   Enhanced navigation with React Router integration
-   Advanced tables with sorting and filtering
-   Calendar with drag-and-drop support
-   New UI components and improved existing ones

#### Breaking Changes

-   Updated sidebar component API
-   Migrated charts to ApexCharts
-   Revised authentication system

[Read more](https://tailadmin.com/docs/update-logs/react) on this release.

### Version 1.3.7 - [June 20, 2024]

#### Enhancements

1. Remove Repetition of DefaultLayout in every Pages
2. Add ClickOutside Component for reduce repeated functionality in Header Message, Notification and User Dropdowns.

### Version 1.3.6 - [Jan 31, 2024]

#### Enhancements

1. Integrate flatpickr in [Date Picker/Form Elements]
2. Change color after select an option [Select Element/Form Elements].
3. Make it functional [Multiselect Dropdown/Form Elements].
4. Make best value editable [Pricing Table One/Pricing Table].
5. Rearrange Folder structure.

### Version 1.2.0 - [Apr 28, 2023]

-   Add Typescript in TailAdmin React.

### Version 1.0.0 - Initial Release - [Mar 13, 2023]

-   Initial release of TailAdmin React.

## License

TailAdmin React.js Free Version is released under the MIT License.

## Support

If you find this project helpful, please consider giving it a star on GitHub. Your support helps us continue developing
and maintaining this template.
