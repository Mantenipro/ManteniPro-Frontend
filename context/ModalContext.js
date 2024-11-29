import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

// Hook para usar el contexto
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal debe ser usado dentro de un ModalProvider')
  }
  return context
}