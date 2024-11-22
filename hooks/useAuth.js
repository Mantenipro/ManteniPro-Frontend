import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const tkn = localStorage.getItem('token');

    if (tkn) {
      setToken(tkn);
    } else {
      alert('Debes iniciar sesión primero.');
      router.push('/inicioSesion'); 
    }
  }, [router]);

  return (
    <>
      {token}
    </>
  );
}
