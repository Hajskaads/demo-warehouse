'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';

/**
 * RestoreDbButton component.
 *
 * @returns {JSX.Element} The rendered RestoreDbButton component.
 */
const RestoreDbButton: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  /**
   * Handle the restore DB action.
   */
  const handleRestoreDb = async () => {
    // Send a GET request to restore the database
    const response = await fetch(`/api/restore-db`, { method: 'GET' });

    // Parse the response data
    const data = await response.json();

    if (response.ok) {
      // Show an alert with the success message
      alert(data.message);

      startTransition(() => {
        // Refresh the page to reflect the changes
        router.refresh();
      });

      return;
    }

    if (data.error) {
      // Show an alert with the error message
      alert(data.error);
      return;
    }
  };

  return (
    // Render the RestoreDbButton component
    <button
      className={`${
        isPending ? 'cursor-not-allowed text-gray-400' : ''
      } text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-100 px-4 py-2 rounded-md`}
      // Disable the button if isPending is true
      disabled={isPending}
      // Call the handleRestoreDb function when the button is clicked
      onClick={handleRestoreDb}
    >
      {/* Display different text based on the isPending state */}
      {isPending ? 'Refreshing...' : 'Restore DB'}
    </button>
  );
};

export default RestoreDbButton;
