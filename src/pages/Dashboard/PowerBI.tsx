import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PowerBIDashboard from "../../components/dashboard/PowerBIDashboard";

export default function PowerBI() {
    return (
        <>
            <PageMeta
                title="Power BI - Criminais | CrimeDash"
                description="Dashboard Power BI com dados de criminais atualizado automaticamente"
            />

            <PageBreadCrumb pageTitle="Power BI" />

            <PowerBIDashboard />
        </>
    );
}
