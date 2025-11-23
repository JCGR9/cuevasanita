'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Reservation, Table, ReservationFilters, DashboardStats } from '@/types/reservations'

// Datos de ejemplo para demostración
const DEMO_TABLES: Table[] = [
  { id: '1', number: 1, capacity: 2, location: 'sala-principal', position: { x: 50, y: 100 }, isAvailable: true },
  { id: '2', number: 2, capacity: 4, location: 'sala-principal', position: { x: 200, y: 100 }, isAvailable: true },
  { id: '3', number: 3, capacity: 4, location: 'sala-principal', position: { x: 350, y: 100 }, isAvailable: true },
  { id: '4', number: 4, capacity: 6, location: 'sala-principal', position: { x: 500, y: 100 }, isAvailable: true },
  { id: '5', number: 5, capacity: 2, location: 'cueva', position: { x: 50, y: 250 }, isAvailable: true },
  { id: '6', number: 6, capacity: 4, location: 'cueva', position: { x: 200, y: 250 }, isAvailable: true },
  { id: '7', number: 7, capacity: 6, location: 'cueva', position: { x: 350, y: 250 }, isAvailable: true },
  { id: '8', number: 8, capacity: 8, location: 'cueva', position: { x: 500, y: 250 }, isAvailable: true },
  { id: '9', number: 9, capacity: 4, location: 'terraza', position: { x: 150, y: 400 }, isAvailable: true },
  { id: '10', number: 10, capacity: 4, location: 'terraza', position: { x: 400, y: 400 }, isAvailable: true },
]

const DEMO_RESERVATIONS: Reservation[] = [
  {
    id: '1',
    customerName: 'María García',
    email: 'maria@example.com',
    phone: '+34 612 345 678',
    date: new Date().toISOString().split('T')[0],
    time: '13:00',
    guests: 4,
    status: 'confirmed',
    tableId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    customerName: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+34 623 456 789',
    date: new Date().toISOString().split('T')[0],
    time: '14:30',
    guests: 2,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    customerName: 'Ana López',
    email: 'ana@example.com',
    phone: '+34 634 567 890',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: 6,
    status: 'confirmed',
    tableId: '7',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [loading, setLoading] = useState(true)

  // Inicializar datos desde localStorage o usar datos demo
  useEffect(() => {
    const storedReservations = localStorage.getItem('reservations')
    const storedTables = localStorage.getItem('tables')

    if (storedReservations) {
      setReservations(JSON.parse(storedReservations))
    } else {
      setReservations(DEMO_RESERVATIONS)
      localStorage.setItem('reservations', JSON.stringify(DEMO_RESERVATIONS))
    }

    if (storedTables) {
      setTables(JSON.parse(storedTables))
    } else {
      setTables(DEMO_TABLES)
      localStorage.setItem('tables', JSON.stringify(DEMO_TABLES))
    }

    setLoading(false)
  }, [])

  // Guardar en localStorage cuando cambian las reservas
  const saveReservations = useCallback((newReservations: Reservation[]) => {
    setReservations(newReservations)
    localStorage.setItem('reservations', JSON.stringify(newReservations))
  }, [])

  // Guardar mesas en localStorage
  const saveTables = useCallback((newTables: Table[]) => {
    setTables(newTables)
    localStorage.setItem('tables', JSON.stringify(newTables))
  }, [])

  // CRUD de reservas
  const addReservation = useCallback((reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [...reservations, newReservation]
    saveReservations(updated)
    return newReservation
  }, [reservations, saveReservations])

  const updateReservation = useCallback((id: string, updates: Partial<Reservation>) => {
    const updated = reservations.map(r =>
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
    )
    saveReservations(updated)
  }, [reservations, saveReservations])

  const deleteReservation = useCallback((id: string) => {
    const updated = reservations.filter(r => r.id !== id)
    saveReservations(updated)
  }, [reservations, saveReservations])

  const assignTable = useCallback((reservationId: string, tableId: string) => {
    updateReservation(reservationId, { tableId, status: 'confirmed' })
  }, [updateReservation])

  // Filtros
  const getFilteredReservations = useCallback((filters: ReservationFilters) => {
    return reservations.filter(r => {
      if (filters.date && r.date !== filters.date) return false
      if (filters.status && r.status !== filters.status) return false
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        return (
          r.customerName.toLowerCase().includes(term) ||
          r.email.toLowerCase().includes(term) ||
          r.phone.includes(term)
        )
      }
      return true
    })
  }, [reservations])

  // Estadísticas del dashboard
  const getDashboardStats = useCallback((): DashboardStats => {
    const today = new Date().toISOString().split('T')[0]
    const todayReservations = reservations.filter(r => r.date === today)
    const pending = reservations.filter(r => r.status === 'pending')
    const confirmed = reservations.filter(r => r.status === 'confirmed')
    const totalGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0)
    const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0)
    
    return {
      todayReservations: todayReservations.length,
      pendingReservations: pending.length,
      confirmedReservations: confirmed.length,
      totalGuests,
      occupancyRate: totalCapacity > 0 ? (totalGuests / totalCapacity) * 100 : 0,
    }
  }, [reservations, tables])

  // Obtener reservas por fecha
  const getReservationsByDate = useCallback((date: string) => {
    return reservations.filter(r => r.date === date)
  }, [reservations])

  // Obtener mesa disponible
  const getAvailableTables = useCallback((date: string, time: string, guests: number) => {
    const dateReservations = getReservationsByDate(date)
    const occupiedTableIds = dateReservations
      .filter(r => r.time === time && r.tableId)
      .map(r => r.tableId)

    return tables.filter(
      t => t.capacity >= guests && !occupiedTableIds.includes(t.id) && t.isAvailable
    )
  }, [tables, getReservationsByDate])

  // CRUD de mesas
  const addTable = useCallback((table: Omit<Table, 'id'>) => {
    const newTable: Table = {
      ...table,
      id: Date.now().toString(),
    }
    const updated = [...tables, newTable]
    saveTables(updated)
    return newTable
  }, [tables, saveTables])

  const updateTable = useCallback((id: string, updates: Partial<Table>) => {
    const updated = tables.map(t =>
      t.id === id ? { ...t, ...updates } : t
    )
    saveTables(updated)
  }, [tables, saveTables])

  const deleteTable = useCallback((id: string) => {
    const updated = tables.filter(t => t.id !== id)
    saveTables(updated)
  }, [tables, saveTables])

  return {
    // Estado
    reservations,
    tables,
    loading,

    // Acciones de reservas
    addReservation,
    updateReservation,
    deleteReservation,
    assignTable,

    // Acciones de mesas
    addTable,
    updateTable,
    deleteTable,

    // Consultas
    getFilteredReservations,
    getDashboardStats,
    getReservationsByDate,
    getAvailableTables,
  }
}
