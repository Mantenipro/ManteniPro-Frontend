import { Montserrat, Source_Sans_3 } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  {
    icon: '/iconemail.svg',
    placeholder: 'Correo electrónico'
  },
  {
    icon: '/iconpassword.svg',
    placeholder: 'Contraseña'
  }
]

export default function LoginPage() {
  return (
    <main className={`${montserrat.className}`}>
      
    </main>
  )
}


