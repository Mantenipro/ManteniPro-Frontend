import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import InfoPanel2 from '../components/InfoPanel2'; // Importamos el nuevo componente
import Title from '../components/Title';
import MachineCard from '../components/MachineCard';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getEquipmentByCompanyId, getAllUsers } from '@/api/api';
import { useRouter } from 'next/router';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const Catalogo = () => {
  const [machines, setMachines] = useState([]);
  const [users, setUsers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUsersAndMachines = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        console.log("Token obtenido de localStorage:", token);
        console.log("Email obtenido de localStorage:", email);

        if (token && email) {
          const userList = await getAllUsers(token);
          console.log("Lista de usuarios obtenida:", userList);
          setUsers(userList);

          if (!Array.isArray(userList) || userList.length === 0) {
            console.error("La lista de usuarios está vacía o no es un array.");
            return;
          }

          const user = userList.find(user => user.email === email);
          const userId = user ? user._id : null;
          
          console.log("ID de usuario extraído del email:", userId);

          if (userId) {
            const data = await getEquipmentByCompanyId(userId, token);
            setMachines(data);
          } else {
            console.error("No se pudo obtener el ID de usuario del email.");
          }
        } else {
          console.error("Token o email no encontrados.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndMachines();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${montserrat.className} h-dvh flex flex-row lg:flex-grow relative`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'>
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3 ' />
          <AddButton className='text-sm' />
        </div>

        <div className='mt-8 mb-4'>
          <Title className='text-2xl ml-4'>Catálogo de equipos</Title> {/* Agregamos 'ml-4' para mover a la izquierda */}
          <div className='mt-6 flex justify-between items-center'> {/* Aumentamos el margen superior a 6 */}
            <InfoPanel2 /> {/* Reemplazamos SortTeams por InfoPanel2 */}
          </div>
        </div>

        {/* Contenedor de 50vh con scroll para las tarjetas */}
        <div className='h-[70vh] md:h-[65vh] overflow-y-auto mt-8 space-y-6'>
          {machines.length > 0 ? (
            machines.map((machine, index) => (
              <MachineCard key={index} machine={machine} />
            ))
          ) : (
            <div>No hay equipos disponibles.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;






























