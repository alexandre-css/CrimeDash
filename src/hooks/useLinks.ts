import { useState, useEffect } from 'react';

export interface LinkCard {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const DEFAULT_LINKS: LinkCard[] = [
  // Legislação Penal
  {
    id: '1',
    title: "Código Penal",
    description: "Decreto-Lei nº 2.848/1940",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '2',
    title: "Código de Processo Penal",
    description: "Decreto-Lei nº 3.689/1941",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '3',
    title: "Código Penal Militar",
    description: "Decreto-Lei nº 1.001/1969",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1001compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '4',
    title: "Código de Processo Penal Militar",
    description: "Decreto-Lei nº 1.002/1969",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1002compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '5',
    title: "Lei de Drogas",
    description: "Lei nº 11.343/2006",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm",
    category: "Legislação Penal",
  },
  {
    id: '6',
    title: "Estatuto do Desarmamento",
    description: "Lei nº 10.826/2003",
    url: "https://www.planalto.gov.br/ccivil_03/leis/2003/L10.826compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '7',
    title: "Estatuto da Criança e do Adolescente",
    description: "Lei nº 8.069/1990",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L8069Compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '8',
    title: "Lei das Contravenções Penais",
    description: "Decreto-Lei nº 3.688/1941",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/Del3688.htm",
    category: "Legislação Penal",
  },
  {
    id: '9',
    title: "Lei Maria da Penha",
    description: "Lei nº 11.340/2006",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm",
    category: "Legislação Penal",
  },
  {
    id: '10',
    title: "Lei de Organização Criminosa",
    description: "Lei nº 12.850/2013",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm",
    category: "Legislação Penal",
  },
  {
    id: '11',
    title: "Lei de Crimes Hediondos",
    description: "Lei nº 8.072/1990",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l8072.htm",
    category: "Legislação Penal",
  },
  {
    id: '12',
    title: "Lei de Interceptação Telefônica",
    description: "Lei nº 9.296/1996",
    url: "https://www.planalto.gov.br/ccivil_03/Leis/L9296.htm",
    category: "Legislação Penal",
  },
  {
    id: '13',
    title: "Lei de Lavagem de Dinheiro",
    description: "Lei nº 9.613/1998",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L9613compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '14',
    title: "Lei de Crimes Ambientais",
    description: "Lei nº 9.605/1998",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L9605.htm",
    category: "Legislação Penal",
  },
  {
    id: '15',
    title: "Lei de Execução Penal",
    description: "Lei nº 7.210/1984",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L7210.htm",
    category: "Legislação Penal",
  },
  {
    id: '16',
    title: "Lei de Julgamento Colegiado",
    description: "Lei nº 12.694/2012",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12694.htm",
    category: "Legislação Penal",
  },
  {
    id: '17',
    title: "Lei de Crimes Financeiros",
    description: "Lei nº 7.492/1986",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l7492.htm",
    category: "Legislação Penal",
  },
  {
    id: '18',
    title: "Lei de Crimes Tributários",
    description: "Lei nº 8.137/1990",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L8137.htm",
    category: "Legislação Penal",
  },
  {
    id: '19',
    title: "Lei de Prisão Temporária",
    description: "Lei nº 7.960/1989",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l7960.htm",
    category: "Legislação Penal",
  },
  {
    id: '20',
    title: "Pacote Anticrime",
    description: "Lei nº 13.964/2019",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13964.htm",
    category: "Legislação Penal",
  },
  {
    id: '21',
    title: "Lei de Abuso de Autoridade",
    description: "Lei nº 13.869/2019",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/L13869.htm",
    category: "Legislação Penal",
  },
  {
    id: '22',
    title: "Lei de Propriedade Intelectual",
    description: "Lei nº 9.609/1998",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l9609.htm",
    category: "Legislação Penal",
  },
  {
    id: '23',
    title: "Lei de Parcelamento do Solo",
    description: "Lei nº 6.766/1979",
    url: "https://www.planalto.gov.br/ccivil_03/leis/L6766compilado.htm",
    category: "Legislação Penal",
  },
  {
    id: '24',
    title: "Lei de Responsabilidade de Prefeitos",
    description: "Decreto-Lei nº 201/1967",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del0201.htm",
    category: "Legislação Penal",
  },
  
  // Sistemas Judiciais
  {
    id: '25',
    title: "TJSC",
    description: "Tribunal de Justiça de Santa Catarina",
    url: "https://www.tjsc.jus.br/",
    category: "Sistemas",
  },
  {
    id: '26',
    title: "SEEU",
    description: "Sistema Eletrônico de Execução Unificado",
    url: "https://www.cnj.jus.br/sistemas/seeu/",
    category: "Sistemas",
  },
  {
    id: '27',
    title: "BNMP 2.0",
    description: "Banco Nacional de Mandados de Prisão",
    url: "https://www.cnj.jus.br/sistemas/bnmp-2-0/",
    category: "Sistemas",
  },
  {
    id: '28',
    title: "CNJ",
    description: "Conselho Nacional de Justiça",
    url: "https://www.cnj.jus.br/",
    category: "Sistemas",
  },
  {
    id: '29',
    title: "Google Drive",
    description: "Armazenamento em nuvem",
    url: "https://drive.google.com/",
    category: "Sistemas",
  },
  {
    id: '30',
    title: "Google Calendar",
    description: "Agenda e eventos",
    url: "https://calendar.google.com/",
    category: "Sistemas",
  },
  {
    id: '31',
    title: "Power BI",
    description: "Análise de dados e relatórios",
    url: "https://app.powerbi.com/",
    category: "Sistemas",
  },
  {
    id: '32',
    title: "NotebookLM",
    description: "IA para pesquisa e anotações",
    url: "https://notebooklm.google.com/",
    category: "Sistemas",
  },

  // Jurisprudência
  {
    id: '33',
    title: "STF",
    description: "Supremo Tribunal Federal",
    url: "https://portal.stf.jus.br/jurisprudencia/",
    category: "Jurisprudência",
  },
  {
    id: '34',
    title: "STJ",
    description: "Superior Tribunal de Justiça",
    url: "https://scon.stj.jus.br/SCON/",
    category: "Jurisprudência",
  },
  {
    id: '35',
    title: "TJSC - Jurisprudência",
    description: "Consulta de Acórdãos",
    url: "https://busca.tjsc.jus.br/jurisprudencia/",
    category: "Jurisprudência",
  },
];

const STORAGE_KEY = 'crimedash_links';

export function useLinks() {
  const [links, setLinks] = useState<LinkCard[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_LINKS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const addLink = (link: Omit<LinkCard, 'id'>) => {
    const newLink = {
      ...link,
      id: Date.now().toString(),
    };
    setLinks(prev => [...prev, newLink]);
  };

  const updateLink = (id: string, updatedLink: Omit<LinkCard, 'id'>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...updatedLink, id } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
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
