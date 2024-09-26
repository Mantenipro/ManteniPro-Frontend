/* eslint-disable @next/next/no-img-element */
export default function InputsLogin(
    {placeholder, icon}
) {
  return (
    <div>
        <div className='flex flex-col gap-10'>
            <div
            className='flex flex-row items-center h-10 rounded-lg bg-white'
            >
            <img src={icon} className='ml-3' alt='' />
            <input
                type='text'
                placeholder={placeholder}
                className='w-full h-full focus:outline-none focus:border-none  rounded-lg p-4 my-4 border-none bg-transparent'
            />
            </div>
        </div>
    </div>
  )
}