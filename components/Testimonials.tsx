const testimonials = [
  {
    stars: 5,
    text: 'Una experiencia única. El ambiente de la cueva es espectacular y la comida simplemente deliciosa. ¡Volveremos sin duda!',
    author: 'María García',
  },
  {
    stars: 5,
    text: 'El mejor restaurante de Alcalá de Guadaíra. La atención es exquisita y el lugar tiene un encanto especial que no se encuentra en ningún otro sitio.',
    author: 'Juan Martínez',
  },
  {
    stars: 5,
    text: 'Perfecto para celebraciones. Celebramos nuestro aniversario aquí y fue mágico. La cueva crea un ambiente íntimo y romántico.',
    author: 'Carmen Rodríguez',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#2c1810] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-[#d4a574]/20 transition-all duration-300 hover:bg-white/15 hover:-translate-y-2 shadow-xl"
            >
              <div className="text-[#d4a574] text-2xl mb-4">
                {'★'.repeat(testimonial.stars)}
              </div>
              <p className="italic mb-4 leading-relaxed text-lg">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="text-[#d4a574] font-semibold">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
