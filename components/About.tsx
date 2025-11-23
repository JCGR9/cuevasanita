import Image from 'next/image'

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-[#f5e6d3]" id="sobre-nosotros">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl text-[#2c1810] mb-4">
            Una Cueva con Historia
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto mb-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-xl text-[#8b4513] font-semibold leading-relaxed">
              Descubre un lugar mágico donde la tradición se encuentra con la excelencia culinaria.
            </p>
            <p className="text-lg leading-relaxed">
              En el corazón de Alcalá de Guadaíra, Taberna Cuevas Anita La De San Miguel te ofrece una experiencia gastronómica incomparable. Ubicado en una auténtica cueva histórica, nuestro restaurante combina el encanto natural de sus paredes milenarias con una cocina que rinde homenaje a los sabores más auténticos de la región.
            </p>
            <p className="text-lg leading-relaxed">
              Cada plato es una obra de arte cuidadosamente elaborada, utilizando ingredientes frescos y locales que honran nuestra tierra.
            </p>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/1.jpg"
                alt="Interior del restaurante"
                width={600}
                height={400}
                className="w-full h-auto transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="absolute top-5 left-5 -right-5 -bottom-5 border-3 border-[#d4a574] rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
