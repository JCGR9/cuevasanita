import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#2c1810] text-white py-12">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-playfair text-[#d4a574] text-2xl mb-4">
              Taberna Cuevas Anita
            </h3>
            <p className="text-white/80">
              Experiencia gastronómica única en Alcalá de Guadaíra
            </p>
          </div>

          <div>
            <h4 className="font-playfair text-[#d4a574] text-xl mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-white/80 hover:text-[#d4a574] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#sobre-nosotros" className="text-white/80 hover:text-[#d4a574] transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-white/80 hover:text-[#d4a574] transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-white/80 hover:text-[#d4a574] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-[#d4a574] text-xl mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/80 hover:text-[#d4a574] transition-colors">
                Facebook
              </a>
              <a href="#" className="text-white/80 hover:text-[#d4a574] transition-colors">
                Instagram
              </a>
              <a href="#" className="text-white/80 hover:text-[#d4a574] transition-colors">
                TripAdvisor
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60">
            &copy; 2025 Taberna Cuevas Anita La De San Miguel. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
