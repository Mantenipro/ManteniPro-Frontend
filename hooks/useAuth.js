import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function useAuth() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')

  useEffect(() => {
    const tkn = localStorage.getItem('token')

    setToken(tkn)

    if (!tkn) {
      toast.error('Debes iniciar sesion de nuevo')
      navigate('/inicioSesion')
    }
  }, [navigate])

  return token
}
