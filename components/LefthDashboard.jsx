import { useState } from 'react'
import Link from 'next/link'

export default function LefthDashboard() {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  return (
    <div className='p-4   text-[#f2f6fc]'>
      <div className='flex justify-center p-0'>
        <img
          className='w-[10rem] h-[6rem] '
          src='/ManteniProLogoWhite.svg'
          alt='Logo'
        />
      </div>
      <div className='my-2 ml-8 shadow-sm flex flex-col items-center p-4 bg-gradient-to-b from-[#232c48] to-[#4361b2] rounded-[40px] w-[155px] h-[181px'>
        <img src='/userphoto.svg' alt='' />
        <p className='font-bold'>Name</p>
        <p className='text-sm text-center'>Product Manager</p>
      </div>

      <section className='flex flex-col mt-6'>
        <p className='font-bold'>MAIN</p>
        <div className='flex items-center mt-2'>
          <img src='' alt='' />
          <p className='font-medium'>Tickets</p>
        </div>

        {/* Sección de Perfiles con submenú */}
        <div
          className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full bg-[#2D2F39] hover:bg-[#2D2F39] rounded-md'
          onClick={toggleProfilesMenu}
        >
          <img src='/perfile-dash.svg' alt='' />
          <p className='font-medium'>Perfiles</p>
          <p>^</p>
        </div>

        {/* Submenú dentro de Perfiles */}
        {showProfilesMenu && (
          <div className='ml-6 mt-2 flex flex-col'>
            <Link href='/tecnicos'>
              <p className='hover:underline cursor-pointer'>Técnicos</p>
            </Link>
            <Link href='/usuarios'>
              <p className='hover:underline cursor-pointer'>Usuarios</p>
            </Link>
          </div>
        )}

        <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full bg-[#2D2F39] hover:bg-[#2D2F39] rounded-md'>
          <img src='/equipos-dash.svg' alt='' />
          <p>Equipos</p>
          <p></p>
        </div>

        <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full bg-[#2D2F39] hover:bg-[#2D2F39] rounded-md'>
          <img src='/settings-filled-Dash.svg' alt='' />
          <p>Settings</p>
          <p></p>
        </div>

        <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full bg-[#2D2F39] hover:bg-[#2D2F39] rounded-md'>
          <img src='/person-filled-dash.svg' alt='' />
          <p>Profile</p>
        </div>

        <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full bg-[#2D2F39] hover:bg-[#2D2F39] rounded-md'>
          <img src='' alt='' />
          <Link href='/loginPage'>
            <p>Sign Out</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
