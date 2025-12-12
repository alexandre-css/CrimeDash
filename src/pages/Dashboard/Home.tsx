import PageMeta from "../../components/common/PageMeta";
import UsefulLinks from "../../components/criminal/UsefulLinks";
import { Copy, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [copied, setCopied] = useState(false);
    
    const gabineteInfo = `Rua Álvaro Millen da Silveira, n. 208, Centro, Florianópolis/SC, CEP: 88020-901, Sala 307, Torre I
Telefone: 3287-4855
E-mail: wgabamr@tjsc.jus.br`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gabineteInfo);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <PageMeta
                title="CrimeDash - Dashboard Criminal"
                description="Dashboard para gestão de gabinete"
            />
            <div className="space-y-6">
                <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-4">
                        Bem-vindo ao CrimeDash
                    </h2>
                    <p className="text-body mb-4">
                        Hub de gestão - Gabinete do{" "}
                        <span className="font-bold" style={{ color: '#650005' }}>
                            Desembargador Alexandre Morais da Rosa
                        </span>{" "}
                        - Tribunal de Justiça de Santa Catarina
                    </p>
                    
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-meta-4 rounded-lg border border-stroke dark:border-strokedark">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <MapPin className="h-4 w-4 flex-shrink-0" />
                                    <div>
                                        <p>Rua Álvaro Millen da Silveira, n. 208, Centro</p>
                                        <p>Florianópolis/SC, CEP: 88020-901, Sala 307, Torre I</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                    <p>3287-4855</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                    <p>wgabamr@tjsc.jus.br</p>
                                </div>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-stroke dark:border-strokedark rounded hover:bg-gray-100 dark:hover:bg-meta-4 transition"
                                title="Copiar endereço"
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Copiado
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        Copiar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <UsefulLinks />
            </div>
        </>
    );
}
