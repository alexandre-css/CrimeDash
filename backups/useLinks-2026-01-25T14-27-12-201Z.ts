import { useState } from "react";

export interface LinkCard {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
}

const DEFAULT_LINKS: LinkCard[] = [
    {
        id: "1",
        title: "Código Penal",
        description: "Decreto-Lei nº 2.848/1940",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "2",
        title: "Código de Processo Penal",
        description: "Decreto-Lei nº 3.689/1941",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "3",
        title: "Código Penal Militar",
        description: "Decreto-Lei nº 1.001/1969",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1001compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "4",
        title: "Código de Processo Penal Militar",
        description: "Decreto-Lei nº 1.002/1969",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1002compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "5",
        title: "Lei de Drogas",
        description: "Lei nº 11.343/2006",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm",
        category: "Legislação Penal"
    },
    {
        id: "6",
        title: "Estatuto do Desarmamento",
        description: "Lei nº 10.826/2003",
        url: "https://www.planalto.gov.br/ccivil_03/leis/2003/L10.826compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "7",
        title: "Estatuto da Criança e do Adolescente",
        description: "Lei nº 8.069/1990",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L8069Compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "8",
        title: "Lei das Contravenções Penais",
        description: "Decreto-Lei nº 3.688/1941",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/Del3688.htm",
        category: "Legislação Penal"
    },
    {
        id: "9",
        title: "Lei Maria da Penha",
        description: "Lei nº 11.340/2006",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm",
        category: "Legislação Penal"
    },
    {
        id: "10",
        title: "Lei de Organização Criminosa",
        description: "Lei nº 12.850/2013",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm",
        category: "Legislação Penal"
    },
    {
        id: "11",
        title: "Lei de Crimes Hediondos",
        description: "Lei nº 8.072/1990",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm",
        category: "Legislação Penal"
    },
    {
        id: "12",
        title: "Lei de Interceptação Telefônica",
        description: "Lei nº 9.296/1996",
        url: "https://www.planalto.gov.br/ccivil_03/Leis/L9296.htm",
        category: "Legislação Penal"
    },
    {
        id: "13",
        title: "Lei de Lavagem de Dinheiro",
        description: "Lei nº 9.613/1998",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L9613compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "14",
        title: "Lei de Crimes Ambientais",
        description: "Lei nº 9.605/1998",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L9605.htm",
        category: "Legislação Penal"
    },
    {
        id: "15",
        title: "Lei de Execução Penal",
        description: "Lei nº 7.210/1984",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L7210.htm",
        category: "Legislação Penal"
    },
    {
        id: "16",
        title: "Lei de Julgamento Colegiado",
        description: "Lei nº 12.694/2012",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12694.htm",
        category: "Legislação Penal"
    },
    {
        id: "17",
        title: "Lei de Crimes Financeiros",
        description: "Lei nº 7.492/1986",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l7492.htm",
        category: "Legislação Penal"
    },
    {
        id: "18",
        title: "Lei de Crimes Tributários",
        description: "Lei nº 8.137/1990",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L8137.htm",
        category: "Legislação Penal"
    },
    {
        id: "19",
        title: "Lei de Prisão Temporária",
        description: "Lei nº 7.960/1989",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l7960.htm",
        category: "Legislação Penal"
    },
    {
        id: "20",
        title: "Pacote Anticrime",
        description: "Lei nº 13.964/2019",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13964.htm",
        category: "Legislação Penal"
    },
    {
        id: "21",
        title: "Lei de Abuso de Autoridade",
        description: "Lei nº 13.869/2019",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13869.htm",
        category: "Legislação Penal"
    },
    {
        id: "22",
        title: "Lei de Propriedade Intelectual",
        description: "Lei nº 9.609/1998",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l9609.htm",
        category: "Legislação Penal"
    },
    {
        id: "23",
        title: "Lei de Parcelamento do Solo",
        description: "Lei nº 6.766/1979",
        url: "https://www.planalto.gov.br/ccivil_03/leis/L6766compilado.htm",
        category: "Legislação Penal"
    },
    {
        id: "24",
        title: "Lei de Responsabilidade de Prefeitos",
        description: "Decreto-Lei nº 201/1967",
        url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del0201.htm",
        category: "Legislação Penal"
    },
    {
        title: "SEEU",
        description: "Sistema Eletrônico de Execução Unificado",
        url: "https://seeu.pje.jus.br/seeu/",
        category: "Sistemas",
        id: "26"
    },
    {
        id: "27",
        title: "BNMP 2.0",
        description: "Banco Nacional de Mandados de Prisão",
        url: "https://www.cnj.jus.br/sistemas/bnmp-2-0/",
        category: "Sistemas"
    },
    {
        id: "31",
        title: "Power BI",
        description: "Análise de dados e relatórios",
        url: "https://app.powerbi.com/",
        category: "Sistemas"
    },
    {
        id: "33",
        title: "STF",
        description: "Supremo Tribunal Federal",
        url: "https://portal.stf.jus.br/jurisprudencia/",
        category: "Jurisprudência"
    },
    {
        id: "34",
        title: "STJ",
        description: "Superior Tribunal de Justiça",
        url: "https://scon.stj.jus.br/SCON/",
        category: "Jurisprudência"
    },
    {
        title: "TJSC",
        description: "Tribunal de Justiça de Santa Catarina",
        url: "https://eproc1g.tjsc.jus.br/eproc/externo_controlador.php?acao=jurisprudencia@jurisprudencia/pesquisar",
        category: "Jurisprudência",
        id: "35"
    },
    {
        title: "Temas STJ e STF",
        description: "Temas de Recursos Repetitivos e Repercussão Geral",
        url: "https://resumos-direito.vercel.app/temas.html",
        category: "Jurisprudência",
        id: "36"
    },
    {
        title: "Súmulas STJ e STF",
        description: "Súmulas do STJ e do STF em matéria penal",
        url: "https://resumos-direito.vercel.app/sumulas.html",
        category: "Jurisprudência",
        id: "37"
    },
    {
        id: "44",
        title: "Processo Penal",
        description: "Notebook de Processo Penal",
        url: "https://notebooklm.google.com/notebook/00fdb4ad-f24e-4cd6-892b-915847244aa5",
        category: "NotebookLM"
    },
    {
        id: "45",
        title: "Tribunal do Júri",
        description: "Notebook de Tribunal do Júri",
        url: "https://notebooklm.google.com/notebook/33fc9449-ea17-4670-92cc-4810c48f8f1f",
        category: "NotebookLM"
    },
    {
        id: "46",
        title: "Dign. Sexual / Violência Doméstica",
        description: "Notebook de Crimes Contra a Dignidade Sexual e Violência Doméstica",
        url: "https://notebooklm.google.com/notebook/59a739c1-f64f-4903-985a-dac3187acb5c",
        category: "NotebookLM"
    },
    {
        id: "43",
        title: "Direito Constitucional",
        description: "Notebook de Direito Constitucional",
        url: "https://notebooklm.google.com/notebook/288ca77b-3e21-4d63-85de-1ed78e422c9b",
        category: "NotebookLM"
    },
    {
        id: "42",
        title: "Direito Tributário",
        description: "Notebook de Direito Tributário",
        url: "https://notebooklm.google.com/notebook/aeca2048-2dbc-4e47-819b-bafb182d70d7",
        category: "NotebookLM"
    },
    {
        id: "40",
        title: "Direito Civil",
        description: "Notebook de Direito Civil",
        url: "https://notebooklm.google.com/notebook/8527ca64-c61c-402e-b804-58d4468f6974",
        category: "NotebookLM"
    },
    {
        id: "39",
        title: "Processo Civil",
        description: "Notebook de Processo Civil",
        url: "https://notebooklm.google.com/notebook/5fae7baf-a50e-4be5-8b9c-2a8f5e6181cf",
        category: "NotebookLM"
    },
    {
        id: "41",
        title: "Direito Administrativo",
        description: "Notebook de Direito Administrativo",
        url: "https://notebooklm.google.com/notebook/43e629a7-2f1a-4058-8e71-47ad5129ef18",
        category: "NotebookLM"
    },
    {
        id: "47",
        title: "Regimento Interno TJSC",
        description: "Notebook do Regimento Interno do TJSC",
        url: "https://notebooklm.google.com/notebook/a26c0b65-4812-4211-bb5f-e5e6b7f02067",
        category: "NotebookLM"
    },
    {
        title: "Jurisprudência STJ",
        description: " Julgados com base em dados coletados do site do STJ",
        url: "https://criminalplayer.com.br/ia-juris-stj-base-acordao-acesso/",
        category: "Criminal Player",
        id: "1765503768550"
    },
    {
        title: "Jurisprudência por Assunto",
        description: "IAs de julgados do STJ divididas por temas",
        url: "https://criminalplayer.com.br/ia-juris-assunto/",
        category: "Criminal Player",
        id: "1765529072751"
    },
    {
        title: "STJ - Min. Rogerio Schietti",
        description: "",
        url: "https://criminalplayer.com.br/ia-juris-stj-relator-ministro-rogerio-schietti-acesso/",
        category: "Criminal Player",
        id: "1765505596367"
    },
    {
        title: "STJ - Min. Daniela Teixeira",
        description: "",
        url: "https://criminalplayer.com.br/ia-juris-stj-relator-ministra-daniela-teixeira-acesso/",
        category: "Criminal Player",
        id: "1765505640220"
    },
    {
        title: "Alexandre Morais da Rosa",
        description: "",
        url: "https://criminalplayer.com.br/ia-alexandre-morais-da-rosa-acesso/",
        category: "Criminal Player",
        id: "1765505156568"
    },
    {
        title: "Rodrigo Faucz",
        description: "",
        url: "https://criminalplayer.com.br/ia-rodrigo-faucz/",
        category: "Criminal Player",
        id: "1765505179705"
    },
    {
        title: "Denis Sampaio",
        description: "",
        url: "https://criminalplayer.com.br/ia-denis-sampaio/",
        category: "Criminal Player",
        id: "1765505203863"
    },
    {
        title: "Legislação - Lei de Drogas",
        description: "",
        url: "https://criminalplayer.com.br/ia-legislacao-lei-antidrogas/",
        category: "Criminal Player",
        id: "1765505419536"
    },
    {
        title: "Yuri Felix",
        description: "",
        url: "https://criminalplayer.com.br/ia-yuri-felix/",
        category: "Criminal Player",
        id: "1765505223671"
    },
    {
        title: "Legislação - CP, CPP e Correlatos",
        description: "",
        url: "https://criminalplayer.com.br/ia-legislacao-codigo-processo-penal-acesso/",
        category: "Criminal Player",
        id: "1765505367020"
    },
    {
        title: "Legislação - Maria da Penha",
        description: "",
        url: "https://criminalplayer.com.br/ia-legislacao-lei-maria-da-penha-acesso/",
        category: "Criminal Player",
        id: "1765505387930"
    },
    {
        title: "Legislação - Estatuto do Desarmamento",
        description: "",
        url: "https://criminalplayer.com.br/ia-legislacao-estatuto-do-desarmamento/",
        category: "Criminal Player",
        id: "1765505477886"
    },
    {
        title: "ADMRH",
        description: "Gestão de Recursos Humanos",
        url: "https://tjsc.thema.inf.br/rhsysweb-portal/secure/XcpHome.xhtml",
        category: "TJSC",
        id: "1765530667948"
    },
    {
        title: "Biblioteca RT",
        description: "Biblioteca digital da editora Revista dos Tribunais",
        url: "https://www.tjsc.jus.br/web/biblioteca/revista-dos-tribunais-acesso",
        category: "TJSC",
        id: "1765530754574"
    },
    {
        title: "Biblioteca RT - Livros",
        description: "Links para os principais livros da biblioteca RT",
        url: "https://docs.google.com/spreadsheets/d/15DLpBQ9L7lIg3SQM_E4z8PNLy3zQPgEWKMmQrxMfz70/edit?gid=0#gid=0",
        category: "TJSC",
        id: "1765876203435"
    },
    {
        title: "Minha Biblioteca",
        description: "Biblioteca digital ",
        url: "https://www.tjsc.jus.br/web/biblioteca/minha-biblioteca-acesso",
        category: "TJSC",
        id: "1765876085214"
    },
    {
        title: "Central de Atendimento Eletrônico do Segundo Grau",
        description: "Atendimento de advogados",
        url: "https://cgjweb.tjsc.jus.br/painelatendimentosg/login.action",
        category: "TJSC",
        id: "1765530804359"
    },
    {
        title: "Corretor de Texto",
        description: "Correção de texto conforme os padrões do gabinete",
        url: "https://m365.cloud.microsoft:443/chat/?titleId=T_d4ac0ecb-3e48-d371-2fa2-a7b89ff2ec5d&source=embedded-builder",
        category: "Copilot",
        id: "1765531058439"
    },
    {
        title: "Gerador de Ementas",
        description: "Gera ementas a partir do conteúdo do voto",
        url: "https://m365.cloud.microsoft:443/chat/?titleId=T_ee3c4689-b3a5-44c8-c371-c702d18a8d29&source=embedded-builder",
        category: "Copilot",
        id: "1765531103305"
    },
    {
        title: "Resumir Recurso",
        description: "Cria relatório a partir das razões recursais",
        url: "https://m365.cloud.microsoft:443/chat/?titleId=T_73187cd2-6da7-4e13-e0df-43b1222fae31&source=embedded-builder",
        category: "Copilot",
        id: "1765531157762"
    },
    {
        title: "Gerador de Minutas de ED",
        description: "Cria minutas de embargos de declaração a partir da leitura do acórdão e da petição dos embargos",
        url: "https://m365.cloud.microsoft:443/chat/?titleId=T_5c3c0c1a-2cdb-8fc4-7b65-b1f2b13df5eb&source=embedded-builder",
        category: "Copilot",
        id: "1765531212672"
    },
    {
        title: "Gabinete AMR",
        description: "Pasta principal do drive",
        url: "https://drive.google.com/drive/folders/1kJ0XDQC8IP6WTvOFAQT4-iXRp308wLhc?usp=sharing",
        category: "Google Drive",
        id: "1765531696153"
    },
    {
        title: "Livros de Direito Penal",
        description: "Pasta principal com os livros de Direito Penal e Processual Penal",
        url: "https://drive.google.com/drive/folders/18j-Z56KKOCD1XBDYUYp-9k-P3fUBZiag?usp=drive_link",
        category: "Google Drive",
        id: "1765531777822"
    },
    {
        title: "Tutorial de Configuração do Eproc",
        description: "Passo-a-passo para configurar o eproc de forma otimizada",
        url: "https://docs.google.com/document/d/1LitMtOgR479CESsNihGPsesZSDsG8Cj9BIqS0m-S5Pk/edit?usp=drive_link",
        category: "Google Drive",
        id: "1765531880709"
    },
    {
        title: "Manual de Redação",
        description: "Padrões de redação e formatação do gabinete",
        url: "https://docs.google.com/document/d/18Jx1wRLo4PLD66iyFG4cXyrAhq6IQWzlsu2SmkoTg_s/edit?usp=drive_link",
        category: "Google Drive",
        id: "1765531919012"
    },
    {
        title: "Tutorial - Transcrição de Vídeos no Word",
        description: "Passo-a-passo para transcrever o áudio de vídeos no Word on-line",
        url: "https://docs.google.com/document/d/1WZsteKIY3843Oc8PnCqVOwzQj0gKESgdKMpmQZYzfEg/edit?usp=drive_link",
        category: "Google Drive",
        id: "1765533198142"
    },
    {
        title: "Quadro de Destino de Remessas",
        description: "Setores responsáveis por cada tipo de remessa (Secretaria, DCDP, DRI)",
        url: "https://drive.google.com/file/d/1rb_rYfRgFcjYl1l88LyS33lMxCSB5jHE/view?usp=drive_link",
        category: "Google Drive",
        id: "1765533375206"
    },
    {
        title: "Jusbrasil",
        description: "Pesquisa de Jurisprudência",
        url: "https://www.jusbrasil.com.br/jurisprudencia/",
        category: "Jurisprudência",
        id: "1765534869363"
    },
    {
        title: "Calculadora Penal FEU",
        description: "Calculadora para aplicação da pena",
        url: "https://calculadora.feu.com.br/download",
        category: "Ferramentas",
        id: "1765535000259"
    },
    {
        title: "Lightshot",
        description: "Ferramenta para captura de tela",
        url: "https://app.prntscr.com/pt-br/download.html",
        category: "Ferramentas",
        id: "1765535064888"
    },
    {
        title: "PDF24",
        description: "Várias ferramentas para arquivos PDF",
        url: "https://tools.pdf24.org/pt/",
        category: "Ferramentas",
        id: "1765535310328"
    },
    {
        title: "Tabela de Nomeação de Dativos",
        description: "Tabela de controle de nomeação de defensores dativos",
        url: "https://tjscjusbr0-my.sharepoint.com/:x:/g/personal/alexandress_tjsc_jus_br/IQCMbx03FxTWQJWd4yg6fukTATAFCQGEPqhsAN6eJQ5ZtHs?e=SHCMSi&nav=MTVfezAwMDAwMDAwLTAwMDEtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMH0",
        category: "Ferramentas",
        id: "1765615840097"
    },
    {
        title: "Abertura de Chamados",
        description: "Abrir chamados diversos para serviços internos",
        url: "https://portaltjsc.certsys.com.br/portal/default/self-service/#/home",
        category: "TJSC",
        id: "1765530898756"
    },
    {
        title: "Telefones dos Gabinetes",
        description: "Contatos dos gabinetes de segundo grau",
        url: "https://www.tjsc.jus.br/web/judicial/secretarios-juridicos-e-oficiais-de-gabinete",
        category: "TJSC",
        id: "1765530973006"
    },
    {
        title: "NUGPNAC",
        description: "Núcleo de Gerenciamento de Precedentes e Ações Coletivas",
        url: "https://www.tjsc.jus.br/web/nucleo-de-gerenciamento-de-precedentes-e-acoes-coletivas",
        category: "TJSC",
        id: "1765616026894"
    },
    {
        title: "Incidentes de Resolução de Demandas Repetitivas",
        description: "Tabela de IRDRs do TJSC",
        url: "https://www.tjsc.jus.br/documents/3133632/3200197/IRDR-COMPLETA/7ab8e228-b5c3-a8ee-8654-2f18a6e23141",
        category: "TJSC",
        id: "1765616081539"
    },
    {
        title: "Assistência Judiciária Gratuita",
        description: "Informações sobre AJG no PJSC",
        url: "https://www.tjsc.jus.br/web/orcamento-e-financas/assistencia-judiciaria-gratuita",
        category: "TJSC",
        id: "1765616126105"
    },
    {
        title: "ERP",
        description: "Sistema de gestão de pessoas",
        url: "https://www.tjsc.jus.br/erp",
        category: "TJSC",
        id: "1765616164454"
    },
    {
        title: "Regimento Interno",
        description: "Regimento Interno do Tribunal de Justiça de Santa Catarina",
        url: "https://www.tjsc.jus.br/documents/10181/1068287/NOVO+Regimento+Interno+do+TJSC/6eca2286-50ff-427e-993f-0eadb7656f99",
        category: "TJSC",
        id: "1765616264519"
    },
    {
        title: "Ordem Cronológica de Julgamento",
        description: "Lista de Processos por Ordem Cronológica de Julgamento",
        url: "https://eprocwebcon.tjsc.jus.br/consulta2g/externo_controlador.php?acao=relatorios/processosOrdemCronologicaJulgamento",
        category: "TJSC",
        id: "1765616304380"
    },
    {
        title: "Eproc Conhecimento",
        description: "Portal do Conhecimento do sistema eproc",
        url: "https://tjscjusbr0.sharepoint.com/sites/EprocConhecimento",
        category: "TJSC",
        id: "1765616330353"
    },
    {
        title: "Servidor de Relatórios",
        description: "Geração de relatórios processuais (acesso restrito)",
        url: "https://app.tjsc.jus.br/servidorrelatorios/#/listar",
        category: "TJSC",
        id: "1765616385104"
    },
    {
        title: "Código de Divisão e Organização Judiciárias",
        description: "Código de Divisão e Organização Judiciárias do Estado de Santa Catarina",
        url: "https://www.tjsc.jus.br/documents/10181/16140/C%C3%B3digo+de+Divis%C3%A3o+e+Organiza%C3%A7%C3%A3o+Judici%C3%A1rias+do+Estado+de+SC/0ccbb8eb-fb2d-402a-b7ed-e1bf3d4e1857",
        category: "TJSC",
        id: "1765616564845"
    },
    {
        title: "Código de Normas da CGJ",
        description: "Código de Normas da Corregedoria-Geral da Justiça",
        url: "https://www.tjsc.jus.br/web/corregedoria-geral-da-justica/codigo-de-normas-da-cgj",
        category: "TJSC",
        id: "1765616617706"
    },
    {
        title: "Regimento de Custas",
        description: "Regras sobre custas no PJSC",
        url: "https://www.tjsc.jus.br/web/corregedoria-geral-da-justica/normas-e-orientacoes/regimento-de-custas",
        category: "TJSC",
        id: "1765616757718"
    },
    {
        title: "Regimento de Emolumentos",
        description: "Regras sobre emolumentos no PJSC",
        url: "https://www.tjsc.jus.br/web/corregedoria-geral-da-justica/normas-e-orientacoes/emolumentos",
        category: "TJSC",
        id: "1765616811434"
    },
    {
        title: "Procedimento Competência Originária",
        description: "Lei nª. 8.038/1990",
        url: "https://www.planalto.gov.br/ccivil_03/leis/l8038.htm",
        category: "Legislação Penal",
        id: "1765975800676"
    },
    {
        title: "Emenda Regimental - Criação 6ª Câmara Criminal",
        description: "Emenda Regimental TJ n. 52, de 5 de novembro de 2025",
        url: "https://busca.tjsc.jus.br/buscatextual/integra.do?cdSistema=1&cdDocumento=188070&cdCategoria=141&q=&frase=&excluir=&qualquer=&prox1=&prox2=&proxc=",
        category: "Legislação Penal",
        id: "1765976522767"
    },
    {
        title: "Criador de Lembrete",
        description: "Cria lembrete com resumo do recurso",
        url: "https://m365.cloud.microsoft:443/chat/?titleId=T_50822cb2-8ddd-66dc-84be-5744cace238a&source=embedded-builder",
        category: "Copilot",
        id: "1766593180672"
    },
    {
        title: "Analisador de Aplicação da Pena",
        description: "Gem do Gemini para análise de dosimetria",
        url: "https://gemini.google.com/gem/1m140aqbYipfkXRxqYUeLJxcGNZUTq-GR?usp=sharing",
        category: "Gemini",
        id: "1769351223177"
    }
];

// Ordem de exibição das categorias
export const CATEGORY_ORDER = [
    "Legislação Penal",
    "TJSC",
    "Google Drive",
    "Sistemas",
    "Jurisprudência",
    "NotebookLM",
    "Copilot",
    "Gemini",
    "Criminal Player",
    "Ferramentas"
];

export function useLinks() {
    const [links, setLinks] = useState<LinkCard[]>(DEFAULT_LINKS);

    const addLink = (newLink: Omit<LinkCard, "id">) => {
        const link = {
            ...newLink,
            id: Date.now().toString(),
        };
        setLinks((prev) => [...prev, link]);
    };

    const updateLink = (id: string, updatedLink: Omit<LinkCard, "id">) => {
        setLinks((prev) =>
            prev.map((link) => (link.id === id ? { ...updatedLink, id } : link))
        );
    };

    const deleteLink = (id: string) => {
        setLinks((prev) => prev.filter((link) => link.id !== id));
    };

    const resetLinks = () => {
        setLinks(DEFAULT_LINKS);
    };

    return {
        links,
        addLink,
        updateLink,
        deleteLink,
        resetLinks,
    };
}
