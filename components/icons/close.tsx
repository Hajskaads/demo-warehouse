// The CloseIcon component renders an SVG icon representing an X.

// The component accepts an optional "className" prop for custom CSS classes.
export default function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={className}
    >
      {/* First path: Diagonal line from top right to bottom left */}
      <path d="M18 6L6 18" />
      {/* Second path: Diagonal line from bottom left to top right */}
      <path d="M6 6l12 12" />
    </svg>
  );
}
