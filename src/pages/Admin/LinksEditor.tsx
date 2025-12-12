import { useState, useEffect } from "react";
import { LinkCard } from "../../hooks/useLinks";
import {
    ExternalLink,
    Plus,
    Save,
    Trash2,
    X,
    RefreshCw,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

const API_URL = "http://localhost:3001/api";

export default function LinksEditor() {
    const [links, setLinks] = useState<LinkCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkCard | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("todos");
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        url: "",
        category: "Legislação Penal",
    });

    useEffect(() => {
        loadLinks();
    }, []);

    const loadLinks = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/links`);
            const data = await response.json();

            if (data.success) {
                setLinks(data.links);
            } else {
                showMessage("error", "Erro: " + data.error);
            }
        } catch (error) {
            showMessage(
                "error",
                "Servidor API não está rodando! Execute: npm run dev:api"
            );
        } finally {
            setLoading(false);
        }
    };

    const saveAllLinks = async (updatedLinks: LinkCard[]) => {
        try {
            setSaving(true);
            const response = await fetch(`${API_URL}/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ links: updatedLinks }),
            });

            const data = await response.json();

            if (data.success) {
                showMessage("success", `✓ Salvo! Backup: ${data.backup}`);
                setLinks(updatedLinks);
            } else {
                showMessage("error", "Erro: " + data.error);
            }
        } catch (error) {
            showMessage("error", "Erro ao salvar!");
        } finally {
            setSaving(false);
        }
    };

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const categories = [
        "todos",
        ...new Set(links.map((link) => link.category)),
    ];

    const filteredLinks = links.filter((link) => {
        const matchesSearch =
            link.title.toLowerCase().includes(searchText.toLowerCase()) ||
            link.description.toLowerCase().includes(searchText.toLowerCase()) ||
            link.url.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory =
            categoryFilter === "todos" || link.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (link: LinkCard) => {
        setSelectedLink(link);
        setFormData({
            title: link.title,
            description: link.description,
            url: link.url,
            category: link.category,
        });
        setIsEditing(true);
    };

    const handleNew = () => {
        setSelectedLink(null);
        setFormData({
            title: "",
            description: "",
            url: "",
            category: "Legislação Penal",
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.url) {
            showMessage("error", "Título e URL são obrigatórios!");
            return;
        }

        let updatedLinks: LinkCard[];

        if (selectedLink) {
            updatedLinks = links.map((link) =>
                link.id === selectedLink.id
                    ? { ...formData, id: selectedLink.id }
                    : link
            );
        } else {
            const newLink: LinkCard = {
                ...formData,
                id: Date.now().toString(),
            };
            updatedLinks = [...links, newLink];
        }

        saveAllLinks(updatedLinks);
        setIsEditing(false);
        setSelectedLink(null);
    };

    const handleDelete = () => {
        if (selectedLink && confirm("Excluir este link?")) {
            const updatedLinks = links.filter(
                (link) => link.id !== selectedLink.id
            );
            saveAllLinks(updatedLinks);
            setIsEditing(false);
            setSelectedLink(null);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedLink(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600 dark:text-gray-400">
                        Carregando...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {message && (
                <div
                    className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg ${
                        message.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }`}
                >
                    {message.type === "success" ? (
                        <CheckCircle className="h-5 w-5" />
                    ) : (
                        <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-2">
                            🔗 Editor de Links
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Edite os links que todos os usuários verão
                        </p>
                    </div>
                    <button
                        onClick={loadLinks}
                        disabled={loading || saving}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center gap-2"
                    >
                        <RefreshCw
                            className={`h-5 w-5 ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
                        Recarregar
                    </button>
                </div>
            </header>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                        <p className="font-semibold mb-1">
                            📡 Servidor API necessário
                        </p>
                        <p>
                            Execute{" "}
                            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                                npm run dev:api
                            </code>{" "}
                            em outro terminal.
                            <br />
                            Após salvar, faça{" "}
                            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                                git commit
                            </code>{" "}
                            e{" "}
                            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                                git push
                            </code>
                            .
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-wrap gap-4 mb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                categoryFilter === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-meta-4 text-gray-700 dark:text-white"
                            }`}
                        >
                            {cat === "todos"
                                ? `TODOS (${links.length})`
                                : `${cat} (${
                                      links.filter((l) => l.category === cat)
                                          .length
                                  })`}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNew}
                    disabled={saving}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Novo Link
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        📋 Links ({filteredLinks.length})
                    </h2>

                    <input
                        type="text"
                        placeholder="🔍 Pesquisar..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
                    />

                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {filteredLinks.map((link) => (
                            <div
                                key={link.id}
                                onClick={() => handleEdit(link)}
                                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 transition ${
                                    selectedLink?.id === link.id
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-stroke dark:border-strokedark"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {link.title}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            {link.category}
                                        </div>
                                    </div>
                                    <ExternalLink className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        ✏️ Editor
                    </h2>

                    {!isEditing ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <p className="text-lg mb-2">👈 Selecione um link</p>
                            <p className="text-sm">ou clique em "Novo Link"</p>
                        </div>
                    ) : (
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    disabled={saving}
                                    className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    disabled={saving}
                                    className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    URL *
                                </label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            url: e.target.value,
                                        })
                                    }
                                    required
                                    disabled={saving}
                                    className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Categoria
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    disabled={saving}
                                    className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                >
                                    <option>Legislação Penal</option>
                                    <option>Sistemas</option>
                                    <option>Jurisprudência</option>
                                    <option>NotebookLM</option>
                                </select>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <RefreshCw className="h-5 w-5 animate-spin" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5" />
                                            Salvar
                                        </>
                                    )}
                                </button>
                                {selectedLink && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={saving}
                                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                        Excluir
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold disabled:opacity-50 flex items-center gap-2"
                                >
                                    <X className="h-5 w-5" />
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
