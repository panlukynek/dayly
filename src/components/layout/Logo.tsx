export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dayly-mark" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#aca1cf" />
          <stop offset="0.6" stopColor="#92a2d5" />
          <stop offset="1" stopColor="#85b5ba" />
        </linearGradient>
      </defs>
      {/* východ slunce nad horizontem — den, který začíná */}
      <circle cx="12" cy="12" r="6.5" fill="url(#dayly-mark)" />
      <rect x="2" y="12" width="20" height="10" rx="2" fill="#161617" />
      <rect x="2" y="12" width="20" height="1.5" fill="url(#dayly-mark)" opacity="0.9" />
    </svg>
  );
}
