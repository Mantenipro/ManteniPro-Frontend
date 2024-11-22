import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllUsers } from '../api/api'; 

export default function useAuth3() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isUserFound, setIsUserFound] = useState(false);

  useEffect(() => {
    const tkn = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (tkn && email) {
      setToken(tkn);
      fetchUserRole(email, tkn);  
    } else {
      alert('Debes iniciar sesión primero.');
      router.push('/inicioSesion');
    }
  }, [router]);

  
  const fetchUserRole = async (email, token) => {
    try {
      const users = await getAllUsers(token); 
      const currentUser = users.find(user => user.email === email); 

      if (currentUser) {
        setIsUserFound(true);
        setUserRole(currentUser.role); 
        
        if (currentUser.role === 'tecnico') {
          router.push('/ticketsDashboard');
        }
      } else {
        console.error('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  
  if (!token || !isUserFound) {
    return <p>Cargando...</p>; 
  }

  
  return (
    <>
      {userRole && userRole === 'usuario' ? (
        <p>Redirigiendo a gestión de tickets...</p> 
      ) : (
        <p>Bienvenido, tu rol es: {userRole}</p>
      )}
    </>
  );
}
