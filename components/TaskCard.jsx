import React from 'react'
import { Today } from '@mui/icons-material'

export default function TaskCard({ picture, title, status, date, idOrder }) {
  return (
    <div className='flex items-center rounded-xl border-2 bg-slate-100 p-2 text-sm text-slate-500 transition duration-300 ease-in-out hover:bg-transparent hover:text-white'>
      <img
        src={picture}
        alt='task-photo'
        className='w-11 rounded-full border'
      />
      <div className='flex flex-col gap-3 pl-3'>
        <div>
          <p className='font-medium'>{title}</p>
          <p className='mt-1'>{idOrder}</p>
        </div>
        <div className='flex items-start gap-1'>
          <Today fontSize='small' className='' />
          <p className=' '>{date}</p>
        </div>
      </div>
    </div>
  )
}
