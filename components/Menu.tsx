import Image from 'next/image'

const menuItems = [
  {
    title: 'Entrantes',
    description: 'Selección de tapas tradicionales y creaciones innovadoras que despiertan el apetito',
    image: '/images/plato-entrante.jpg',
  },
  {
    title: 'Carnes',
    description: 'Cortes premium a la brasa, cocinados con maestría y pasión',
    image: '/images/plato-carne.jpg',
  },
  {
    title: 'Pescados',
    description: 'Pescado fresco del día, elaborado con técnicas contemporáneas',
    image: '/images/plato-pescado.jpg',
  },
  {
    title: 'Postres',
    description: 'El dulce final perfecto para una experiencia inolvidable',
    image: '/images/plato-postre.jpg',
  },
]

export default function Menu() {
  return (
    <section className="py-20 bg-[#f5e6d3]" id="menu">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl text-[#2c1810] mb-4">
            Nuestras Especialidades
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto mb-4" />
          <p className="text-xl text-[#666]">Sabores que cuentan historias</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-3xl text-[#8b4513] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#666] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
