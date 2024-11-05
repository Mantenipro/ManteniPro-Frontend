/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <div className='flex flex-col justify-center mx-2'>
      <div className='flex flex-col p-4 md:p-10 bg-[url("/bghero.png")] bg-cover h-[30rem]'>
        <h1 className='text-center text-[24px] lg:text-4xl font-semibold text-[#131316]'>
          Simplifica el Mantenimiento de Tus Equipos con
          <span className='text-azulPersonal'> Mantenipro</span>
        </h1>
        <div className='flex justify-center items-center lg:px-[10rem] mt-4'>
          <p className='text-[16px] lg:text-xl text-center text-azulPersonal'>
            Tus clientes escanean, tú recibes la información. Así de fácil.
            Menos tiempo en llamadas y clientes más felices.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-1 mt-[-15rem] md:mt-[-14rem] lg:mt-[-18rem] md:p-6'>
        <div className="flex md:hidden">
            <img className='z-10 w-[350px] h-[600px]' src="/mobilehero.png" alt="Mobile Hero" />
        </div>
        <div className='hidden md:flex justify-end'>
          <img className='z-10 md:w-[550px] md:h-[300px] lg:w-[800px] lg:h-[450px]' src='/heroimg.svg' alt='Hero' />
        </div>
      </div>
    </div>
  )
}



