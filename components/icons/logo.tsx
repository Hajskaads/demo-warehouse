// The LogoIcon component renders an SVG icon representing a logo.

// The component accepts an optional "className" prop for custom CSS classes.
export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 512 512"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={className}
    >
      {/* Circle: Represents the background of the logo */}
      <circle cx="249.999" cy="249.999" r="249.999" className="fill-black dark:fill-white" />

      {/* Path: Represents the shape of the logo */}
      <path
        className="fill-white dark:fill-black"
        d="m411.155 148.749-64.513 202.5h-56.216l-40.066-90.706-39.187 90.706h-56.218l-66.112-202.5h73.047l30.664 106.329L240.423 149.4h18.832l50.48 106.655 30.19-107.3z"
      />
    </svg>
  );
}
