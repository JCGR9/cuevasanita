'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useReservations } from '@/hooks/useReservations'
import Link from 'next/link'
import type { Reservation } from '@/types/reservations'

type ViewMode = 'month' | 'week' | 'day'

export default function AdminCalendar() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { reservations, updateReservation, loading } = useReservations()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

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

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando...</div>
      </div>
    )
  }

  // Funciones de calendario
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      })
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      })
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length // 6 semanas x 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      })
    }
    
    return days
  }

  const getReservationsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return reservations.filter(r => r.date === dateStr)
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'confirmed': return 'bg-green-500'
      case 'seated': return 'bg-blue-500'
      case 'completed': return 'bg-gray-400'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  const days = getDaysInMonth(currentDate)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-3xl text-[#2c1810]">Calendario de Reservas</h1>
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
            <Link href="/admin/calendar" className="text-[#c68642] border-b-2 border-[#c68642] pb-2 font-semibold">
              Calendario
            </Link>
            <Link href="/admin/tables" className="text-gray-600 hover:text-[#c68642] pb-2 transition-colors">
              Mesas
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Calendar Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h2 className="font-playfair text-2xl text-[#2c1810] capitalize min-w-[200px]">
                {monthName}
              </h2>
              
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={goToToday}
                className="ml-4 px-4 py-2 bg-[#c68642] text-white rounded-lg hover:bg-[#8b4513] transition-colors font-medium"
              >
                Hoy
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600">Pendiente</span>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Confirmada</span>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Sentados</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="p-4 text-center font-semibold text-gray-600 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayReservations = getReservationsForDate(day.date)
              const isTodayDate = isToday(day.date)
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] border-b border-r border-gray-200 p-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !day.isCurrentMonth ? 'bg-gray-50' : ''
                  } ${isTodayDate ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className={`text-sm font-semibold mb-2 ${
                    !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-700'
                  } ${isTodayDate ? 'text-blue-600' : ''}`}>
                    {day.date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayReservations.slice(0, 3).map(reservation => (
                      <div
                        key={reservation.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedReservation(reservation)
                        }}
                        className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80 ${getStatusColor(reservation.status)}`}
                      >
                        {reservation.time} - {reservation.customerName}
                      </div>
                    ))}
                    {dayReservations.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayReservations.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Modal de detalles de día */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedDate(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="font-playfair text-2xl text-[#2c1810] mb-4">
              Reservas del {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            
            {getReservationsForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500 py-8 text-center">No hay reservas para este día</p>
            ) : (
              <div className="space-y-3">
                {getReservationsForDate(selectedDate).map(reservation => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#c68642] transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg text-[#2c1810]">{reservation.time} - {reservation.customerName}</div>
                        <div className="text-sm text-gray-600 mt-1">{reservation.email} • {reservation.phone}</div>
                        <div className="text-sm text-gray-600">{reservation.guests} personas</div>
                        {reservation.tableId && (
                          <div className="text-sm text-blue-600 mt-1">Mesa {reservation.tableId}</div>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setSelectedDate(null)}
              className="mt-6 w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
