import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/stripe'
import CheckoutForm from './CheckoutForm'
import PlanCard from './PlanCard'
import { FaTimes } from 'react-icons/fa'

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic')
  const [showForm, setShowForm] = useState(false)

  const plans = {
    basic: {
      id: 1,
      name: 'Plan Básico',
      price: '$9.99',
      features: [
        'Característica 1',
        'Característica 2',
        'Característica 3',
        'Característica 4',
        'Característica 5'
      ]
    },
    premium: {
      id: 2,
      name: 'Plan Premium',
      price: '$19.99',
      features: [
        'Característica 1',
        'Característica 2',
        'Característica 3',
        'Característica 4',
        'Característica 5'
      ]
    }
  }

  return (
    <div className='container mx-auto px-4 py-8'>
     
      <h1 className='mb-4 text-center text-4xl font-bold text-blue-800'>
        Nuestros Planes de Suscripción
      </h1>
      <p className='mb-8 text-center text-xl text-gray-600'>
        Elige el plan que mejor se adapte a tus necesidades
      </p>
      <div className='flex flex-col items-start justify-center md:flex-row'>
        {!showForm ? (
          <>
            <PlanCard
              plan={plans.basic}
              onSelect={() => {
                setSelectedPlan('basic')
                setShowForm(true)
              }}
            />
            <PlanCard
              plan={plans.premium}
              onSelect={() => {
                setSelectedPlan('premium')
                setShowForm(true)
              }}
            />
          </>
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
              Formulario de Suscripción
            </h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm plan={plans[selectedPlan]} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionPlans
