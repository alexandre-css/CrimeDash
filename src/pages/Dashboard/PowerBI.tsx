import PageBreadCrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PowerBIDashboard from "../../components/dashboard/PowerBIDashboard";

export default function PowerBI() {
    return (
        <>
            <PageMeta title="Power BI - Criminais" />

            <div className="mb-6">
                <PageBreadCrumb pageName="Power BI - Dashboard Criminais" />
            </div>

            <PowerBIDashboard />
        </>
    );
}
