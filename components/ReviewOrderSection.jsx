import React from 'react'
import { useRouter } from 'next/router'

export default function ReviewOrderSection() {
  const router = useRouter()
  const { id } = router.query

  const handleCloseTask = () => {
    router.push(`/taskClose/${id}`)
  }

  return (
    <div>
      {/* COMMENTS */}
      <div className='flex flex-col md:hidden'>
        <span>Comentarios</span>
        <textarea
          name=''
          id=''
          className='w-full rounded border-2 bg-slate-300 p-1 text-sm text-slate-800'
        ></textarea>
        <button className='my-2 ml-auto rounded bg-gradient-to-t from-blue-800 to-blue-950 px-3 text-slate-200 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'>
          ACTUALIZAR
        </button>
      </div>

      <div className='hidden flex-col md:flex md:text-lg'>
        <span className='md:font-medium'>Comentarios</span>
        <div className='item-stretch flex h-full flex-1 gap-2'>
          <textarea
            name=''
            id=''
            className='w-full rounded border-2 bg-slate-300 p-1 text-sm text-slate-800'
          ></textarea>
          <button className='ml-auto rounded bg-gradient-to-t from-blue-800 to-blue-950 p-10 px-3 text-slate-200 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'>
            ACTUALIZAR
          </button>
        </div>
      </div>
      {/* END COMMENTS */}

      {/* SIGN CLIENT */}
      <div className='flex flex-col md:hidden'>
        <span>Firma del Cliente</span>
        <span className='w-full rounded border bg-slate-300 p-3 font-thin'>
          ...
        </span>
        <button
          onClick={handleCloseTask}
          className='m-4 mx-8 rounded bg-gradient-to-t from-blue-800 to-blue-950 p-3 text-slate-200 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'
        >
          CERRAR
        </button>
      </div>
      <div className='hidden flex-col md:flex md:text-lg'>
        <span className='font-medium'>Firma del Cliente</span>
        <div className='item-stretch flex h-full flex-1 gap-2'>
          <span className='w-full rounded border bg-slate-300 p-3 font-thin'>
            ...
          </span>
          <button
            onClick={handleCloseTask}
            className='rounded bg-gradient-to-t from-blue-800 to-blue-950 p-4 py-5 text-slate-200 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'
          >
            CERRAR TICKET
          </button>
        </div>
      </div>
    </div>
  )
}
