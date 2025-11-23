# 🍷 Taberna Cuevas Anita La De San Miguel

Sitio web moderno y sistema de gestión de reservas para Taberna Cuevas Anita en Alcalá de Guadaíra, Sevilla.

## 🌟 Características

### Sitio Web Público
- 🎨 Landing page moderna y responsive
- 📸 Galería de espacios (8 fotos)
- 🍽️ Galería de comida (40+ platos)
- 🗺️ Integración con Google Maps
- 📱 Formulario de reservas en tiempo real
- ⭐ Sección de testimonios

### Panel de Administración
- 🔐 Acceso oculto mediante atajo de teclado (**Ctrl+P** o **Cmd+P**)
- 📊 Dashboard con estadísticas en tiempo real
- 📅 Calendario profesional estilo Google Calendar
- 🪑 Gestión completa de mesas (CRUD)
- ⏰ Vista timeline organizada por turnos (comida/cena)
- 🔍 Filtros avanzados de reservas
- ✅ Asignación automática de mesas

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JCGR9/cuevasanita.git
cd cuevasanita

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## 🎯 Uso

### Acceso Público
Visita `http://localhost:3001` para ver el sitio web y hacer reservas.

### Panel de Administración
1. Presiona **Ctrl+P** (Windows/Linux) o **Cmd+P** (Mac) desde cualquier página
2. Ingresa las credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`
3. Serás redirigido al dashboard

### Funcionalidades Admin

#### 📊 Dashboard
- Estadísticas de reservas (totales, confirmadas, pendientes)
- Lista de reservas del día
- Acceso rápido a todas las secciones

#### 📅 Calendario
- Vista mensual con grid de 6 semanas
- Navegación: mes anterior/siguiente/"Ir a Hoy"
- Visualización de hasta 3 reservas por día
- Color coding por estado:
  - 🟡 Amarillo: Pendiente
  - 🟢 Verde: Confirmada
  - 🔵 Azul: Sentados
  - ⚪ Gris: Completada
  - 🔴 Rojo: Cancelada
- Click en cualquier día para ver todas las reservas

#### 🪑 Gestión de Mesas
- **Crear** nuevas mesas (número, capacidad, ubicación)
- **Editar** mesas existentes
- **Eliminar** mesas con confirmación
- **Activar/Desactivar** disponibilidad
- Vista organizada por ubicación:
  - Sala Principal (4 mesas)
  - Cueva (4 mesas)
  - Terraza (2 mesas)

#### ⏰ Reservas - Vista Timeline
- Toggle entre **Vista Lista** y **Vista por Turnos**
- Organización automática por horarios:
  - **Comida** 🌅 (12:00-17:00) - Columna naranja
  - **Cena** 🌙 (19:00-00:00) - Columna morada
- Tarjetas con información completa:
  - Hora y nombre del cliente
  - Estado con color coding
  - 👥 Número de personas
  - 🪑 Mesa asignada
  - 📞 Teléfono de contacto
- Scroll independiente por turno

#### 📋 Gestión de Reservas
- Filtros por fecha, estado y búsqueda
- Cambio de estado en tiempo real
- Asignación de mesas disponibles
- Eliminación de reservas
- Vista completa de información del cliente

## 🛠️ Tecnologías

- **Framework:** Next.js 16.0.3 con Turbopack
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 3.4.0
- **Fuentes:** Playfair Display, Raleway (Google Fonts)
- **Almacenamiento:** localStorage (demo)
- **Mapas:** Google Maps Embed API

## 🎨 Paleta de Colores

- **Primario:** `#c68642` (Dorado)
- **Secundario:** `#8b4513` (Marrón)
- **Oscuro:** `#2c1810`
- **Crema:** `#f5e6d3`
- **Dorado Claro:** `#d4a574`

## 📂 Estructura del Proyecto

```
cuevasanita/
├── app/
│   ├── admin/
│   │   ├── calendar/       # Calendario mensual
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── login/          # Login admin
│   │   ├── reservations/   # Gestión de reservas
│   │   └── tables/         # CRUD de mesas
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout raíz
│   └── globals.css         # Estilos globales
├── components/
│   ├── About.tsx           # Sección sobre nosotros
│   ├── Contact.tsx         # Formulario y mapa
│   ├── FoodGallery.tsx     # Galería de comida
│   ├── Footer.tsx          # Pie de página
│   ├── Gallery.tsx         # Galería de espacios
│   ├── Hero.tsx            # Hero principal
│   ├── Navbar.tsx          # Barra de navegación
│   ├── SecretAdminAccess.tsx # Modal admin (Ctrl+P)
│   └── Testimonials.tsx    # Reseñas
├── hooks/
│   └── useReservations.ts  # Hook de gestión de datos
├── types/
│   └── reservations.ts     # Tipos TypeScript
└── public/
    └── images/             # Imágenes del sitio
```

## 📝 Datos de Demostración

El sistema incluye datos de ejemplo:
- **10 mesas** predefinidas
- **3 reservas** de demostración
- Credenciales de admin: `admin` / `admin`

## 🔄 Migración a Producción

Para migrar a producción con base de datos real (Supabase):

1. Consultar `RESERVAS-README.md` para instrucciones detalladas
2. Instalar dependencias de Supabase
3. Configurar variables de entorno
4. Migrar datos de localStorage a PostgreSQL
5. Implementar autenticación real
6. Configurar Row Level Security

## 📍 Información del Restaurante

**Taberna Cuevas Anita La De San Miguel**
- 📍 C/San Fernando 42, Alcalá de Guadaíra, Sevilla
- 📞 +34 627 69 94 63
- ⏰ Jueves a Domingo: 12:00 - 00:00
- 🚫 Cerrado: Lunes, Martes, Miércoles

## 📄 Licencia

Este proyecto es privado y está desarrollado específicamente para Taberna Cuevas Anita.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para Taberna Cuevas Anita La De San Miguel

---

**Versión:** 1.0.0  
**Última actualización:** 23 de noviembre de 2025
