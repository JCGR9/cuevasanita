import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import FoodGallery from '@/components/FoodGallery'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SecretAdminAccess from '@/components/SecretAdminAccess'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <FoodGallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <SecretAdminAccess />
    </>
  )
}
