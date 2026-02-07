import PageMeta from "../../components/common/PageMeta";
import RevistaContent from "./RevistaContent";

export default function Revista() {
    return (
        <>
            <PageMeta
                title="Revista Gabinete AMR | CrimeDash"
                description="Revista do Gabinete AMR - Ciências Criminais & Estratégia Processual"
            />
            <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
                <RevistaContent />
            </div>
        </>
    );
}
