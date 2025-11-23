import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-white text-center"
      id="inicio"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/header2.jpg"
          alt="Taberna Cuevas Anita"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810]/30 to-[#2c1810]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-5 animate-fade-in">
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 drop-shadow-2xl tracking-wide leading-tight">
          Taberna Cuevas Anita<br className="md:hidden" /> La De San Miguel
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 md:mb-12 font-light drop-shadow-lg max-w-3xl mx-auto">
          Una experiencia gastronómica única en el corazón de Alcalá de Guadaíra
        </p>
        <Link
          href="#reservas"
          className="inline-block bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white px-12 py-5 rounded-full text-lg md:text-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(198,134,66,0.5)] shadow-lg"
        >
          Reserva tu mesa
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-8 h-12 border-2 border-[#d4a574] rounded-full relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4a574] rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  )
}
