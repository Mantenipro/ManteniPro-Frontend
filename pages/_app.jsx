import '@/styles/globals.css'
import { ModalProvider, useModal } from '../context/ModalContext'
import SupportForm from '../components/SupportForm'

const GlobalModal = () => {
  const { isModalOpen, closeModal } = useModal()

  return (
    <>
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
            <button
              onClick={closeModal}
              className='absolute right-2 top-2 rounded-full bg-red-500 px-3 py-1 text-white'
            >
              ✖
            </button>
            <h2 className='mb-4 text-xl font-bold'>
              ¿Tienes algún problema? Contáctanos
            </h2>
            <SupportForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <GlobalModal />
      <Component {...pageProps} />
    </ModalProvider>
  )
}

export default MyApp
