/**
 * Flat vector characters for the "Why Parikshe" conversation — no photos.
 * Decorative only (`aria-hidden`). 96×96, body clipped to the badge circle.
 */

export function StudentAvatar({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="stu-c">
          <circle cx="48" cy="48" r="48" />
        </clipPath>
      </defs>
      <circle cx="48" cy="48" r="48" fill="#ede9fe" />
      <g clipPath="url(#stu-c)">
        {/* hoodie */}
        <path d="M8 96c0-21 18-33 40-33s40 12 40 33Z" fill="#8b5cf6" />
        <path d="M35 64c4 7 22 7 26 0l6 9c-9 8-29 8-38 0Z" fill="#7c3aed" />
        {/* drawstrings */}
        <path
          d="M45 70v12M51 70v12"
          stroke="#ede9fe"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* neck + head */}
        <rect x="42" y="52" width="12" height="14" rx="4" fill="#e8b489" />
        <circle cx="48" cy="41" r="17" fill="#f4c9a3" />
        {/* hair */}
        <path
          d="M30 43a18 18 0 0 1 36 0c0-4-1-7-3-9-3 5-10 6-16 5-4-1-6 1-7 4-6 0-10 4-10 0Z"
          fill="#3a2417"
        />
        <path d="M64 40c2-2 4-1 4 2s-2 5-4 4Z" fill="#3a2417" />
        {/* face */}
        <circle cx="42" cy="42" r="1.8" fill="#2a1a10" />
        <circle cx="54" cy="42" r="1.8" fill="#2a1a10" />
        <path
          d="M43 49c3 3 7 3 10 0"
          stroke="#2a1a10"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="37" cy="47" r="2.5" fill="#f5a3a3" opacity=".6" />
        <circle cx="59" cy="47" r="2.5" fill="#f5a3a3" opacity=".6" />
      </g>
    </svg>
  );
}

export function MentorAvatar({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="men-c">
          <circle cx="48" cy="48" r="48" />
        </clipPath>
      </defs>
      <circle cx="48" cy="48" r="48" fill="#fff1cc" />
      <g clipPath="url(#men-c)">
        {/* blazer */}
        <path d="M8 96c0-21 18-33 40-33s40 12 40 33Z" fill="#1f2937" />
        {/* shirt V + tie */}
        <path d="M38 63 48 82 58 63l-4-3-6 10-6-10Z" fill="#f8fafc" />
        <path d="M46 66h4l2 16-4 4-4-4Z" fill="#eab308" />
        {/* neck + head */}
        <rect x="42" y="52" width="12" height="14" rx="4" fill="#e8b489" />
        <circle cx="48" cy="42" r="17" fill="#f4c9a3" />
        {/* hair */}
        <path
          d="M31 41a17 17 0 0 1 34 0c1-8-4-15-17-15s-18 7-17 15Z"
          fill="#26313f"
        />
        {/* glasses */}
        <circle
          cx="41"
          cy="43"
          r="5.5"
          stroke="#26313f"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="55"
          cy="43"
          r="5.5"
          stroke="#26313f"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M46.5 43h3"
          stroke="#26313f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* smile */}
        <path
          d="M43 50c3 3 7 3 10 0"
          stroke="#2a1a10"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* mortarboard */}
        <path d="M22 34 48 23l26 11-26 11Z" fill="#0f172a" />
        <path
          d="M69 34v11"
          stroke="#0f172a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="69" cy="46" r="2.5" fill="#eab308" />
      </g>
    </svg>
  );
}
