import React, { useEffect, useState } from 'react'
import { fetchProducts, createCheckoutSession } from './api/api'
import { loadStripe } from '@stripe/stripe-js'
import ProductCard from '../components/PlanCard'
import { FaTimes } from 'react-icons/fa'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import LefthDashboard from '@/components/LefthDashboard'

const montserrat = Montserrat({ subsets: ['latin'] })

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Q81tbCZ6yLqBl8waUvz5n8LgEFHn2AIBia4keH7zFJPTR9o19NJn1ItMVkpYP0Pbz5bRcuh9tsdhimoAWtRNw8900WoOjg7bs')

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Manejar la creación de la sesión de pago en Stripe
  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise

    try {
      // Crear una sesión de pago desde el backend
      const session = await createCheckoutSession(priceId)

      // Redirigir a Stripe Checkout
      await stripe.redirectToCheckout({
        sessionId: session.id
      })
    } catch (error) {
      console.error('Error al crear la sesión de Stripe:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div
        className={`relative flex min-h-screen bg-white ${montserrat.className}`}
      >
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
        >
          <LefthDashboard />
        </div>

        <main className='ml-3 flex flex-1 flex-col lg:flex-row'>
          <div className='flex flex-1 flex-col'>
            <div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
              <div className='left-4 top-4 z-50 lg:hidden'>
                <button
                  onClick={toggleMenu}
                  className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
                >
                  {isMenuOpen ? '✖' : '☰'}
                </button>
              </div>
            </div>
            <div
              className={`container mx-auto px-4 py-8 ${montserrat.className}`}
            >
              <h1 className='mb-4 text-center text-4xl font-bold text-blue-800 mt-10'>
                Descubre nuestros productos
              </h1>
              <p className='mb-8 text-center text-xl text-gray-600 mt-5'>
                Encuentra la solución perfecta que se ajuste a tus necesidades y
                lleva tu proyecto al siguiente nivel.
              </p>
              <div className='flex flex-col items-start justify-center md:flex-row md:py-12'>
                {!showForm ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={() => handleCheckout(product.prices[0].id)} // Crear sesión de pago con el priceId
                    />
                  ))
                ) : (
                  <div className='relative w-full max-w-md rounded-lg bg-white p-6 shadow-md md:w-1/2'>
                    <button
                      className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
                      onClick={() => setShowForm(false)}
                      aria-label='Cerrar formulario'
                    >
                      <FaTimes />
                    </button>
                    <h2 className='mb-6 text-2xl font-semibold'>
                      Detalles del Producto: {selectedProduct.name}
                    </h2>
                    <div>
                      <p>{selectedProduct.description}</p>
                      <ul>
                        {selectedProduct.prices.map((price) => (
                          <li key={price.id}>
                            {price.unit_amount / 100}{' '}
                            {price.currency.toUpperCase()} /{' '}
                            {price.recurring.interval}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ProductsPage
