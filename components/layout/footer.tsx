import LogoIcon from '@components/icons/logo';

const SITE_NAME: string = 'Warehouse Demo';

/**
 * Footer component.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  return (
    // Footer container
    <footer className="mx-8 xl:mx-16 border-t border-gray-700 bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between text-center space-y-4 pb-10 pt-6 text-sm md:flex-row">
          {/* Copyright information */}
          <p>
            {/* Display the copyright information */}
            &copy; {copyrightDate} {SITE_NAME}. All rights reserved.
          </p>
          {/* Logo and attribution */}
          <div className="flex items-center text-sm text-white dark:text-black">
            <span className="text-black dark:text-white">Created by</span>
            {/* Link the creator's Github's account */}
            <a
              rel="noopener noreferrer"
              href="https://github.com/Hajskaads"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-black dark:text-white"
            >
              {/* Render the logo */}
              <LogoIcon className="ml-3 inline-block h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
