'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#2c1810] py-2' : 'bg-[#2c1810]/95 py-4'
      } backdrop-blur-md shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center">
          {/* Logo - solo visible cuando scrolled */}
          <div className={`logo transition-all duration-300 ${isScrolled ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <h1 className="font-playfair text-[#d4a574] text-2xl md:text-3xl font-bold">
              Taberna Cuevas Anita
            </h1>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <Link href="#inicio" className="nav-link">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="#sobre-nosotros" className="nav-link">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="#galeria" className="nav-link">
                Galería
              </Link>
            </li>
            <li>
              <Link href="#contacto" className="nav-link">
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="#reservas"
                className="bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white px-6 py-2.5 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(198,134,66,0.4)]"
              >
                Reservar
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <ul className="md:hidden flex flex-col gap-4 pt-4 pb-4">
            <li>
              <Link
                href="#inicio"
                className="nav-link block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="#sobre-nosotros"
                className="nav-link block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="#galeria"
                className="nav-link block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Galería
              </Link>
            </li>
            <li>
              <Link
                href="#contacto"
                className="nav-link block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="#reservas"
                className="bg-gradient-to-r from-[#c68642] to-[#8b4513] text-white px-6 py-2.5 rounded-full font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reservar
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
