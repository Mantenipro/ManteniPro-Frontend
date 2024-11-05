import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EquipmentDetails from '@/components/EquipmentDetails3';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getEquipmentById } from '@/api/api';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const DetalleEquipo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [equipment, setEquipment] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (id && token) {
          const data = await getEquipmentById(id, token); 
          setEquipment(data);
        }
      } catch (error) {
        console.error('Error fetching equipment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!equipment) return <p>No se encontró información del equipo.</p>;

  return (
    <div className={`min-h-screen bg-gray-100 flex relative ${montserrat.className}`}>
      <div
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className='flex-1 flex flex-col lg:flex-row justify-center items-center'>
        <div className='flex-1 flex flex-col'>
          <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between ml-3 mt-2'>
            <div className='lg:hidden top-4 left-4 z-50'>
              <button onClick={toggleMenu} className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'>
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row items-center justify-center space-y-2 lg:space-y-0 lg:space-x-4'>
            <EquipmentDetails equipment={equipment} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetalleEquipo;
