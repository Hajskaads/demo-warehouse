// The PlusIcon component renders an SVG icon representing a plus symbol.

// The component accepts an optional "className" prop for custom CSS classes.
export default function PlusIcon({ className }: { className?: string }) {
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
      {/* First path: Vertical line */}
      <path d="M12 5V19" />

      {/* Second path: Horizontal line */}
      <path d="M5 12H19" />
    </svg>
  );
}
