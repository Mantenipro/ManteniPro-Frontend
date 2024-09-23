import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile'
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile'
import SubtitleMobile from '@/components/SubtitleMobile'

export default function OrderClosed() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <NavbarTecnicoMobile />
      <section className='m-6 flex h-[85vh] max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300'>
        <HeaderTecnicoMobile />
        <span className='m-auto my-3 font-semibold text-slate-200'>
          Orden Cerrada
        </span>
        {/* orden cerrada seccion */}
        <div className='-mx-2 flex max-h-screen flex-col rounded bg-slate-100 p-3 text-center'>
          <span className='mb-2 mr-auto font-semibold text-slate-800'>
            Reparar cable
          </span>
          <div className='flex w-full flex-col gap-2'>
            <SubtitleMobile children={'ID de la Orden'} />
            <input
              type='text'
              readOnly
              disabled
              value={id}
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            />
            <SubtitleMobile children={'Solucion del Ingeniero'} />
            <textarea
              name=''
              disabled
              rows={5}
              id=''
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            ></textarea>
            <div className='flex items-center justify-between'>
              <SubtitleMobile children={'Inicio:'} />
              <input
                type='date'
                disabled
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
                  disabled
                  name=''
                  id=''
                  className='rounded-lg border-2 border-slate-300 p-1 text-sm text-slate-800'
                />
              </div>
            </div>

            <SubtitleMobile children={'VoBo cliente:'} />
            <textarea
              name=''
              rows={5}
              disabled
              id=''
              className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
            ></textarea>
          </div>
        </div>
        <Link href={`/ticket_resolved`}>
          <button className='m-auto mt-8 rounded-lg bg-yellow-300 p-1 px-4 text-lg font-semibold text-blue-950 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'>
            Competado
          </button>
        </Link>
      </section>
    </div>
  )
}
