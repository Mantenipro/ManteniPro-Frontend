import React, { useState, useEffect } from 'react';
import SearchBar2 from '../components/SearchBar2';
import AddButton from '../components/AddButton-';
import InfoPanel2 from '../components/InfoPanel2';
import Title from '../components/Title-';
import MachineCard from '../components/MachineCard-';
import LefthDashboard from '@/components/LefthDashboard-';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getEquipmentByCompanyId, getAllUsers } from '@/api/api';
import { useRouter } from 'next/router';
import useAuth2 from "../hooks/useAuth2";
import useAuth3 from "../hooks/useAuth3";
const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const Catalogo = () => {
    useAuth2()
    useAuth3()
    const [machines, setMachines] = useState([]);
    const [users, setUsers] = useState([]);
    const [owners, setOwners] = useState([]);
    const [selectedAssignedTo, setSelectedAssignedTo] = useState([]); 
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchUsersAndMachines = async () => {
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");

                if (token && email) {
                    const userList = await getAllUsers(token);
                    setUsers(userList);

                    if (!Array.isArray(userList) || userList.length === 0) {
                        return;
                    }

                    const user = userList.find(user => user.email === email);
                    const userId = user ? user._id : null;

                    if (userId) {
                        const userAdminType = user.adminType;
                        
                        // Si eres de tipo "secundario", obtener el usuario principal
                        if (userAdminType === 'secundario') {
                            // Buscar otro usuario de la misma compañía pero con adminType 'principal'
                            const sameCompanyUser = userList.find(u => u.company === user.company && u.adminType === 'principal');
                            
                            if (sameCompanyUser) {
                                // Realizar la petición con el ID del usuario principal
                                const data = await getEquipmentByCompanyId(sameCompanyUser._id, token);
                                setMachines(data);
                                // Obtener los propietarios y ubicaciones
                                const uniqueOwnerIds = [...new Set(data.map(machine => machine.owner))];
                                const uniqueOwners = uniqueOwnerIds.map(ownerId => {
                                    const ownerUser = userList.find(user => user._id === ownerId);
                                    return ownerUser ? { _id: ownerId, name: ownerUser.name } : { _id: ownerId, name: 'Desconocido' };
                                });
                                setOwners(uniqueOwners);

                                const uniqueLocations = [...new Set(data.map(machine => machine.location))];
                                setLocations(uniqueLocations);
                            }
                        } else {
                            // Si eres principal, hacer la petición con tu propio ID
                            const data = await getEquipmentByCompanyId(userId, token);
                            setMachines(data);
                            // Obtener los propietarios y ubicaciones
                            const uniqueOwnerIds = [...new Set(data.map(machine => machine.owner))];
                            const uniqueOwners = uniqueOwnerIds.map(ownerId => {
                                const ownerUser = userList.find(user => user._id === ownerId);
                                return ownerUser ? { _id: ownerId, name: ownerUser.name } : { _id: ownerId, name: 'Desconocido' };
                            });
                            setOwners(uniqueOwners);

                            const uniqueLocations = [...new Set(data.map(machine => machine.location))];
                            setLocations(uniqueLocations);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersAndMachines();
    }, [router]);

    const handleDelete = (deletedId) => {
        setMachines((prevMachines) => prevMachines.filter((machine) => machine._id !== deletedId));
    };

    const filteredMachines = machines.filter(machine => {
        const matchesOwner = selectedAssignedTo.length === 0 || selectedAssignedTo.includes(machine.owner);
        const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(machine.location);
        const matchesDate = selectedDate ? new Date(machine.date).toDateString() === new Date(selectedDate).toDateString() : true; 
        const matchesSearchTerm = machine.model.toLowerCase().startsWith(searchTerm.toLowerCase());

        return matchesOwner && matchesLocation && matchesDate && matchesSearchTerm;
    });

    return (
        <div className={`${montserrat.className} h-dvh flex flex-row lg:flex-grow relative`}>
            <div className={`${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}>
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
                    <SearchBar2 className='w-1/2 md:w-1/3 ' searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <AddButton className='text-sm' />
                </div>

                <div className='mt-8 mb-4'>
                    <Title className='text-2xl ml-4'>Catálogo de equipos</Title>
                    <div className='mt-6 flex justify-between items-center'>
                        <InfoPanel2
                            owners={owners} 
                            selectedAssignedTo={selectedAssignedTo}
                            setSelectedAssignedTo={setSelectedAssignedTo}
                            selectedLocations={selectedLocations}
                            setSelectedLocations={setSelectedLocations}
                            locations={locations} 
                            setSelectedDate={setSelectedDate} 
                            setMachines={setMachines}
                        />
                    </div>
                </div>

                <div className='h-[70vh] md:h-[65vh] overflow-y-auto mt-8 space-y-6'>
                    {filteredMachines.length > 0 ? (
                        filteredMachines.map((machine, index) => {
                            const ownerUser = users.find(user => user._id === machine.owner);
                            const ownerName = ownerUser ? ownerUser.name : 'Desconocido';

                            return (
                                <MachineCard 
                                    key={index} 
                                    machine={{ ...machine, owner: ownerName }} 
                                    onDelete={handleDelete} 
                                />
                            );
                        })
                    ) : (
                        <div className='text-center text-2xl text-gray-500'>
                        No hay equipos disponibles.
                      </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Catalogo;






