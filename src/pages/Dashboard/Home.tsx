import PageMeta from "../../components/common/PageMeta";
import UsefulLinks from "../../components/criminal/UsefulLinks";

export default function Home() {
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
                    <p className="text-body">
                        Hub de gestão - Gabinete do Desembargador Alexandre Morais da Rosa - Tribunal de Justiça de Santa Catarina
                    </p>
                </div>

                <UsefulLinks />
            </div>
        </>
    );
}
