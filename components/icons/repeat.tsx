// The RepeatIcon component renders an SVG icon representing a repeat symbol.

// The component accepts an optional "className" prop for custom CSS classes.
export default function RepeatIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="0.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      className={className}
    >
      {/* Path: Represents the shape of the repeat icon */}
      <path
        className="fill-black dark:fill-white"
        d="M18.15 15.335A7.009 7.009 0 1 1 16.883 7H14a1 1 0 0 0 0 2h5c.014 0 .026-.007.04-.008l.009-.002A.995.995 0 0 0 20 8V3a1 1 0 0 0-2 0v2.326a8.983 8.983 0 1 0 1.91 10.96 1 1 0 0 0-1.76-.951z"
      />
    </svg>
  );
}
