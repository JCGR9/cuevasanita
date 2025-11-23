'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SecretAdminAccess() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+P o Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        setShowModal(true)
      }
      
      // Escape para cerrar
      if (e.key === 'Escape') {
        setShowModal(false)
        setUsername('')
        setPassword('')
        setError('')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username === 'admin' && password === 'admin') {
      // Guardar sesión
      localStorage.setItem('adminAuth', JSON.stringify({
        username,
        role: 'admin',
        loginTime: new Date().toISOString()
      }))
      
      // Redirigir al dashboard
      router.push('/admin/dashboard')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c68642] to-[#8b4513] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="font-playfair text-2xl text-[#2c1810] mb-2">
            Acceso Administrativo
          </h2>
          <p className="text-gray-500 text-sm">Introduce tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#c68642] transition-colors"
              placeholder="admin"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#c68642] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowModal(false)
                setUsername('')
                setPassword('')
                setError('')
              }}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Acceder
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Presiona <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">ESC</kbd> para cerrar
        </p>
      </div>
    </div>
  )
}
