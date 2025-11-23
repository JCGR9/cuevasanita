export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled'

export interface Reservation {
  id: string
  customerName: string
  email: string
  phone: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  guests: number
  status: ReservationStatus
  tableId?: string
  comments?: string
  createdAt: string
  updatedAt: string
}

export interface Table {
  id: string
  number: number
  capacity: number
  location: 'sala-principal' | 'cueva' | 'terraza'
  position: { x: number; y: number } // Para el mapa visual
  isAvailable: boolean
}

export interface User {
  username: string
  password: string
  role: 'admin' | 'staff'
}

export interface ReservationFilters {
  date?: string
  status?: ReservationStatus
  searchTerm?: string
}

export interface DashboardStats {
  todayReservations: number
  pendingReservations: number
  confirmedReservations: number
  totalGuests: number
  occupancyRate: number
}
