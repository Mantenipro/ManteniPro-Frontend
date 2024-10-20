import React from 'react';

export default function TicketDetail({ task }) {
  return (
    <div className={`relative flex h-[65vh] md:h-[80vh] flex-row lg:flex-grow`}>
      <div className='flex-1 p-6'>
       
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#2E3A59' }}>Estatus de Ticket</h1>
        </div>

        <div className='flex items-center justify-center'>
          <div className='max-h-screen space-y-4 overflow-y-auto md:h-[595px] md:w-2/3'>
            <div className='rounded border p-2 shadow-lg'>
              <div className='flex flex-col justify-between rounded border-b-2 p-2 md:flex-row'>
                <div>
                  <h3 className='p-2 text-lg font-bold'>{task.title}</h3>
                </div>
              </div>

              
              <div className='mt-4 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
                <div className='flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]'>
                  <img src='candado.svg' alt='icon' className='mr-2 h-5 w-5 object-cover' />
                  Abierto
                </div>
                <div className='flex items-center rounded border bg-[#051540] p-2 text-[#EEE727]'>
                  <img src='pause.svg' alt='icon' className='mr-2 h-5 w-5 object-cover' />
                  En Progreso
                </div>
                <div className='flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]'>
                  <img src='paloma.svg' alt='icon' className='mr-2 h-5 w-5 object-cover' />
                  Completado
                </div>
              </div>

              <div className='mt-2 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
                <div className='flex flex-col p-2 text-center'>
                  <div>ID Orden de Trabajo:</div>
                  <span>{task.idOrder}</span>
                </div>
                <div className='flex flex-col p-2 text-center'>
                  <div>Tiempo estimado:</div>
                  <span>3h 30min</span>
                </div>
                <div className='flex flex-col p-2 text-center'>
                  <div>Fecha:</div>
                  <span>{task.date}</span>
                </div>
              </div>

              <div className='flex flex-col justify-between border-t-2 p-2 md:flex-row'>
                <div>
                  <div className='mb-2'>
                    <span className='font-semibold'>Reportado por:</span>
                  </div>
                  <div className='mb-2 flex flex-col items-center'>
                    <img src='/profile.jpg' alt='user-photo' className='m-2 h-16 w-16 rounded-full object-cover' />
                    <div className='flex flex-col justify-center items-center'>
                      <div className='font-bold'>Gabriela Romero</div>
                      <div className='text-xs text-gray-600'>Gabriela55@yahoo.com</div>
                    </div>
                  </div>
                </div>
                <div className='mx-4 h-auto border-l-2'></div>
                <div>
                  <div className='mb-2 mt-2 flex flex-col p-2'>
                    <span className='font-semibold'>Dirección:</span>
                    <span>Jardines Abril Padrón 6079, San Luis</span>
                    <span>Potosí-Soledad 84132</span>
                  </div>
                  <div className='mb-2 p-2'>
                    <span className='font-semibold'>Compañía: Welch Group</span>
                  </div>
                </div>
              </div>

              <div>
                <div className='text-md mb-2 font-semibold'>Descripción:</div>
                <div className='mx-2 rounded bg-gray-200 p-2 md:mx-6'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Exercitationem accusantium cum ea, repellendus quam laborum
                  mollitia officia qui eligendi eos doloremque maxime!
                  Perferendis doloremque unde dignissimos odit quos libero
                  deleniti!
                </div>
              </div>

              <div className='mt-5 mb-72 md:mt-5 md:mb-28 flex justify-center'>
                <img src='/airConditioning.jpg' alt='user-photo' className='m-1 h-24 w-24 rounded-lg object-cover shadow-md' />
              </div>

              <div className='mx-4 h-auto border-b-2'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



