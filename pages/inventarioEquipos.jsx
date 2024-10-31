import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import SortTeams from '../components/SortTeams'
import Title from '../components/Title';
import MachineCard from '../components/MachineCard';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { useRouter } from 'next/router';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const CatalogoDeEquipos = () => {
  const [machines, setMachines] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')
  const [sortCriteria, setSortCriteria] = useState('')
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUsersAndMachines = async () => {
      try {
       const token = localStorage.getItem('token');
       const response = await fetch('http://localhost:8000/equipment',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
       }
      )
      const data = await response.json()
      console.log('Respuesta de la API:', data)
      if (data.success) {
        setMachines(data.data)
        console.log('Equipos:', data.data)
      } else {
        console.error('Error al obtener equipos:', data.error)
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

   const handleSortChange = (criteria) => {
     setSortCriteria(criteria)
   }

   const handleMachineDelete = (machineId) => {
     setMachines((prevMachines) =>
       prevMachines.filter((machine) => machine._id !== machineId)
     )
   }
  const sortedMachines = [...machines].sort((a, b) => {
    if (sortCriteria === 'A a la Z') {
      return a.location.localeCompare(b.location)
    } else if (sortCriteria === 'Z a la A') {
      return b.location.localeCompare(a.location)
    } else if (sortCriteria === 'Antiguo a reciente') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortCriteria === 'Reciente a antiguo') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    return 0
  })

  const filteredMachines = sortedMachines.filter((machine) =>
    machine.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div
      className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-4'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar
            className='w-1/2 md:w-1/3'
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AddButton className='text-sm' />
        </div>

        <div className='mb-4 mt-4'>
          <Title className='text-2xl'>Catálogo de equipos</Title>
          <div className='mt-4 flex items-center justify-between'>
            <SortTeams
              sortCriteria={sortCriteria}
              setSortCriteria={handleSortChange}
            />
          </div>
        </div>

        <div className='animate-fadeIn h-[30rem] w-full space-y-8 overflow-y-auto rounded-lg bg-white p-8 shadow-xl scrollbar-hide'>
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine, index) => (
              <MachineCard
                key={index}
                machine={machine}
                onDelete={handleMachineDelete}
              />
            ))
          ) : (
            <div className='text-center text-2xl text-gray-500'>
              No hay equipos disponibles.
            </div>
          )}
        </div>
      </main>
    </div>
  )
};

export default CatalogoDeEquipos






























