import React from 'react'

export default function SearchInputTecnico() {
  return (
    <div className='relative py-3 lg:hidden'>
      <label className='absolute left-4 top-1 rounded-md bg-[#2E3C65] px-1 text-[11px] text-yellow-300'>
        Search
      </label>
      <input
        type='search'
        id='search'
        placeholder='Name, Company, ID ...'
        className='w-full rounded-xl border border-slate-300 bg-transparent p-3 text-slate-300 focus:border-slate-400 focus:outline-none'
      />
    </div>
  )
}
