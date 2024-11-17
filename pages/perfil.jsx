import React, { useState, useEffect } from 'react';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat } from 'next/font/google';
import FormProfile from '../components/FormProfile';
import { updateUser } from './api/api';
import { getAllUsers } from '../api/api';

const montserrat = Montserrat({ subsets: ['latin'] });

const TicketsDashboard = () => {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
          const userList = await getAllUsers(token);
          if (!Array.isArray(userList) || userList.length === 0) return;

          const user = userList.find(user => user.email === email);
          if (user?._id) {
            setUserId(user._id);
           
            setProfileImage(user.photo || '/default-image.jpg');
          } else {
            console.error('No user found with this email:', email);
          }
        } else {
          console.error('Token or email not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserId();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfilesMenu = () => setShowProfilesMenu(!showProfilesMenu);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result);

        
        const imageUrl = await uploadImageToS3(file);
        if (imageUrl) {
          await updateUserPhoto(imageUrl);
          window.location.reload(); 
        } else {
          console.error("Failed to upload image");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  
  const uploadImageToS3 = async (file) => {
    if (!file) return null;
    try {
      const presignedUrlResponse = await fetch('http://localhost:8000/api/s3/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error(`Failed to fetch presigned URL: ${presignedUrlResponse.statusText}`);
      }

      const { url } = await presignedUrlResponse.json();
      if (!url) throw new Error('No URL returned for S3 upload');

      const uploadResponse = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file to S3: ${uploadResponse.statusText}`);
      }

      return url.split('?')[0];
    } catch (error) {
      console.error("Error uploading image to S3:", error.message || error);
      return null;
    }
  };

  
  const updateUserPhoto = async (newPhotoUrl) => {
    const userData = { photo: newPhotoUrl };
    try {
      const result = await updateUser(userId, userData);
      if (result?.success) {
        console.log('Photo updated successfully');
      } else {
        console.error('Error updating photo:', result?.message || 'Unexpected response');
      }
    } catch (error) {
      console.error('Error updating photo:', error.message || error);
    }
  };

  return (
    <div className={`relative flex min-h-screen bg-white ${montserrat.className}`}>
      <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}>
        <LefthDashboard />
      </div>

      <main className="flex-1">
        <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mt-2'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="text-center bg-none mt-5">
  <div className="relative inline-block">
    <img src={profileImage || '/default-image.jpg'} alt="Profile Image" className="mx-auto h-32 w-32 transform rounded-full object-cover shadow-lg transition duration-300 ease-in-out hover:scale-105" />
    <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 cursor-pointer rounded-full  bg-gradient-to-r from-[#21262D] to-[#414B66]  p-2 text-white hover:bg-blue-600">
      <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      <img src="/icon/camera-icon.png" alt="Camera Icon" className="w-6 h-6" />
    </label>
  </div>
  <h2 className="mt-4 text-3xl font-bold">Company Profile</h2>
</div>

        <FormProfile />
      </main>
    </div>
  );
};

export default TicketsDashboard;
