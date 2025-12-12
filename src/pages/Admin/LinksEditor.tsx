import { useState, useEffect } from 'react';
import { useLinks, LinkCard } from '../../hooks/useLinks';
import { ExternalLink, Plus, Save, Trash2, X } from 'lucide-react';

export default function LinksEditor() {
  const { links, addLink, updateLink, deleteLink, resetLinks } = useLinks();
  const [selectedLink, setSelectedLink] = useState<LinkCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'Legislação Penal',
  });

  const categories = ['todos', ...new Set(links.map(link => link.category))];

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         link.url.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = categoryFilter === 'todos' || link.category === categoryFilter;
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
      title: '',
      description: '',
      url: '',
      category: 'Legislação Penal',
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.url) {
      alert('Título e URL são obrigatórios!');
      return;
    }

    if (selectedLink) {
      updateLink(selectedLink.id, formData);
    } else {
      addLink(formData);
    }

    setIsEditing(false);
    setSelectedLink(null);
    setFormData({ title: '', description: '', url: '', category: 'Legislação Penal' });
  };

  const handleDelete = () => {
    if (selectedLink && confirm('Tem certeza que deseja excluir este link?')) {
      deleteLink(selectedLink.id);
      setIsEditing(false);
      setSelectedLink(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedLink(null);
    setFormData({ title: '', description: '', url: '', category: 'Legislação Penal' });
  };

  const handleRestore = () => {
    if (confirm('Tem certeza que deseja restaurar todos os links para o padrão? Esta ação não pode ser desfeita!')) {
      resetLinks();
      setIsEditing(false);
      setSelectedLink(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-2">
          🔗 Editor de Links
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie os links úteis do CrimeDash
        </p>
      </header>

      {/* Controles */}
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-meta-4 text-gray-700 dark:text-white hover:bg-gray-300'
              }`}
            >
              {cat === 'todos' ? `TODOS (${links.length})` : `${cat} (${links.filter(l => l.category === cat).length})`}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRestore}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold"
          >
            🔄 Restaurar Padrão
          </button>
          <button
            onClick={handleNew}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            ➕ Novo Link
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Links */}
        <div className="lg:col-span-1 bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              📋 Links ({filteredLinks.length})
            </h2>
            
            <input
              type="text"
              placeholder="🔍 Pesquisar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => handleEdit(link)}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-meta-4 transition ${
                  selectedLink?.id === link.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-stroke dark:border-strokedark'
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

        {/* Formulário */}
        <div className="lg:col-span-2 bg-white dark:bg-boxdark rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            ✏️ Editor
          </h2>

          {!isEditing ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">👈 Selecione um link para editar</p>
              <p className="text-sm">ou clique em "➕ Novo Link" para criar um novo</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-stroke dark:border-strokedark rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-meta-4 dark:text-white"
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
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  Salvar
                </button>
                {selectedLink && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-5 w-5" />
                    Excluir
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold flex items-center justify-center gap-2"
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
