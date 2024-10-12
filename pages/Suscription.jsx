import React, { useEffect, useState } from 'react'
import { fetchProducts, createCheckoutSession } from './api/api'
import { loadStripe } from '@stripe/stripe-js'
import ProductCard from '../components/PlanCard'
import { FaTimes } from 'react-icons/fa'

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51Q81tbCZ6yLqBl8waUvz5n8LgEFHn2AIBia4keH7zFJPTR9o19NJn1ItMVkpYP0Pbz5bRcuh9tsdhimoAWtRNw8900WoOjg7bs')

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

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
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-center text-4xl font-bold text-blue-800'>
        Nuestros Productos
      </h1>
      <p className='mb-8 text-center text-xl text-gray-600'>
        Elige el producto que mejor se adapte a tus necesidades
      </p>
      <div className='flex flex-col items-start justify-center md:flex-row'>
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
                    {price.unit_amount / 100} {price.currency.toUpperCase()} /{' '}
                    {price.recurring.interval}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
