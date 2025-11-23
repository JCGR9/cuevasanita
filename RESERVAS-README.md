# Sistema de Gestión de Reservas - Taberna Cuevas Anita

## 🎯 Estado Actual: DEMO con localStorage

Este sistema funciona completamente con **localStorage** para demostración al cliente. No requiere base de datos ni configuración adicional.

## 🚀 Cómo Usar

### Acceso al Panel de Administración

1. **URL de Login**: `http://localhost:3001/admin/login`
2. **Credenciales Demo**:
   - Usuario: `admin`
   - Contraseña: `admin123`

### Funcionalidades Disponibles

#### ✅ **Dashboard** (`/admin/dashboard`)
- Estadísticas en tiempo real:
  - Reservas del día
  - Reservas pendientes
  - Reservas confirmadas
  - Total de comensales
- Tabla de reservas de hoy
- Navegación rápida

#### ✅ **Gestión de Reservas** (`/admin/reservations`)
- **Filtros avanzados**:
  - Búsqueda por nombre, email o teléfono
  - Filtro por fecha
  - Filtro por estado
- **Acciones disponibles**:
  - Cambiar estado de reserva (dropdown directo)
  - Asignar mesa automáticamente
  - Eliminar reserva
- **Estados de reserva**:
  - 🟡 Pendiente
  - 🟢 Confirmada
  - 🔵 Sentados
  - ⚪ Completada
  - 🔴 Cancelada

#### ✅ **Asignación de Mesas**
- Sistema inteligente que muestra solo mesas disponibles
- Considera:
  - Capacidad de la mesa
  - Horario de la reserva
  - Disponibilidad
- Mesas organizadas por ubicación:
  - Sala Principal (Mesas 1-4)
  - La Cueva (Mesas 5-8)
  - Terraza (Mesas 9-10)

#### ✅ **Vista de Mesas** (`/admin/tables`)
- Listado de todas las mesas por ubicación
- Capacidad de cada mesa
- Estado de disponibilidad

#### 📋 **Calendario** (`/admin/calendar`)
- Página placeholder (funcionalidad planificada)

### Formulario Público de Reservas

El formulario en la página principal (`http://localhost:3001#contacto`) está **totalmente funcional**:
- Guarda automáticamente en localStorage
- Las reservas aparecen instantáneamente en el panel de admin
- Estado inicial: "Pendiente"

## 📊 Datos de Ejemplo

El sistema incluye 3 reservas de ejemplo y 10 mesas pre-configuradas para demostración.

## 🔄 Migración a Producción (PENDIENTE)

### Pasos para migrar a Supabase:

1. **Configurar Supabase**
   ```bash
   # Crear cuenta en supabase.com
   # Crear nuevo proyecto
   # Obtener URL y API Key
   ```

2. **Instalar dependencias**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```

3. **Crear archivo de configuración**
   - Archivo: `lib/supabase.ts`
   - Variables de entorno en `.env.local`

4. **Crear tablas en Supabase**
   ```sql
   -- Tabla reservations
   CREATE TABLE reservations (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     customer_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     date DATE NOT NULL,
     time TIME NOT NULL,
     guests INTEGER NOT NULL,
     status TEXT NOT NULL,
     table_id UUID REFERENCES tables(id),
     comments TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Tabla tables
   CREATE TABLE tables (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     number INTEGER NOT NULL,
     capacity INTEGER NOT NULL,
     location TEXT NOT NULL,
     position JSONB,
     is_available BOOLEAN DEFAULT TRUE
   );
   ```

5. **Migrar código**
   - Modificar `hooks/useReservations.ts`
   - Reemplazar localStorage por llamadas a Supabase
   - Implementar autenticación real en login

6. **Configurar seguridad**
   - Row Level Security (RLS) en Supabase
   - Políticas de acceso

## 🛠️ Mantenimiento

### Limpiar datos de demo
```javascript
// En consola del navegador
localStorage.removeItem('reservations')
localStorage.removeItem('tables')
localStorage.removeItem('adminAuth')
// Recargar página
```

### Agregar más mesas
Editar `hooks/useReservations.ts` → constante `DEMO_TABLES`

### Cambiar credenciales demo
Editar `app/admin/login/page.tsx` → línea 19

## 📝 Notas Técnicas

- **Almacenamiento**: localStorage (solo frontend)
- **Autenticación**: Simulada (no segura para producción)
- **Persistencia**: Los datos se pierden al limpiar caché
- **Multi-usuario**: No soportado (solo un admin a la vez)

## ✨ Características Destacadas para el Cliente

1. **Sistema completo funcional** - Sin necesidad de backend
2. **Interfaz moderna y responsive** - Funciona en móvil y desktop
3. **Fácil de usar** - Intuitivo para el personal
4. **Asignación inteligente** - Solo muestra mesas disponibles
5. **Filtros avanzados** - Encuentra reservas rápidamente
6. **Estados visuales** - Códigos de color claros

## 🎨 Personalización

Los colores del panel de admin coinciden con la identidad de la marca:
- Primario: `#c68642` (dorado)
- Secundario: `#8b4513` (marrón)
- Oscuro: `#2c1810`
- Crema: `#f5e6d3`

---

**Desarrollado para**: Taberna Cuevas Anita La De San Miguel  
**Versión**: 1.0 (Demo)  
**Stack**: Next.js 16 + TypeScript + Tailwind CSS  
**Estado**: ✅ Listo para demostración al cliente
