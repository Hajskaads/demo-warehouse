'use client';

import { FC, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import CloseIcon from '@components/icons/close';

/**
 * DeleteButton component.
 *
 * @param {number} productId - The ID of the product to be deleted.
 * @param {number} [quantity=1] - The quantity of the product to be deleted.
 * @returns {JSX.Element} The rendered DeleteButton component.
 */
const DeleteButton: FC<{ productId: number; quantity?: number }> = ({
  productId,
  quantity = 1,
}) => {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  /**
   * Handles the removal of the product.
   */
  async function handleRemove() {
    setRemoving(true);

    // Send DELETE request to the server API
    const response = await fetch(`/api/product?id=${productId}&quantity=${quantity}`, {
      method: 'DELETE',
    });

    // Parse the response data
    const data = await response.json();

    if (data.error) {
      // Display an error message if the request fails
      alert(data.error);
      setRemoving(false);
      return;
    }

    setRemoving(false);

    // Refresh the page to reflect the changes
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="flex mr-2">
      <button
        className={`${
          removing ? 'cursor-not-allowed text-gray-400' : ''
        } hover:bg-red-500 text-red-500 hover:text-white rounded-full p-0.5`}
        onClick={handleRemove}
        disabled={removing}
      >
        <CloseIcon className="h-6" />
      </button>
    </div>
  );
};

export default DeleteButton;
