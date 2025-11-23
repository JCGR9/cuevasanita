'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReservations } from '@/hooks/useReservations'
import Link from 'next/link'
import type { Table } from '@/types/reservations'

export default function AdminTables() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { tables, addTable, updateTable, deleteTable, loading } = useReservations()
  const [showModal, setShowModal] = useState(false)
  const [editingTable, setEditingTable] = useState<Table | null>(null)
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    location: 'sala-principal' as 'sala-principal' | 'cueva' | 'terraza',
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const openNewTableModal = () => {
    setEditingTable(null)
    setFormData({ number: '', capacity: '', location: 'sala-principal' })
    setShowModal(true)
  }

  const openEditTableModal = (table: Table) => {
    setEditingTable(table)
    setFormData({
      number: table.number.toString(),
      capacity: table.capacity.toString(),
      location: table.location,
    })
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingTable) {
      // Editar mesa existente
      updateTable(editingTable.id, {
        number: parseInt(formData.number),
        capacity: parseInt(formData.capacity),
        location: formData.location,
      })
    } else {
      // Crear nueva mesa
      addTable({
        number: parseInt(formData.number),
        capacity: parseInt(formData.capacity),
        location: formData.location,
        position: { x: 0, y: 0 },
        isAvailable: true,
      })
    }
    
    setShowModal(false)
    setFormData({ number: '', capacity: '', location: 'sala-principal' })
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta mesa?')) {
      deleteTable(id)
    }
  }

  const toggleAvailability = (table: Table) => {
    updateTable(table.id, { isAvailable: !table.isAvailable })
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    )
  }

  const tablesByLocation = {
    'sala-principal': tables.filter(t => t.location === 'sala-principal'),
    'cueva': tables.filter(t => t.location === 'cueva'),
    'terraza': tables.filter(t => t.location === 'terraza'),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl text-[#2c1810]">Gestión de Mesas</h1>
              <p className="text-gray-600 mt-1">Taberna Cuevas Anita</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 py-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/reservations" className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors">
              Reservas
            </Link>
            <Link href="/admin/calendar" className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors">
              Calendario
            </Link>
            <Link href="/admin/tables" className="text-[#c68642] border-b-2 border-[#c68642] pb-2 font-semibold">
              Mesas
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-playfair text-[#2c1810]">
              Total de mesas: {tables.length}
            </h2>
            <p className="text-gray-600">
              Disponibles: {tables.filter(t => t.isAvailable).length} • No disponibles: {tables.filter(t => !t.isAvailable).length}
            </p>
          </div>
          <button
            onClick={openNewTableModal}
            className="px-6 py-3 bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Mesa
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sala Principal */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl text-[#2c1810]">
                Sala Principal ({tablesByLocation['sala-principal'].length})
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {tablesByLocation['sala-principal'].length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay mesas en esta ubicación</p>
              ) : (
                tablesByLocation['sala-principal'].map(table => (
                  <div key={table.id} className={`border-2 rounded-lg p-4 transition-all ${table.isAvailable ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-xl text-[#2c1810]">Mesa {table.number}</div>
                        <div className="text-sm text-gray-600">Capacidad: {table.capacity} personas</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${table.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAvailability(table)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          table.isAvailable 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {table.isAvailable ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => openEditTableModal(table)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(table.id)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Cueva */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl text-[#2c1810]">
                La Cueva ({tablesByLocation['cueva'].length})
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {tablesByLocation['cueva'].length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay mesas en esta ubicación</p>
              ) : (
                tablesByLocation['cueva'].map(table => (
                  <div key={table.id} className={`border-2 rounded-lg p-4 transition-all ${table.isAvailable ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-xl text-[#2c1810]">Mesa {table.number}</div>
                        <div className="text-sm text-gray-600">Capacidad: {table.capacity} personas</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${table.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAvailability(table)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          table.isAvailable 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {table.isAvailable ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => openEditTableModal(table)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(table.id)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Terraza */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="font-playfair text-2xl text-[#2c1810]">
                Terraza ({tablesByLocation['terraza'].length})
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {tablesByLocation['terraza'].length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay mesas en esta ubicación</p>
              ) : (
                tablesByLocation['terraza'].map(table => (
                  <div key={table.id} className={`border-2 rounded-lg p-4 transition-all ${table.isAvailable ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-xl text-[#2c1810]">Mesa {table.number}</div>
                        <div className="text-sm text-gray-600">Capacidad: {table.capacity} personas</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${table.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAvailability(table)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                          table.isAvailable 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {table.isAvailable ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => openEditTableModal(table)}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(table.id)}
                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal para crear/editar mesa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="font-playfair text-2xl text-[#2c1810] mb-6">
              {editingTable ? 'Editar Mesa' : 'Nueva Mesa'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Número de Mesa
                </label>
                <input
                  type="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#c68642]"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Capacidad (personas)
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#c68642]"
                  required
                  min="1"
                  max="20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#c68642]"
                >
                  <option value="sala-principal">Sala Principal</option>
                  <option value="cueva">La Cueva</option>
                  <option value="terraza">Terraza</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingTable(null)
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  {editingTable ? 'Guardar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
