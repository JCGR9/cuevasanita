'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReservations } from '@/hooks/useReservations'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { getDashboardStats, getReservationsByDate, reservations, loading } = useReservations()
  const [stats, setStats] = useState({
    todayReservations: 0,
    pendingReservations: 0,
    confirmedReservations: 0,
    totalGuests: 0,
    occupancyRate: 0,
  })
  const [todayReservations, setTodayReservations] = useState<any[]>([])

  // Verificar autenticación
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Cargar estadísticas
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const dashStats = getDashboardStats()
      setStats(dashStats)
      
      const today = new Date().toISOString().split('T')[0]
      setTodayReservations(getReservationsByDate(today))
    }
  }, [loading, isAuthenticated, getDashboardStats, getReservationsByDate])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    )
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl text-[#2c1810]">
                Panel de Administración
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
              className="text-[#c68642] border-b-2 border-[#c68642] pb-2 font-semibold"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/reservations"
              className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors"
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#c68642]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Reservas Hoy</p>
                <p className="text-3xl font-bold text-[#2c1810] mt-2">{stats.todayReservations}</p>
              </div>
              <div className="bg-[#c68642]/10 p-3 rounded-full">
                <svg className="w-8 h-8 text-[#c68642]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pendientes</p>
                <p className="text-3xl font-bold text-[#2c1810] mt-2">{stats.pendingReservations}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Confirmadas</p>
                <p className="text-3xl font-bold text-[#2c1810] mt-2">{stats.confirmedReservations}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Comensales Hoy</p>
                <p className="text-3xl font-bold text-[#2c1810] mt-2">{stats.totalGuests}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Reservations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-playfair text-2xl text-[#2c1810] mb-6">
            Reservas de Hoy
          </h2>

          {todayReservations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay reservas para hoy</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Hora</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Cliente</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Teléfono</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Personas</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Mesa</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {todayReservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-[#2c1810]">{reservation.time}</td>
                      <td className="py-4 px-4">{reservation.customerName}</td>
                      <td className="py-4 px-4 text-gray-600">{reservation.phone}</td>
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
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(reservation.status)}`}>
                          {getStatusLabel(reservation.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Link
              href="/admin/reservations"
              className="text-[#c68642] hover:text-[#8b4513] font-semibold transition-colors"
            >
              Ver todas las reservas →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
