import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import Login from './Login'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${montserrat.className}`}>
      <Login />
    </main>
  )
}

