import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { useLinks } from "../../hooks/useLinks";

export default function UsefulLinks() {
    const { links } = useLinks();
    const categories = Array.from(new Set(links.map((link) => link.category)));

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

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {links
                            .filter((link) => link.category === category)
                            .map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-lg border border-stroke bg-white p-6 shadow-default transition-all hover:shadow-lg hover:border-primary dark:border-strokedark dark:bg-boxdark dark:hover:border-primary"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-black dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                {link.title}
                                            </h4>
                                            <p className="text-sm text-body">
                                                {link.description}
                                            </p>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-body group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
