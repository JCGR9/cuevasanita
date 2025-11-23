'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReservations } from '@/hooks/useReservations'
import Link from 'next/link'
import type { Reservation, ReservationStatus } from '@/types/reservations'

export default function AdminReservations() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { 
    getFilteredReservations, 
    updateReservation, 
    deleteReservation,
    getAvailableTables,
    assignTable,
    loading 
  } = useReservations()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | ''>('')
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list')

  // Función para determinar el turno
  const getShift = (time: string) => {
    const hour = parseInt(time.split(':')[0])
    if (hour >= 12 && hour < 17) return 'lunch'
    if (hour >= 19 || hour < 2) return 'dinner'
    return 'other'
  }

  // Organizar reservas por turno
  const organizeByShift = (reservations: Reservation[]) => {
    const lunch = reservations.filter(r => getShift(r.time) === 'lunch')
    const dinner = reservations.filter(r => getShift(r.time) === 'dinner')
    const other = reservations.filter(r => getShift(r.time) === 'other')
    return { lunch, dinner, other }
  }

  // Verificar autenticación
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Filtrar reservas
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const filtered = getFilteredReservations({
        date: filterDate || undefined,
        status: filterStatus || undefined,
        searchTerm: searchTerm || undefined,
      })
      setFilteredReservations(filtered.sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time)
        }
        return b.date.localeCompare(a.date)
      }))
    }
  }, [searchTerm, filterDate, filterStatus, isAuthenticated, loading, getFilteredReservations])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300'
      case 'seated': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente'
      case 'confirmed': return 'Confirmada'
      case 'seated': return 'Sentados'
      case 'completed': return 'Completada'
      case 'cancelled': return 'Cancelada'
      default: return status
    }
  }

  const handleStatusChange = (reservationId: string, newStatus: ReservationStatus) => {
    updateReservation(reservationId, { status: newStatus })
  }

  const handleDelete = (reservationId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      deleteReservation(reservationId)
    }
  }

  const openReservationModal = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setShowModal(true)
  }

  const handleAssignTable = (tableId: string) => {
    if (selectedReservation) {
      assignTable(selectedReservation.id, tableId)
      setShowModal(false)
      setSelectedReservation(null)
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    )
  }

  const availableTables = selectedReservation 
    ? getAvailableTables(selectedReservation.date, selectedReservation.time, selectedReservation.guests)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl text-[#2c1810]">
                Gestión de Reservas
              </h1>
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

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 py-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/reservations"
              className="text-[#c68642] border-b-2 border-[#c68642] pb-2 font-semibold"
            >
              Reservas
            </Link>
            <Link
              href="/admin/calendar"
              className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors"
            >
              Calendario
            </Link>
            <Link
              href="/admin/tables"
              className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors"
            >
              Mesas
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="font-semibold text-lg text-[#2c1810] mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre, email o teléfono..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c68642]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c68642]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ReservationStatus | '')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#c68642]"
              >
                <option value="">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="seated">Sentados</option>
                <option value="completed">Completada</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          {(searchTerm || filterDate || filterStatus) && (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterDate('')
                setFilterStatus('')
              }}
              className="mt-4 text-sm text-[#c68642] hover:text-[#8b4513] font-semibold"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="mb-6 flex justify-end gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-[#c68642] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Vista Lista
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'timeline'
                ? 'bg-[#c68642] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Vista por Turnos
          </button>
        </div>

        {/* Timeline View by Shifts */}
        {viewMode === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {(() => {
              const { lunch, dinner } = organizeByShift(filteredReservations)
              
              return (
                <>
                  {/* Comida */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="font-playfair text-2xl">Comida</h3>
                          <p className="text-orange-100">12:00 - 17:00</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{lunch.length}</div>
                          <div className="text-sm text-orange-100">reservas</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                      {lunch.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No hay reservas para el turno de comida</p>
                      ) : (
                        lunch.map(reservation => (
                          <div
                            key={reservation.id}
                            className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-bold text-lg text-gray-900">{reservation.time}</div>
                                <div className="text-gray-700 font-medium">{reservation.customerName}</div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(reservation.status)}`}>
                                {getStatusLabel(reservation.status)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>👥 {reservation.guests} personas</div>
                              {reservation.tableId && <div>🪑 Mesa {reservation.tableId}</div>}
                              <div>📞 {reservation.phone}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Cena */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="font-playfair text-2xl">Cena</h3>
                          <p className="text-indigo-100">19:00 - 00:00</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{dinner.length}</div>
                          <div className="text-sm text-indigo-100">reservas</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                      {dinner.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No hay reservas para el turno de cena</p>
                      ) : (
                        dinner.map(reservation => (
                          <div
                            key={reservation.id}
                            className="border-l-4 border-indigo-600 bg-indigo-50 p-4 rounded-r-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-bold text-lg text-gray-900">{reservation.time}</div>
                                <div className="text-gray-700 font-medium">{reservation.customerName}</div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(reservation.status)}`}>
                                {getStatusLabel(reservation.status)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>👥 {reservation.guests} personas</div>
                              {reservation.tableId && <div>🪑 Mesa {reservation.tableId}</div>}
                              <div>📞 {reservation.phone}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        )}

        {/* Reservations Table (List View) */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="font-playfair text-2xl text-[#2c1810]">
                  Reservas ({filteredReservations.length})
                </h2>
              </div>
            </div>

            {filteredReservations.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No se encontraron reservas</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Fecha</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Hora</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Cliente</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Contacto</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Personas</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Mesa</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Estado</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{new Date(reservation.date).toLocaleDateString('es-ES')}</td>
                        <td className="py-4 px-4 font-semibold text-[#2c1810]">{reservation.time}</td>
                        <td className="py-4 px-4">{reservation.customerName}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          <div>{reservation.email}</div>
                          <div>{reservation.phone}</div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                            {reservation.guests}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {reservation.tableId ? (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Mesa {reservation.tableId}
                            </span>
                          ) : (
                            <button
                              onClick={() => openReservationModal(reservation)}
                              className="text-[#c68642] hover:text-[#8b4513] text-sm font-semibold"
                            >
                              Asignar
                            </button>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={reservation.status}
                            onChange={(e) => handleStatusChange(reservation.id, e.target.value as ReservationStatus)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold border cursor-pointer ${getStatusColor(reservation.status)}`}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="seated">Sentados</option>
                            <option value="completed">Completada</option>
                            <option value="cancelled">Cancelada</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleDelete(reservation.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-semibold"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal para asignar mesa */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="font-playfair text-2xl text-[#2c1810] mb-4">
              Asignar Mesa
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-700"><strong>Cliente:</strong> {selectedReservation.customerName}</p>
              <p className="text-gray-700"><strong>Fecha:</strong> {new Date(selectedReservation.date).toLocaleDateString('es-ES')}</p>
              <p className="text-gray-700"><strong>Hora:</strong> {selectedReservation.time}</p>
              <p className="text-gray-700"><strong>Personas:</strong> {selectedReservation.guests}</p>
            </div>

            <h4 className="font-semibold text-lg mb-4">Mesas Disponibles</h4>
            
            {availableTables.length === 0 ? (
              <p className="text-gray-500 py-4">No hay mesas disponibles para esta reserva</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {availableTables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => handleAssignTable(table.id)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#c68642] hover:bg-[#c68642]/5 transition-colors"
                  >
                    <div className="text-center">
                      <div className="font-bold text-xl text-[#2c1810]">Mesa {table.number}</div>
                      <div className="text-sm text-gray-600 mt-1">Capacidad: {table.capacity}</div>
                      <div className="text-xs text-gray-500 mt-1 capitalize">{table.location.replace('-', ' ')}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setShowModal(false)
                setSelectedReservation(null)
              }}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
