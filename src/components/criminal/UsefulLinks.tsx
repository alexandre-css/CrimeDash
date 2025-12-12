import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { useLinks } from "../../hooks/useLinks";

export default function UsefulLinks() {
    const { links } = useLinks();
    const categories = Array.from(new Set(links.map((link) => link.category)));

    // Debug detalhado
    console.log("🔍 BUILD:", new Date().toISOString());
    console.log("📊 Categorias encontradas:", categories);
    console.log("📊 Total de links:", links.length);
    console.log("🔗 Todos os links:", links);

    // Verificar links sem categoria ou com categoria vazia
    const linksWithoutCategory = links.filter(
        (l) => !l.category || l.category.trim() === ""
    );
    if (linksWithoutCategory.length > 0) {
        console.error("❌ Links sem categoria:", linksWithoutCategory);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white flex items-center gap-2">
                    <LinkIcon className="h-6 w-6" />
                    Links Úteis
                </h2>
            </div>

            {categories.map((category) => (
                <div key={category} className="space-y-4">
                    <h3 className="text-title-sm font-semibold text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                        {category}
                    </h3>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {links
                            .filter((link) => link.category === category)
                            .map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-3 shadow-default transition-all hover:shadow-lg hover:border-primary dark:border-strokedark dark:bg-boxdark dark:hover:border-primary"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-black dark:text-white mb-1 group-hover:text-primary transition-colors">
                                                {link.title}
                                            </h4>
                                            <p className="text-xs text-body line-clamp-2">
                                                {link.description}
                                            </p>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-body group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
