import { useEffect } from "react";
import "./revista.css";

export default function RevistaContent() {
    useEffect(() => {
        // Scroll suave para âncoras internas
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            if (target.tagName === 'A' && target.hash) {
                e.preventDefault();
                const element = document.querySelector(target.hash);
                element?.scrollIntoView({ behavior: 'smooth' });
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="revista-container">
            {/* CAPA */}
            <div className="infographic-page cover-page">
                <div style={{ fontSize: '1.2rem', color: '#666', marginBottom: '10px' }}>DOSSIÊ JURÍDICO EXCLUSIVO</div>
                
                <div className="cover-title">REVISTA<br/>GABINETE AMR</div>
                <div className="cover-subtitle">Ciências Criminais &amp; Estratégia Processual</div>

                <div style={{ margin: '40px 0', width: '100%', borderTop: '2px solid var(--accent-color)', borderBottom: '2px solid var(--accent-color)', padding: '30px 0' }}>
                    <div className="cover-highlight">MULTIRREINCIDÊNCIA</div>
                    <div style={{ fontFamily: 'Lato', color: '#555', marginBottom: '20px' }}>A Matemática da Reprovabilidade</div>

                    <div className="cover-highlight">O GUARDIÃO RESIDUAL</div>
                    <div style={{ fontFamily: 'Lato', color: '#555', marginBottom: '20px' }}>Competência de HC em Turmas Recursais</div>

                    <div className="cover-highlight">DOLO NO TRÂNSITO</div>
                    <div style={{ fontFamily: 'Lato', color: '#555' }}>Do Psicologismo à Atribuição Normativa</div>
                </div>

                <div className="cover-edition">EDIÇÃO ESPECIAL 2026 &bull; VOLUMES I A III</div>
            </div>

            {/* ÍNDICE */}
            <div className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; SUMÁRIO</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>ÍNDICE</div>
                </div>

                <h1>Sumário da Edição</h1>
                <h2>Navegue pelos artigos especiais deste mês</h2>

                <ul className="toc-list">
                    <li className="toc-item">
                        <div>
                            <a href="#artigo1" className="toc-link">Multirreincidência: O Sistema Bifurcado</a>
                            <span className="toc-desc">Teoria da Migração vs. Exasperação da Fração na Dosimetria da Pena.</span>
                        </div>
                        <span className="toc-page-num">Pág. 03</span>
                    </li>
                    <li className="toc-item">
                        <div>
                            <a href="#artigo2" className="toc-link">O Guardião Residual das Garantias</a>
                            <span className="toc-desc">A competência dos Tribunais de Justiça em Habeas Corpus originários de Turmas Recursais.</span>
                        </div>
                        <span className="toc-page-num">Pág. 05</span>
                    </li>
                    <li className="toc-item">
                        <div>
                            <a href="#artigo3" className="toc-link">Crimes de Trânsito: A Fronteira do Dolo</a>
                            <span className="toc-desc">Superação do psicologismo e standards probatórios para Dolo Eventual.</span>
                        </div>
                        <span className="toc-page-num">Pág. 07</span>
                    </li>
                </ul>

                <div style={{ marginTop: '100px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; ÍNDICE
                </div>
            </div>

            {/* ARTIGO 1 */}
            <div id="artigo1" className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO I &bull; VOL. I</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>DOGMÁTICA PENAL</div>
                </div>

                <h1>Multirreincidência:<br/>O Sistema Bifurcado</h1>
                <h2>A resposta estatal frente à contumácia delitiva sob a ótica da Jurisprudência Superior</h2>

                <p className="lead">
                    A multirreincidência desafia a lógica linear da dosimetria. O magistrado depara-se com um excesso de títulos condenatórios que não podem ser simplesmente ignorados sob pena de violação à <strong>individualização da pena</strong> e à <strong>proibição da proteção deficiente</strong>. O STJ consolidou dois sistemas de valoração: a Migração (deslocamento fático) e a Exasperação (intensificação da fração).
                </p>

                <div className="grid-2-col">
                    <div className="theory-box">
                        <span className="theory-tag">Sistema 1</span>
                        <span className="concept-title">Teoria da Migração</span>
                        <p>Fundamentada na necessidade de exaurir o histórico criminal do agente sem incorrer em <em>bis in idem</em>. A lógica opera por exclusão: utiliza-se uma condenação para satisfazer a agravante da reincidência (art. 61, I, CP) e deslocam-se as remanescentes para a pena-base.</p>
                        <p><strong>Fundamento Dogmático:</strong> O art. 59 do CP ("antecedentes") serve como reservatório residual para condenações definitivas que não foram utilizadas na segunda fase. Não há dupla punição, pois cada aumento corresponde a um fato jurídico (título executivo) distinto.</p>
                    </div>

                    <div className="theory-box">
                        <span className="theory-tag">Sistema 2</span>
                        <span className="concept-title">Exasperação da Fração</span>
                        <p>Mantém a valoração concentrada na segunda fase da dosimetria. Reconhece que a reincidência múltipla revela uma <strong>maior reprovabilidade</strong> da conduta e uma personalidade refratária ao comando normativo, exigindo uma resposta punitiva mais severa que o padrão jurisprudencial de 1/6.</p>
                        <p><strong>Fundamento Dogmático:</strong> O Código Penal não fixa frações rígidas para agravantes. O princípio da proporcionalidade autoriza o julgador a elevar o patamar (para 1/5, 1/4 etc.) com base no número de condenações pregressas.</p>
                    </div>
                </div>

                <div className="case-law">
                    <h4>A Validação da Migração</h4>
                    <p>O Superior Tribunal de Justiça firmou entendimento de que <em>"não há bis in idem pela migração de uma condenação transitada em julgado... para a primeira fase dosimétrica"</em>. A <em>ratio decidendi</em> baseia-se na distinção ontológica entre as condenações: fatos diversos geram consequências diversas em fases distintas da aplicação da pena.</p>
                    <cite>AREsp n. 2.906.934 &bull; Relator Min. Messod Azulay Neto &bull; DJEN 10/06/2025</cite>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; DOSIMETRIA DA PENA
                </div>
            </div>

            {/* PÁGINA 2: APLICAÇÃO PRÁTICA */}
            <div className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO I &bull; VOL. II</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>APLICAÇÃO PRÁTICA</div>
                </div>

                <h1>A Matemática da<br/>Reprovabilidade</h1>
                <h2>Critérios concretos para a exasperação da pena no réu habitual.</h2>

                <p style={{ marginBottom: '40px', color: '#555', fontStyle: 'italic' }}>
                    A jurisprudência refuta a aplicação do princípio da insignificância ou de frações mínimas em casos de habitualidade delitiva, exigindo uma resposta penal calibrada pela reiteração.
                </p>

                <div className="grid-2-col">
                    <div className="concept-box">
                        <span className="concept-title">1ª Fase: Maus Antecedentes e Habitualidade</span>
                        <p>A prática contumaz de delitos, especialmente patrimoniais, afasta a aplicação de vetores de atipicidade material e justifica um incremento robusto na pena-base. O STJ validou, no <strong>AgRg no AREsp 2.514.105/DF</strong>, a aplicação da fração de <strong>1/4 sobre a pena mínima</strong>.</p>
                        <hr style={{ border: 0, borderTop: '1px solid #ccc', margin: '20px 0' }} />
                        <p><strong>Densidade Teórica:</strong> A motivação idônea reside na "conjuntura fática" de múltiplas condenações. A pena-base deixa de ser um ponto de partida neutro para se tornar um reflexo da biografia criminal do agente, atendendo ao princípio da individualização.</p>
                    </div>

                    <div className="concept-box">
                        <span className="concept-title">2ª Fase: Progressividade da Fração</span>
                        <p>Quando o julgador opta por manter as condenações na segunda fase, o critério de 1/6 torna-se insuficiente. No <strong>HC 896.833/MG</strong>, diante de um réu com <strong>9 condenações</strong>, o Tribunal chancelou frações superiores.</p>
                        <hr style={{ border: 0, borderTop: '1px solid #ccc', margin: '20px 0' }} />
                        <p><strong>Densidade Teórica:</strong> A discricionariedade do juiz é vinculada aos parâmetros de razoabilidade. O aumento não é aritmético puro, mas qualitativo: a multirreincidência, somada a fatores como o cometimento do crime durante saída temporária, exige um rigor sancionatório que reafirme a vigência da norma.</p>
                    </div>
                </div>

                <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '40px', marginTop: '20px' }}>
                    <h3 style={{ color: 'var(--accent-color)', border: 'none' }}>Síntese da Orientação Jurisprudencial</h3>
                    <p>O ordenamento jurídico brasileiro, interpretado pela Corte Superior, não impõe um único método rígido. O STJ adota uma postura pragmática e realista:</p>
                    <ul style={{ listStyleType: 'square', paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li><strong>Validação Dupla:</strong> Tanto a <em>Teoria da Migração</em> quanto a <em>Exasperação da Fração na 2ª Fase</em> são técnicas legítimas.</li>
                        <li><strong>Inexistência de Bis in Idem:</strong> Desde que condenações diferentes sejam usadas para fundamentar aumentos diferentes (seja em fases distintas ou na magnitude da fração), a legalidade estrita é preservada.</li>
                        <li><strong>Prevenção Especial:</strong> A sanção deve ser suficiente para desestimular a reiteração, o que justifica o abandono de frações mínimas (1/6) em cenários de multirreincidência.</li>
                    </ul>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; DOSIMETRIA DA PENA
                </div>
            </div>

            {/* SEPARADOR VISUAL ENTRE ARTIGOS */}
            <div className="article-separator">Fim do Artigo I &bull; Início do Artigo II</div>

            {/* ARTIGO 2 */}
            <div id="artigo2" className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO II &bull; VOL. I</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>COMPETÊNCIA</div>
                </div>

                <h1>O Guardião Residual<br/>das Garantias</h1>
                <h2>A competência dos Tribunais de Justiça para julgar HC contra ato de Turma Recursal após o cancelamento da Súmula 690 do STF.</h2>

                <p className="lead">
                    A arquitetura do sistema recursal brasileiro sofreu uma mudança tectônica com o julgamento do HC 86.834/SP pelo Supremo Tribunal Federal. A superação da Súmula 690 redefiniu quem vigia os atos das Turmas Recursais, transferindo essa competência originária do STF para os Tribunais de Justiça locais.
                </p>

                <div className="grid-2-col">
                    <div className="theory-box" style={{ backgroundColor: '#fcfcfc' }}>
                        <span className="concept-title" style={{ color: '#666' }}>O Passado: Súmula 690/STF</span>
                        <p>Antigamente, entendia-se que a competência para julgar <em>Habeas Corpus</em> contra decisões de Turmas Recursais era do STF. Isso gerava um gargalo na Corte Constitucional e afastava a análise do juiz natural local.</p>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#999', marginTop: '15px' }}>[ SUPERADA ]</div>
                    </div>

                    <div className="theory-box" style={{ borderColor: 'var(--accent-color)' }}>
                        <span className="theory-tag">O Presente</span>
                        <span className="concept-title">Competência dos Tribunais de Justiça</span>
                        <p>A jurisprudência atual estabelece que os Tribunais de Justiça (TJs) possuem competência para processar e julgar HC impetrado contra ato de Turma Recursal dos Juizados Especiais Criminais sob sua jurisdição.</p>
                        <p><strong>Lógica Sistêmica:</strong> As Turmas Recursais, embora órgãos de revisão, estão vinculadas administrativamente e funcionalmente à estrutura do Tribunal de Justiça Estadual.</p>
                    </div>
                </div>

                <div className="statute-box">
                    <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', marginBottom: 0 }}>
                        <strong>Art. 23.</strong> Compete à Turma de Uniformização julgar:<br/>
                        [...]<br/>
                        III - o mandado de segurança, <strong>o habeas corpus</strong> e a revisão criminal <strong>contra julgamentos colegiados</strong> proferidos pelas turmas recursais ou contra decisões terminativas proferidas por <strong>presidência de turma recursal</strong> nos processos de sua competência;
                    </p>
                </div>

                <div style={{ padding: '20px', backgroundColor: 'var(--light-gray)' }}>
                    <h3 style={{ border: 'none', marginBottom: '10px' }}>A Zona de Lacuna: O Ato Monocrático</h3>
                    <p>A controvérsia se acentua quando o ato coator não é colegiado, mas sim uma <strong>decisão monocrática de relator</strong> na Turma Recursal, especialmente quando certifica-se o trânsito em julgado imediato, impedindo o agravo interno.</p>
                </div>

                <div className="flow-diagram">
                    <div className="step">
                        <strong>Ato Coator</strong><br/>Decisão Monocrática de Relator na Turma Recursal
                    </div>
                    <div className="arrow">&rarr;</div>
                    <div className="step">
                        <strong>Regimento Interno</strong><br/>Turma de Uniformização julga apenas atos colegiados ou da presidência.
                    </div>
                    <div className="arrow">&rarr;</div>
                    <div className="step" style={{ border: '2px solid var(--accent-color)', padding: '15px' }}>
                        <strong>Solução: Tribunal de Justiça</strong><br/>Competência Residual para evitar o vácuo jurisdicional.
                    </div>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; COMPETÊNCIA E PROCESSO
                </div>
            </div>

            {/* PÁGINA 4: LACUNA NORMATIVA */}
            <div className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO II &bull; VOL. II</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>ANÁLISE DE LACUNAS</div>
                </div>

                <h1>O Vácuo Recursal<br/>e a Ampla Defesa</h1>
                <h2>Quando a técnica processual não pode suprimir garantias fundamentais: o caso das razões recursais tardias.</h2>

                <div className="grid-3-col">
                    <div style={{ gridColumn: 'span 2' }}>
                        <p>
                            Existe uma falha sistêmica no Regimento Interno das Turmas Recursais do TJSC: a atribuição de competência à <strong>Turma de Uniformização</strong> restringe-se a julgamentos colegiados ou atos da presidência. 
                        </p>
                        <p>
                            Isso cria um <strong>limbo jurídico</strong> para o jurisdicionado que sofre constrangimento ilegal via decisão monocrática de relator que nega seguimento a recurso e certifica o trânsito em julgado. Sem a possibilidade de Agravo Interno (pelo trânsito) e sem competência da Turma de Uniformização (pela natureza do ato), o réu ficaria sem jurisdição revisora.
                        </p>
                    </div>
                    <div className="concept-box" style={{ margin: 0, backgroundColor: 'var(--primary-color)', color: 'white' }}>
                        <span className="concept-title" style={{ color: 'var(--accent-color)' }}>O Princípio Salvador</span>
                        <p>Para evitar a denegação de justiça, invoca-se a <strong>Competência Residual e Constitucional</strong> do Tribunal de Justiça.</p>
                    </div>
                </div>

                <h3 style={{ marginTop: '40px' }}>Estudo de Caso: Intempestividade das Razões</h3>
                <p>Um cenário comum envolve o não conhecimento de apelação tempestiva apenas porque as <strong>razões recursais</strong> foram apresentadas fora do prazo (ou com pedido de apresentação na instância superior, art. 600, §4º, CPP, inaplicável aos Juizados).</p>

                <div className="grid-2-col" style={{ marginTop: '30px' }}>
                    <div className="theory-box">
                        <span className="concept-title">Visão Formalista (Ato Coator)</span>
                        <p>Considera a apresentação simultânea da petição e das razões como requisito de admissibilidade rígido no sistema da Lei 9.099/95. A ausência ou atraso das razões gera a deserção imediata.</p>
                        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '0.9rem' }}>CONSEQUÊNCIA: Trânsito em Julgado e Execução Imediata.</p>
                    </div>
                    
                    <div className="theory-box" style={{ borderColor: 'var(--accent-color)' }}>
                        <span className="theory-tag">Visão Garantista (TJ)</span>
                        <p>A jurisprudência superior (STF/STJ) considera a apresentação tardia das razões uma <strong>mera irregularidade</strong>. O direito de recorrer e o duplo grau de jurisdição não podem ser suprimidos pela inércia técnica do defensor.</p>
                        <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '0.9rem' }}>CONSEQUÊNCIA: Concessão da Ordem para destrancar o recurso.</p>
                    </div>
                </div>

                <div className="case-law competence">
                    <h4>A Solução Constitucional</h4>
                    <p>Ainda que o rito dos Juizados seja célere, ele não pode atropelar o devido processo legal. Quando a Turma Recursal fecha as portas via decisão singular irrecorrível na origem (mesmo que em decorrência de desídia do defensor), o Tribunal de Justiça deve abri-las via <em>Habeas Corpus</em>, garantindo que o mérito recursal seja analisado.</p>
                    <cite>Fundamento: Art. 5º, LV e LXVIII, da Constituição Federal</cite>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; COMPETÊNCIA E PROCESSO
                </div>
            </div>

            {/* SEPARADOR VISUAL ENTRE ARTIGOS */}
            <div className="article-separator">Fim do Artigo II &bull; Início do Artigo III</div>

            {/* ARTIGO 3 */}
            <div id="artigo3" className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO III &bull; VOL. I</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>DOGMÁTICA PENAL</div>
                </div>

                <h1>A Superação do<br/>Psicologismo</h1>
                <h2>A atribuição normativa do dolo nos crimes de trânsito sob a ótica do Funcionalismo</h2>

                <div className="grid-2-col">
                    <div className="theory-box">
                        <span className="concept-title">O Fim do Psicologismo</span>
                        <p>Influenciada pelo funcionalismo de Claus Roxin, a dogmática rejeita a busca por uma "intenção" inalcançável. O dolo eventual configura-se quando o agente, ciente do risco proibido, atua com <strong>indiferença ou cegueira deliberada</strong> frente ao bem jurídico, o que equivale normativamente ao consentimento.</p>
                    </div>

                    <div className="theory-box" style={{ borderColor: 'var(--accent-color)' }}>
                        <span className="concept-title">Teoria do Domínio do Fato</span>
                        <p>Autor é a figura central que detém o "controle final do fato". Nos delitos de trânsito, a perda do domínio sobre o veículo, quando decorrente de decisão consciente de criar risco extremo (ex: embriaguez + contramão), objetiva a indiferença exigida pelo tipo doloso.</p>
                    </div>
                </div>

                <div className="case-law doctrine">
                    <h4>Doutrina Essencial: André Callegari</h4>
                    <p>"O dolo eventual, previsto no art. 18, inciso I, parte final, do Código Penal, configura-se quando o agente prevê que o resultado possa ocorrer, entretanto não o deseja, ou seja, apenas assume o risco de produzi-lo. Deve ser afirmado o dolo eventual quando o agente prevê o resultado e continua a agir, conformando-se com o risco de que sua conduta conduza à realização do tipo legal. Basta, portanto, que o agente preste sua anuência ao resultado, que se conforme com ele, que admita sua eventual produção. Salienta-se que, aqui, não há o direcionamento da vontade do agente à consecução do resultado ou, ainda, a convicção de que o resultado necessariamente advirá da conduta realizada. Se assim fosse, estaríamos diante de dolo direto. No dolo eventual, a ocorrência do resultado é tomada, pelo agente, como possível decorrência de seu agir e, diante disso, o sujeito não rejeita essa possibilidade e prossegue sua conduta, não se importando com a ocorrência, ou não, do resultado. Assim, o dolo eventual, por ser espécie do dolo, não se consubstancia pela mera possibilidade, probabilidade ou necessidade do resultado, mas por uma representação dessa possibilidade somada a uma atitude do sujeito diante dessa representação, que aqui é compreendida pela atitude de indiferença."</p>
                    <cite>TEORIA GERAL DO DELITO - 3ª Edição 2014</cite>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; CRIMES DE TRÂNSITO
                </div>
            </div>

            {/* PÁGINA 6: APLICAÇÃO PRÁTICA */}
            <div className="infographic-page">
                <div className="header-bar">
                    <div className="issue-date">REVISTA GABINETE AMR &bull; ARTIGO III &bull; VOL. II</div>
                    <div style={{ fontWeight: 'bold', letterSpacing: '2px' }}>ANÁLISE PROBATÓRIA</div>
                </div>

                <h1>Dolo Eventual vs.<br/>Culpa Consciente</h1>
                <h2>Indicadores objetivos e standards probatórios na aferição do elemento subjetivo.</h2>

                <div className="case-law doctrine" style={{ marginBottom: '30px', marginTop: 0 }}>
                    <h4>Doutrina Essencial: Leonardo Schmitt de Bem e Evinis Talon</h4>
                    <p>"Os homicídios verificados no trânsito não podem ser classificados de modo automático como crimes dolosos ou culposos, qualificados ou não. Apenas a partir de análise objetiva das circunstâncias concretas será possível obter a melhor categorização, valorando-se o elemento vontade em sentido atributivo-normativo a partir de indicadores ou critérios para fortalecer o juízo de imputação. Como pontua Israel Jório, 'a existência de um procedimento de imputação cujos critérios são claros e previamente fixados leva a uma sensível redução das possibilidades interpretativas, conduzindo a soluções mais seguras'"</p>
                    <cite>Crimes de trânsito. 4. ed. 2025</cite>
                </div>

                <div className="grid-2-col" style={{ marginTop: '30px' }}>
                    <div className="theory-box" style={{ backgroundColor: '#f9f9f9' }}>
                        <span className="theory-tag" style={{ backgroundColor: '#888' }}>Exemplo 1: Roleta-Russa</span>
                        <p>O sujeito gira o tambor assumindo o risco. O resultado foge completamente ao seu controle. Há conformação com a possível ocorrência. <strong>(Dolo Eventual)</strong></p>
                    </div>
                    
                    <div className="theory-box" style={{ backgroundColor: '#f9f9f9', borderColor: 'var(--accent-color)' }}>
                        <span className="theory-tag" style={{ backgroundColor: 'var(--accent-color)' }}>Exemplo 2: Atirador de Facas</span>
                        <p>Embora perceba o risco, o agente confia plenamente na sua capacidade técnica de evitá-lo. Não há aceitação do resultado lesivo. <strong>(Culpa Consciente)</strong></p>
                    </div>
                </div>

                <div className="case-law doctrine">
                    <h4>Doutrina Essencial: Gustavo Junqueira e Maria Patrícia V. Figueiredo</h4>
                    <p>"Dolo eventual ou propósito condicionado: abrange as consequências não perseguidas, mas previstas como possíveis, em virtude dos meios escolhidos para atingir a finalidade (que pode ser típica ou extratípica), ou seja, aquelas que o sujeito prevê que podem se produzir ou não e, embora não o queira, consente com a sua eventual produção. Também corresponde, portanto, às fases da conduta relacionada à seleção dos meios e à apreciação dos efeitos concomitantes. [...] A atitude psicológica correspondente ao dolo eventual consiste em concordar ou conformar-se com a possível ocorrência do resultado, até porque, em muitas das situações exemplares de dolo eventual, o agente não tem mesmo controle ou poder para impedi-lo."</p>
                    <cite>Manual de Direito Penal - 11ª Edição 2025</cite>
                </div>

                <div className="footer">
                    REVISTA GABINETE AMR &bull; CRIMES DE TRÂNSITO
                </div>
            </div>
        </div>
    );
}
