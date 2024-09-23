import React from 'react'

export default function FotterOrderDetail() {
  return (
    <div>
      {/* COMMENTS */}
      <div className='flex flex-col'>
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
      {/* END COMMENTS */}

      {/* SIGN CLIENT */}
      <div className='flex flex-col'>
        <span>Firma del Cliente</span>
        <span className='w-full rounded border bg-slate-300 p-3 font-thin'>
          ...
        </span>
        {/* <button className='m-4 mx-8 rounded border-2 border-blue-950 p-3 text-blue-950 transition-all duration-300 hover:bg-blue-950 hover:text-white'>
          CERRAR
        </button> */}
        {/* <button className='m-4 mx-8 rounded bg-gradient-to-t from-blue-800 to-blue-950 p-3 text-slate-200 transition-colors duration-300 hover:from-yellow-600 hover:to-yellow-400 hover:text-slate-950'>
          CERRAR
        </button> */}
        <button className='m-4 mx-8 rounded bg-gradient-to-t from-blue-800 to-blue-950 p-3 text-slate-200 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'>
          CERRAR
        </button>
      </div>
    </div>
  )
}
