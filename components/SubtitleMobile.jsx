import React from 'react'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function TitleMobile({ children }) {
  return (
    <span
      className={`mr-auto font-bold text-slate-600 ${montserrat.className}`}
      style={{ color: '#2E3A59' }}
    >
      {children}
    </span>
  )
}
