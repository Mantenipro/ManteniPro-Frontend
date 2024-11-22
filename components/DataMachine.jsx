import React from 'react'

export default function DataMachine({ titulo, dato, estilo }) {
  return (
    <div className='flex items-center justify-between'>
      <span className='min-w-16 text-slate-400'>{titulo}:</span>
      <span
        className={`w-full rounded border bg-slate-200 px-1 font-medium text-slate-900 ${estilo}`}
      >
        {dato}
      </span>
    </div>
  )
}
