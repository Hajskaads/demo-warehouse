import Link from 'next/link';
import { Suspense } from 'react';
import LogoIcon from 'components/icons/logo';
import PlusIcon from '@components/icons/plus';
import AddJsonButton from '@components/layout/navbar/uploadJson/addJsonButton';
import RefreshButton from './refreshButton';
import RepeatIcon from '@components/icons/repeat';
import RestoreDbButton from '../restoreDbButton';

/**
 * Navbar component.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-center bg-white p-4 dark:bg-black lg:px-6">
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div className="flex items-center justify-self-center md:w-1/3 md:justify-self-start">
          <div className="flex mr-4">
            {/* Render the Website's logo */}
            <Link href="/" aria-label="Go back home">
              <LogoIcon className="h-8 transition-transform hover:scale-110 hover:cursor-pointer" />
            </Link>
          </div>

          {/* Render the website's abbreviation name if the size screen is xs */}
          <div className="sm:hidden">W.M.</div>

          {/* Render the website's full name if the size screen is greater than xs */}
          <div className="hidden sm:block">Warehouse manager</div>
        </div>

        {/* Render a button to restore the DB if the screen size is larger than md */}
        <div className="hidden w-1/3 md:flex justify-center">
          <Suspense
            fallback={
              // Show the button UI while the component is loading
              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 hover:dark:text-gray-100 px-4 py-2 rounded-md cursor-wait">
                Restore DB
              </button>
            }
          >
            {/* Render the RestoreDbButton component */}
            <RestoreDbButton />
          </Suspense>
        </div>
        <div className="flex w-1/3 justify-end items-center">
          <Suspense
            fallback={
              // Show the button's icon while loading
              <RepeatIcon className="h-8 mr-2 cursor-wait" />
            }
          >
            {/* Render the RefreshButton component */}
            <RefreshButton />
          </Suspense>

          <Suspense
            fallback={
              // Show the button's icon while loading
              <PlusIcon className="h-8 cursor-wait" />
            }
          >
            {/* Render the AddJsonButton component */}
            <AddJsonButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
