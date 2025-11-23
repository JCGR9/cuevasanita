'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulación de login (en producción esto será con Supabase Auth)
    // Usuario demo: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      // Guardar sesión en localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        username,
        role: 'admin',
        loginTime: new Date().toISOString()
      }))
      
      // Redirigir al dashboard
      router.push('/admin/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c1810] via-[#8b4513] to-[#c68642] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
            Taberna Cuevas Anita
          </h1>
          <p className="text-[#f5e6d3] text-lg">Panel de Administración</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="font-playfair text-3xl text-[#2c1810] mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#2c1810] mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c68642] transition-colors text-gray-900"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2c1810] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#c68642] transition-colors text-gray-900"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white py-3 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-[#f5e6d3] rounded-xl">
            <p className="text-sm text-[#8b4513] text-center">
              <strong>Demo:</strong> admin / admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-[#f5e6d3] hover:text-white transition-colors text-sm"
          >
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  )
}
