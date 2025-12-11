import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import PageMeta from '../../components/common/PageMeta';

const ADMIN_PASSWORD = '355531';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/links');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  return (
    <>
      <PageMeta
        title="Admin - CrimeDash"
        description="Área administrativa"
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-default dark:bg-boxdark">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Área Administrativa
            </h1>
            <p className="mt-2 text-sm text-body">
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4"
                placeholder="Digite a senha"
                required
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-brand-500 py-3 px-5 font-medium text-white hover:bg-brand-600 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
