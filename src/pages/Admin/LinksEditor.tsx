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
    ArrowUp,
    ArrowDown,
    Edit2,
    Check,
    Upload,
    GitBranch,
} from "lucide-react";

const API_URL = "http://localhost:3001/api";

export default function LinksEditor() {
    const [links, setLinks] = useState<LinkCard[]>([]);
    const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pushing, setPushing] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkCard | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("todos");
    const [showCategoryManager, setShowCategoryManager] = useState(false);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");
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

    const [newCategory, setNewCategory] = useState("");

    const loadLinks = async () => {
        try {
            setLoading(true);
            const [linksRes, orderRes] = await Promise.all([
                fetch(`${API_URL}/links`),
                fetch(`${API_URL}/category-order`),
            ]);

            const linksData = await linksRes.json();
            const orderData = await orderRes.json();

            if (linksData.success) {
                setLinks(linksData.links);
            } else {
                showMessage("error", "Erro: " + linksData.error);
            }

            if (orderData.success) {
                setCategoryOrder(orderData.order);
            }
        } catch {
            showMessage(
                "error",
                "Servidor API não está rodando! Execute: npm run dev:api"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLinks();
    }, []);

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
        } catch {
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

    // Obter categorias reais (sem "todos")
    const realCategories = Array.from(
        new Set(links.map((link) => link.category))
    );

    // Combinar categoryOrder com novas categorias que não estão na ordem ainda
    const displayOrder = [
        ...categoryOrder.filter(cat => realCategories.includes(cat)), // Manter ordem das existentes
        ...realCategories.filter(cat => !categoryOrder.includes(cat))  // Adicionar novas no final
    ];

    // Categorias disponíveis para o select (inclui a categoria atual do form se for nova)
    const availableCategories = [
        ...new Set([
            ...links.map((l) => l.category),
            ...(formData.category &&
            !links.some((l) => l.category === formData.category)
                ? [formData.category]
                : []),
        ]),
    ].sort();

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

    const handleGitPush = async () => {
        if (!confirm("Fazer commit e push das mudanças para o GitHub?\n\nIsso irá:\n1. Adicionar todos os arquivos modificados\n2. Fazer commit com mensagem 'Atualiza links'\n3. Fazer push para o repositório\n4. Acionar deploy automático no Vercel")) {
            return;
        }

        try {
            setPushing(true);
            const response = await fetch(`${API_URL}/git/push`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Atualiza links" }),
            });

            const data = await response.json();

            if (data.success) {
                if (data.hasChanges) {
                    showMessage("success", "✓ Mudanças enviadas para o GitHub! Deploy no Vercel iniciado (~2 min)");
                } else {
                    showMessage("success", "✓ Não há mudanças para commitar");
                }
            } else {
                showMessage("error", "Erro: " + data.error);
            }
        } catch (error) {
            showMessage("error", "Erro ao fazer push: " + error);
        } finally {
            setPushing(false);
        }
    };

    const moveLink = (index: number, direction: "up" | "down") => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= filteredLinks.length) return;

        const allLinks = [...links];
        const currentLink = filteredLinks[index];
        const targetLink = filteredLinks[newIndex];

        const currentIndexInAll = allLinks.findIndex(
            (l) => l.id === currentLink.id
        );
        const targetIndexInAll = allLinks.findIndex(
            (l) => l.id === targetLink.id
        );

        [allLinks[currentIndexInAll], allLinks[targetIndexInAll]] = [
            allLinks[targetIndexInAll],
            allLinks[currentIndexInAll],
        ];

        saveAllLinks(allLinks);
    };

    const saveCategoryOrder = async (newOrder: string[]) => {
        try {
            setSaving(true);
            const response = await fetch(`${API_URL}/category-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: newOrder }),
            });

            const data = await response.json();

            if (data.success) {
                showMessage("success", `✓ Ordem salva! Backup: ${data.backup}`);
                setCategoryOrder(newOrder);
            } else {
                showMessage("error", "Erro: " + data.error);
            }
        } catch {
            showMessage("error", "Erro ao salvar ordem!");
        } finally {
            setSaving(false);
        }
    };

    const moveCategory = (index: number, direction: "up" | "down") => {
        // Usar displayOrder ao invés de categoryOrder
        const currentOrder =
            displayOrder.length > 0 ? displayOrder : realCategories;
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= currentOrder.length) return;

        const newOrder = [...currentOrder];
        [newOrder[index], newOrder[newIndex]] = [
            newOrder[newIndex],
            newOrder[index],
        ];

        saveCategoryOrder(newOrder);
    };

    const startEditCategory = (category: string) => {
        setEditingCategory(category);
        setNewCategoryName(category);
    };

    const cancelEditCategory = () => {
        setEditingCategory(null);
        setNewCategoryName("");
    };

    const renameCategory = async (oldName: string, newName: string) => {
        if (!newName.trim() || oldName === newName) {
            cancelEditCategory();
            return;
        }

        try {
            setSaving(true);

            // Atualizar todos os links com a categoria antiga
            const updatedLinks = links.map((link) =>
                link.category === oldName
                    ? { ...link, category: newName.trim() }
                    : link
            );

            // Atualizar ordem das categorias
            const updatedOrder = displayOrder.map((cat) =>
                cat === oldName ? newName.trim() : cat
            );

            // Salvar links
            await saveAllLinks(updatedLinks);

            // Salvar ordem
            await saveCategoryOrder(updatedOrder);

            showMessage(
                "success",
                `✓ Categoria renomeada: "${oldName}" → "${newName}"`
            );
            cancelEditCategory();
        } catch {
            showMessage("error", "Erro ao renomear categoria!");
        } finally {
            setSaving(false);
        }
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
                    <div className="flex gap-3">
                        <button
                            onClick={handleGitPush}
                            disabled={loading || saving || pushing}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 disabled:opacity-50"
                        >
                            {pushing ? (
                                <>
                                    <RefreshCw className="h-5 w-5 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <Upload className="h-5 w-5" />
                                    Commit & Push
                                </>
                            )}
                        </button>
                        <button
                            onClick={loadLinks}
                            disabled={loading || saving || pushing}
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
                </div>
            </header>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                        <p className="font-semibold mb-2">
                            📡 Servidor API necessário
                        </p>
                        <p className="mb-2">
                            Execute{" "}
                            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                                npm run dev:api
                            </code>{" "}
                            em outro terminal.
                        </p>
                        <p className="font-semibold mb-1">
                            ✅ Para publicar mudanças:
                        </p>
                        <ol className="list-decimal ml-4 space-y-1">
                            <li>Salve os links no editor</li>
                            <li>
                                Clique no botão{" "}
                                <span className="bg-green-600 text-white px-2 py-0.5 rounded font-semibold">
                                    Commit & Push
                                </span>{" "}
                                no canto superior direito
                            </li>
                            <li>Vercel faz deploy automático (~2 min)</li>
                            <li>
                                <strong>
                                    Novas categorias aparecerão como seções na
                                    página principal
                                </strong>
                            </li>
                        </ol>
                        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                            💡 O botão faz automaticamente: git add, commit e push!
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

                <div className="flex gap-3">
                    <button
                        onClick={handleNew}
                        disabled={saving}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Novo Link
                    </button>
                    <button
                        onClick={() =>
                            setShowCategoryManager(!showCategoryManager)
                        }
                        disabled={saving}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold disabled:opacity-50 flex items-center gap-2"
                    >
                        <ArrowUp className="h-5 w-5" />
                        <ArrowDown className="h-5 w-5 -ml-3" />
                        Ordenar Categorias
                    </button>
                </div>
            </div>

            {showCategoryManager && (
                <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            🔀 Ordenar Categorias
                        </h2>
                        <button
                            onClick={() => setShowCategoryManager(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-meta-4 rounded-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Use os botões ↑↓ para reorganizar e ✏️ para renomear as
                        categorias na página principal.
                    </p>
                    <div className="space-y-2">
                        {displayOrder.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                Nenhuma categoria encontrada. Crie links
                                primeiro.
                            </p>
                        ) : (
                            displayOrder.map((cat, index) => (
                                <div
                                    key={cat}
                                    className="flex items-center gap-3 p-3 border border-stroke dark:border-strokedark rounded-lg bg-gray-50 dark:bg-meta-4"
                                >
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() =>
                                                moveCategory(index, "up")
                                            }
                                            disabled={
                                                index === 0 ||
                                                saving ||
                                                editingCategory !== null
                                            }
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-boxdark rounded disabled:opacity-30"
                                            title="Mover para cima"
                                        >
                                            <ArrowUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                moveCategory(index, "down")
                                            }
                                            disabled={
                                                index ===
                                                    displayOrder.length - 1 ||
                                                saving ||
                                                editingCategory !== null
                                            }
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-boxdark rounded disabled:opacity-30"
                                            title="Mover para baixo"
                                        >
                                            <ArrowDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                    <div className="flex-1">
                                        {editingCategory === cat ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    {index + 1}.
                                                </span>
                                                <input
                                                    type="text"
                                                    value={newCategoryName}
                                                    onChange={(e) =>
                                                        setNewCategoryName(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            renameCategory(
                                                                cat,
                                                                newCategoryName
                                                            );
                                                        } else if (
                                                            e.key === "Escape"
                                                        ) {
                                                            cancelEditCategory();
                                                        }
                                                    }}
                                                    className="flex-1 px-3 py-1.5 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-boxdark dark:text-white"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() =>
                                                        renameCategory(
                                                            cat,
                                                            newCategoryName
                                                        )
                                                    }
                                                    disabled={saving}
                                                    className="p-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                    title="Salvar"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={cancelEditCategory}
                                                    disabled={saving}
                                                    className="p-1.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
                                                    title="Cancelar"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="font-semibold text-gray-800 dark:text-white">
                                                        {index + 1}. {cat}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                        (
                                                        {
                                                            links.filter(
                                                                (l) =>
                                                                    l.category ===
                                                                    cat
                                                            ).length
                                                        }{" "}
                                                        links)
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        startEditCategory(cat)
                                                    }
                                                    disabled={
                                                        saving ||
                                                        editingCategory !== null
                                                    }
                                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-boxdark rounded-lg disabled:opacity-30"
                                                    title="Renomear categoria"
                                                >
                                                    <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

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
                        {filteredLinks.map((link, index) => (
                            <div
                                key={link.id}
                                className={`p-3 border rounded-lg transition ${
                                    selectedLink?.id === link.id
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-stroke dark:border-strokedark"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveLink(index, "up");
                                            }}
                                            disabled={index === 0 || saving}
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-meta-4 rounded disabled:opacity-30"
                                            title="Mover para cima"
                                        >
                                            <ArrowUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveLink(index, "down");
                                            }}
                                            disabled={
                                                index ===
                                                    filteredLinks.length - 1 ||
                                                saving
                                            }
                                            className="p-1 hover:bg-gray-200 dark:hover:bg-meta-4 rounded disabled:opacity-30"
                                            title="Mover para baixo"
                                        >
                                            <ArrowDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                    <div
                                        onClick={() => handleEdit(link)}
                                        className="flex-1 cursor-pointer"
                                    >
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
                                <div className="flex gap-2">
                                    <select
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                category: e.target.value,
                                            })
                                        }
                                        disabled={saving}
                                        className="flex-1 px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                    >
                                        {availableCategories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) =>
                                            setNewCategory(e.target.value)
                                        }
                                        placeholder="Nova categoria..."
                                        disabled={saving}
                                        className="flex-1 px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white disabled:opacity-50"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newCategory.trim()) {
                                                const trimmedCategory =
                                                    newCategory.trim();
                                                setFormData({
                                                    ...formData,
                                                    category: trimmedCategory,
                                                });
                                                setNewCategory("");
                                                showMessage(
                                                    "success",
                                                    `Categoria "${trimmedCategory}" adicionada! Será visível após salvar o link.`
                                                );
                                            }
                                        }}
                                        disabled={!newCategory.trim() || saving}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 whitespace-nowrap"
                                    >
                                        ➕ Adicionar
                                    </button>
                                </div>
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
