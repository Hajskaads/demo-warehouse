import { useRouter } from 'next/navigation';
import React, { useEffect, useState, startTransition } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
 * @param {Function} props.onClose - Function to close the modal.
 * @returns {JSX.Element|null} The rendered Modal component or null if not open.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Handle the file selection.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const fileName = event.target.files && event.target.files[0].name;

    if (fileName !== 'products.json' && fileName !== 'inventory.json') {
      alert("JSON file name must be 'products' or 'inventory'");

      // TODO: Check JSON structure to ensure it is the right one here in the front-end, to avoid unecessary API calls.
      return;
    } else {
      setSelectedFile(file);
      setSelectedFileName(fileName);
    }
  };

  /**
   * Handle the file upload.
   */
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const fileContent = await selectedFile.text();
    const jsonData = JSON.parse(fileContent);

    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send POST request to the server API
    const response = await fetch(
      `/api/${
        selectedFileName === 'products.json'
          ? 'products'
          : selectedFileName === 'inventory.json'
          ? 'articles'
          : 'error'
      }`,
      requestOptions
    );

    // Parse the response data
    const data = await response.json();

    // Handles the response
    if (response.ok) {
      // If the response was successful
      if (data?.status === 204) {
        // Create an alert to inform about the success of the operation
        alert(`${selectedFileName?.split('.json')[0]} added successfully`);

        // Refresh the screen to reflect the changes
        startTransition(() => {
          router.refresh();
        });

        return;

        // If the respone wasn't successful
      } else {
        // Create an alert to inform about the failure of the operation
        alert(data.message || 'Something went wrong, try again with a different file');
        return;
      }
    }

    // In case of an error, inform about it
    if (data.error) {
      // Create an alert to inform about the error of the operation
      alert(data.error);
      return;
    }

    onClose();
  };

  // Create event listeners to the Escape Key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      // Close the modal if the Esc key is pressed
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" />

      <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-8">
        {/* Modal title */}
        <h2 className="text-xl mb-5 text-center">Upload File</h2>
        <div className="flex justify-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white dark:text-black py-2 px-4 rounded"
          >
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".json"
            onChange={handleChooseFile}
          />
        </div>

        {/* Render selected file information if a file is selected */}
        {selectedFile && (
          <div className="mt-2">
            {/* Display selected file name */}
            <p>Selected File: {selectedFile.name}</p>
          </div>
        )}
        <div className="mt-3 flex justify-end">
          {/* Close button */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>

          {/* Upload button */}
          <button
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            onClick={() => {
              handleFileUpload();
              onClose();
            }}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
