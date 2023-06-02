'use client';

import RepeatIcon from '@components/icons/repeat';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

/**
 * RefreshButton component.
 *
 * @returns {JSX.Element} The rendered RefreshButton component.
 */
export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex mr-2">
      <button
        className={`${
          isPending ? 'cursor-not-allowed text-gray-400 animate-pulse' : ''
        } hover:bg-blue-600 hover:cursor-pointer rounded-full p-0.5`}
        // Disable the button if isPending is true
        disabled={isPending}
        onClick={() => {
          // Call the router's refresh method to trigger a page refresh
          startTransition(() => {
            router.refresh();
          });
        }}
      >
        {/* Render the RepeatIcon component */}
        <RepeatIcon className="h-8" />
      </button>
    </div>
  );
}
