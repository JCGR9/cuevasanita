'use client'

import { useState } from 'react'
import Image from 'next/image'

const galleryImages = [
  { src: '/images/1.jpg', alt: 'Espacio de la taberna', title: 'Nuestro Espacio' },
  { src: '/images/2.jpg', alt: 'Zona de la cueva', title: 'La Cueva' },
  { src: '/images/3.jpg', alt: 'Detalles del restaurante', title: 'Detalles' },
  { src: '/images/4.jpg', alt: 'Ambiente del local', title: 'Ambiente' },
  { src: '/images/5.jpg', alt: 'Interior de la taberna', title: 'Interior' },
  { src: '/images/6.jpg', alt: 'Rincones especiales', title: 'Rincones' },
  { src: '/images/7.jpg', alt: 'Zona de mesas', title: 'Mesas' },
  { src: '/images/8.jpg', alt: 'Vista del restaurante', title: 'Vista General' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-white" id="galeria">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl text-[#2c1810] mb-4">
            Nuestro Espacio
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto mb-4" />
          <p className="text-xl text-[#666]">Un ambiente único tallado en la roca</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group h-64"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1810]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-xl font-semibold transform translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-pointer p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  )
}
