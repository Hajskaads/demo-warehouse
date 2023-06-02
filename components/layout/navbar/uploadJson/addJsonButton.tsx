'use client';

import React, { useState } from 'react';
import Modal from './modal';
import PlusIcon from '@components/icons/plus';

/**
 * AddJsonButton component.
 *
 * @returns {JSX.Element} The rendered AddJsonButton component.
 */
const AddJsonButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * Opens the modal.
   */
  const openModal = () => {
    setModalOpen(true);
  };

  /**
   * Closes the modal.
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex mr-2">
      <button className="hover:bg-blue-600 rounded-full p-0.5" onClick={openModal}>
        {/* Render the PlusIcon */}
        <PlusIcon className="h-8" />
      </button>
      {/* Render the Modal component */}
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddJsonButton;
