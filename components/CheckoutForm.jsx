import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FaSpinner, FaCreditCard } from 'react-icons/fa'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/router'

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

   const router = useRouter()

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
          console.error('Error:', error.decline_code)
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
        setError(payload.error.message)
      toast.error(
        'El pago no pudo completarse, por favor, inténtelo de nuevo o pruebe con otro método de pago',
        {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw', // Ajuste para pantallas pequeñas
            width: 'auto'
          }
        }
      )
    } else {
      toast.success('Pago Exitoso', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw', // Ajuste para pantallas pequeñas
          width: 'auto'
        }
      })
      setTimeout(() => {
        router.push('/ticketsDashboard')
      }, 1000)
    }
  }

  const resetForm = () => {
    setError(null)
    setCardComplete(false)
    elements.getElement(CardElement).clear()
  }

  return (
    <>
      <Toaster />
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
        {error && (
          <button
            type='button'
            onClick={resetForm}
            className='mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-700'
          >
            Intentar con otra tarjeta
          </button>
        )}
      </form>
    </>
  )
}

export default CheckoutForm
