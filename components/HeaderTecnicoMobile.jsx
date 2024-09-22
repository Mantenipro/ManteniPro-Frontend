import React from 'react'

export default function HeaderTecnicoMobile() {
  return (
    <div className='mb-3 flex items-start justify-between'>
      <div className='flex items-center gap-2'>
        <img className='w-8' src='/userphoto.svg' alt='user-photo' />
        <div className='flex flex-col text-sm'>
          <span>Ingeniero</span>
          <span>Empresa</span>
        </div>
      </div>
      <span className='text-sm'>ID # 123456789</span>
    </div>
  )
}
