import React from 'react'
import { useRouter } from 'next/router'

import NavbarTecnicoMobile from '../../components/NavbarTecnicoMobile'

export default function TaskDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <NavbarTecnicoMobile />
      <h1 className='m-12 text-center text-2xl font-bold'>Task Detail {id}</h1>
    </div>
  )
}
