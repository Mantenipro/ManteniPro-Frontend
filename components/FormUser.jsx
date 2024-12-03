/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';
import { sendUserData, updateUser } from '../pages/api/api';
import { toast, Toaster } from 'sonner'; // Importar toast de sonner
import { useRouter } from 'next/router';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const FormUser = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialData,
      type: initialData?.type || 'Otro',
      role: initialData?.role || 'usuario',
    },
  });

  const [buttonText, setButtonText] = useState('Crear');
  const router = useRouter();

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData);
      setButtonText('Actualizar');
    } else {
      setButtonText('Crear');
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    try {
      const response = initialData
        ? await updateUser(initialData._id, data)
        : await sendUserData(data);
  
      if (response && response.success) {
        toast.success(
          `${initialData ? 'Usuario actualizado' : 'Usuario agregado'} exitosamente`,
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto',
            },
          }
        );
        reset();
        setTimeout(() => {
          router.push('/catalogoDeUsuariosv2');
        }, 2000);
      } else {
        toast.error(
          response.error ||
            `Error al ${initialData ? 'actualizar' : 'agregar'} usuario`,
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto',
            },
          }
        );
      }
    } catch (error) {
      // Verificar si el error es el relacionado con 'Cannot read properties of null'
      if (error.message === "Cannot read properties of null (reading 'puctId')") {
        toast.error('Suscríbete en plan avanzado para poder registrar a otro administrador', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto',
          },
        });
      } else {
        toast.error(
          error.message ||
            `Error al ${initialData ? 'actualizar' : 'agregar'} usuario`,
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto',
            },
          }
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${sourceSans3.className} flex min-h-[38rem] w-full max-w-[71rem] flex-col rounded-lg bg-white px-4 pt-4 shadow-lg`}
    >
      <Toaster />
      <div className="flex-1 space-y-4">
        <div className="mb-4">
          <label
            className="mb-[2px] block text-sm font-semibold text-gray-700"
            htmlFor="name"
          >
            Nombre Completo
          </label>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src="/iconuser.svg"
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
              />
              <input
                {...register('name', { required: 'Nombre es obligatorio' })}
                className="w-full appearance-none rounded-lg border border-gray-300 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                type="text"
                placeholder="Juanito Perez Gonzalez"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="mb-[2px] block text-sm font-semibold text-gray-700"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src="/iconemail.svg"
                alt=""
                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
              />
              <input
                {...register('email', {
                  required: 'Correo es obligatorio',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Correo inválido',
                  },
                })}
                className="w-full appearance-none rounded-lg border border-gray-300 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="nombre@dominio.com"
                readOnly // Hacer el campo solo lectura
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contraseña: solo se renderiza si no estamos editando un usuario */}
        {!initialData && (
          <div className="mb-4">
            <label
              className="mb-[2px] block text-sm font-semibold text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img
                  src="/iconpassword.svg"
                  alt=""
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                />
                <input
                  {...register('password', {
                    required: 'Contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'Debe tener al menos 6 caracteres',
                    },
                  })}
                  className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  type="password"
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-14 flex justify-end lg:mb-10 lg:mr-10 lg:mt-4">
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#21262D] to-[#414B66] px-6 py-3 text-lg font-bold text-white shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300 lg:px-12 lg:py-1"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default FormUser;
