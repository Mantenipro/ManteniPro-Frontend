import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${montserrat.className}`}>
      <h1 className='text-black'>Hello from development!!</h1>
      <nav>
        <ul>
          <li>
            <Link href='/CreacionDeUsuarios'>
              <button>Creacion de usuarios</button>
            </Link>
          </li>
          <li>
            <Link href='/catalogoDeUsuarios'>
              <button>Catalogo de Usuarios</button>
            </Link>
          </li>
          <li>
            <Link href='/Login'>
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}

