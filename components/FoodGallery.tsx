'use client'

import { useState } from 'react'
import Image from 'next/image'

// Función para generar lista de imágenes dinámicamente
const getFoodImages = () => {
  const images = []
  
  // Imágenes específicas
  const specificImages = [
    'azusal.jpg',
    'caprichos-del-chef.jpg',
    '20170211-010351-largejpg.jpg',
    '20210312-160111-largejpg.jpg',
    '20210312-160219-largejpg.jpg',
  ]
  
  specificImages.forEach(img => {
    images.push({
      src: `/images/comida11_files/${img}`,
      alt: 'Plato del restaurante',
    })
  })
  
  // Añadir caption(1) a caption(50)
  for (let i = 1; i <= 50; i++) {
    images.push({
      src: `/images/comida11_files/caption(${i}).jpg`,
      alt: `Plato ${i}`,
    })
  }
  
  return images
}

export default function FoodGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const foodImages = getFoodImages()

  return (
    <section className="py-24 md:py-32 bg-white" id="comida">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl text-[#2c1810] mb-4">
            Nuestra Cocina
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#c68642] to-[#d4a574] mx-auto mb-4" />
          <p className="text-xl text-[#666]">Descubre nuestros platos más deliciosos</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {foodImages.slice(0, 40).map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group aspect-square"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={foodImages[selectedImage].src}
              alt={foodImages[selectedImage].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#d4a574] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
