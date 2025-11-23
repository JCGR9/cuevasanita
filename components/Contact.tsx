'use client'

import { useState, FormEvent } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    comments: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Guardar reserva en localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    
    const newReservation = {
      id: Date.now().toString(),
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests),
      status: 'pending',
      comments: formData.comments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    reservations.push(newReservation)
    localStorage.setItem('reservations', JSON.stringify(reservations))
    
    alert('¡Gracias por tu reserva! Te contactaremos pronto para confirmar.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      comments: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-24 md:py-32 bg-[#f5e6d3]" id="contacto">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl text-[#2c1810] mb-4">
            Visítanos
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-[#8b4513] text-2xl mb-3 font-semibold flex items-center gap-3">
                📍 Dirección
              </h3>
              <p className="text-lg leading-relaxed text-[#666]">
                C/ San Fernando Nº 42<br />
                41500 Alcalá de Guadaíra<br />
                Sevilla, España
              </p>
            </div>

            <div>
              <h3 className="text-[#8b4513] text-2xl mb-3 font-semibold flex items-center gap-3">
                📞 Teléfono
              </h3>
              <p className="text-lg text-[#666]">
                <a href="tel:+34627699463" className="hover:text-[#c68642] transition-colors">
                  +34 627 69 94 63
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-[#8b4513] text-2xl mb-3 font-semibold flex items-center gap-3">
                🕐 Horario
              </h3>
              <div className="text-lg leading-relaxed text-[#666] space-y-2">
                <p className="font-semibold text-[#8b4513]">Abierto hasta las 0:00</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <p>Domingo:</p><p>12:00 - 0:00</p>
                  <p>Lunes:</p><p className="text-red-600 font-semibold">Cerrado</p>
                  <p>Martes:</p><p className="text-red-600 font-semibold">Cerrado</p>
                  <p>Miércoles:</p><p className="text-red-600 font-semibold">Cerrado</p>
                  <p>Jueves:</p><p>12:00 - 0:00</p>
                  <p>Viernes:</p><p>12:00 - 0:00</p>
                  <p>Sábado:</p><p>12:00 - 0:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="h-[450px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4a574]/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.944948987624!2d-5.8447893!3d37.336984399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126c1f1f1f1f1f1%3A0xabcdef1234567890!2sC.%20San%20Fernando%2C%2042%2C%2041500%20Alcal%C3%A1%20de%20Guada%C3%ADra%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Taberna Cuevas Anita"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">

          <div id="reservas">
            <h3 className="font-playfair text-4xl text-[#2c1810] mb-6 text-center">
              Reserva tu Mesa
            </h3>
            <p className="text-center text-[#666] mb-8">Completa el formulario y te contactaremos para confirmar tu reserva</p>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                />
              </div>

              <div>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] text-lg"
                >
                  <option value="">Número de personas</option>
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5 personas</option>
                  <option value="6">6 personas</option>
                  <option value="7+">7+ personas</option>
                </select>
              </div>

              <div>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Comentarios especiales (opcional)"
                  rows={4}
                  className="w-full p-5 border-2 border-[#8b4513]/20 rounded-xl bg-white transition-all focus:outline-none focus:border-[#c68642] resize-none text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white px-10 py-5 rounded-full text-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(198,134,66,0.5)] shadow-lg"
              >
                Enviar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
