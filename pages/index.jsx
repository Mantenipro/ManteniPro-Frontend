import { Montserrat, Source_Sans_3 } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${montserrat.className}`}>
      <h1 className="text-black">Hello!!</h1>
      
      
    </main>
  )
}