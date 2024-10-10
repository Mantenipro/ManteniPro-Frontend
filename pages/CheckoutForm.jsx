import React, { useState, useEffect } from 'react'
import { FaCheck, FaCreditCard, FaSpinner, FaTimes } from 'react-icons/fa'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

const stripePromise = loadStripe(
  'pk_test_51Q81tbCZ6yLqBl8waUvz5n8LgEFHn2AIBia4keH7zFJPTR9o19NJn1ItMVkpYP0Pbz5bRcuh9tsdhimoAWtRNw8900WoOjg7bs'
)

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

  const renderPlanCard = (planKey) => (
    <div className='mb-4 w-full max-w-md rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl md:mb-0 md:w-1/2'>
      <h2 className='font-montserrat mb-4 text-2xl font-semibold text-blue-600'>
        {plans[planKey].name}
      </h2>
      <p className='font-montserrat mb-6 text-3xl font-bold text-gray-800'>
        {plans[planKey].price}
        <span className='text-sm font-normal text-gray-600'>/mes</span>
      </p>
      <ul className='mb-6 space-y-2'>
        {plans[planKey].features.map((feature, index) => (
          <li key={index} className='flex items-center'>
            <FaCheck className='mr-2 text-green-500' />
            <span className='font-montserrat text-gray-700'>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className='font-montserrat w-full rounded-md bg-blue-600 px-4 py-3 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        onClick={() => {
          setSelectedPlan(planKey)
          setShowForm(true)
        }}
        aria-label={`Seleccionar ${plans[planKey].name}`}
      >
        Seleccionar Plan
      </button>
    </div>
  )

  return (
    <div className='font-montserrat container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-center text-4xl font-bold text-blue-800'>
        Nuestros Planes de Suscripción
      </h1>
      <p className='mb-8 text-center text-xl text-gray-600'>
        Elige el plan que mejor se adapte a tus necesidades
      </p>
      <div className='flex flex-col items-start justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0'>
        {!showForm ? (
          <>
            {renderPlanCard('basic')}
            {renderPlanCard('premium')}
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

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  

  useEffect(() => {
    const createPaymentIntent = async () => {
      console.log(
        'Enviando solicitud de pago con plan:',
        plan.id === 1 ? 'basic' : 'premium'
      )

      const response = await fetch('http://localhost:8000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: plan.id === 1 ? 'basic' : 'premium' })
      })
        .then((response) => {
          console.log('Respuesta recibida:', response)
          return response.json()
        })
        .then((data) => {
          console.log('Datos recibidos del servidor:', data)
          setClientSecret(data.clientSecret)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }

    createPaymentIntent()
  }, [plan])

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return
    }

    if (error) {
      elements.getElement('card').focus()
      return
    }

    if (cardComplete) {
      setProcessing(true)
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: data
      }
    })

    setProcessing(false)

    if (payload.error) {
      setError(payload.error)
    } else {
      alert('Suscripción realizada con éxito!')
    }
  }

  const reset = () => {
    setError(null)
    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Nombre
        </label>
        <input
          id='name'
          type='text'
          placeholder='Jane Doe'
          {...register('name', { required: 'El nombre es requerido' })}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
        />
        {errors.name && (
          <span className='text-xs text-red-500'>{errors.name.message}</span>
        )}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          placeholder='janedoe@example.com'
          {...register('email', {
            required: 'El email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
        />
        {errors.email && (
          <span className='text-xs text-red-500'>{errors.email.message}</span>
        )}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='phone'
          className='block text-sm font-medium text-gray-700'
        >
          Teléfono
        </label>
        <input
          id='phone'
          type='tel'
          placeholder='(941) 555-0123'
          {...register('phone', {
            required: 'El teléfono es requerido',
            pattern: {
              value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
              message: 'Formato de teléfono inválido. Use (XXX) XXX-XXXX'
            }
          })}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
        />
        {errors.phone && (
          <span className='text-xs text-red-500'>{errors.phone.message}</span>
        )}
      </div>
      <div className='mb-6'>
        <label
          htmlFor='card'
          className='block text-sm font-medium text-gray-700'
        >
          Información de Tarjeta
        </label>
        <div className='mt-1'>
          <CardElement
            id='card'
            onChange={(e) => setCardComplete(e.complete)}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={processing || !stripe}
        className='flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700 disabled:opacity-50'
      >
        {processing ? (
          <>
            <FaSpinner className='mr-2 animate-spin' />
            Procesando...
          </>
        ) : (
          <>
            <FaCreditCard className='mr-2' />
            Pagar {plan.price}
          </>
        )}
      </button>
      {error && <div className='mt-2 text-red-500'>{error.message}</div>}
    </form>
  )
}

export default SubscriptionPlans
