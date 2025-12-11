import { useState, useEffect } from 'react';

export interface LinkCard {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const DEFAULT_LINKS: LinkCard[] = [
  // Legislação
  {
    id: '1',
    title: "Código Penal",
    description: "Decreto-Lei nº 2.848/1940",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
    category: "Legislação",
  },
  {
    id: '2',
    title: "Código de Processo Penal",
    description: "Decreto-Lei nº 3.689/1941",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm",
    category: "Legislação",
  },
  {
    id: '3',
    title: "Lei de Execução Penal",
    description: "Lei nº 7.210/1984",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l7210.htm",
    category: "Legislação",
  },
  {
    id: '4',
    title: "Lei de Drogas",
    description: "Lei nº 11.343/2006",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm",
    category: "Legislação",
  },
  
  // Sistemas Judiciais
  {
    id: '5',
    title: "TJSC - Sistema Criminal",
    description: "Tribunal de Justiça de Santa Catarina",
    url: "https://www.tjsc.jus.br/",
    category: "Sistemas",
  },
  {
    id: '6',
    title: "SEEU",
    description: "Sistema Eletrônico de Execução Unificado",
    url: "https://www.cnj.jus.br/sistemas/seeu/",
    category: "Sistemas",
  },
  {
    id: '7',
    title: "BNMP 2.0",
    description: "Banco Nacional de Mandados de Prisão",
    url: "https://www.cnj.jus.br/sistemas/bnmp-2-0/",
    category: "Sistemas",
  },
  {
    id: '8',
    title: "CNJ - Consultas",
    description: "Consulta Processual Unificada",
    url: "https://www.cnj.jus.br/",
    category: "Sistemas",
  },

  // Jurisprudência
  {
    id: '9',
    title: "STF - Jurisprudência",
    description: "Supremo Tribunal Federal",
    url: "https://portal.stf.jus.br/jurisprudencia/",
    category: "Jurisprudência",
  },
  {
    id: '10',
    title: "STJ - Jurisprudência",
    description: "Superior Tribunal de Justiça",
    url: "https://scon.stj.jus.br/SCON/",
    category: "Jurisprudência",
  },
  {
    id: '11',
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
