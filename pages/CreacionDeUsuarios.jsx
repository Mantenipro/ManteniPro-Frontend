import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreacionDeUsuarios() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <main className='bg-lightblu'>
      <div className='relative'>
        <nav className='flex items-center justify-between p-4 bg-gray-100'>
          <div className='flex items-center space-x-4 w-full'>
            <button className='p-2 focus:outline-none' onClick={toggleMenu}>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                ></path>
              </svg>
            </button>
            <input
              type='text'
              placeholder='Buscar...'
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
        </nav>
        {isOpen && (
          <div className='absolute top-0 left-0 w-full bg-white shadow-md'>
            <button
              className='absolute top-2 right-2 p-2 focus:outline-none'
              onClick={toggleMenu}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
            <ul>
              <li className='p-4 border-b border-gray-200'>
                <a href='#home'>Home</a>
              </li>
              <li className='p-4 border-b border-gray-200'>
                <a href='#about'>About</a>
              </li>
              <li className='p-4 border-b border-gray-200'>
                <a href='#contact'>Contact</a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        <div className='text-2xl font-semibold text-center my-4'>
          Crear Perfil
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-md mx-auto p-4 border border-gray-300 rounded'
        >
          <div className='mb-4'>
            <label
              htmlFor='nombre'
              className='block text-sm font-medium text-gray-700'
            >
              Nombre Completo
            </label>
            <input
              type='text'
              id='nombre'
              {...register('nombre', { required: true })}
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
            />
            {errors.nombre && (
              <span className='text-red-500 text-sm'>
                Este campo es requerido
              </span>
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
              type='email'
              id='email'
              {...register('email', { required: true })}
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>
                Este campo es requerido
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              {...register('password', { required: true })}
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
            />
            {errors.password && (
              <span className='text-red-500 text-sm'>
                Este campo es requerido
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='cargo'
              className='block text-sm font-medium text-gray-700'
            >
              Cargo
            </label>
            <input
              type='text'
              id='cargo'
              {...register('cargo', { required: true })}
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
            />
            {errors.cargo && (
              <span className='text-red-500 text-sm'>
                Este campo es requerido
              </span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='foto'
              className='block text-sm font-medium text-gray-700'
            >
              Foto
            </label>
            <input
              type='file'
              id='foto'
              {...register('foto', { required: true })}
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
            />
            {errors.foto && (
              <span className='text-red-500 text-sm'>
                Este campo es requerido
              </span>
            )}
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='p-2 bg-blue-500 text-white rounded'
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
