import { useEffect, useState } from "react";

interface PowerBIMetadata {
    lastUpdate: string;
    fileName: string;
    fileUrl?: string;
    downloadUrl?: string;
    thumbnailUrl?: string;
    path?: string;
}

// 🔧 CONFIGURAÇÃO: Cole a URL do Google Apps Script aqui após implantar
const GOOGLE_APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxr-4YpPbi39S_-DE6dxcYE45zViqORCZE2I0AjGaYLys_4LiLCFx2rfsVEr4cZjxwc4Q/exec";

const PowerBIDashboard = () => {
    const [metadata, setMetadata] = useState<PowerBIMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageKey, setImageKey] = useState(Date.now());

    useEffect(() => {
        // Busca ao carregar a página
        fetchLatestImage();

        // Agenda busca automática para às 8h todos os dias
        const scheduleDaily8amUpdate = () => {
            const now = new Date();
            const next8am = new Date();
            next8am.setHours(8, 0, 0, 0);

            // Se já passou das 8h hoje, agenda para amanhã
            if (now.getTime() > next8am.getTime()) {
                next8am.setDate(next8am.getDate() + 1);
            }

            const timeUntil8am = next8am.getTime() - now.getTime();

            // Agenda primeira execução às 8h
            const timeout = setTimeout(() => {
                fetchLatestImage();
                // Depois agenda para se repetir a cada 24h
                const dailyInterval = setInterval(
                    fetchLatestImage,
                    24 * 60 * 60 * 1000,
                );
                return () => clearInterval(dailyInterval);
            }, timeUntil8am);

            return () => clearTimeout(timeout);
        };

        const cleanup = scheduleDaily8amUpdate();
        return cleanup;
    }, []);

    const fetchLatestImage = async () => {
        try {
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
            const data = await response.json();

            if (data.success) {
                setMetadata(data);
                setImageKey(Date.now()); // Force image reload
                setError(null);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Erro ao conectar com o servidor");
            console.error("Erro ao buscar imagem:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchLatestImage();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Carregando dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Nenhuma imagem disponível
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {error}
                    </p>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900">
            {/* Header Flutuante Minimalista */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                {metadata && (
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        Atualizado:{" "}
                        {new Date(metadata.lastUpdate).toLocaleTimeString(
                            "pt-BR",
                            { hour: "2-digit", minute: "2-digit" },
                        )}
                    </span>
                )}
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1 px-3 py-1.5 text-white rounded-md hover:opacity-90 transition text-xs font-medium"
                    style={{ backgroundColor: "#660005" }}
                    title="Atualizar dashboard"
                >
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    Atualizar
                </button>
            </div>

            {/* Dashboard PDF Viewer - Tela Completa */}
            <div className="w-full h-full">
                {metadata && metadata.downloadUrl && (
                    <iframe
                        key={imageKey}
                        src={`https://drive.google.com/file/d/${extractDriveId(metadata.downloadUrl)}/preview`}
                        className="w-full h-full border-0"
                        allow="autoplay"
                        title="Dashboard Power BI - Criminais"
                    />
                )}
            </div>
        </div>
    );
};

// Função auxiliar para extrair ID do Drive da URL de download
function extractDriveId(url: string): string {
    const match = url.match(/[?&]id=([^&]+)/);
    return match ? match[1] : "";
}

export default PowerBIDashboard;
