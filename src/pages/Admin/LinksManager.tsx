import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Edit2, Trash2, Save, X, LogOut } from 'lucide-react';
import PageMeta from '../../components/common/PageMeta';
import { useLinks, LinkCard } from '../../hooks/useLinks';

export default function LinksManager() {
  const navigate = useNavigate();
  const { links, addLink, updateLink, deleteLink, resetLinks } = useLinks();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: 'Legislação',
  });

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const handleAdd = () => {
    if (formData.title && formData.url) {
      addLink(formData);
      setFormData({ title: '', description: '', url: '', category: 'Legislação' });
      setIsAdding(false);
    }
  };

  const handleUpdate = (id: string) => {
    if (formData.title && formData.url) {
      updateLink(id, formData);
      setIsEditing(null);
      setFormData({ title: '', description: '', url: '', category: 'Legislação' });
    }
  };

  const startEdit = (link: LinkCard) => {
    setIsEditing(link.id);
    setFormData({
      title: link.title,
      description: link.description,
      url: link.url,
      category: link.category,
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({ title: '', description: '', url: '', category: 'Legislação' });
  };

  const categories = Array.from(new Set(links.map(link => link.category)));
  const allCategories = ['Legislação', 'Sistemas', 'Jurisprudência', ...categories].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <>
      <PageMeta
        title="Gerenciar Links - CrimeDash"
        description="Área administrativa de links"
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-title-md2 font-semibold text-black dark:text-white">
            Gerenciar Links Úteis
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (window.confirm('Deseja restaurar os links padrão?')) {
                  resetLinks();
                }
              }}
              className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-strokedark dark:hover:bg-gray-800"
            >
              Restaurar Padrão
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>

        {/* Adicionar Novo Link */}
        {!isAdding && !isEditing && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-3 font-medium text-white hover:bg-brand-600"
          >
            <Plus className="h-5 w-5" />
            Adicionar Novo Link
          </button>
        )}

        {/* Formulário de Adicionar */}
        {isAdding && (
          <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
              Novo Link
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                  placeholder="Nome do link"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                  placeholder="Breve descrição"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                >
                  {allCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
                >
                  <Save className="h-4 w-4" />
                  Salvar
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 rounded-lg border border-stroke px-4 py-2 hover:bg-gray-50 dark:border-strokedark dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Links */}
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-title-sm font-semibold text-black dark:text-white border-b border-stroke dark:border-strokedark pb-2">
                {category}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {links
                  .filter(link => link.category === category)
                  .map(link => (
                    <div key={link.id} className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                      {isEditing === link.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-sm font-medium">Título</label>
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Descrição</label>
                            <input
                              type="text"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">URL</label>
                            <input
                              type="url"
                              value={formData.url}
                              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium">Categoria</label>
                            <select
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 outline-none focus:border-primary dark:border-strokedark"
                            >
                              {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleUpdate(link.id)}
                              className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white hover:bg-brand-600"
                            >
                              <Save className="h-4 w-4" />
                              Salvar
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-2 rounded-lg border border-stroke px-4 py-2 hover:bg-gray-50 dark:border-strokedark dark:hover:bg-gray-800"
                            >
                              <X className="h-4 w-4" />
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-black dark:text-white mb-1">
                              {link.title}
                            </h4>
                            <p className="text-sm text-body mb-2">{link.description}</p>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-brand-500 hover:underline"
                            >
                              {link.url}
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(link)}
                              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Edit2 className="h-4 w-4 text-brand-500" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Deseja realmente excluir este link?')) {
                                  deleteLink(link.id);
                                }
                              }}
                              className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
