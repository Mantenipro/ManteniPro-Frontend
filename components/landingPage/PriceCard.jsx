import { Source_Sans_3 } from 'next/font/google'
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })
const clsx = require('clsx')

export default function PriceCard({
  title,
  price,
  description,
  btnTxt,
  icon,
  featureTitle,
  features
}) {
  return (
    <div
      className={clsx(
        'flex max-w-screen-sm flex-1 flex-col rounded-lg border-2 border-gray p-5 transition-transform duration-300 lg:hover:scale-105',
        {
          'bg-[#3C5191] text-slate-100': title === 'Avanzado'
        }
      )}
    >
      <h1 className='mb-5 text-3xl font-semibold'>{title}</h1>
      <p className={`mb-7 text-2xl ${sourceSans3.className}`}>{description}</p>
      <span className='text-3xl font-semibold'>${price} MXN</span>
      <button
        className={clsx(
          'mt-5 w-full rounded border border-[#3C5191] px-4 py-2 text-2xl text-[#3C5191] hover:font-medium hover:shadow-lg hover:shadow-[#bcc77e]',
          {
            'border-[#31416d] bg-[#31416D] text-slate-50': title === 'Avanzado'
          }
        )}
      >
        {btnTxt}
      </button>
      <p className='mb-5 mt-7 text-lg font-semibold'>{featureTitle}</p>
      {/* iterar sobre features */}
      <div>
        <ul className='my-2 flex flex-col gap-4'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-center'>
              <img src={`icon2/${icon}`} alt='check-icon' />
              <div className={`ml-2 ${sourceSans3.className} text-lg`}>
                <strong>{feature.title}</strong>
                {feature.desc && <p>{feature.desc}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
