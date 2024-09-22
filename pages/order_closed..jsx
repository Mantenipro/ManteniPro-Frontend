import React from 'react'
import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile'
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile'
import SubtitleMobile from '@/components/SubtitleMobile'

export default function OrderClosed() {
  return (
    <div>
      <NavbarTecnicoMobile />
      <section className='m-6 flex flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300'>
        <HeaderTecnicoMobile />
        <span className='m-auto my-3 font-semibold text-slate-200'>
          Orden Cerrada
        </span>
        {/* orden cerrada seccion */}
        <div className='-mx-3 flex flex-col rounded bg-slate-100 p-3 text-center'>
          <span className='mb-2 mr-auto font-semibold text-slate-800'>
            Reparar cable
          </span>
          <div className='flex w-full flex-col gap-2'>
            <SubtitleMobile children={'ID de la Orden'} />
            <input
              type='text'
              readOnly
              disabled
              value={123456789}
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            />
            <SubtitleMobile children={'Solucion del Ingeniero'} />
            <textarea
              name=''
              id=''
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            ></textarea>
            <div className='flex justify-between'>
              <SubtitleMobile children={'Inicio:'} />
              <input
                type='date'
                name=''
                id=''
                className='ml-auto rounded-lg border-2 border-slate-300 p-1 text-sm text-slate-800'
              />
            </div>
            <div className='flex items-center'>
              <SubtitleMobile children={'Termino:'} />
              <div className='ml-auto flex'>
                <input
                  type='date'
                  name=''
                  id=''
                  className='rounded-lg border-2 border-slate-300 p-1 text-sm text-slate-800'
                />
              </div>
            </div>

            <SubtitleMobile children={'VoBo cliente:'} />
            <textarea
              name=''
              id=''
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            ></textarea>
          </div>
        </div>
      </section>
    </div>
  )
}
